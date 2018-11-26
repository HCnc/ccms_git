#include "ros/ros.h"
#include "std_msgs/String.h"
#include <sstream>
#include "mysql/mysql.h"
#include "ccms_pro/HistoryMsg.h"

int main(int argc, char **argv)
{
    ros::init(argc, argv, "testpub1");

    ros::NodeHandle n;
    ros::Publisher chatter_pub = n.advertise<ccms_pro::HistoryMsg>("send",1000);

    ros::Rate loop_rate(1000);
    int count = 0;
    ccms_pro::HistoryMsg msg;
    //while (ros::ok())
    //
    std_msgs::String Msg;
    std::stringstream ss;
    //ros::Time begin = ros::Time::now();
    msg.Module_Number = 2;
    msg.StartTime = 1541301098.9591508;
    msg.EndTime = 1541379906.9591508;
   
    //std::cout << msg->begin <<std::endl;
    //std::cout << "SELECT << "unix_timestamp(now())"<<" <<std::endl;
    //double secs =ros::Time::now();
    ss << msg.StartTime << count;
    
    Msg.data = ss.str();
    ROS_INFO("%s", Msg.data.c_str());
    
    //ROS_INFO("%s", begin.data.c_str());
    chatter_pub.publish(msg);

    ros::spinOnce();
    loop_rate.sleep();
    ++count;
    //
  return 0;
}
