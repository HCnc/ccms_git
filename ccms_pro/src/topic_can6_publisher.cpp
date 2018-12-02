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
#include <errno.h>
#include "ccms_pro/UnpackingCanData6.h"

bool CapOverVolt(const uint16_t Voltage2, int index)
{
    uint8_t volt0 = Voltage2;
    if(volt0&(0x01<<index))
       return true;
    else
       return false;
}


uint16_t Module_Voltage(const uint16_t Voltage0,const uint16_t Voltage1)
{
    uint16_t volt0 = Voltage0;
    uint16_t volt1 = Voltage1;
    volt1<<=8;
    volt1|=volt0;
    return volt1;
}

int16_t Module_Current(const int16_t Current0,const int16_t Current1)
{
    int16_t Cur0 = Current0;
    int16_t Cur1 = Current1;
    Cur1<<=8;
    Cur1|=Cur0;
    return Cur1;
}

bool fan_data(int num,uint16_t voltage_data,std::vector<uint64_t>&re_data)
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

bool Fan_Accident(int num,uint16_t voltage_data,std::vector<uint64_t>&fan_Accident_data)
{
    //int data[8];
	for (int i=0; i<num; i++)
    {	
        //int Voltage_Undervoltage_Warning[i];
        if (CapOverVolt(voltage_data,i))
        {
            fan_Accident_data.push_back(1);
        }
        else
        {
            fan_Accident_data.push_back(0);
        }
    }
	return true;
}

bool Other_data(int num,uint16_t voltage_data,std::vector<uint64_t>&other_data)
{
    //int data[8];
	for (int i=0; i<num; i++)
    {	
        //int Voltage_Undervoltage_Warning[i];
        if (CapOverVolt(voltage_data,i))
        {
            other_data.push_back(1);
        }
        else
        {
            other_data.push_back(0);
        }
    }
	return true;
}


	
int main(int argc, char** argv)
{

	ros::init(argc,argv,"topic_can6_publisher");
	ros::NodeHandle n;
	ros::Publisher can_1_pub = n.advertise<ccms_pro::UnpackingCanData6>("simple_can6_msg",1000);
		
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
			rfilter[i].can_id = 0x1C2;
			rfilter[i].can_mask = CAN_SFF_MASK;
	    }
	    setsockopt(s,SOL_CAN_RAW,CAN_RAW_FILTER,&rfilter,sizeof(rfilter));
		if((s>=0) && (s<=500))
		{
	    	nbytes = read(s,&frame,sizeof(frame));
			ROS_INFO("n_s_2 %d",s);
		}
		else		
		{
			s = 5;
     		ROS_INFO("can4 n_s = 5");
			//close(s);
		}

	    //nbytes = read(s,&frame,sizeof(frame));

	    if(nbytes > 0)
	    {
      		 ccms_pro::UnpackingCanData6 msg;
			 if((frame.can_id - 0x1C2) == 0)
			 {
			 	msg.Power_ID = 1;
			 	msg.stamp = ros::Time::now();
		     	msg.Energy_Storage_Voltage = Module_Voltage((uint16_t)frame.data[0],(uint16_t)frame.data[1]);
	         	msg.Energy_Storage_Current = Module_Current((int16_t)frame.data[2],(int16_t)frame.data[3]);
	         	msg.Energy_Storage_Temperature = (uint16_t)frame.data[4] - 40;
			 	msg.other_data = (uint16_t)frame.data[5];
		 	 	msg.Fan_Failure = (uint16_t)frame.data[6];
			 	msg.Fan_State = (uint16_t)frame.data[7];

				std::vector <uint64_t> re_data;
				std::vector <uint64_t> other_data;
				std::vector <uint64_t> fan_Accident_data;
				Other_data(8,(uint16_t)frame.data[5],other_data);
				Fan_Accident(8,(uint16_t)frame.data[6],fan_Accident_data);
			 	fan_data(8,(uint16_t)frame.data[7],re_data);
				

			 	msg.Fandata = re_data;  //charge state/ +accdient/ -accdient/ 24v / finish charge/
				msg.otherdata = other_data;  //FAN9-12 flag1-3
				msg.FanAccident = fan_Accident_data;  //FAN1-8

		 	 	ROS_INFO("topic_can6: %d %d %d",msg.Energy_Storage_Voltage,msg.Energy_Storage_Current,msg.Energy_Storage_Temperature);
		 	 	can_1_pub.publish(msg);

		 	 	ros::spinOnce();
		 	 	loop_rate.sleep();	
			 }
	    }
	    else
	    {
	        ROS_INFO("can6 no bytes");
			ROS_INFO("%d,%s", errno,(char*)strerror(errno));
	    }
	}
	return 0;
}

