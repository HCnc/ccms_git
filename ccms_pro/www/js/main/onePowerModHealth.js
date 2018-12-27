/**
 * Created by 许东 on 2017/9/27.

 */

$(function () {
    var healthData = [-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,
                 -2,-2,-2,-2,-2,-2,-2,-2,-2,-2,
                 -2,-2,-2,-2,-2,-2,-2,-2,-2,-2,
                 -2,-2,-2,-2,-2,-2,-2,-2,-2,-2,
                 -2,-2,-2];

    // var voltData = [0,0,0,0,0,0,0,0,0,0,
    //              0,0,0,0,0,0,0,0,0,0,
    //              0,0,0,0,0,0,0,0,0,0,
    //              0,0,0,0,0,0,0,0,0,0,
    //              0,0,0];        //电压数据

    // var tempData = [0,0,0,0,0,0,0,0,0,0,
    //              0,0,0,0,0,0,0,0,0,0,
    //              0,0,0,0,0,0,0,0,0,0,
    //              0,0,0,0,0,0,0,0,0,0,
    //              0,0,0];     //温度数据

    var modNum = [1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23,24,25,26,27,28,29,30,
                  31,32,33,34,35,36,37,38,39,40,
                  41,42,43];

    var VoltChart = echarts.init(document.getElementById('oneVPhoto'));//电压图

    dealMsg = function(data){
        id = data.id;
        healthData[id-1] = data.healthdata;
        // tempData[id] = data;
        // voltData[id] = data;
        // voltOption.series[0].data = tempData;
        // voltOption.series[1].data = voltData;
        voltOption.series[0].data = healthData;
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
        data:[{name:'Health',
                textStyle:{color:"#00FF00"}},  /*健康*/
				/*{name:'Sub-Health',
                textStyle:{color:"#FFA500"}},  /*亚健康*/
				/*{name:'Fault',
                textStyle:{color:"#FF0000"}},*/  /*不健康*/
			]
    },
    toolbox: {
        show: true,
        feature: {
            // dataView: {readOnly: false},
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
            name: 'state',
            minInterval:1,
            show:false,
            // max: 60,
            // min: 0,
            axisLine: {
                lineStyle: {
                    color: '#00FF00'
                }
            },
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name:'Health',
            type:'bar',
            // yAxisIndex: 1,
            itemStyle : {
                normal : {
                    color:'#00FF00'
                }
            },
            data:healthData
        },
		/*{
            name:'Sub-Health',
            type:'bar',
            // yAxisIndex: 1,
            itemStyle : {
                normal : {
                    color:'#FFA500'
                }
            },
            data:sub-healthData
        },
		{
            name:'Fault',
            type:'bar',
            // yAxisIndex: 1,
            itemStyle : {
                normal : {
                    color:'#00FFFF'
                }
            },
            data:faultData
        }*/
    ]
    };
    VoltChart.setOption(voltOption);

})