
$(function () {
/*模组总体状况数据*/
    var voltData = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];        //电压数据
    var odMuMinModVolt = [0,0,0,0,0,0,0,0,0,0,
						  0,0,0,0,0,0,0,0,0,0];   //最低模组电压
    var odMuHigherNbr = [0,0,0,0,0,0,0,0,0,0,
						 0,0,0,0,0,0,0,0,0,0];     //高于阈值电压的个数
	var date2 = [0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0];
    var VoltChart = echarts.init(document.getElementById('oneModVoltPhoto'));//电压图
	
    deal2 = function(data){
        console.log("...onePowerModNowTwo is working...");
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

