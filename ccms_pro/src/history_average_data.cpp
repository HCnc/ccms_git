/************************  
 * @Author: Debin Huang  
 * @DateTime: 2018-11-09 10:57:30  
 * @Description:  等待client端发送ModuleData类型的请求，收到请求之后查询错误表Error_Table，返回数据到client端
************************/
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

/*************************
*@Description:初始化数据库
*@param:无
*@return bool
*************************/
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

/*************************
*@Description: 回调函数中完成Module_Information表中数据库的查询，并将多条记录发送至客户端
*@param:ccms_pro::ModuleData::Request &req,<请求数据> ccms_pro::ModuleData::Response &res<反馈数据>
*@return bool
*************************/
bool add(ccms_pro::ModuleData::Request &req,ccms_pro::ModuleData::Response &res)
{
	DataBaseInit();
    std::vector<double> arrp;
    std::stringstream mysql_msg;
     mysql_msg << "select TimeStamp,Balanced_Data_Number,Modules_Above_Threshold_Voltage,Moduel_Average_Voltage,Module_Voltage_Threshold,Minimum_Module_Voltage \
	 from Module_Information where TimeStamp >= "<<req.StartStamp<<" and TimeStamp <= "<< req.EndStamp <<" ";

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
 			cout << strtod(row[4],NULL) << "\t";
            cout << strtod(row[5],NULL) << "\t";
        	cout << endl;

            arrp.push_back(strtod(row[0],NULL));
            arrp.push_back(strtod(row[1],NULL));
            arrp.push_back(strtod(row[2],NULL));
            arrp.push_back(strtod(row[3],NULL));
			arrp.push_back(strtod(row[4],NULL));
            arrp.push_back(strtod(row[5],NULL));

            row = mysql_fetch_row( result );
        }
        res.HModule_Average = arrp;
    }
    else
    {
        ROS_INFO("----no average state data----");
    }
    mysql_close( &mysql );
    return true;
}

int main(int argc, char **argv)
{
  ros::init(argc, argv, "history_average_data");
  ros::NodeHandle n;
  ros::ServiceServer service = n.advertiseService("history_average_msg",add);
  ROS_INFO("----Ready to select average state database----");
  ros::spin();
  return 0;
}
