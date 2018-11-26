#!/usr/bin/env python
# -*- coding: utf-8 -
from ccms_pro.msg import BlockResult
from ccms_pro.msg import UnpackingCanData1

import rospy
import math
import random

rospy.init_node('t_publisher')

pub = rospy.Publisher('ran', UnpackingCanData1, queue_size=1)

rate = rospy.Rate(1)

while not rospy.is_shutdown():
	msg = UnpackingCanData1()
	msg.Module_Voltage = random.randint(0,65535)
	
	pub.publish(msg)
	rate.sleep()
