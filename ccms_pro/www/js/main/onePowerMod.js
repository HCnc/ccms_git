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

    var modNum = [1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23,24,25,26,27,28,29,30,
                  31,32,33,34,35,36,37,38,39,40,
                  41,42,43];

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
            name: '℃',
            max: 120,
            min: 0,
            axisLine: {
                lineStyle: {
                    color: '#FF0000'
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
            name: '伏特/安',
            max: 64000,
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

})
