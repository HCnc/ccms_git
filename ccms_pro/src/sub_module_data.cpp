#include "ros/ros.h"
#include <iostream>
#include <sstream>
#include "std_msgs/String.h"
#include "mysql/mysql.h"
#include "ccms_pro/UnpackingCanData1.h"
#include "ccms_pro/ModuleData.h"
#include "ccms_pro/HistoryMsg.h"
#include <boost/thread.hpp>

using namespace std;
int UnderVoltPreState[8] = {0};
int Capacity_AbnormalPreState[8] = {0};
int Voltage_Overvoltage_WarmingPre[8] = {0};
int other_dataPreState[8] = {0};

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

//数据库提示信息

void Info(int res,int type)
{
	if(!res)
	{
		ROS_INFO("successfully insert %d data", type);
	}
	else
	{
		ROS_INFO("fail to open %d data", type);
	}
}

void updateErrTable(int powerID,int moduleID,int blockID,int errTypeID,ros::Time stamp)
{ 
    cout << "debug updateErrTable"<< std::endl;
	stringstream mysql_msg;
    cout << stamp;
	mysql_msg << "update Error_Table set EndTime = '"<< stamp <<"' where Error_Type_ID = "<<errTypeID<<" and PowerID = "<<powerID<<" and ModuleID = "<<moduleID<<" and BlockID = "<<blockID<<" ";
	
    std_msgs::String Msg;
    Msg.data = mysql_msg.str();	
    const char* const_mysql_msg = Msg.data.c_str();
	int res = mysql_query(&mysql,const_mysql_msg);
	Info(res,errTypeID);
}

void InsertErrTable(int powerID,int moduleID,int blockID,int errTypeID,ros::Time stamp)
{
	cout << "debug InsertErrTable"<< endl;
	stringstream mysql_msg;
	mysql_msg << "insert into Error_Table(Error_Type_ID,PowerID,ModuleID,BlockID,StartTime) values("<<errTypeID<<","<<powerID<<","<<moduleID<<","<<blockID<<","<<stamp<<")";
 
    std_msgs::String Msg;
    Msg.data = mysql_msg.str();	
    const char* const_mysql_msg = Msg.data.c_str();
	int res = mysql_query(&mysql,const_mysql_msg);
	Info(res,errTypeID);
}

bool BoolGenerate(const uint8_t data,int index)
{
	uint8_t volt0 = data;
	if(volt0&(0x01<<index))
		return true;
	else
		return false;
}

void StateJudge(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Module_Voltage_Overvoltage_Abnormal[])
{
	cout << "debug StateJudge"<< endl;
	int StateNum = UnderVoltPreState[i] - Module_Voltage_Overvoltage_Abnormal[i];
    switch(StateNum)
    {
        case 0:
		cout << "StateJudge no error!!"<< endl;
        break;

        case 1:
        	UnderVoltPreState[i] = Module_Voltage_Overvoltage_Abnormal[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	UnderVoltPreState[i] = Module_Voltage_Overvoltage_Abnormal[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

void CapacityPreState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Module_Capacity_Abnormal[])
{
	cout << "debug Capacity_AbnormalPreState"<< endl;
	int StateNum = Capacity_AbnormalPreState[i] - Module_Capacity_Abnormal[i];
    switch(StateNum)
    {
        case 0:
		cout << "Capacity_AbnormalPreState no error!!"<< endl;
        break;

        case 1:
        	Capacity_AbnormalPreState[i] = Module_Capacity_Abnormal[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	Capacity_AbnormalPreState[i] = Module_Capacity_Abnormal[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

void VoltWarmingPreState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Voltage_Overvoltage_Warming[])
{
	cout << "debug VoltWarmingPreState"<< endl;
	int StateNum = Voltage_Overvoltage_WarmingPre[i] - Voltage_Overvoltage_Warming[i];
    switch(StateNum)
    {
        case 0:
		std::cout << "VoltWarmingPreState no error!!"<< std::endl;
        break;

        case 1:
        	Voltage_Overvoltage_WarmingPre[i] = Voltage_Overvoltage_Warming[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	Voltage_Overvoltage_WarmingPre[i] = Voltage_Overvoltage_Warming[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

void otherPreState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int other_data[])
{
	cout << "debug otherPreState"<< endl;
	int StateNum = other_dataPreState[i] - other_data[i];
    switch(StateNum)
    {
        case 0:
		cout << "otherPreState no error!!"<< endl;
        break;

        case 1:
        	other_dataPreState[i] = other_data[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	other_dataPreState[i] = other_data[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

void Volt_DataInit(uint64_t id,uint16_t voltage_data,ros::Time stamp)
{
    cout << "debug Volt_DataInit"<< endl;
	int PowerID = 1;

	for (int i=0; i<8; i++)
    {	
		int PowerID = 1;
		int ModuleID = id;
        int Module_Voltage_Overvoltage_Abnormal[i];
        int blockID = i + 1;
		int errTypeID = 1;
        if (BoolGenerate(voltage_data,i))
        {
            Module_Voltage_Overvoltage_Abnormal[i] = 1;
        }
        else
        {
            Module_Voltage_Overvoltage_Abnormal[i] = 0;
        }
        StateJudge(i,errTypeID,PowerID,ModuleID,blockID,stamp,Module_Voltage_Overvoltage_Abnormal);
    }
}

void Cap_DataInit(uint64_t id,uint64_t capacity_data,ros::Time stamp)
{
    cout << "debug Cap_DataInit"<< endl;
	int PowerID = 1;
	int ModuleID = id;
    int errTypeID = 2;

	for(int i=0; i<8; i++)
	{
		int Module_Capacity_Abnormal[i];
        int blockID = i + 1;
		if(BoolGenerate(capacity_data,i))
		{
			Module_Capacity_Abnormal[i] = 1;
		}
		else
		{
			Module_Capacity_Abnormal[i] = 0;
		}
		CapacityPreState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Module_Capacity_Abnormal);
    }
}

void other_DataInit(uint64_t id,uint64_t can_data,ros::Time stamp)
{
	cout << "debug other_DataInit"<< endl;
	int PowerID = 1;
    int ModuleID = id;
	int errTypeID = 0;

	for(int i=0; i<5; i++)
	{
		int other_data[i];
        int blockID = i + 1;
		if(BoolGenerate(can_data,i))
		{
			if((i==3)||(i==5)||(i==6)||(i==7))
			{
				//other_data[i] = NULL;
			}
			else
			{
				other_data[i] = 1;
                if(i = 4)
					errTypeID = 3;
				else
					errTypeID = 11 + i;
			}
		}
		else
		{
			if((i==3)||(i==5)||(i==6)||(i==7))
			{
				//other_data[i] = NULL;
			}
			else
			{
				other_data[i] = 0;
                if(i = 4)
					errTypeID = 3;
				else
					errTypeID = 11 + i;
			}
		}
		otherPreState(i,errTypeID,PowerID,ModuleID,blockID,stamp,other_data);
    }
}

void VoltWarming_DataInit(uint64_t id,uint64_t capacity_data,ros::Time stamp)
{
    cout << "debug VoltWarming_DataInit"<< endl;
	int PowerID = 1;
	int ModuleID = id;
	int errTypeID = 2;

	for(int i=0; i<8; i++)
	{
		int Voltage_Overvoltage_Warming[i];
        int blockID = i + 1;
		
		if(BoolGenerate(capacity_data,i))
		{
			Voltage_Overvoltage_Warming[i] = 1;
		}
		else
		{
			Voltage_Overvoltage_Warming[i] = 0;
		}
		VoltWarmingPreState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Voltage_Overvoltage_Warming);
		
    }
}
 
class CanData_Sub
{
public:
	void Can_chatter1(const ccms_pro::UnpackingCanData1::ConstPtr& msg)
  	{
    	ROS_INFO("UnpackingCanData1: %d %d %d",msg->Module_Voltage,msg->Module_Board_Temperature,msg->Module_Capacitance_Temperature);
    	stringstream mysql_msg;
		double secs = msg->stamp.toSec();
		mysql_msg << "insert into Module_Data(ModuleID,TimeStamp,Module_Voltage,Module_Board_Temperature,Module_Capacitance_Temperature) values("<< msg->id <<","<< msg->stamp<<","<< msg->Module_Voltage <<","<< msg->Module_Board_Temperature <<","<< msg->Module_Capacitance_Temperature <<")";

		std_msgs::String Msg;
    	Msg.data = mysql_msg.str();	
    	const char* const_mysql_msg = Msg.data.c_str();
		int res = mysql_query(&mysql,const_mysql_msg);
	    //int type = 100; 
		//Info(res,type);
        ROS_INFO("work");
		if(!res)
		{
			ROS_INFO("successfully insert  data");
		}
		else
		{
			ROS_INFO("fail to open  data");
		}
    	d.sleep();
  	}

  	void Can_chatter2(const ccms_pro::UnpackingCanData1::ConstPtr& msg)
  	{
		Volt_DataInit(msg->id,msg->Module_Voltage_Overvoltage_Abnormal,msg->stamp);
    	d.sleep();
  	}

  	void Can_chatter3(const ccms_pro::UnpackingCanData1::ConstPtr& msg)
  	{
		Cap_DataInit(msg->id,msg->Module_Capacity_Abnormal,msg->stamp);
    	d.sleep();
  	}

	void Can_chatter4(const ccms_pro::UnpackingCanData1::ConstPtr& msg)
	{
  		other_DataInit(msg->id,msg->other_data,msg->stamp);
  		d.sleep();
	}

	void Can_chatter5(const ccms_pro::UnpackingCanData1::ConstPtr& msg)
	{
 		VoltWarming_DataInit(msg->id,msg->Module_Voltage_Overvoltage_Abnormal,msg->stamp);
  		d.sleep();
	}
};


int main(int argc, char **argv)
{
  	DataInit();
  	ros::init(argc, argv, "sub_moudle_data");
  	ros::NodeHandle n;
 
  	CanData_Sub l;
  	ros::Subscriber sub1 = n.subscribe("simple_can_msg", 10, &CanData_Sub::Can_chatter1, &l);

  	ros::Subscriber sub2 = n.subscribe("simple_can_msg", 10, &CanData_Sub::Can_chatter2, &l);

  	ros::Subscriber sub3 = n.subscribe("simple_can_msg", 10, &CanData_Sub::Can_chatter3, &l);
  	ros::Subscriber sub4 = n.subscribe("simple_can_msg", 10, &CanData_Sub::Can_chatter4, &l);
  	ros::Subscriber sub5 = n.subscribe("simple_can_msg", 10, &CanData_Sub::Can_chatter5, &l);
 
  	//ros::MultiThreadedSpinner s(2);

  	//ros::spin(s);
    ros::spin();
  	return 0;
}
