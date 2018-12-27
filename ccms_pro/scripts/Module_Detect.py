#!/usr/bin/env python
# -*- coding: utf-8 -*-
from ccms_pro.msg import ModuleResult
#import ProcessData2
import rospy

def module_detect():
    pub1 = rospy.Publisher('module_detect',ModuleResult, queue_size=1)
    rospy.init_node('module_detect_publisher')
    rate = rospy.Rate(2)
    while not rospy.is_shutdown():
        mod_inf=rospy.get_param("/mod_inf")
        #rospy.loginfo(mod_inf)   
        
        #substate
        for modID in range(1,len(mod_inf)):
            #if (len(mod_inf[modID][0]==8) and (len(mod_inf[modID][2])+len(mod_inf[modID][3])==8))):
            if (len(mod_inf[modID][0])==8):
                subgreatstate=0
                submidstate=0
                subbadstate=0
                for x in range(0,len(mod_inf[modID][0])):
                    if mod_inf[modID][0][x]==1:
                        subgreatstate+=1
                    elif mod_inf[modID][0][x]==0:
                        submidstate+=1
                    elif mod_inf[modID][0][x]==-1:
                        subbadstate+=1
                if subgreatstate==8:
                    totalstate=1
                if subbadstate>=1:
                    totalstate=-1
                if subbadstate==8:
                    totalstate=0

            #Judge
                #MinmoduleV=mod_inf[modID][5][4]
                singlehealth=-99
                blen=len(mod_inf)
                for x in range(0,blen):
                    #if totalstate==1 and mod_inf[modID][1][0]>MinmoduleV:
                    if totalstate==1:
                        singlehealth=1
                    #elif totalstate==-1 or mod_inf[modID][1][0]<=MinmoduleV:
                    elif totalstate==-1:
                        singlehealth=-1
                    #elif totalstate==0 and mod_inf[modID][1][0]>MinmoduleV:
                    elif totalstate==0:
                        singlehealth=0
            
             #Output ModuleReault
                moduleresult=ModuleResult()
                moduleresult.modID=modID
                moduleresult.modulehealth=singlehealth
                moduleresult.stamp=rospy.get_rostime()
             #store healthparam
                battery_inf=rospy.get_param("/battery_inf")
                battery_inf[0][0][modID-1]=singlehealth
                rospy.set_param("/battery_inf", battery_inf)
                rospy.loginfo(moduleresult)
                pub1.publish(moduleresult)
        rate.sleep()
                
if __name__ =='__main__' :
    try:
        module_detect()
    except rospy.ROSInterruptException:
        pass
