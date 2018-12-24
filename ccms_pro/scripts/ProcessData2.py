#!/usr/bin/env python
# -*- coding: utf-8 -*-
from ccms_pro.msg import UnpackingCanData1
from ccms_pro.msg import UnpackingCanData2
from ccms_pro.msg import UnpackingCanData3
from ccms_pro.msg import UnpackingCanData4
from ccms_pro.msg import UnpackingCanData5
from ccms_pro.msg import UnpackingCanData6
from ccms_pro.msg import BlockResult
from ccms_pro.msg import ModuleResult
from ccms_pro.msg import BatteryResult
import rospy

def callback1(msg1):

def callback2(msg2):
    #获取msg中的数据，UnpackingCanData2.msg
    rospy.loginfo('callback2,start!!!!')
    modID=msg2.id
    msg_list2=[]
    msg_list2.append(msg2.id)                                     #模块ID
    msg_list2.append(msg2.stamp)                                  #信息包时间戳
    msg_list2.append(msg2.Module_Block_Voltage1)                  #模组x模块1电压 
    msg_list2.append(msg2.Module_Block_Voltage2)                  #模组x模块2电压    
    msg_list2.append(msg2.Module_Block_Voltage3)                  #模组x模块3电压 
    msg_list2.append(msg2.Module_Block_Voltage4)                  #模组x模块4电压
    #rospy.loginfo('callback2, modID=%d' % (modID))
    #rospy.loginfo(msg_list2)
    #time=msg_list2[1]
    msg_list2.pop(0)
    msg_list2.pop(0)

    mod_inf=rospy.get_param('/mod_inf')
    #rospy.loginfo(mod_inf)
    #how to convert mutiple demension str into list
    #rospy.loginfo(type(mod_inf))
    mod_inf[modID][1]=msg_list2
    rospy.set_param("/mod_inf", mod_inf)
    #mod_inf=rospy.get_param('/mod_inf')
    #rospy.loginfo(mod_inf)

def callback3(msg3):
    #获取msg中的数据，UnpackingCanData3.msg
    rospy.loginfo('callback3,start!!!!')
    modID=msg3.id
    msg_list3=[]
    msg_list3.append(msg3.id)                                     #模块ID
    msg_list3.append(msg3.stamp)                             	  #信息包时间戳
    msg_list3.append(msg3.Module_Block_Voltage5)                  #模组x模块5电压 
    msg_list3.append(msg3.Module_Block_Voltage6)                  #模组x模块6电压
    msg_list3.append(msg3.Module_Block_Voltage7)                  #模组x模块7电压
    msg_list3.append(msg3.Module_Block_Voltage8)                  #模组x模块8电压
    
    #rospy.loginfo('callback3, modID=%d' % (modID))
    #time=msg_list3[1]
    msg_list3.pop(0)
    msg_list3.pop(0)

    mod_inf=rospy.get_param("/mod_inf")
    mod_inf[modID][2]=msg_list3
    rospy.set_param("/mod_inf", mod_inf)
    #rospy.loginfo(mod_inf)

def callback4(msg4):

def callback5(msg5):

def callback6(msg6):

if __name__ =='__main__' :
    rospy.loginfo("ProcessData Start!!!!!!!!!!!!")
    rospy.set_param("/mod_inf", [[[-1],[-1],[-1]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]])
    msg1 = UnpackingCanData1()
    msg2 = UnpackingCanData2()
    msg3 = UnpackingCanData3()
    msg4 = UnpackingCanData4()
    msg5 = UnpackingCanData5()
    msg6 = UnpackingCanData6()
    rospy.init_node("block_detect_subscribe")
    sub1 = rospy.Subscriber('simple_can_msg', UnpackingCanData1, callback1)
    sub2 = rospy.Subscriber('simple_can_msg_block1', UnpackingCanData2, callback2)
    sub3 = rospy.Subscriber('simple_can_msg_block2', UnpackingCanData3, callback3) 
    sub4 = rospy.Subscriber('simple_can4_msg', UnpackingCanData4, callback4)
    sub5 = rospy.Subscriber('simple_can5_msg', UnpackingCanData5, callback5)
    sub6 = rospy.Subscriber('simple_can6_msg', UnpackingCanData6, callback6)
    rospy.spin()

    
