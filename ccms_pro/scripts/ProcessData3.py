#!/usr/bin/env python
# -*- coding: utf-8 -*-
from ccms_pro.msg import UnpackingCanData3
import gloal as gl
import rospy
def callback3(msg3):
    #获取msg中的数据，UnpackingCanData3.msg
    #msg_list3=msg3
    mod_inf=gl.getg()
    msg_list3=[]
    msg_list3.append(msg3.id)                                     #模块ID
    msg_list3.append(msg3.stamp)                             	  #信息包时间戳
    msg_list3.append(msg3.Module_Block_Voltage5)                  #模组x模块5电压 
    msg_list3.append(msg3.Module_Block_Voltage6)                  #模组x模块6电压
    msg_list3.append(msg3.Module_Block_Voltage7)                  #模组x模块7电压
    msg_list3.append(msg3.Module_Block_Voltage8)                  #模组x模块8电压
    rospy.loginfo('callback3,ok!!!!')
    #填入模块表
    modID=msg3.id
    rospy.loginfo('modID=%d' % (modID))
    #time=msg_list3[1]
    msg_list3.pop(0)
    mod_inf[modID][2]=msg_list3
    #rospy.loginfo(mod_inf)
    gl.setg(mod_inf)
    a=gl.getg()
    rospy.loginfo("4444444444444444444444444444444444444444444444444444444444444444444")
    rospy.loginfo(a)
def append_data3():
    rospy.loginfo('appenddata3,ok!!!!')
    msg3 = UnpackingCanData3()
    rospy.init_node("block_detect_subscribe3")
    sub3 = rospy.Subscriber('simple_can_msg_block2', UnpackingCanData3, callback3)
    rospy.spin()
     
if __name__ =='__main__' :
    mod_inf=gl.getg()
    append_data3()

