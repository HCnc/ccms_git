#include "ros/ros.h"
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <linux/can.h>
#include <linux/can/raw.h>
#include "ccms_pro/UnpackingCanData5.h"

uint16_t Module_Voltage(const uint16_t Voltage0,const uint16_t Voltage1)
{
    uint16_t volt0 = Voltage0;
    uint16_t volt1 = Voltage1;
    volt0<<=8;
    volt0|=volt1;
    return volt0;
}

	
int main(int argc, char** argv)
{

	ros::init(argc,argv,"topic_can5_publisher");
	ros::NodeHandle n;
	ros::Publisher can_1_pub = n.advertise<ccms_pro::UnpackingCanData5>("simple_can5_msg",1000);
		
	ros::Rate loop_rate(10);

	while(ros::ok())
	{   
	    int s,nbytes;
	    struct ifreq ifr;
	    struct can_frame frame;
        struct sockaddr_can addr;

	    struct can_filter rfilter[43];
	    s = socket(PF_CAN,SOCK_RAW,CAN_RAW);
	    strcpy(ifr.ifr_name,"can0");
	    ioctl(s,SIOCGIFINDEX,&ifr);
	    addr.can_family = AF_CAN;
	    addr.can_ifindex = ifr.ifr_ifindex;
	    bind(s,(struct sockaddr *)&addr,sizeof(addr));

	    for(int i=0; i<43; i++)
	    {
		rfilter[i].can_id = 0x1C1;
		rfilter[i].can_mask = CAN_SFF_MASK;
	    }
	    setsockopt(s,SOL_CAN_RAW,CAN_RAW_FILTER,&rfilter,sizeof(rfilter));
	    nbytes = read(s,&frame,sizeof(frame));

	    if(nbytes > 0)
	    {
      		 ccms_pro::UnpackingCanData5 msg;
			 
			 //msg.id = frame.can_id - 0x1C1 + 1;
			 if((frame.can_id - 0x1C1) == 0)	
			 {
			 	msg.stamp = ros::Time::now();
		     	msg.Balanced_data_number = (uint8_t)frame.data[0];
	         	msg.Modules_Above_Threshold_Voltage = (uint8_t)frame.data[1];
	         	msg.Moduel_Average_Voltage = Module_Voltage((uint16_t)frame.data[2],(uint16_t)frame.data[3]) - 1000;
			 	msg.Module_Voltage_Threshold = Module_Voltage((uint16_t)frame.data[4],(uint16_t)frame.data[5]) - 1000;
			 	msg.Minimum_Module_Voltage = Module_Voltage((uint16_t)frame.data[6],(uint16_t)frame.data[7]) - 1000;
	     	 	
           
		 	 	ROS_INFO("topic_can5: %d %d %d %d %d",msg.Balanced_data_number,msg.Modules_Above_Threshold_Voltage,msg.Moduel_Average_Voltage,msg.Module_Voltage_Threshold,msg.Minimum_Module_Voltage);
		 	 	can_1_pub.publish(msg);

		 	 	ros::spinOnce();
		 	 	loop_rate.sleep();	
             }
	    }
	    else
	    {
	        ROS_INFO("nbytes");
	    }
	}
	return 0;
}

