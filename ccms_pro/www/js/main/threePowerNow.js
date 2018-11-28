/**
 * Created by 许东 on 2017/9/27.
 */

$(function () {
    var dataSS = []
    var myChart = echarts.init(document.getElementById('threeVPhoto'));//电压id

    for (var ii = 0; ii < 15; ii++) {
        dataSS.push({
            name: new Date().toString(),
            value: [
                [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                0
            ]
        });//先在其中放15个数据,占位
    }


    var socket = new WebSocket("ws://192.168.30.105:88")


    socket.onopen = function(){
        console.log('连接成功')
        socket.send("RTMonitor")
    }
    socket.onclose = function(){
        console.log('连接关闭')
    }

    socket.onmessage = function(evt){
        console.log("接收到消息")
        dealMsg(evt)

    }
    socket.onerr = function(){
        console.log('连接发生错误')
    }



    dealMsg = function(evt){
        var str = evt.data
        var msgJson = JSON.parse(str)
        var timeStr = msgJson.data.time
        var timeBox = []
        timeBox = timeStr.split(" ")
        // var minute=msgJson.data.time.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
        // var second=msgJson.data.time.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
        dataSS.shift();
        dataSS.push({
            name:msgJson.data.time.toString(),
            value: [
                [timeBox[2], timeBox[0], timeBox[1]].join('/')+" "+[timeBox[3]],
                msgJson.data.odAuCMSVolt
            ]
        });
        myChart.setOption({
            series: [{
                data: dataSS
            }]
        });
    }


console.log(dataSS[12])
    option = {
		backgroundColor:'rgb(204,204,204)',
        tooltip: {
            trigger: 'axis'
            // formatter: function (params) {
            //     params = params[0];
            //     var date = new Date(params.name);
            //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            // },
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: true    //是否显示坐标轴轴线
            },
            interval: 1000*2

        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: true
            }
        },
        series: [{
            name: '电压',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: dataSS,
            smooth:true
        }]
    };
    myChart.setOption(option);

})