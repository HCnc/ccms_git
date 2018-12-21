#include "ros/ros.h"
#include "std_msgs/String.h"
#include <sstream>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>

int main(int argc, char **argv)
{
    ros::init(argc, argv, "testpub1");
    ros::NodeHandle n;
    //ros::Publisher chatter_pub = n.advertise<ccms_pro::HistoryMsg>("diretory",1000);
    ros::Rate loop_rate(1000);
/*
    while(ros::ok())
	{
    	struct stat buf;
   		int fd;
   		fd = open("/home/shunya/.ros/log", O_RDONLY);
   		fstat(fd, &buf);
   		if(buf.st_size > 1024)  //bytes
		{
			system("sudo rm -rf /home/shunya/.ros/log");
		}
	}
    ros::spinOnce();
    loop_rate.sleep();
*/
  return 0;
}
