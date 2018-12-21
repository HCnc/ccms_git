
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

    var VoltChart1 = echarts.init(document.getElementById('oneVPhoto'));//电压图
    
	
    deal1 = function(data){
        console.log("...onePowerNow is working...");
        dealMsg1(data);
    }

    dealMsg1 = function(evt) {
        var d = new Date();
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

		backgroundColor:'#000000',

        tooltip: {
            trigger: 'axis'
        },

       
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
                name: '电压/V',
                axisLine:{
                    lineStyle:{
                        show:true,
                        color:"#00FF00",
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
                name: '电流/A，温度/℃',
                axisLine: {
                    lineStyle: {
                        color:"#00FF00",
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
                
                data: voltData,
                itemStyle:{normal:{color:'#FF0000'}},             
            },
            
            {
                name: '电流',
                type: 'line',              
                data: currentData,
                itemStyle:{normal:{color:'00FF00'}},             
                yAxisIndex: 1,             
            },

            {
                name: '温度',
                type: 'line',              
                data: tempData,
                itemStyle:{normal:{color:'#00FFFF'}},               
                yAxisIndex: 1,              
            }
        ]
                  
    };
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

