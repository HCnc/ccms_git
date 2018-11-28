function WebsocketStore(){
     //测试动态图start
     dataSS = []
     //测试动态图end
     socketId  = null;
     powTotalHealthState  = []     //包括有几个电源，每个电源的状态
     powNumState = observable.map()         //某一个电源的电压电流温度等参数
     modToatalState = observable.map()       //模组的总体状况
     modToatalHealthState = observable.map()       //包括有多少个模组，每一个模组的健康状态
     modNumState = observable.map()             //某一个模组的电压电流，温度等参数
    socket:Object

     
        for (var i = 0; i < 15; i++) {
            this.dataSS.push(this._randomData());//先在其中放15个数据,占位
        }
    
     function randomData(){
         return {
             name: now.toString(),
             value: [
                 [0, 0, 0].join('/')+" "+[0,0,0].join(':'),
                 0
             ]
         }
    }
        // this._timerData()
        this.socket = new WebSocket("ws://192.168.1.102:88")

        this.socket.onopen =function(){
            console.warn('连接成功')
        }
        this.socket.onclose =function(){
            console.warn('连接关闭')
        }

        this.socket.onmessage =function(){
            console.warn("接收到消息")
            this._dealMsg(evt)

        }
        this.socket.onerr =function(){
            console.warn('连接发生错误')
        }


       function dealMsg(evt){

       var str = evt.data
       var msgJson = JSON.parse(str)
       var timeStr = msgJson.data.time
       var timeBox = []
       timeBox = timeStr.split(" ")
       // var minute=msgJson.data.time.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
       // var second=msgJson.data.time.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
       this.dataSS.shift();
       this.dataSS.push({
           name:msgJson.data.time.toString(),
           value: [
               [timeBox[2], timeBox[0], timeBox[1]].join('/')+" "+[timeBox[3]],
                   // .join(':'),
               msgJson.data.odAuCMSVolt
           ]
       });
    }

    
}