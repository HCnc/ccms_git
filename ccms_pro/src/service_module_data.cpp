#include "ros/ros.h"
#include "std_msgs/String.h"
#include <sstream>
#include "mysql/mysql.h"
#include "ccms_pro/ModuleData.h"

MYSQL mysql;
MYSQL_RES *result = NULL;
MYSQL_ROW row = NULL;


bool DataBaseInit()
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

bool add(ccms_pro::ModuleData::Request &req,ccms_pro::ModuleData::Response &res)
{
       
        //if((req.a == 1)&&(req.moduleID==2))
         DataBaseInit();
       // if(req.a == 1)
       // {
           //DataBaseInit();
           std::vector<int> arrp;
          std::stringstream mysql_msg;
          mysql_msg << "select Module_Voltage,Module_Board_Temperature,Module_Capacitance_Temperature from Module_Data where ModuleID = "<< req.moduleID <<" \
          and TimeStamp >= "<<req.StartStamp<<" and TimeStamp <= "<< req.EndStamp <<" ";

          std_msgs::String Msg;
          Msg.data = mysql_msg.str();
          const char* const_mysql_msg = Msg.data.c_str();
        
	        int Res = mysql_query(&mysql,const_mysql_msg);
          if(!Res)
          {
        	  result = mysql_store_result( &mysql );
	       	  int field_count = mysql_num_fields( result );
        
	      	  row = mysql_fetch_row(result);
        
        	  while ( NULL != row )
        	  {
            	  // std::cout << atoi(row[0]) << "\t";
            	  // std::cout << atoi(row[1]) << "\t";
            	  // std::cout << atoi(row[2]) << "\t";

                res.HModule_Voltage = atoi(row[0]);
				        res.HModule_Board_Temperature = atoi(row[1]);
                res.HModule_Capacitance_Temperature = atoi(row[2]);
                //res.sum[0] = atoi(row[0]);
            	  // row = mysql_fetch_row( result );

                std::cout << res.HModule_Voltage << "\t";
            	  std::cout << res.HModule_Board_Temperature << "\t";
            	  std::cout << res.HModule_Capacitance_Temperature << "\t";
                std::cout << std::endl;

                arrp.push_back(res.HModule_Voltage);
                arrp.push_back(res.HModule_Board_Temperature);
                arrp.push_back(res.HModule_Capacitance_Temperature);

                row = mysql_fetch_row( result );
/*
                for(std::vector<int>::iterator m = arrp.begin(); m != arrp.end(); m++ ) //用迭代器的方式输出容器对象的值
                {
                    std::cout<<*m<<std::endl; //这里依次输出vector的值
                }
*/
        	  }
          }
          else
          {
                ROS_INFO("no data");
          }
          mysql_close( &mysql );
      //  }
        return true;

}

int main(int argc, char **argv)
{
  ros::init(argc, argv, "sub_can4_data");
  ros::NodeHandle n;
  ros::ServiceServer service = n.advertiseService("sub_can4_node",add);
  ROS_INFO("Ready to can");
  ros::spin();
  return 0;
}
