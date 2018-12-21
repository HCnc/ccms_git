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
#include <sys/time.h>
#include <errno.h>
#include "ccms_pro/UnpackingCanData2.h"

uint16_t Module_Voltage(const uint16_t Voltage0,const uint16_t Voltage1)
{
    uint16_t volt0 = Voltage0;
    uint16_t volt1 = Voltage1;
    volt1<<=8;
    volt1|=volt0;
    return volt1;
}

int main(int argc, char** argv)
{

	ros::init(argc,argv,"topic_block1_publisher");
	ros::NodeHandle n;
	ros::Publisher can_1_pub = n.advertise<ccms_pro::UnpackingCanData2>("simple_can_msg_block1",1000);
		
	ros::Rate loop_rate(10);

	while(ros::ok())
	{   
	    int s,nbytes;
	    struct ifreq ifr;
	    struct can_frame frame;
        struct sockaddr_can addr;

	    struct can_filter rfilter[43];
	    s = socket(PF_CAN,SOCK_RAW,CAN_RAW);
		ROS_INFO("n_s_1 %d",s);
	    strcpy(ifr.ifr_name,"can0");
	    ioctl(s,SIOCGIFINDEX,&ifr);
	    addr.can_family = AF_CAN;
	    addr.can_ifindex = ifr.ifr_ifindex;
	    bind(s,(struct sockaddr *)&addr,sizeof(addr));

	    for(int i=0; i<43; i++)
	    {
			rfilter[i].can_id = 0x280 + i;
			rfilter[i].can_mask = CAN_SFF_MASK;
	    }

	    setsockopt(s,SOL_CAN_RAW,CAN_RAW_FILTER,&rfilter,sizeof(rfilter));
        if(s>=0)
		{
	    	nbytes = read(s,&frame,sizeof(frame));
			ROS_INFO("n_s_2 %d",s);
		}
		else		
		{
			s = 6;
     		ROS_INFO("n_s = 6");
			//close(s);
		}
		//ROS_INFO("nbyte %d",nbytes);
	    if(nbytes > 0)
	    {
      		 ccms_pro::UnpackingCanData2 msg;

			 if((frame.can_id - 0x280 + 1) <= 43)
			 {
	         	msg.id = frame.can_id - 0x280;
			 	msg.stamp = ros::Time::now();
		     	msg.Module_Block_Voltage1 = Module_Voltage((uint16_t)frame.data[0],(uint16_t)frame.data[1]) - 1000;
			 	msg.Module_Block_Voltage2 = Module_Voltage((uint16_t)frame.data[2],(uint16_t)frame.data[3]) - 1000;
			 	msg.Module_Block_Voltage3 = Module_Voltage((uint16_t)frame.data[4],(uint16_t)frame.data[5]) - 1000;
 			 	msg.Module_Block_Voltage4 = Module_Voltage((uint16_t)frame.data[6],(uint16_t)frame.data[7]) - 1000;
	         
		 		ROS_INFO("topic_block1:%d %d %d %d",msg.id,msg.Module_Block_Voltage1,msg.Module_Block_Voltage2,msg.Module_Block_Voltage3,msg.Module_Block_Voltage4);
		 	 	can_1_pub.publish(msg);

		 	 	ros::spinOnce();
		 		loop_rate.sleep();	
			}
	    }
	    else
	    {
	        ROS_INFO("block1 no bytes");
			ROS_INFO("%d,%s", errno,(char*)strerror(errno));
	    }
	}
	return 0;
}

