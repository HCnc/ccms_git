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
#include <vector>
#include "ccms_pro/UnpackingCanData4.h"

bool CapOverVolt(const uint16_t Voltage2, int index)
{
    uint8_t volt0 = Voltage2;
    if(volt0&(0x01<<index))
       return true;
    else
       return false;
}

bool balance_data(int num,uint16_t voltage_data,std::vector<uint64_t>&re_data)
{
    //int data[8];
	for (int i=0; i<num; i++)
    {	
        //int Voltage_Undervoltage_Warning[i];
        if (CapOverVolt(voltage_data,i))
        {
            re_data.push_back(1);
        }
        else
        {
            re_data.push_back(0);
        }
    }
	return true;
}


int main(int argc, char** argv)
{
	ros::init(argc,argv,"topic_can4_publisher");
	ros::NodeHandle n;
	ros::Publisher can_1_pub = n.advertise<ccms_pro::UnpackingCanData4>("simple_can4_msg",1000);		
	ros::Rate loop_rate(10);
 	//std::vector <uint64_t> re_data;
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
			rfilter[i].can_id = 0x480 + i;
			rfilter[i].can_mask = CAN_SFF_MASK;
	    }
	    setsockopt(s,SOL_CAN_RAW,CAN_RAW_FILTER,&rfilter,sizeof(rfilter));
	    nbytes = read(s,&frame,sizeof(frame));
	    if(nbytes > 0)
	    {
      		 ccms_pro::UnpackingCanData4 msg;
			 if((frame.can_id - 0x480) <= 43)
			 {
			 	msg.id = frame.can_id - 0x480 + 1;
			 	msg.stamp = ros::Time::now();
	       	 
			 	msg.Undervoltage_Warning = (uint16_t)frame.data[0];
			 	msg.Internal_Resistance_Abnormality = (uint16_t)frame.data[1];
			 	msg.other_data = (uint16_t)frame.data[2];
			 	msg.Voltage_Equalization_State = (uint16_t)frame.data[3];
			 	msg.Undervoltage_Alarm = (uint16_t)frame.data[4];
			 	msg.Low_Voltage_Alarm = (uint16_t)frame.data[5];
			 	msg.Software_version_Number = (uint16_t)frame.data[6];
			 	msg.Software_Minor_version_Number = (uint16_t)frame.data[7];

			 	std::vector <uint64_t> re_data;
			 	balance_data(8,(uint16_t)frame.data[3],re_data);
			 	msg.data = re_data;

  /*              for(std::vector<uint64_t>::iterator it = re_data.begin(); it != re_data.end(); it++)
			 	{
			 		std::cout<< *it << std::endl;
			 	}
*/
		 	 	ROS_INFO("topic_can4:%d",msg.id);
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

