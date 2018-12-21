#include "ros/ros.h"
#include <iostream>
#include <sstream>
#include "std_msgs/String.h"
#include "mysql/mysql.h"
#include "ccms_pro/UnpackingCanData5.h"

using namespace std;

int UnderVoltPreState[8] = {0};
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


void sub5Callback(const ccms_pro::UnpackingCanData5::ConstPtr& msg)
{
    ROS_INFO("UnpackingCanData5: %d %d %d %d %d",msg->Balanced_data_number,msg->Modules_Above_Threshold_Voltage,msg->Moduel_Average_Voltage,msg->Module_Voltage_Threshold,msg->Minimum_Module_Voltage);

    stringstream mysql_msg;
/*	 
	mysql_msg << "insert into Module_Information(TimeStamp,Balanced_Data_Number,Modules_Above_Threshold_Voltage,Module_Average_Voltage,Module_Voltage_Threshold,Minimum_Module_Voltage) values("<< msg->stamp <<","<<msg->Balanced_data_number<<","<< msg->Modules_Above_Threshold_Voltage <<","<< msg->Moduel_Average_Voltage <<","<< msg->Module_Voltage_Threshold <<","<< msg->Minimum_Module_Voltage <<")";
*/
mysql_msg << "insert into Module_Information(ModuleID,TimeStamp,Balanced_Data_Number,Modules_Above_Threshold_Voltage,Moduel_Average_Voltage,Module_Voltage_Threshold,Minimum_Module_Voltage) values("<< msg->id <<","<< msg->stamp <<","<< msg->Balanced_data_number << ","<< msg->Modules_Above_Threshold_Voltage <<","<< msg->Moduel_Average_Voltage <<","<< msg->Module_Voltage_Threshold << ","<< msg->Minimum_Module_Voltage << ")";

    std_msgs::String Msg;
    Msg.data = mysql_msg.str();
	
    const char* const_mysql_msg = Msg.data.c_str();
	int res = mysql_query(&mysql,const_mysql_msg);
	if(!res)
	{
		ROS_INFO("successfully insert can5 data");
	}
	else
	{
		//ROS_INFO("fail to insert can5 data!");
	}
}


int main(int argc, char** argv)
{
	DataInit();
    ros::init(argc,argv,"topic_can5_sub");
   
	ros::NodeHandle n5;
	
	ros::Subscriber sub5 = n5.subscribe("simple_can5_msg",1000,sub5Callback);
    ros::spin();
}

