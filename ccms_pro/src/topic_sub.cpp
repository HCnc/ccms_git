#include "ros/ros.h"
#include <iostream>
#include "ccms_pro/UnpackingCanData1.h"

void sub1Callback(const ccms_pro::UnpackingCanData1::ConstPtr& msg)
{
    ROS_INFO("%d %d %d",msg->Module_Voltage,msg->Module_Board_Temperature,msg->Module_Capacitance_Temperature);
/*
//,msg->Module_Voltage_Overvoltage_Abnormal_Bit0,\
    msg->Module_Voltage_Overvoltage_Abnormal_Bit1,msg->Module_Voltage_Overvoltage_Abnormal_Bit2,msg->Module_Voltage_Overvoltage_Abnormal_Bit3,msg->Module_Voltage_Overvoltage_Abnormal_Bit4,\
	msg->Module_Voltage_Overvoltage_Abnormal_Bit5,msg->Module_Voltage_Overvoltage_Abnormal_Bit6,msg->Module_Voltage_Overvoltage_Abnormal_Bit7);
*/
}

int main(int argc, char** argv)
{
    ros::init(argc,argv,"topic_sub");

    ros::NodeHandle n1;

    ros::Subscriber sub1 = n1.subscribe("history_msg",10,sub1Callback); 

    ros::spin();
}
