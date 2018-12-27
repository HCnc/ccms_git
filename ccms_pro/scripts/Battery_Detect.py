#!/usr/bin/env python
# -*- coding: utf-8 -*-
from ccms_pro.msg import BatteryResult
#import ProcessData2
import rospy

def battery_detect():
    pub1 = rospy.Publisher('battery_detect',BatteryResult, queue_size=1)
    rospy.init_node('battery_detect_publisher')
    rate = rospy.Rate(2)
    #rospy.loginfo('enter battery_detect()!!!!!!!')
    while not rospy.is_shutdown():
        battery_inf=rospy.get_param("/battery_inf")
        #rospy.loginfo(battery_inf)   
        
        #substate
        #for powerID in range(0,len(battery_inf)):
        for powerID in range(0,1):
            #rospy.loginfo(battery_inf[powerID][0])
            if battery_inf[powerID][0].count(-99)<=42:
                #rospy.loginfo("aaaaaaaaaaaaaaaaaaaaa")
                subgreatstate=0
                submidstate=0
                subbadstate=0
                totalstate=1
                for x in range(0,len(battery_inf[powerID][0])):
                    if battery_inf[powerID][0][x]==1:
                        subgreatstate+=1
                    elif battery_inf[powerID][0][x]==0:
                        submidstate+=1
                    elif battery_inf[powerID][0][x]==-1:
                        subbadstate+=1
                if (len(battery_inf[powerID][0])-subgreatstate<=5):
                    totalstate=1
                if (len(battery_inf[powerID][0])-subbadstate>=5) and subbadstate!=0:
                    totalstate=-1
                if (len(battery_inf[powerID][0])-submidstate>=20) and subbadstate!=0:
                    totalstate=0

            #Judge

                bthealth=-99
                blen=len(battery_inf)
                for x in range(0,blen):
                    #if totalstate==1 and battery_inf[powerID][1][0]>MinmoduleV:
                    if totalstate==1:
                        bthealth=1
                    #elif totalstate==-1 or battery_inf[powerID][1][0]<MinmoduleV:
                    elif totalstate==-1:
                        bthealth=-1
                    #elif totalstate==0 and battery_inf[powerID][1][0]>MinmoduleV:
                    elif totalstate==0:
                        bthealth=0
            
             #Output ModuleReault
                batteryresult=BatteryResult()
                batteryresult.batteryID=powerID+1
                batteryresult.batteryhealth=bthealth
                batteryresult.stamp=rospy.get_rostime()
                rospy.loginfo(batteryresult)
                pub1.publish(batteryresult)
        rate.sleep()
                
if __name__ =='__main__' :
    try:
        battery_detect()
    except rospy.ROSInterruptException:
        pass
