/**
 * AddTwoInts Client
 */
 
#include <cstdlib>
#include "ros/ros.h"
#include "ccms_pro/ModuleData.h"

int main(int argc, char **argv)
{
  // ROS节点初始化
  ros::init(argc, argv, "add_two_ints_client");
  
  // 从终端命令行获取两个加数
  if (argc != 4)
  {
    ROS_INFO("usage: add_two_ints_client X Y");
    return 1;
  }

  // 创建节点句柄
  ros::NodeHandle n;
  
  // 创建一个client，请求add_two_int service，service消息类型是learning_communication::AddTwoInts
   //ros::ServiceClient client = n.serviceClient<ccms_pro::ModuleData>("sub_can4_node");
  ros::ServiceClient client = n.serviceClient<ccms_pro::ModuleData>("history_module_msg");
  //ros::ServiceClient client = n.serviceClient<ccms_pro::ModuleData>("history_power_msg");

  // 创建learning_communication::AddTwoInts类型的service消息
  ccms_pro::ModuleData srv;
  srv.request.moduleID = atoll(argv[1]);
  srv.request.StartStamp = atoll(argv[2]);
  srv.request.EndStamp = atoll(argv[3]); 
  
  
  // 发布service请求，等待加法运算的应答结果
  if (client.call(srv))
  {
   // for(int i =0; i<4; i++)
    ROS_INFO("Sum: %d %d %d %d", srv.response.HModule[0],srv.response.HModule[1],srv.response.HModule[2],srv.response.HModule[3]);
    //ROS_INFO("Sum: %d %d %d %d", srv.response.HEnergy_Storage_Voltage[0],srv.response.HEnergy_Storage_Voltage[1],srv.response.HEnergy_Storage_Voltage[2],srv.response.HEnergy_Storage_Voltage[3]);
  }
  else
  {
    ROS_ERROR("Failed to call service add_two_ints");
    return 1;
  }

  return 0;
}
