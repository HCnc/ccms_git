cmake_minimum_required(VERSION 2.8.3)
project(ccms_pro)

find_package(catkin REQUIRED COMPONENTS
  roscpp
  rospy
  std_msgs
  message_generation
  message_runtime
)

add_message_files(FILES UnpackingCanData1.msg UnpackingCanData2.msg UnpackingCanData3.msg UnpackingCanData4.msg UnpackingCanData5.msg UnpackingCanData6.msg HistoryMsg.msg BlockResult.msg)

add_service_files(FILES ModuleData.srv)

generate_messages(DEPENDENCIES std_msgs)

catkin_package(CATKIN_DEPENDS roscpp rospy std_msgs message_runtime)

include_directories(
  include ${catkin_INCLUDE_DIRS}"/usr/include/mysql")

include_directories(include ${catkin_INCLUDE_DIRS} ${catkin_INCLUDE_DIRS})

add_executable(topic_publisher src/topic_publisher.cpp)

add_dependencies(topic_publisher ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(topic_publisher ${catkin_LIBRARIES})


add_executable(topic_sub src/topic_sub.cpp)

add_dependencies(topic_sub ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(topic_sub ${catkin_LIBRARIES})


add_executable(topic_block1_publisher src/topic_block1_publisher.cpp)

add_dependencies(topic_block1_publisher ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(topic_block1_publisher ${catkin_LIBRARIES})


add_executable(topic_block2_publisher src/topic_block2_publisher.cpp)

add_dependencies(topic_block2_publisher ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(topic_block2_publisher ${catkin_LIBRARIES})


add_executable(topic_can4_publisher src/topic_can4_publisher.cpp)

add_dependencies(topic_can4_publisher ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(topic_can4_publisher ${catkin_LIBRARIES})


add_executable(topic_can5_publisher src/topic_can5_publisher.cpp)

add_dependencies(topic_can5_publisher ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(topic_can5_publisher ${catkin_LIBRARIES})


add_executable(topic_can6_publisher src/topic_can6_publisher.cpp)

add_dependencies(topic_can6_publisher ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(topic_can6_publisher ${catkin_LIBRARIES})


add_executable(sub_module_data src/sub_module_data.cpp)

add_dependencies(sub_module_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(sub_module_data ${catkin_LIBRARIES} -lmysqlclient)

add_executable(sub_block_data src/sub_block_data.cpp)

add_dependencies(sub_block_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(sub_block_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(sub_block2_data src/sub_block2_data.cpp)

add_dependencies(sub_block2_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(sub_block2_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(sub_can5_data src/sub_can5_data.cpp)

add_dependencies(sub_can5_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(sub_can5_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(sub_can6_data src/sub_can6_data.cpp)

add_dependencies(sub_can6_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(sub_can6_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(history_Power_data src/history_Power_data.cpp)

add_dependencies(history_Power_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(history_Power_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(history_module_data src/history_module_data.cpp)

add_dependencies(history_module_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(history_module_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(history_block_data src/history_block_data.cpp)

add_dependencies(history_block_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(history_block_data ${catkin_LIBRARIES} -lmysqlclient)


#add_executable(history_block2_data src/history_block2_data.cpp)

#add_dependencies(history_block2_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

#target_link_libraries(history_block2_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(history_average_data src/history_average_data.cpp)

add_dependencies(history_average_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

target_link_libraries(history_average_data ${catkin_LIBRARIES} -lmysqlclient)

add_executable(history_error_data src/history_error_data.cpp)
add_dependencies(history_error_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
target_link_libraries(history_error_data ${catkin_LIBRARIES} -lmysqlclient)


add_executable(testsub src/testsub.cpp)
add_dependencies(testsub ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
target_link_libraries(testsub ${catkin_LIBRARIES})

add_executable(testpub1 src/testpub1.cpp)
add_dependencies(testpub1 ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
target_link_libraries(testpub1 ${catkin_LIBRARIES} -lmysqlclient)

add_executable(testpub2 src/testpub2.cpp)
add_dependencies(testpub2 ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
target_link_libraries(testpub2 ${catkin_LIBRARIES})

add_executable(sub_error_data src/sub_error_data.cpp)
add_dependencies(sub_error_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
target_link_libraries(sub_error_data ${catkin_LIBRARIES} -lmysqlclient)

#add_executable(file_manage src/file_manage.cpp)
#add_dependencies(file_manage ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
#target_link_libraries(file_manage ${catkin_LIBRARIES} -lmysqlclient)

#add_executable(service_module_data src/service_module_data.cpp)

#add_dependencies(service_module_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

#target_link_libraries(service_module_data ${catkin_LIBRARIES} -lmysqlclient)

#add_executable(sub_can4_data src/sub_can4_data.cpp)
#add_dependencies(sub_can4_data ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
#target_link_libraries(sub_can4_data ${catkin_LIBRARIES} -lmysqlclient)
