#!/usr/bin/env python
# -*- coding: utf-8 -
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from ccms_pro.msg import BlockResult
import ProcessData2
import rospy
#import matplotlib.pyplot as plt
#import numpy as np

def turkeys(inlist):#输入list，输出list最大、最小阈值。可用于异常检测。
  
    param1=1.5 #for max
    param2=0.8 #for min
    length=len(inlist) #float
    if(length<=3):
        rospy.loginfo("! Input length of list must bigger than 3.")
    inlist.sort()
    Q1key=(1*(length+1)/4)-1
    Q3key=(3*(length+1)/4)-1
    print(Q1key,Q3key)
    Q1value=inlist[int(Q1key)] + (inlist[int(Q1key)+1]-inlist[int(Q1key)])*(Q1key-int(Q1key))
    Q3value=inlist[int(Q3key)] + (inlist[int(Q3key)+1]-inlist[int(Q3key)])*(Q3key-int(Q3key))
    tukeysmax=Q3value+param1*(Q3value-Q1value)
    tukeysmin=Q1value-param2*(Q3value-Q1value)
    tukeysresult=[tukeysmin,tukeysmax]
    return tukeysresult

def block_detect():
    pub1 = rospy.Publisher('block_detect',BlockResult, queue_size=1)
    rospy.init_node('block_detect_publisher')
    rate = rospy.Rate(2)
    rospy.loginfo('enter block_detect()')
    while not rospy.is_shutdown():
        ##rospy.loginfo("111111111111111111111111111111111111111111111")
        #mod_inf=rospy.get_param("/mod_inf")
        #rospy.loginfo(mod_inf)   
        #rospy.loginfo(len(mod_inf[0][0]))
        #rospy.loginfo(mod_inf)
        '''for modID in range(1,len(mod_inf)-1):
            #rospy.loginfo(mod_inf)
            #rospy.loginfo(mod_inf[modID][1])
            #rospy.loginfo(len(mod_inf[modID][1]))
            #rospy.loginfo(len([modID][2]))
            #rospy.loginfo(len(mod_inf[modID][1]))
            if ((len(mod_inf[modID][1])+len(mod_inf[modID][2]))==8):#当mod表中八个模块都有值的时候，开始模块检测
                rospy.loginfo("have enter if")
                time=mod_inf[modID][1][0]#可取同一模组，但是同一时间如何取？？？
                #mod_inf[modID][1].pop(0)#
                #mod_inf[modID][2].pop(0)#
                Scores = []  # 存放轮廓系数
                #SSE = []  # 存放每次结果的误差平方和
                X = ([[mod_inf[modID][1][0]],[mod_inf[modID][1][1]],[mod_inf[modID][1][2]],[mod_inf[modID][1][3]],
                      [mod_inf[modID][2][0]],[mod_inf[modID][2][1]],[mod_inf[modID][2][2]],[mod_inf[modID][2][3]]])

                for k in range(2,7):#SSE(1,7)
                    estimator = KMeans(n_clusters=k)  # 构造聚类器
                    estimator.fit(X)
                    #print(estimator.labels_)
                    Scores.append(silhouette_score(X,estimator.labels_,metric='euclidean'))
                    #SSE.append(estimator.inertia_)  
                #print(Scores)
                max_list=max(Scores) #最佳K值对应的轮廓系数值
                #print("K=%d" %(Scores.index(max_list)+2))#最佳K值
                #A = range(2,7)
                #plt.xlabel('k')
                #plt.ylabel('silhouette_score')
                #plt.plot(A,Scores,'o-')
                #plt.show()
                K=Scores.index(max_list)+2

                current_blockV=mod_inf[modID][1]+mod_inf[modID][2]
                #print(current_blockV)
         
                tukeyresult=turkeys(current_blockV)

                if K==2 or ((min(current_blockV)>tukeyresult[0]) and (max(current_blockV)<tukeyresult[1])):
                    health=1
                elif ((K>2)and(K<4)) or (min(current_blockV)>tukeyresult[0]) or (max(current_blockV)<tukeyresult[1]):
                    health=0
                elif ((K>=5) or (K<=6)) and ((current_blockV)<tukeyresult[0] or max(current_blockV)<tukeyresult[1]):
                    health=-1
                results=BlockResult()
                results.health=health
                results.modID=modID
                results.stamp=time
                rospy.loginfo(results)
                pub1.publish(results)
        rate.sleep()'''
                
if __name__ =='__main__' :
    try:
        block_detect()
    except rospy.ROSInterruptException:
        pass
