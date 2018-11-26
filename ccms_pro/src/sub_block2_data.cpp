#include "ros/ros.h"
#include <iostream>
#include <sstream>
#include "std_msgs/String.h"
#include "mysql/mysql.h"
#include "ccms_pro/UnpackingCanData3.h"
#include "ccms_pro/ModuleData.h"
#include "ccms_pro/HistoryMsg.h"
#include <boost/thread.hpp>

using namespace std;
MYSQL mysql;
MYSQL_RES *result = NULL;
MYSQL_ROW row = NULL;

std_msgs::String int2String(int number)
{
	std::stringstream ss_Module_Voltage;
	std_msgs::String str_Module_Voltage;
	ss_Module_Voltage << number;
	str_Module_Voltage.data = ss_Module_Voltage.str();
	return str_Module_Voltage;
}

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

void sub2Callback(const ccms_pro::UnpackingCanData3::ConstPtr& msg)
{
    ROS_INFO("UnpackingCanData2: %d %d %d %d",msg->Module_Block_Voltage5,msg->Module_Block_Voltage6,msg->Module_Block_Voltage7,msg->Module_Block_Voltage8);

    stringstream mysql_msg;
	mysql_msg << "insert into Block_Data_2(ModuleID,TimeStamp,Module_Block_Voltage5,Module_Block_Voltage6,Module_Block_Voltage7,Module_Block_Voltage8) values("<< msg->id <<","<< msg->stamp <<","<< msg->Module_Block_Voltage5 << ","<< msg->Module_Block_Voltage6 <<","<< msg->Module_Block_Voltage7 <<","<< msg->Module_Block_Voltage8 << ")";

    std_msgs::String Msg;
    Msg.data = mysql_msg.str();
	
    const char* const_mysql_msg = Msg.data.c_str();
	int res = mysql_query(&mysql,const_mysql_msg);
	if(!res)
	{
		ROS_INFO("successfully insert can3 data\n");
	}
	else
	{
		ROS_INFO("fail to open can3!\n");
	}
}



int main(int argc, char** argv)
{
	DataInit();
    ros::init(argc,argv,"topic_block2_sub");

	ros::NodeHandle n2;  
                                                                                           
	ros::Subscriber sub2 = n2.subscribe("simple_can_msg_block2",100,sub2Callback);

	ros::spin();
}

