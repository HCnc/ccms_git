#include "ros/ros.h"
#include <iostream>
#include <sstream>
#include "std_msgs/String.h"
#include "mysql/mysql.h"
#include "ccms_pro/UnpackingCanData4.h"
#include "ccms_pro/ModuleData.h"
#include "ccms_pro/HistoryMsg.h"
#include <boost/thread.hpp>
#include <sys/time.h>

using namespace std;

int Undervoltage_WarningPreState[8] = {0};
int Internal_Res_AbnormalPreState[8] = {0};
int Volt_Equal_StatePreState[8] = {0};
int Undervoltage_AlarmPreState[8] = {0};
int other_dataPreState[8] = {0};

ros::Duration d(0.01);
MYSQL mysql;
/**
 *初始化数据库，连接数据库
 *@param: 无
 *@return bool
*/
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
void Info(int res, int type)
{
    //stringstream msg;
	if(!res)
	{
		ROS_INFO("successfully insert  %d data", type);
	}
	else
	{
		//ROS_INFO("fail to open %d data", type);
	}
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
 *当某个状态量发生改变时，更新数据库中的endTime字段
 *@param: int powerID <电源编号>,int moduleID<模组编号>,int blockID<模块编号>,int errTypeID<错误类型编号>,ros::Time stamp<状态改变的时间戳>
 *@return void
*/
/*
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
*/
/**
 *当某个状态量为1时（产生了故障、异常、警告），将电源编号、模组编号、模块编号、错误类型编号、（产生了故障、异常、警告）的时间戳记录到数据库中
 *@param: int powerID <电源编号>,int moduleID<模组编号>,int blockID<模块编号>,int errTypeID<错误类型编号>,ros::Time stamp<状态为1的时间戳>
 *@return void
*/

/*void InsertErrTable(int powerID,int moduleID,int blockID,int errTypeID,ros::Time stamp)
{
	cout << "debug InsertErrTable"<< endl;
	stringstream mysql_msg;
	//mysql_msg << "insert into Error_Table(Error_Type_ID,PowerID,ModuleID,BlockID,StartTime) values("<<errTypeID<<","<<powerID<<","<<moduleID<<","<<blockID<<","<<stamp<<")";
 	mysql_msg << "insert into Error_Table(Error_Type_ID,PowerID,ModuleID,BlockID,StartTime) values("<<errTypeID<<","<<powerID<<","<<moduleID<<","<<blockID<<","<<stamp<<")";
    std_msgs::String Msg;
    Msg.data = mysql_msg.str();	
    const char* const_mysql_msg = Msg.data.c_str();
	int res = mysql_query(&mysql,const_mysql_msg);
	Info(res,errTypeID);
}*/


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


/**
 *判断can总线的数据<模块x电压欠压预警>的每一位是1还是0
 *@param: int i<bit位编号>,int Error_Type_ID<错位类型编号>,int PowerID<电源编号>,int ModuleID<模组编号>,int BlockID<模块编号>,ros::Time stamp<用于更新数据的时间戳>,
 *int Voltage_Undervoltage_Warning[]<模块x电压欠压预警>
 *@return void
*/
void UndervoltageWarningState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Undervoltage_Warning[])
{
	cout << "debug UndervoltageWarningState"<< endl;
	int StateNum = Undervoltage_WarningPreState[i] - Undervoltage_Warning[i];
    switch(StateNum)
    {
        case 0:
			cout << "UndervoltageWarning no error!!"<< endl;
        break;

        case 1:
        	Undervoltage_WarningPreState[i] = Undervoltage_Warning[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	Undervoltage_WarningPreState[i] = Undervoltage_Warning[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

/**
 *将can总线的数据<模块X电压低压报警>的每一位存入数组
 *@param: uint64_t id <模组编号>,uint16_t voltage_data<模块X电压低压报警>,ros::Time stamp<can总线产生数据的时间戳>
 *@return void
*/
void UndervoltageWarning_DataInit(uint64_t id,uint64_t voltage_data,ros::Time stamp)
{
    cout << "debug Undervoltage_Warning_DataInit"<< endl;
	int PowerID = 1;
	int ModuleID = id;
	int errTypeID = 1;

	for (int i=0; i<8; i++)
    {	
        int Voltage_Undervoltage_Warning[i];
        int blockID = i + 1;
		
        if (BoolGenerate(voltage_data,i))
        {
            Voltage_Undervoltage_Warning[i] = 1;
        }
        else
        {
            Voltage_Undervoltage_Warning[i] = 0;
        }
        UndervoltageWarningState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Voltage_Undervoltage_Warning);
    }
}




/**
 *判断can总线的数据<模块x内阻异常故障>的每一位是1还是0
 *@param: int i<bit位编号>,int Error_Type_ID<错位类型编号>,int PowerID<电源编号>,int ModuleID<模组编号>,int BlockID<模块编号>,ros::Time stamp<用于更新数据的时间戳>,
 *int Voltage_Undervoltage_Warning[]<模块x内阻异常故障>
 *@return void
*/
void IntResAbnormalPreState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Internal_Res_Abnormal[])
{
	cout << "debug IntResAbnormalPreState"<< endl;
	int StateNum = Internal_Res_AbnormalPreState[i] - Internal_Res_Abnormal[i];
    switch(StateNum)
    {
        case 0:
			cout << "IntResAbnormalPre no error!!"<< endl;
        break;

        case 1:
        	Internal_Res_AbnormalPreState[i] = Internal_Res_Abnormal[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	Internal_Res_AbnormalPreState[i] = Internal_Res_Abnormal[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

/**
 *判断can总线的数据<模组x模块x电压均衡状态>的每一位是1还是0
 *@param: int i<bit位编号>,int Error_Type_ID<错位类型编号>,int PowerID<电源编号>,int ModuleID<模组编号>,int BlockID<模块编号>,ros::Time stamp<用于更新数据的时间戳>,
 *int Voltage_Undervoltage_Warning[]<模组x模块x电压均衡状态>
 *@return void
*/
void VoltEqualState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Voltage_Equalization_State[])
{
	cout << "debug VoltEqualState"<< endl;
	int StateNum = Volt_Equal_StatePreState[i] - Voltage_Equalization_State[i];
    switch(StateNum)
    {
        case 0:
			cout << "VoltEqualState no error!!"<< endl;
        break;

        case 1:
        	Volt_Equal_StatePreState[i] = Voltage_Equalization_State[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	Volt_Equal_StatePreState[i] = Voltage_Equalization_State[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

/**
 *判断can总线的数据<模块x电压欠压报警>的每一位是1还是0
 *@param: int i<bit位编号>,int Error_Type_ID<错位类型编号>,int PowerID<电源编号>,int ModuleID<模组编号>,int BlockID<模块编号>,ros::Time stamp<用于更新数据的时间戳>,
 *int Voltage_Undervoltage_Warning[]<模块1电压欠压报警>
 *@return void
*/
void Undervoltage_AlarmState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Undervoltage_Alarm[])
{
	cout << "debug VoltEqualState"<< endl;
	int StateNum = Undervoltage_AlarmPreState[i] - Undervoltage_Alarm[i];
    switch(StateNum)
    {
        case 0:
			cout << "VoltEqualState no error!!"<< endl;
        break;

        case 1:
        	Undervoltage_AlarmPreState[i] = Undervoltage_Alarm[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	Undervoltage_AlarmPreState[i] = Undervoltage_Alarm[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

/**
 *判断can总线的数据<模块X电压低压报警>的每一位是1还是0
 *@param: int i<bit位编号>,int Error_Type_ID<错位类型编号>,int PowerID<电源编号>,int ModuleID<模组编号>,int BlockID<模块编号>,ros::Time stamp<用于更新数据的时间戳>,
 *int Voltage_Undervoltage_Warning[]<模块X电压低压报警>
 *@return void
*/
void LowVoltageAlarmState(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int Low_Voltage_Alarm[])
{
	cout << "debug LowVoltageAlarmState"<< endl;
	int StateNum = Undervoltage_AlarmPreState[i] - Low_Voltage_Alarm[i];
    switch(StateNum)
    {
        case 0:
			cout << "LowVoltageAlarmState no error!!"<< endl;
        break;

        case 1:
        	Undervoltage_AlarmPreState[i] = Low_Voltage_Alarm[i];
        	updateErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;

        case -1:
        	Undervoltage_AlarmPreState[i] = Low_Voltage_Alarm[i];
        	InsertErrTable(PowerID,ModuleID,BlockID,Error_Type_ID,stamp);
        break;
		
        default: break;
     }
}

void other_State(int i,int Error_Type_ID,int PowerID,int ModuleID,int BlockID,ros::Time stamp,int other_data[])
{
	cout << "debug other_State"<< endl;
	int StateNum = other_dataPreState[i] - other_data[i];
    switch(StateNum)
    {
        case 0:
			cout << "LowVoltageAlarmState no error!!"<< endl;
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

/**
 *将can总线的数据<模块X电压低压报警>的每一位存入数组
 *@param: uint64_t id <模组编号>,uint16_t voltage_data<模块X电压低压报警>,ros::Time stamp<can总线产生数据的时间戳>
 *@return void
*/

void UndervoltageWarning_DataInit(uint64_t id,uint16_t voltage_data,ros::Time stamp)
{
    cout << "debug Undervoltage_Warning_DataInit"<< endl;
	int PowerID = 1;
	int ModuleID = id;
	int errTypeID = 1;

	for (int i=0; i<8; i++)
    {	
        int Voltage_Undervoltage_Warning[i];
        int blockID = i + 1;
		
        if (BoolGenerate(voltage_data,i))
        {
            Voltage_Undervoltage_Warning[i] = 1;
        }
        else
        {
            Voltage_Undervoltage_Warning[i] = 0;
        }
        UndervoltageWarningState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Voltage_Undervoltage_Warning);
    }
}

/**
 *将can总线的数据<模块X内阻异常故障>的每一位存入数组
 *@param: uint64_t id <模组编号>,uint16_t voltage_data<模块X内阻异常故障>,ros::Time stamp<can总线产生数据的时间戳>
 *@return void
*/
void InternalResAbnormal_DataInit(uint64_t id,uint64_t can_data,ros::Time stamp)
{
    cout << "debug InternalResAbnormal_DataInit"<< endl;

	int PowerID = 1;
	int ModuleID = id;
	int errTypeID = 2;

	for(int i=0; i<8; i++)
	{
		int Internal_Res_Abnormal[i];
        int blockID = i + 1;

		if(BoolGenerate(can_data,i))
		{
			Internal_Res_Abnormal[i] = 1;
		}
		else
		{
			Internal_Res_Abnormal[i] = 0;
		}
		IntResAbnormalPreState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Internal_Res_Abnormal);
    }
}

/**
 *将can总线的数据<模组x模块x电压均衡状态>的每一位存入数组
 *@param: uint64_t id <模组编号>,uint16_t voltage_data<模组x模块1电压均衡状态>,ros::Time stamp<can总线产生数据的时间戳>
 *@return void
*/
void VoltageEqualizationState_DataInit(uint64_t id,uint64_t can_data,ros::Time stamp)
{
    cout << "debug VoltageEqualizationState_DataInit"<< endl;
	int PowerID = 1;
	int ModuleID = id;
	int errTypeID = 4;

	for(int i=0; i<8; i++)
	{
		int Voltage_Equalization_State[i];
        int blockID = i + 1;
		if(BoolGenerate(can_data,i))
		{
			Voltage_Equalization_State[i] = 1;
		}
		else
		{
			Voltage_Equalization_State[i] = 0;
		}
		VoltEqualState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Voltage_Equalization_State);	
    }
}

/**
 *将can总线的数据<模块1电压欠压报警>的每一位存入数组
 *@param: uint64_t id <模组编号>,uint16_t voltage_data<模块1电压欠压报警>,ros::Time stamp<can总线产生数据的时间戳>
 *@return void
*/
//void UndervoltageAlarm_DataInit(uint64_t can_data,ros::Time stamp)
void UndervoltageAlarm_DataInit(uint64_t id,uint64_t can_data,ros::Time stamp)
{
    cout << "debug UndervoltageAlarm_DataInit"<< endl;
	int PowerID = 1;
	int ModuleID = id;
    int errTypeID = 16;

	for(int i=0; i<8; i++)
	{
		int Undervoltage_Alarm[i];
        int blockID = i + 1;
		if(BoolGenerate(can_data,i))
		{
			Undervoltage_Alarm[i] = 1;
		}
		else
		{
			Undervoltage_Alarm[i] = 0;
		}
		Undervoltage_AlarmState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Undervoltage_Alarm);	
    }
}

/**
 *将can总线的数据<模块1电压低压报警>的每一位存入数组
 *@param: uint64_t id <模组编号>,uint16_t voltage_data<模块1电压低压报警>,ros::Time stamp<can总线产生数据的时间戳>
 *@return void
*/
void LowVoltageAlarm_DataInit(uint64_t id,uint64_t can_data,ros::Time stamp)
{
    cout << "debug LowVoltageAlarm_DataInit"<< endl;
    int PowerID = 1;
	int ModuleID = id;
	int errTypeID = 17;

	for(int i=0; i<8; i++)
	{
		int Low_Voltage_Alarm[i];
        int blockID = i + 1;
		if(BoolGenerate(can_data,i))
		{
			Low_Voltage_Alarm[i] = 1;
		}
		else
		{
			Low_Voltage_Alarm[i] = 0;
		}
		Undervoltage_AlarmState(i,errTypeID,PowerID,ModuleID,blockID,stamp,Low_Voltage_Alarm);	
    }
}

void other_DataInit(uint64_t id,uint64_t can_data,ros::Time stamp)
{
	cout << "debug other_DataInit"<< endl;
	int PowerID = 1;
    int ModuleID = id;
	int errTypeID = 19;

	for(int i=0; i<5; i++)
	{
		int other_data[i];
        int blockID = i + 1;

		if(BoolGenerate(can_data,i))
		{   
			if(i = 0)
			{
				other_data[i] = 1;
				//errTypeID = 17;
			}
            else
			{
/*
   				other_data[i] = NULL;
				errTypeID = NULL;
*/
			}
		}
		else
		{
			if(i = 0)
			{
				other_data[i] = 0;
				//errTypeID = 17;
			}
            else
			{
/*
   				other_data[i] = NULL;
				errTypeID = NULL;
*/
			}
		}
		if(i = 0)
			other_State(i,errTypeID,PowerID,ModuleID,blockID,stamp,other_data);
		
    }
}


class Listener
{
public:
	void chatter1(const ccms_pro::UnpackingCanData4::ConstPtr& msg)
  	{
    	UndervoltageWarning_DataInit(msg->id,msg->Undervoltage_Warning,msg->stamp);
    	d.sleep();
  	}

  	void chatter2(const ccms_pro::UnpackingCanData4::ConstPtr& msg)
  	{
		InternalResAbnormal_DataInit(msg->id,msg->Internal_Resistance_Abnormality,msg->stamp);
    	d.sleep();
  	}
 	void chatter3(const ccms_pro::UnpackingCanData4::ConstPtr& msg)
 	{
		VoltageEqualizationState_DataInit(msg->id,msg->Voltage_Equalization_State,msg->stamp);
    	d.sleep();
 	}

 	void chatter4(const ccms_pro::UnpackingCanData4::ConstPtr& msg)
 	{
    	LowVoltageAlarm_DataInit(msg->id,msg->Undervoltage_Alarm,msg->stamp);
    	d.sleep();
 	}
	
    void chatter5(const ccms_pro::UnpackingCanData4::ConstPtr& msg)
 	{
    	other_DataInit(msg->id,msg->Undervoltage_Alarm,msg->stamp);
    	d.sleep();
 	}

};

int main(int argc, char **argv)
{
  	ros::init(argc, argv, "sub_error_data");
  	ros::NodeHandle n;
 
  	Listener l;
  	ros::Subscriber sub1 = n.subscribe("simple_can4_msg", 10, &Listener::chatter1, &l);
/*
  	ros::Subscriber sub2 = n.subscribe("simple_can4_msg", 10, &Listener::chatter2, &l);
  	ros::Subscriber sub3 = n.subscribe("simple_can4_msg", 10, &Listener::chatter3, &l);
  	ros::Subscriber sub4 = n.subscribe("simple_can4_msg", 10, &Listener::chatter4, &l);
  	ros::Subscriber sub5 = n.subscribe("simple_can4_msg", 10, &Listener::chatter5, &l);
  */
  	//ros::MultiThreadedSpinner s(5);
  	//ros::spin(s);
	ros::spin();
 
  return 0;
}
