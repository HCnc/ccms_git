#!/usr/bin/env python
# -*- coding: utf-8 -*-
from ccms_pro.msg import UnpackingCanData2
from ccms_pro.msg import UnpackingCanData3
import rospy
mod_inf=[[[-1],[-1],[-1]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]]]
rospy.set_param('mod_inf',mod_inf)
a=rospy.get_param('/mod_inf')
rospy.loginfo(a)

rospy.set_param('mod_inf',[[[-2],[-2],[-2]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],
              [[],[],[]],[[],[],[]],[[],[],[]]])
b=rospy.get_param('/mod_inf')
rospy.loginfo(b)
