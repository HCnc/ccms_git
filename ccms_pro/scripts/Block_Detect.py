#!/usr/bin/env python
# -*- coding: utf-8 -*-
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from ccms_pro.msg import BlockResult
#import ProcessData2
import rospy
#import matplotlib.pyplot as plt
#import numpy as np

def turkeys(inlist):#输入list，输出list最大、最小阈值。可用于异常检测
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
    #rospy.loginfo('enter block_detect()!!!!!!!')
    while not rospy.is_shutdown():
        mod_inf=rospy.get_param("/mod_inf")
        #rospy.loginfo(mod_inf)   
        for modID in range(1,len(mod_inf)-1):
            #Kmeans
            if ((len(mod_inf[modID][2])+len(mod_inf[modID][3]))==8):#当mod表中八个模块都有值的时候，开始模块检测
                #time=mod_inf[modID][1][0]
                #mod_inf[modID][1].pop(0)
                #mod_inf[modID][2].pop(0)
                Scores = []  # 存放轮廓系数
                #SSE = []  # 存放每次结果的误差平方和
                X = ([[mod_inf[modID][2][0]],[mod_inf[modID][2][1]],[mod_inf[modID][2][2]],[mod_inf[modID][2][3]],
                      [mod_inf[modID][3][0]],[mod_inf[modID][3][1]],[mod_inf[modID][3][2]],[mod_inf[modID][3][3]]])
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

            #Turkey's
                current_blockV=mod_inf[modID][2]+mod_inf[modID][3]
                #print(current_blockV)
                tukeyresult=turkeys(current_blockV)

            #Threshold and Judge
                blen=len(current_blockV)
                blhealths=[-99,-99,-99,-99,-99,-99,-99,-99]
                for x in range(0,blen):
                    if K==2 or ((current_blockV[x]>tukeyresult[0]) and (current_blockV[x]<tukeyresult[1])):
                        blhealths[x]=1#健康
                    elif ((K>2)and(K<=4)) or (current_blockV[x]<tukeyresult[0]) or (current_blockV[x]>tukeyresult[1]):
                        blhealths[x]=0#亚健康
                    elif ((K>=5) or (K<=6)) and (current_blockV[x]<tukeyresult[0] or current_blockV[x]<tukeyresult[1]):
                        blhealths[x]=-1#不健康

            #Output BlockReault
                blockresults = BlockResult()
                blockresults.modID = modID
                blockresults.blockhealths = blhealths 
                blockresults.stamp = rospy.get_rostime()
                pub1.publish(blockresults)
            #store healthparam
                mod_inf[modID][0]=blhealths
                rospy.set_param("/mod_inf", mod_inf)
                #rospy.loginfo(blockresults)
        rate.sleep()
                
if __name__ =='__main__' :
    try:
        block_detect()
    except rospy.ROSInterruptException:
        pass
