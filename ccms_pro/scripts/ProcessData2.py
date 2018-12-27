#!/usr/bin/env python
# -*- coding: utf-8 -*-
from ccms_pro.msg import UnpackingCanData1
from ccms_pro.msg import UnpackingCanData2
from ccms_pro.msg import UnpackingCanData3
#from ccms_pro.msg import UnpackingCanData4
#from ccms_pro.msg import UnpackingCanData5
from ccms_pro.msg import UnpackingCanData6
import rospy

def callback1(msg1):
    rospy.loginfo('callback1,start!!!!')
    modID=msg1.id
    msg_list1=[]
    #msg_list1.append(msg1.stamp)
    msg_list1.append(msg1.Module_Voltage)                            #模组电压
    msg_list1.append(msg1.Module_Capacitance_Temperature)            #模组温度1（电容温度)
    msg_list1.append(msg1.Module_Board_Temperature)                  #模组温度2（电路板温度）
    msg_list1.append(msg1.Module_Voltage_Overvoltage_Abnormal)       #模块x电压过压异常信号
    msg_list1.append(msg1.Module_Capacity_Abnormal)                  #模块1容量异常
    msg_list1.append(msg1.other_data)                                #其他数据
    msg_list1.append(msg1.Module_Voltage_Overvoltage_Warming)        #模块1电压过压预警
    msg_list1.append(msg1.module_overvolt_abnormal)                  #模组过压异常信号
    msg_list1.append(msg1.module_capacity_abnormal)                  #模组容量异常信号
    msg_list1.append(msg1.other_data_bit)                            #其他数据比特
    msg_list1.append(msg1.module_overvolt_warming)                   #模组过压预警
    
    mod_inf=rospy.get_param("/mod_inf")
    mod_inf[modID][1]=msg_list1
    rospy.set_param("/mod_inf", mod_inf)  

def callback2(msg2):
    rospy.loginfo('callback2,start!!!!')
    modID=msg2.id
    msg_list2=[]
    #msg_list2.append(msg2.id)                                    #模组ID
    #msg_list2.append(msg2.stamp)                                 #信息包时间戳
    msg_list2.append(msg2.Module_Block_Voltage1)                  #模组x模块1电压 
    msg_list2.append(msg2.Module_Block_Voltage2)                  #模组x模块2电压    
    msg_list2.append(msg2.Module_Block_Voltage3)                  #模组x模块3电压 
    msg_list2.append(msg2.Module_Block_Voltage4)                  #模组x模块4电压
    #rospy.loginfo('callback2, modID=%d' % (modID))
    #rospy.loginfo(msg_list2)
    #time=msg_list2[1]
    #msg_list2.pop(0)
    #msg_list2.pop(0)

    mod_inf=rospy.get_param('/mod_inf')
    #rospy.loginfo(mod_inf)
    #how to convert mutiple demension str into list
    #rospy.loginfo(type(mod_inf))
    mod_inf[modID][2]=msg_list2
    rospy.set_param("/mod_inf", mod_inf)
    #mod_inf=rospy.get_param('/mod_inf')
    #rospy.loginfo(mod_inf)

def callback3(msg3):
    rospy.loginfo('callback3,start!!!!')
    modID=msg3.id
    msg_list3=[]
    #msg_list3.append(msg3.id)                                    #模组ID
    #msg_list3.append(msg3.stamp)                             	  #信息包时间戳
    msg_list3.append(msg3.Module_Block_Voltage5)                  #模组x模块5电压 
    msg_list3.append(msg3.Module_Block_Voltage6)                  #模组x模块6电压
    msg_list3.append(msg3.Module_Block_Voltage7)                  #模组x模块7电压
    msg_list3.append(msg3.Module_Block_Voltage8)                  #模组x模块8电压
    
    #rospy.loginfo('callback3, modID=%d' % (modID))
    #time=msg_list3[1]
    #msg_list3.pop(0)
    #msg_list3.pop(0)

    mod_inf=rospy.get_param("/mod_inf")
    mod_inf[modID][3]=msg_list3
    rospy.set_param("/mod_inf", mod_inf)
    #rospy.loginfo(mod_inf)

'''def callback4(msg4):
    #rospy.loginfo('callback4,start!!!!')
    modID=msg4.id
    msg_list4=[]
    #msg_list4.append(msg4.stamp)
    msg_list4.append(msg4.Undervoltage_Warning)                   #模块x电压欠压预警
    msg_list4.append(msg4.Internal_Resistance_Abnormality)        #模块x内阻异常故障
    msg_list4.append(msg4.other_data)                             #其他数据
    msg_list4.append(msg4.Voltage_Equalization_State)             #模组x模块n电压均衡状态
    msg_list4.append(msg4.Undervoltage_Alarm)                     #模块x电压欠压报警
    msg_list4.append(msg4.Low_Voltage_Alarm)                      #模块1电压低压报警
    #msg_list4.append(msg4.Software_version_Number)                #软件版本号
    #msg_list4.append(msg4.Software_Minor_version_Number)          #软件次版本号
    msg_list4.append(msg4.undervolt_warning)                      ##
    msg_list4.append(msg4.resistance_abnormality)                 ##
    msg_list4.append(msg4.Other_data)                             ##
    msg_list4.append(msg4.voltage_equal_state)                    ##
    msg_list4.append(msg4.undervolt_alarm)                        ##
    msg_list4.append(msg4.low_volt_alarm)                         ##

    mod_inf=rospy.get_param("/mod_inf")
    mod_inf[modID][4]=msg_list3
    rospy.set_param("/mod_inf", mod_inf)

def callback5(msg5):
    rospy.loginfo('callback5,start!!!!')
    rospy.loginfo(msg5)
    modID=msg5.id
    msg_list5=[]
    #msg_list5.append(msg5.stamp)
　　　　msg_list5.append(msg5.Balanced_data_number)                  #均衡数据编号
　　　　msg_list5.append(msg5.Modules_Above_Threshold_Voltage)       #高于阈值电压模组数量
　　　　msg_list5.append(msg5.Moduel_Average_Voltage)                #模组平均电压
　　　　msg_list5.append(msg5.Module_Voltage_Threshold)              #模组电压阈值，最大低电压
　　　　msg_list5.append(msg5.Minimum_Module_Voltage)                #最低模组电压

    mod_inf=rospy.get_param("/mod_inf")
    mod_inf[modID][5]=msg_list3
    rospy.set_param("/mod_inf", mod_inf)
    rospy.loginfo(msg_list5)'''


def callback6(msg6):
    rospy.loginfo('callback6,start!!!!')
    powerID=msg6.Power_ID
    msg_list6=[]
    #msg_list6.append(msg6.stamp)
    msg_list6.append(msg6.Energy_Storage_Voltage)                #储能电源电压
    msg_list6.append(msg6.Energy_Storage_Current)                #储能电源电流
    msg_list6.append(msg6.Energy_Storage_Temperature)            #储能电源温度
    msg_list6.append(msg6.other_data)                            #其他数据
    msg_list6.append(msg6.Fan_Failure)                           #储能电源第x个风扇故障
    msg_list6.append(msg6.Fan_State)                             #储能电源第x个风扇故障/状态
    msg_list6.append(msg6.otherdata)                             #
    msg_list6.append(msg6.FanAccident)                           #
    msg_list6.append(msg6.Fandata)                               #

    battery_inf=rospy.get_param('/battery_inf')
    battery_inf[powerID][1]=msg_list6
    #rospy.loginfo(battery_inf)
    #rospy.loginfo("Energy_Storage_Voltage=" + str(msg6.Energy_Storage_Voltage))


if __name__ =='__main__' :
    rospy.set_param("/mod_inf", [[[-1],[-1],[-1],[-1],[-1],[-1]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],
[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]]])
    #modID->blockhealths,updata2,updata3,updata1,updata4,updata5, dont use the first index.
    rospy.set_param("/battery_inf", [[[-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99],[-99]],[[-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99],[-99]],[[-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99,-99],[-99]]])
    #batteryIS->modulehealths,updata6
    msg1 = UnpackingCanData1()
    msg2 = UnpackingCanData2()
    msg3 = UnpackingCanData3()
    #msg4 = UnpackingCanData4()
    #msg5 = UnpackingCanData5()
    msg6 = UnpackingCanData6()
    rospy.init_node("block_detect_subscribe")
    sub1 = rospy.Subscriber('simple_can_msg', UnpackingCanData1, callback1)
    sub2 = rospy.Subscriber('simple_can_msg_block1', UnpackingCanData2, callback2)
    sub3 = rospy.Subscriber('simple_can_msg_block2', UnpackingCanData3, callback3) 
    #sub4 = rospy.Subscriber('simple_can4_msg', UnpackingCanData4, callback4)
    #sub5 = rospy.Subscriber('simple_can5_msg', UnpackingCanData5, callback5)
    sub6 = rospy.Subscriber('simple_can6_msg', UnpackingCanData6, callback6)
    rospy.spin()	

    
