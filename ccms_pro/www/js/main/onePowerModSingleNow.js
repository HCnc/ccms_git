/**
 * Created by 许东 on 2017/9/27.
 */

$(function () {
    // var voltData = []        //电压数据
    // var odMuMinModVolt = []   //最低模组电压
    // var odMuHigherNbr = []     //高于阈值电压的个数
    var modDate1 = [];
    var modDate2 = [];
    var modDate3 = [];
    var modDate4 = [];
    var modDate5 = [];
    var modDate6 = [];
    var modDate7 = [];
    var modDate8 = [];

    var VoltChart = echarts.init(document.getElementById('oneModVoltPhoto'));//电压图
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

    deal = function(data){
        console.log("...onePowerModNow is working...");
        console.log(data);
				change(data)
        //dealMsg(data);
    }

		deal2 = function(data){
        console.log("...onePowerModNow dealMsg1 is working...");
        console.log(data);
				//change(data)
        dealMsg1(data);
    }

		deal3 = function(data){
        console.log("...onePowerModNow dealMsg2 is working...");
        console.log(data);
				//change(data)
        dealMsg2(data);
    }

    dealMsg1 = function(evt){

        var d=new Date()      //TTTTTTTTTTTTTTTTTTT
        var minute=d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
        var second=d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();


        //console.log("接收到消息"+evt.data)
        //var str = evt.data
        var msgJson = evt;//JSON.parse(str)
        if (true/*msgJson.RealTime_AllModuleState_PowerID1*/) {

            modDate1.shift();
            modDate1.push({
                name: "modDate1",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[0]
                ]
            })
            voltOption.series[0].data = modDate1;

            modDate2.shift();
            modDate2.push({
                name: "modDate2",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[1]
                ]
            })
            voltOption.series[1].data = modDate2;

            modDate3.shift();
            modDate3.push({
                name: "modDate3",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[2]
                ]
            })
            voltOption.series[2].data = modDate3;

            modDate4.shift();
            modDate4.push({
                name: "modDate4",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[3]
                ]
            })
            voltOption.series[3].data = modDate4;

        }
    }


		dealMsg2 = function(evt){

        var d=new Date()      //TTTTTTTTTTTTTTTTTTT
        var minute=d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
        var second=d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();


        //console.log("接收到消息"+evt.data)
        //var str = evt.data
        var msgJson = evt;//JSON.parse(str)
        if (true/*msgJson.RealTime_AllModuleState_PowerID1*/) {

            
            modDate5.shift();
            modDate5.push({
                name: "modDate5",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[0]

                ]
            })
            voltOption.series[4].data = modDate5;

            modDate6.shift();
            modDate6.push({
                name: "modDate6",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[1]
                ]
            })
            voltOption.series[5].data = modDate6;

            modDate7.shift();
            modDate7.push({
                name: "modDate7",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[2]
                ]
            })
            voltOption.series[6].data = modDate7;

            modDate8.shift();
            modDate8.push({
                name: "modDate8",
                value: [
                    [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " + [d.getHours(), minute, second].join(':'),
                    msgJson[3]
                ]
            })
            voltOption.series[7].data = modDate8;

            VoltChart.setOption(voltOption)
        }
    }



    voltOption = {
        //backgroundColor:'#000000',
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['模组1','模组2','模组3','模组4','模组5','模组6','模组7','模组8'],
            itemWidth:10,//图例的宽度
            itemHeight:10,//图例的高度
            textStyle:{//图例文字的样式
                fontSize:16,
                color:['#00FF00','#FF0000','#00FFFF']
            }
        },
        xAxis: {
            type: 'time',
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

            interval: 1000*2

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
        },
        series: [{
            name: '模组1',
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
                name: '模组2',
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
                name: '模组3',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate3,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#ff0000'
                        }
                    }
                },
            },
            {
                name: '模组4',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate4,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#ff0000'
                        }
                    }
                },
            },
            {
                name: '模组5',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate5,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#ff0000'
                        }
                    }
                },
            },
            {
                name: '模组6',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate6,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#ff0000'
                        }
                    }
                },
            },
            {
                name: '模组7',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate7,
                smooth:true,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#ff0000'
                        }
                    }
                },
            },
            {
                name: '模组8',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: modDate8,
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

    //init switchbox
    $('[name="status1"]').bootstrapSwitch({
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
        //test = [1,1,1,1,1,0,1];
        
        for (var i = 1; i <= bit1.length; i++) {
            //Things[i]
            if (bit1[i-1] == 1){
                $('input[name="status'+i+'"]').bootstrapSwitch('state',true,true);
                console.log("in"+i);
            }else{
                $('input[name="status'+i+'"]').bootstrapSwitch('state',false,false);
            }
        }
        // if (bit1 == 1){
        //     $('input[name="status1"]').bootstrapSwitch('state',true,true);
        // }else{
        //     $('input[name="status1"]').bootstrapSwitch('state',false,false);
        // }
    }
        
    sub1 = function(){
        bit1 = [1,1,1,1,0,0,0];
        change(bit1);
    }

    sub2 = function(){
        bit1 = [0,0,0,0,1,1,1];
        change(bit1);
    }

})
