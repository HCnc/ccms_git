#!/usr/bin/env python
# -*- coding: utf-8 -*-
from ccms_pro.msg import UnpackingCanData2
from ccms_pro.msg import UnpackingCanData3
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from ccms_pro.msg import BlockResult
import rospy
def callback2(msg2):
    #获取msg中的数据，UnpackingCanData2.msg
    #msg_list2=msg2
    mod_inf=rospy.get_param('/mod_inf')
    #rospy.loginfo(mod_inf)
    ####how to convert mutiple demension str into list
    #rospy.loginfo(type(mod_inf))
    msg_list2=[]
    msg_list2.append(msg2.id)                                     #模块ID
    msg_list2.append(msg2.stamp)                                  #信息包时间戳
    msg_list2.append(msg2.Module_Block_Voltage1)                  #模组x模块1电压 
    msg_list2.append(msg2.Module_Block_Voltage2)                  #模组x模块2电压    
    msg_list2.append(msg2.Module_Block_Voltage3)                  #模组x模块3电压 
    msg_list2.append(msg2.Module_Block_Voltage4)                  #模组x模块4电压
    modID=msg2.id
    rospy.loginfo('callback2, modID=%d' % (modID))
    #rospy.loginfo('callback2,ok!!!!')
    #rospy.loginfo(msg_list2)
    #time=msg_list2[1]
    msg_list2.pop(0)
    msg_list2.pop(0)
    mod_inf[modID][1]=msg_list2
    #rospy.loginfo(mod_inf)
    a=mod_inf
    #rospy.loginfo(type(a))
    rospy.set_param("/mod_inf", a)
    #mod_inf=rospy.get_param('/mod_inf')
    #rospy.loginfo(mod_inf)
    #rospy.loginfo(type(mod_inf))

def callback3(msg3):
    #获取msg中的数据，UnpackingCanData3.msg
    #msg_list3=msg3
    mod_inf=rospy.get_param("/mod_inf")
    #rospy.loginfo(mod_inf)
    msg_list3=[]
    msg_list3.append(msg3.id)                                     #模块ID
    msg_list3.append(msg3.stamp)                             	  #信息包时间戳
    msg_list3.append(msg3.Module_Block_Voltage5)                  #模组x模块5电压 
    msg_list3.append(msg3.Module_Block_Voltage6)                  #模组x模块6电压
    msg_list3.append(msg3.Module_Block_Voltage7)                  #模组x模块7电压
    msg_list3.append(msg3.Module_Block_Voltage8)                  #模组x模块8电压
    modID=msg3.id
    rospy.loginfo('callback3, modID=%d' % (modID))
    rospy.loginfo('callback3,ok!!!!')
    #time=msg_list3[1]
    msg_list3.pop(0)
    msg_list3.pop(0)
    mod_inf[modID][2]=msg_list3
    #rospy.loginfo(mod_inf)
    a=mod_inf
    #rospy.loginfo(type(a))ss
    rospy.set_param("/mod_inf", a)
    
 
if __name__ =='__main__' :
    rospy.loginfo("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    rospy.set_param("/mod_inf", [[[-1],[-1],[-1]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]])
    msg2 = UnpackingCanData2()
    msg3 = UnpackingCanData3()
    rospy.init_node("block_detect_subscribe")
    sub2 = rospy.Subscriber('simple_can_msg_block1', UnpackingCanData2, callback2)
    sub3 = rospy.Subscriber('simple_can_msg_block2', UnpackingCanData3, callback3) 
    rospy.spin()

    
