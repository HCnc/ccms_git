/**
 * Created by 许东 on 2017/9/27.
 */

$(function () {
    var voltData = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0]        //电压数据
    var odMuMinModVolt = [0,0,0,0,0,0,0,0,0,0,
						  0,0,0,0,0,0,0,0,0,0]   //最低模组电压
    var odMuHigherNbr = [0,0,0,0,0,0,0,0,0,0,
						 0,0,0,0,0,0,0,0,0,0]     //高于阈值电压的个数
	var date = [0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0]
    var VoltChart = echarts.init(document.getElementById('oneModVoltPhoto'));//电压图
	/*
    for (var ii = 0; ii < 15; ii++) {
        voltData.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });//先在其中放15个数据,占位
        odMuMinModVolt.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        })
        odMuHigherNbr.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        })
    }
	*/
    deal = function(data){
        console.log("...onePowerModNow is working...");
        //console.log(data6);
        dealMsg(data);
		//console.log("data5: " + data.Moduel_Average_Voltage);
    }

    dealMsg = function(evt){

        var d=new Date()
        var minute=d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
        var second=d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();

		var dto = [d.getHours(), minute, second].join(':');
        //console.log("接收到消息"+evt.data)
        //var str = evt.data
        var msgJson = evt;//JSON.parse(str)
		console.log("msgJson data5 " + msgJson.Moduel_Average_Voltage)
        
		date.shift();
        date.push(dto);

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
            data:['平均电压','最低电压','最大电压'],
            itemWidth:10,//图例的宽度
            itemHeight:10,//图例的高度
            textStyle:{//图例文字的样式
                fontSize:16,
                color:['#00FF00','#FF0000','#00FFFF']
            }
        },
        xAxis: {
            type: 'category',
			boundaryGap: false,
			data: date,
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
                        color:'#00FF00'
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
                            color:'#38b0de'
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
                            color:'#ff0000'
                        }
                    }
                },
            }
            ]
    };
    VoltChart.setOption(voltOption);

})
