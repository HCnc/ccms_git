/**
 * Created by 许东 on 2017/9/27.
 */

$(function () {

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
					0,0,0,0,0,0,0,0,0,0];
    var modDate5 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate6 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate7 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
    var modDate8 = [0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,0,0];
	var date = [0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0]
    var VoltChart = echarts.init(document.getElementById('oneModVoltPhoto'));//电压图
	/*
    for (var ii = 0; ii < 15; ii++) {
        modDate1.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });//先在其中放15个数据,占位
        modDate2.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });
        modDate3.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });
        modDate4.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });
        modDate5.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });
        modDate6.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });
        modDate7.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });
        modDate8.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });
        // voltData.push({
        //     name: new Date().toString(),
        //     value: [
        //         [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
        //         0
        //     ]
        // });//先在其中放15个数据,占位
        // odMuMinModVolt.push({
        //     name: new Date().toString(),
        //     value: [
        //         [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
        //         0
        //     ]
        // })
        // odMuHigherNbr.push({
        //     name: new Date().toString(),
        //     value: [
        //         [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
        //         0
        //     ]
        // })
    }
	*/

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
            data:['模块1','模块2','模块3','模块4','模块5','模块6','模块7','模块8'],
            itemWidth:10,//图例的宽度
            itemHeight:10,//图例的高度
            textStyle:{//图例文字的样式
                fontSize:16,
                color:['#00FF00','#FF0000','#00FFFF']
            }
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
                            color:'#ff0011'
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
                            color:'#ff0022'
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
                            color:'#ff0033'
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
                            color:'#ff0044'
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
                            color:'#ff0055'
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
                            color:'#ff0066'
                        }
                    }
                },
            }
            ]
    };
    VoltChart.setOption(voltOption);

    //init switchbox
    $('[name="status1"]').bootstrapSwitch({
                    onText:"",
                    offText:"",
                    onColor:"success",
                    offColor:"default",
                    size:"mini",
                    radioAllOff:false,
                    onInit:function(event,state){
                        if(state==true){
                            console.log("true");
                        }else{
                            console.log("false");
                        }
                    }
                });
    $('[name="status2"]').bootstrapSwitch({
                    onText:"",
                    offText:"",
                    onColor:"success",
                    offColor:"default",
                    size:"mini",
                    onInit:function(event,state){
                        if(state==true){
                            console.log("true");
                        }else{
                            console.log("false");
                        }
                    }
                });
    $('[name="status3"]').bootstrapSwitch({
                    onText:"",
                    offText:"",
                    onColor:"success",
                    offColor:"default",
                    size:"mini",
                    onInit:function(event,state){
                        if(state==true){
                            console.log("true");
                        }else{
                            console.log("false");
                        }
                    }
                });
    $('[name="status4"]').bootstrapSwitch({
                    onText:"",
                    offText:"",
                    onColor:"success",
                    offColor:"default",
                    size:"mini",
                    onInit:function(event,state){
                        if(state==true){
                            console.log("true");
                        }else{
                            console.log("false");
                        }
                    }
                });
    $('[name="status5"]').bootstrapSwitch({
                    onText:"",
                    offText:"",
                    onColor:"success",
                    offColor:"default",
                    size:"mini",
                    onInit:function(event,state){
                        if(state==true){
                            console.log("true");
                        }else{
                            console.log("false");
                        }
                    }
                });
    $('[name="status6"]').bootstrapSwitch({
                    onText:"",
                    offText:"",
                    onColor:"success",
                    offColor:"default",
                    size:"mini",
                    onInit:function(event,state){
                        if(state==true){
                            console.log("true");
                        }else{
                            console.log("false");
                        }
                    }
                });
    $('[name="status7"]').bootstrapSwitch({
                    onText:"",
                    offText:"",
                    onColor:"success",
                    offColor:"default",
                    size:"mini",
                    onInit:function(event,state){
                        if(state==true){
                            console.log("true");
                        }else{
                            console.log("false");
                        }
                    }
                });

    change = function(bit1){
        
        for (var i = 1; i <= bit1.length; i++) {
            //Things[i]
            if (bit1[i-1] == 1){
                $('input[name="status'+i+'"]').bootstrapSwitch('state',true,true);
                console.log("in"+i);
            }else{
                $('input[name="status'+i+'"]').bootstrapSwitch('state',false,false);
            }
        }
    }
        
    sub1 = function(){
        bit1 = [1,1,1,1,1,0,1];
        change(bit1);
    }

    sub2 = function(){
        bit1 = [1,1,1,1,1,0,1];
        change(bit1);
    }

})
