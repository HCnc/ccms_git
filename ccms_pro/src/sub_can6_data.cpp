#include "ros/ros.h"
#include <iostream>
#include <sstream>
#include "std_msgs/String.h"
#include "mysql/mysql.h"
#include "ccms_pro/UnpackingCanData6.h"
#include <boost/thread.hpp>

using namespace std;

int FanFailurePreState[8] = {0};
int FanPreState[8] = {0};
int other_dataPreState[8]={0};

ros::Duration d(0.01);
MYSQL mysql;


bool DataInit()
{
	const char *host = "localhost"; 
	const char *user = "hikey970";
	const char *pass = "robot";
	const char *db = "ccms";

	mysql_init(&mysql);
	if(!mysql_real_connect(&mysql,host,user,pass,db,0,NULL,0))
	{
		ROS_INFO("---%s---",mysql_error(&mysql));
		return 1;
	}
	else
	{
		ROS_INFO("---Database connected!--");
		return 0;
	}
}

/**
 *信息打印
 *@param: int res
 *@return void
*/
void Info(int res,int type)
{
	if(!res)
	{
		ROS_INFO("successfully insert r %d data", type);
	}
	else
	{
		//ROS_INFO("fail to open %d data", type);
	}
}

/**
 *当某个状态量发生改变时，更新数据库中的endTime字段
 *@param: int powerID <电源编号>,int blockID<模块编号>,int errTypeID<错误类型编号>,ros::Time stamp<状态改变的时间戳>
 *@return void
*/
void updateErrTable(int powerID,int blockID,int errTypeID,ros::Time stamp)
{ 
    cout << "debug updateErrTable"<< std::endl;
	stringstream mysql_msg;
    //cout << stamp;
	mysql_msg << "update Error_Table set EndTime = "<< stamp <<" where Error_Type_ID = "<<errTypeID<<" and PowerID = "<<powerID<<" and BlockID = "<<blockID<<" ";
	
    std_msgs::String Msg;
    Msg.data = mysql_msg.str();	
    const char* const_mysql_msg = Msg.data.c_str();
	int res = mysql_query(&mysql,const_mysql_msg);
	Info(res,errTypeID);
}

/**
 *当某个状态量为1时（产生了故障、异常、警告），将电源编号、模组编号、模块编号、错误类型编号、（产生了故障、异常、警告）的时间戳记录到数据库中
 *@param: int powerID <电源编号>,int blockID<模块编号>,int errTypeID<错误类型编号>,ros::Time stamp<状态为1的时间戳>
 *@return void
*/
void InsertErrTable(int powerID,int blockID,int errTypeID,ros::Time stamp)
{
	cout << "debug InsertErrTable"<< endl;
	stringstream mysql_msg;
	mysql_msg << "insert into Error_Table(Error_Type_ID,PowerID,BlockID,StartTime) values("<< errTypeID<<","<<powerID<<","<<blockID<<",'"<<stamp<<"')";
 
    std_msgs::String Msg;
    Msg.data = mysql_msg.str();	
    const char* const_mysql_msg = Msg.data.c_str();
	int res = mysql_query(&mysql,const_mysql_msg);
	Info(res,errTypeID);
}

/**
 *判断can总线的数据某个byte的数据的每一位是1还是0
 *@param: const uint8_t data <can总线的数据某个byte的数据>,int index <byte中的第几个bit>
 *@return bool
*/
bool BoolGenerate(const uint8_t data,int index)
{
	uint8_t volt0 = data;
	if(volt0&(0x01<<index))
		return true;
	else
		return false;
}

/**
 *判断can总线的数据<模块x电压欠压预警>的每一位是1还是0
 *@param: int i<bit位编号>,int Error_Type_ID<错位类型编号>,int PowerID<电源编号>,int BlockID<模块编号>,ros::Time stamp<用于更新数据的时间戳>,
 *int Voltage_Undervoltage_Warning[]<模块x电压欠压预警>
 *@return void
*/
void otherState(int i,int Error_Type_ID,int PowerID,int BlockID,ros::Time stamp,int other_data[])
{
	cout << "debug Fan_FailureState"<< endl;
	int StateNum = other_dataPreState[i] - other_data[i];
    switch(StateNum)
    {
        case 0:
			cout << "Fan_FailureState no error!!"<< endl;
        break;

        case 1:
        	other_dataPreState[i] = other_data[i];
        	updateErrTable(PowerID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	other_dataPreState[i] = other_data[i];
        	InsertErrTable(PowerID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

/**
 *判断can总线的数据<模块x电压欠压预警>的每一位是1还是0
 *@param: int i<bit位编号>,int Error_Type_ID<错位类型编号>,int PowerID<电源编号>,int BlockID<模块编号>,ros::Time stamp<用于更新数据的时间戳>,
 *int Voltage_Undervoltage_Warning[]<模块x电压欠压预警>
 *@return void
*/
void FanFailureState(int i,int Error_Type_ID,int PowerID,int BlockID,ros::Time stamp,int Fan_Failure[])
{
	cout << "debug Fan_FailureState"<< endl;
	int StateNum = FanFailurePreState[i] - Fan_Failure[i];
    switch(StateNum)
    {
        case 0:
			cout << "Fan_FailureState no error!!"<< endl;
        break;

        case 1:
        	FanFailurePreState[i] = Fan_Failure[i];
        	updateErrTable(PowerID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	FanFailurePreState[i] = Fan_Failure[i];
        	InsertErrTable(PowerID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

void FanState(int i,int Error_Type_ID,int PowerID,int BlockID,ros::Time stamp,int Fan_State[])
{
	cout << "debug FanState"<< endl;
	int StateNum = FanPreState[i] - Fan_State[i];
    switch(StateNum)
    {
        case 0:
			cout << "FanState no error!!"<< endl;
        break;

        case 1:
        	FanPreState[i] = Fan_State[i];
        	updateErrTable(PowerID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	FanPreState[i] = Fan_State[i];
        	InsertErrTable(PowerID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

/**
 *将can总线的数据<模块X电压低压报警>的每一位存入数组
 *@param: uint64_t id <模组编号>,uint16_t voltage_data<模块X电压低压报警>,ros::Time stamp<can总线产生数据的时间戳>
 *@return void
*/
void other_DataInit(uint16_t can_data,ros::Time stamp)
{
    cout << "debug other_DataInit"<< endl;
	int PowerID = 1;

	for (int i=0; i<8; i++)
    {	
		int PowerID = 1;
        int other_data[i];
        int blockID = i + 1;
		int errTypeID;
        if (BoolGenerate(can_data,i))
        {   
			if((i==0)||(i==1)||(i==6))
			{
/*
				other_data[i] = NULL;
        		errTypeID = NULL;
*/
			}
			else
			{
            	other_data[i] = 1;
				errTypeID = 4 + i;
			}
        }
        else
        {
            if((i==0)||(i==1)||(i==6))
			{
/*
				other_data[i] = NULL;
        		errTypeID = NULL;
*/
			}
			else
			{
            	other_data[i] = 0;
				errTypeID = 4 + i;
			}
        }

		if((i != 0)||( i!= 1)||(i !=6 ))
        	otherState(i,errTypeID,PowerID,blockID,stamp,other_data);
    }
}

void FanFailureState_DataInit(uint16_t can_data,ros::Time stamp)
{
    cout << "debug FanFailureState_DataInit"<< endl;
	int PowerID = 1;

	for (int i=0; i<8; i++)
    {	
		int PowerID = 1;
		int blockID = i+8;
        int Fan_State[i];
		int errTypeID = 10;
        if (BoolGenerate(can_data,i))
        {
            Fan_State[i] = 1;
        }
        else
        {
            Fan_State[i] = 0;
        }
        FanFailureState(i,errTypeID,PowerID,blockID,stamp,Fan_State);
    }
}


void FanState_DataInit(uint16_t can_data,ros::Time stamp)
{
    cout << "debug FanState_DataInit"<< endl;
	int PowerID = 1;

	for (int i=0; i<7; i++)
    {	
		int PowerID = 1;
		int blockID = i+8;
        int Fan_State[i];
		int errTypeID = 11;
        if (BoolGenerate(can_data,i))
        {
            Fan_State[i] = 1;
        }
        else
        {
            Fan_State[i] = 0;
        }
        FanState(i,errTypeID,PowerID,blockID,stamp,Fan_State);
    }
}

class CanData_Sub
{
public:
	void Can_chatter1(const ccms_pro::UnpackingCanData6::ConstPtr& msg)
	{
    	ROS_INFO("UnpackingCanData6: %d %d %d",msg->Energy_Storage_Voltage,msg->Energy_Storage_Current,msg->Energy_Storage_Temperature);

    	stringstream mysql_msg;
		mysql_msg << "insert into Energy_Storage_Data(TimeStamp,Energy_Storage_Voltage,Energy_Storage_Current,Energy_Storage_Temperature) values("<< msg->stamp <<","<< msg->Energy_Storage_Voltage <<","<< msg->Energy_Storage_Current <<","<< msg->Energy_Storage_Temperature <<")";

    	std_msgs::String Msg;
   	 	Msg.data = mysql_msg.str();
	    
        int type = 111;
    	const char* const_mysql_msg = Msg.data.c_str();
		int res = mysql_query(&mysql,const_mysql_msg);
		//Info(res,type);
		if(!res)
		{
			ROS_INFO("successfully insert three datas", type);
		}
	else
	{
		ROS_INFO("fail to open three data", type);
	}
    	d.sleep();
  	}

    void Can_chatter2(const ccms_pro::UnpackingCanData6::ConstPtr& msg)
  	{
		other_DataInit(msg->Fan_Failure,msg->stamp);
    	d.sleep();
  	}

  	void Can_chatter3(const ccms_pro::UnpackingCanData6::ConstPtr& msg)
  	{
		FanFailureState_DataInit(msg->Fan_Failure,msg->stamp);
    	d.sleep();
  	}

 	void Can_chatter4(const ccms_pro::UnpackingCanData6::ConstPtr& msg)
 	{
    	FanState_DataInit(msg->Fan_State,msg->stamp);
    	d.sleep();
 	}
};

int main(int argc, char** argv)
{
	 DataInit();
     ros::init(argc,argv,"topic_can6_sub");
	 ros::NodeHandle n;
	 CanData_Sub l;
  	 ros::Subscriber sub1 = n.subscribe("simple_can6_msg", 100, &CanData_Sub::Can_chatter1, &l);

  	 ros::Subscriber sub2 = n.subscribe("simple_can6_msg", 100, &CanData_Sub::Can_chatter2, &l);
   	 ros::Subscriber sub3 = n.subscribe("simple_can6_msg", 100, &CanData_Sub::Can_chatter3, &l);
     ros::Subscriber sub4 = n.subscribe("simple_can6_msg", 100, &CanData_Sub::Can_chatter4, &l);

  	 //ros::MultiThreadedSpinner s(5);
     //ros::spin(s);
     ros::spin();
	 return 0;
}


