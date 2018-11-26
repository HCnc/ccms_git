#include "ros/ros.h"
#include "std_msgs/String.h"
#include <sstream>
#include <stdlib.h>
#include "mysql/mysql.h"
#include "ccms_pro/ModuleData.h"

using namespace std;
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
DataBaseInit();
    std::vector<double> arrp;
    std::stringstream mysql_msg;
    mysql_msg << "select TimeStamp,Module_Voltage,Module_Capacitance_Temperature,Module_Board_Temperature from Module_Data where ModuleID = "<< req.moduleID <<" \
    and TimeStamp >= "<<req.StartStamp<<" and TimeStamp <= "<< req.EndStamp <<" ";
    cout << req.moduleID << endl;
    cout << req.StartStamp << endl;
    cout << req.EndStamp << endl;

    ROS_INFO("---mysql down--");
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
        	cout << strtod(row[0],NULL) << "\t";
            cout << strtod(row[1],NULL) << "\t";
            cout << strtod(row[2],NULL) << "\t";
            cout << strtod(row[3],NULL) << "\t";
        	cout << endl;

            arrp.push_back(strtod(row[0],NULL));
            arrp.push_back(strtod(row[1],NULL));
            arrp.push_back(strtod(row[2],NULL));
            arrp.push_back(strtod(row[3],NULL));

            row = mysql_fetch_row( result );
        }
        res.HModule = arrp;
    }
    else
    {
        ROS_INFO("no data");
    }
    mysql_close( &mysql );
    return true;
}

int main(int argc, char **argv)
{
  ros::init(argc, argv, "history_module_data");
  ros::NodeHandle n;
  ros::ServiceServer service = n.advertiseService("history_module_msg",add);
  ROS_INFO("Ready to can");
  ros::spin();
  return 0;
}
