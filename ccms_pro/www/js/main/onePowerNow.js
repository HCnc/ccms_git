<<<<<<< HEAD
=======
/**
 * Created by 许东 on 2017/9/27.
 */
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39

$(function () {
    // var myData = new Date().getTime(); 
    // var times = myData/100;//当前时间的毫秒数
    // console.log(new Date().toString());
    // console.log(times.toString());

    var voltData = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0]        //电压数据
    var currentData = [0,0,0,0,0,0,0,0,0,0,
						0,0,0,0,0,0,0,0,0,0]   //电流数据
    var tempData = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0]     //温度数据

    var date = [0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0]

<<<<<<< HEAD
    var VoltChart1 = echarts.init(document.getElementById('oneVPhoto'));//电压图
    
	
    deal1 = function(data){
        console.log("...onePowerNow is working...");
        dealMsg1(data);
    }

    dealMsg1 = function(evt) {
        var d = new Date();
=======
    var VoltChart = echarts.init(document.getElementById('oneVPhoto'));//电压图
    // tian chong shu ju
    // for (var ii = 0; ii < 15; ii++) {
    //     voltData.push({
    //         name: ((new Date().getTime())/100).toString(),//new Date().toString(),
    //         value: [
    //             [0, 0, 0].join('/')+" "+
    //             [0,0,0].join(':'),
    //             1
    //         ]
    //     });//先在其中放15个数据,占位
    //     currentData.push({
    //         name: new Date().toString(),
    //         value: [
    //             [0, 0, 0].join('/')+" "+
    //             [0,0,0].join(':'),
    //             1
    //         ]
    //     })
    //     tempData.push({
    //         name: new Date().toString(),
    //         value: [
    //             [0, 0, 0].join('/')+" "+
    //             [0,0,0].join(':'),
    //             1
    //         ]
    //     })
    // }



    deal = function(data){
        console.log("...onePowerNow is working...");
        //console.log(data6);
        dealMsg(data);
    }

    dealMsg = function(evt) {
        var d = new Date()      //TTTTTTTTTTTTTTTTTTT
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
        var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

        var dto = [d.getHours(), minute, second].join(':');
        //var milliseconds = d.getMilliseconds() < 10 ? '0' + d.getMilliseconds() : d.getMilliseconds();
        // console.log("接收到消息" + evt.data)
        // var str = evt.data
        var msgJson = evt//JSON.parse(str)

        console.log("...msgJson...");
        console.log(msgJson);

        date.shift();
        date.push(dto);

        voltData.shift();
<<<<<<< HEAD
        voltData.push(msgJson.Energy_Storage_Voltage);
        currentData.shift();
        currentData.push(msgJson.Energy_Storage_Current);
        tempData.shift();
        tempData.push(msgJson.Energy_Storage_Temperature);
		
            voltOption1.series[0].data = voltData
        
            voltOption1.series[1].data = currentData
        
            voltOption1.series[2].data = tempData

            VoltChart1.setOption(voltOption1);

    }

    var colors = ['#FF0000', '#00FF00', '#00FFFF'];

    voltOption1 = {
=======
        voltData.push(msgJson.Energy_storage_voltage);
        currentData.shift();
        currentData.push(msgJson.Energy_storage_current);
        tempData.shift();
        tempData.push(msgJson.Energy_Storage_Temperature);


        // if (true/*msgJson.RealTime_PowerState_PowerID1*/){

        //     voltData.shift();
        //     console.log("dataSSS是************" + voltData[3].value.toString())

        //     //var dto = [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':');
        //     voltData.push({
        //         name: "test_name",//new Date().toString(),//msgJson.RealTime_PowerState_PowerID1.time.toString(),
        //         value: [
        //             [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + 
        //             [d.getHours(), minute, second].join(':'),
        //             // timeBoxopop[2], timeBoxopop[0], timeBoxopop[1]].join('/')+" "+[timeBox[1]],
        //             //msgJson.RealTime_PowerState_PowerID1.CMSVolt
        //             msgJson.Module_Voltage
        //         ]
        //     });
            voltOption.series[0].data = voltData

        //     currentData.shift()
        //     currentData.push({
        //         name: "secend_name",//msgJson.RealTime_PowerState_PowerID1.time.toString(),
        //         value: [
        //             [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + 
        //             [d.getHours(), minute, second].join(':'),
        //             // timeBoxopop[2], timeBoxopop[0], timeBoxopop[1]].join('/')+" "+[timeBox[1]],
        //             //msgJson.RealTime_PowerState_PowerID1.CMSCur
        //             msgJson.Module_Capacitance_Temperature
        //         ]
        //     })
            voltOption.series[1].data = currentData

        //     tempData.shift()
        //     tempData.push({
        //         name: "third_name",//msgJson.RealTime_PowerState_PowerID1.time.toString(),
        //         value: [
        //             [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + 
        //             [d.getHours(), minute, second].join(':'),
        //             // timeBoxopop[2], timeBoxopop[0], timeBoxopop[1]].join('/')+" "+[timeBox[1]],
        //             //msgJson.RealTime_PowerState_PowerID1.CMSTemp
        //             msgJson.Module_Board_Temperature
        //         ]
        //     })
            voltOption.series[2].data = tempData

            VoltChart.setOption(voltOption);
        // }
    }

    var colors = ['#00FF00', '#FF0000', '#00FFFF'];

    voltOption = {
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39

		backgroundColor:'#000000',

        tooltip: {
            trigger: 'axis'
        },

<<<<<<< HEAD
       
        legend: {
            data:[ {name: '电压',
                 textStyle:{color:"#FF0000"}
                   },
                  {name:'电流',
                  textStyle:{color:"#00FF00"}
                  },
              {name:'温度',
                  textStyle:{color:"#00FFFF"}
                  }
              ],
        },
       
=======
        // legend: {
        //     data:['电压','电流','温度'],
        //     //data:['电压'],
        //     // itemWidth:10,//图例的宽度
        //     // itemHeight:10,//图例的高度
        //      textStyle:{//图例文字的样式
        //          fontSize:16,
        //          //color:['#00FF00','#FF0000','#00FFFF'],
        //          color:colors,
        //      }
        // },

        legend: {
            data:[ {name: '电压',
                 textStyle:{color:"yellow"}
                   },
                  {name:'电流',
                  textStyle:{color:"yellow"}
                  },
              {name:'温度',
                  textStyle:{color:"yellow"}
                  }
              ],
        },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        // },
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            axisLine: {
                lineStyle:{
                    color:'#00FF00',
                }
            },

        },

        yAxis: [
            {
                type: 'value',
                boundaryGap: [0, '100%'],
<<<<<<< HEAD
                name: '电压/V',
                axisLine:{
                    lineStyle:{
                        show:true,
                        color:"#00FF00",
=======
                name: 'Volt',
                axisLine:{
                    lineStyle:{
                        show:true,
                        color:colors[0],
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
                        width:1,//这里是为了突出显示加上的
                    }
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: 'value',
                //scale: true,
<<<<<<< HEAD
                name: '电流/A，温度/℃',
                axisLine: {
                    lineStyle: {
                        color:"#00FF00",
=======
                name: 'Ampere/Temperature',
                axisLine: {
                    lineStyle: {
                        color: colors[0],
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: [0, '100%'],
            }
        ],

        series: [
            {
                name: '电压',
                type: 'line',
<<<<<<< HEAD
                
                data: voltData,
                itemStyle:{normal:{color:'#FF0000'}},             
=======
                //showSymbol: false,
                //hoverAnimation: false,
                data: voltData,
                itemStyle:{normal:{color:'red'}},
                //smooth:true,
                // itemStyle : {
                //     normal : {
                //         lineStyle:{
                //             color:colors[0]
                //         }
                //     }
                // },
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
            },
            
            {
                name: '电流',
<<<<<<< HEAD
                type: 'line',              
                data: currentData,
                itemStyle:{normal:{color:'00FF00'}},             
                yAxisIndex: 1,             
=======
                type: 'line',
                //showSymbol: false,
                //hoverAnimation: false,
                data: currentData,
                itemStyle:{normal:{color:'green'}},
                //smooth:true,
                yAxisIndex: 1,
                // itemStyle : {
                //     normal : {
                //         lineStyle:{
                //             color:colors[1]
                //         }
                //     }
                // },
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
            },

            {
                name: '温度',
<<<<<<< HEAD
                type: 'line',              
                data: tempData,
                itemStyle:{normal:{color:'#00FFFF'}},               
                yAxisIndex: 1,              
=======
                type: 'line',
                //showSymbol: false,
                //hoverAnimation: false,
                data: tempData,
                itemStyle:{normal:{color:'blue'}},
                //smooth:true,
                yAxisIndex: 1,
                // itemStyle : {
                //     normal : {
                //         lineStyle:{
                //             color:colors[2]
                //         }
                //     }
                // },
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
            }
        ]
                  
    };
<<<<<<< HEAD
    VoltChart1.setOption(voltOption1);

/*模组总体状况数据*/
    var voltData = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0]        //电压数据
    var odMuMinModVolt = [0,0,0,0,0,0,0,0,0,0,
						  0,0,0,0,0,0,0,0,0,0]   //最低模组电压
    var odMuHigherNbr = [0,0,0,0,0,0,0,0,0,0,
						 0,0,0,0,0,0,0,0,0,0]     //高于阈值电压的个数
	var date2 = [0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0]
    var VoltChart = echarts.init(document.getElementById('oneModVoltPhoto'));//电压图
	
    deal2 = function(data){
        console.log("...onePowerModNow is working...");
        dealMsg2(data);
    }

    dealMsg2 = function(evt){

        var d=new Date();
        var minute=d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
        var second=d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();

		var dto = [d.getHours(), minute, second].join(':');

        var msgJson = evt;//JSON.parse(str)
		console.log("msgJson data5 " + msgJson.Moduel_Average_Voltage)
        
		date2.shift();
        date2.push(dto);

            voltData.shift();
            //console.log("dataSSS是************" + voltData[3].value.toString())
            voltData.push(msgJson.Moduel_Average_Voltage);
            voltOption.series[0].data = voltData

            odMuMinModVolt.shift()
            odMuMinModVolt.push(msgJson.Minimum_Module_Voltage)
            voltOption.series[1].data = odMuMinModVolt

            odMuHigherNbr.shift()
            odMuHigherNbr.push(msgJson.Module_Voltage_Threshold)
            voltOption.series[2].data = odMuHigherNbr
            VoltChart.setOption(voltOption)
    }



    voltOption = {
        backgroundColor:'#000000',
        tooltip: {
            trigger: 'axis'
        },
		legend: {
            data:[ {name: '平均电压',
                 textStyle:{color:"#FF0000"}
                   },
                  {name:'最低电压',
                  textStyle:{color:"#00FF00"}
                  },
              {name:'最大电压',
                  textStyle:{color:"#00FFFF"}
                  }
              ],
        },
        xAxis: {
            type: 'category',
			boundaryGap: false,
			data: date2,
            axisLabel:{
                rotate:-30
            },
            axisLine:{
                lineStyle:{
                    show:true,
                    color:'#00FF00',
                    width:1,//这里是为了突出显示加上的
                }
            },

            //interval: 1000*2

        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine:{
                lineStyle:{
                    show:true,
                    color:'#00FF00',
                    width:1,//这里是为了突出显示加上的
                }
            },
            splitLine: {
                    show: false
                }
        },
        series: [{
            name: '平均电压',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: voltData,
            smooth:true,
            itemStyle : {
                normal : {
                    lineStyle:{
                        color:'#FF0000'
                    }
                }
            },
        },
            {
                name: '最低电压',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: odMuMinModVolt,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#00FF00'
                        }
                    }
                },
            },
            {
                name: '最大电压',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: odMuHigherNbr,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#00FFFF'
                        }
                    }
                },
            }
            ]
    };
    VoltChart.setOption(voltOption);
})

=======
    VoltChart.setOption(voltOption);

})
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
