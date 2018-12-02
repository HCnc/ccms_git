/**
 * Created by 许东 on 2017/9/27.
 */

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

		backgroundColor:'#000000',

        tooltip: {
            trigger: 'axis'
        },

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
                name: 'Volt',
                axisLine:{
                    lineStyle:{
                        show:true,
                        color:colors[0],
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
                name: 'Ampere/Temperature',
                axisLine: {
                    lineStyle: {
                        color: colors[0],
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
            },
            
            {
                name: '电流',
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
            },

            {
                name: '温度',
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
            }
        ]
                  
    };
    VoltChart.setOption(voltOption);

})
