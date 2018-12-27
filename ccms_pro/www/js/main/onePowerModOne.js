

$(function () {
    var modNum = [1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23,24,25,26,27,28,29,30,
                  31,32,33,34,35,36,37,38,39,40,
                  41,42,43];
	var tempData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0];
	var voltData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
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
        console.log("in dealMsg_avg");
        console.log("Moduel_Average_Voltage: " + data.Moduel_Average_Voltage);
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
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '温度/℃',
            max: 120,
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
        },
        {
            type: 'value',
            scale: true,
            name: '电压/V',
            max: 24,
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
}
    VoltChart1.setOption(voltOption1);
})
