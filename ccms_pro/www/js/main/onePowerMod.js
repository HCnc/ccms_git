<<<<<<< HEAD


$(function () {
=======
/**
 * Created by 许东 on 2017/9/27.

 */

$(function () {
    var voltData = [0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0];        //电压数据

    var tempData = [0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0];     //温度数据

>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
    var modNum = [1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23,24,25,26,27,28,29,30,
                  31,32,33,34,35,36,37,38,39,40,
                  41,42,43];
<<<<<<< HEAD
	var tempData = [0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,11,0,0,
				20,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,
				0,0];
	var voltData = [0,0,0,0,0,18,0,0,0,0,0,0,25,0,0,0,0,0,0,0,
				17,0,0,0,80,0,0,0,0,0,80,0,0,0,0,0,0,0,35,0,0,
				0,0];
    var avg_volt = 0;
    var avg_temp = 0;

    var VoltChart1 = echarts.init(document.getElementById('oneVPhoto'));//电压图
	
	deal1 = function(data){
        console.log("...onePowerNow is working...");
        //console.log(data6);
        dealMsg1(data);
    }

    deal5 = function(data){
        dealMsg_avg(data);
    }

    dealMsg1 = function(data){
        id = data.id;
        tempData[id-1] = data.Module_Capacitance_Temperature;
        voltData[id-1] = data.Module_Voltage/1000;
        voltOption.series[0].data = voltData;
        voltOption.series[1].data = tempData;
	   VoltChart1.setOption(voltOption1);
    }

    dealMsg_avg = function(data){
        avg_volt = data.Moduel_Average_Voltage;
        VoltChart1.setOption(voltOption1);
    }
			

voltOption1 = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
            data:[ {name: '电压',
                 textStyle:{color:"#FF0000"}
                   },
                  
              {name:'温度',
                  textStyle:{color:"#00FF00"}
                  }
              ],
        },
	
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
=======

    var VoltChart = echarts.init(document.getElementById('oneVPhoto'));//电压图
	
	deal = function(data){
        console.log("...onePowerNow is working...");
        //console.log(data6);
        dealMsg(data);
    }

    dealMsg = function(data){
        id = data.id;
        tempData[id] = data.Module_Capacitance_Temperature;
        voltData[id] = data.Module_Voltage;
        voltOption.series[0].data = voltData;
        voltOption.series[1].data = tempData;
	VoltChart.setOption(voltOption);
    }

    voltOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:[{name:'温度',
                textStyle:{color:"yellow"}
            },
            {name:'电压',
            textStyle:{color:"yellow"}
        }]
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            //restore: {},
            saveAsImage: {}
        }
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
    },
    xAxis: 
        {
            type: 'category',
            axisLine: {
                lineStyle:{
                    color:'#00FF00',
                }
            },
            axisTick: {
                alignWithLabel: true
            },
            boundaryGap: true,
            data: modNum
        },
<<<<<<< HEAD
=======
        
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
    yAxis: [
        {
            type: 'value',
            scale: true,
<<<<<<< HEAD
            name: '温度/℃',
=======
            name: '℃',
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
            max: 120,
            min: 0,
            axisLine: {
                lineStyle: {
<<<<<<< HEAD
                    color: '#00FF00'
=======
                    color: '#FF0000'
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
                }
            },
            splitLine: {
                    show: false
                },
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
<<<<<<< HEAD
            name: '电压/V',
            max: 24,
=======
            name: '伏特/安',
            max: 64000,
>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
            min: 0,
            axisLine: {
                lineStyle: {
                    color: '#00FF00'
                }
            },
            splitLine: {
                    show: false
                },
            boundaryGap: [0.2, 0.2]
        }
    ],
<<<<<<< HEAD
    series : [
        
        {
            name:'电压',
            type:'bar',
            stack: '数值',
            itemStyle:{normal:{color:'#FF0000'}},
			data:voltData,
			markLine : {
                data : [ {
					trigger: 'axis',
        			name: '电压平均值',
        			yAxis: avg_volt
    				}
                ]}
            /*markLine : {
                data : [{
                    
					type:"average",
					name: '电压平均值'},
					{yAxis:22}
                ]
            }*/
        },
        {
            name:'温度',
            type:'bar',
            stack: '数值',
            itemStyle:{normal:{color:'#00FF00'}},
			data:tempData,
			markLine : {
                data : [ {
					trigger: 'axis',
        			name: '温度平均值',
        			yAxis: avg_temp
    				}
                ]
            }
        },
              
        
    ]
};
;
    VoltChart1.setOption(voltOption1);

/*一号储能电源模块数据*/
$('#select-button').on("click",function (){
        var item = $('#input-item').val();
        console.log("item: " + item);
    });

    var modDate1 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate2 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate3 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate4 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0.5,0,0,0];
    var modDate5 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate6 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate7 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate8 = [0,0,0,0,0,0.8,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
	var date = [0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0]
    var VoltChart = echarts.init(document.getElementById('oneModVoltPhoto'));//电压图
	

    deal2 = function(data){
        console.log("...onePowerModNow is working...");
        //console.log(data6);
        dealMsg2(data);
    }
	deal3 = function(data){
        console.log("...onePowerModNow is working...");
        //console.log(data6);
        dealMsg3(data);
    }
	deal4 = function(data){
        console.log("...onePowerModNow is working...");
        //console.log(data6);
        dealMsg4(data);
    }

    dealMsg2 = function(evt){

        var d=new Date()      
        var minute=d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
        var second=d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();

		var dto = [d.getHours(), minute, second].join(':');
        //console.log("接收到消息"+evt.data)
        //var str = evt.data
        var msgJson = evt;//JSON.parse(str)
        if (true) {
			
			date.shift();
        	date.push(dto);

            modDate1.shift();
            modDate1.push(msgJson[0]);
            voltOption.series[0].data = modDate1;

            modDate2.shift();
            modDate2.push(msgJson[1]);
            voltOption.series[1].data = modDate2;

            modDate3.shift();
            modDate3.push(msgJson[2]);
            voltOption.series[2].data = modDate3;

            modDate4.shift();
            modDate4.push(msgJson[3]);
            voltOption.series[3].data = modDate4;

            VoltChart.setOption(voltOption)
        }
    }
	
	dealMsg3 = function(evt){
		var d=new Date()      
        var minute=d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
        var second=d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();

		var dto = [d.getHours(), minute, second].join(':');
		
		date.shift();
        date.push(dto);

		modDate5.shift();
        modDate5.push(evt[0]);
        voltOption.series[4].data = modDate5;

        modDate6.shift();

        modDate6.push(evt[1]);
        voltOption.series[5].data = modDate6;

        modDate7.shift();
        modDate7.push(evt[2]);
        voltOption.series[6].data = modDate7;

        modDate8.shift();
        modDate8.push(evt[3]);
        voltOption.series[7].data = modDate8;	
		
		VoltChart.setOption(voltOption)
	}
	
	dealMsg4 = function(evt){
		change(evt)
	}



    voltOption = {
        //backgroundColor:'#000000',
        tooltip: {
            trigger: 'axis'
        },
		legend: {
            data:[ {name:'模块1',
                  textStyle:{color:"#00FF00"}
                   },
                  {name:'模块2',
                  textStyle:{color:"#38b0de"}
                  },
                  {name:'模块3',
                  textStyle:{color:"#FF0000"}
                  },
				  {name:'模块4',
                  textStyle:{color:"#FFFF00"}
                   },
                  {name:'模块5',
                  textStyle:{color:"#F4A460"}
                  },
                  {name:'模块6',
                  textStyle:{color:"#FF00FF"}
                  },
				  {name: '模块7',
                  textStyle:{color:"#E6E6FA"}
                   },
                  {name:'模块8',
                  textStyle:{color:"#7FFFAA"}
                  },
                  
              ],
        },
        xAxis: {
            type: 'category',
			data: date,
			boundaryGap: false,
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
            name: '模块1',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: modDate1,
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
                name: '模块2',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate2,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#38b0de'
                        }
                    }
                },
            },
            {
                name: '模块3',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate3,
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
                name: '模块4',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate4,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#FFFF00'
                        }
                    }
                },
            },
            {
                name: '模块5',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate5,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#F4A460'
                        }
                    }
                },
            },
            {
                name: '模块6',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate6,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#FF00FF'
                        }
                    }
                },
            },
            {
                name: '模块7',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate7,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'	#E6E6FA'
                        }
                    }
                },
            },
            {
                name: '模块8',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate8,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#7FFFAA'
                        }
                    }
                },
            }
            ]
    };
    VoltChart.setOption(voltOption);
=======
    series: [
        {
            name:'电压',
            type:'bar',
            yAxisIndex: 1,
            itemStyle : {
                normal : {
                    color:'#00FF00'
                }
            },
            data:voltData
        },
        {
            name:'温度',
            type:'line',
            //yAxisIndex: 1,
            itemStyle : {
                normal : {
                    lineStyle:{
                        color:'#FF0000'
                    }
                }
            },
            data:tempData
        }
    ]
    };
    VoltChart.setOption(voltOption);

>>>>>>> 27c573caa411224057a532fe854a3352e1be0c39
})
