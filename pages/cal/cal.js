//获取应用实例
var rpn = require("../../utils/rpn.js");
var app = getApp()
Page({
  data:{
    idb:"back",
    idc:"clear",
    idt:"toggle",
    idadd:"+",
    id9:"9",
    id8:"8",
    id7:"7",
    idj:"-",
    id6:"6",
    id5:"5",
    id4:"4",
    idx:"*",
    id3:"3",
    id2:"2",
    id1:"1",
    iddiv:"/",
    id0:"0",
    idd:".",
    ide:"=",
    screenData:"0",
    operaSymbo:{"+":"+","-":"-","*":"*","÷":"/",".":"."},
    lastIsOperaSymbo:false,
    iconType:'waiting_circle',
    iconColor:'white',
    logs:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clickBtn:function(event){
      //获取触发点击事件的标签的id
    var id=event.target.id
    if(id==this.data.idb){//退格←
        var data=this.data.screenData;
        if(data==0){
            return ;
        }
        data=data.substring(0,data.length-1);
        //屏幕上不会显示东西了
        if(data==""||data=="-"){//只剩下一个负号？不合理对吧
            data=0;
        }
        this.setData({
            'screenData':data
        });
    }else if(id==this.data.idc){//清屏
        this.setData({
            'screenData':'0'
        });
    }else if(id==this.data.idt){//加正负号，这里没有在界面上用,这一段可以不用看的
        var data=this.data.screenData;
        //0不考虑正负号
        if(data=="0"){
            return ;
        }
        var firstWord=data.charAt(0);
        if(data=="-"){//第一个字母是负号，给他变成正
            data=data.substr(1);
        }else{
            data="-"+data;
            ///如果你真的看到了这里，真的没必要看这个else if，因为这个就是给第一个数取正负号的问题，这里又没有括号选择，贼鸡肋，所以界面上也就不放这个功能了。
        }
        this.setData({
            'screenData':data
        });
    }else if(id==this.data.ide){//等于=
        var data=this.data.screenData;
        if(data=="0"){
            return ;
        }
        //eval是js中window的一个方法，而微信页面的脚本逻辑在是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能再脚本中使用window，也无法在脚本中操作组件                 
      //var result = eval(newData);

      //eval方法不能应，只能我们自己来写了
      //不过我们可以调用rpn.js这个库，他已经为我们做好了
      
      //判断最后一位如果是操作符，则不运算
      //isNaN() 函数用于检查其参数是否是非数字值。 isNaN(123)返回false isNaN(wqwq)返回true
      var lastWord = data.charAt(data.length-1);
      if(isNaN(lastWord)){
          return ;
      }
      var log=this.data.screenData;
      //获取rpn库运算结果
      console.log(log);
      var calData=rpn.calCommonExp(log);
      this.data.logs.push(log+"="+calData);
      var allLogs = wx.getStorageSync('callogs') || [];
      allLogs.push(log+"="+calData);
      wx.setStorageSync('callogs',allLogs);
      this.setData({
          'screenData':calData+""
      });
      
    }else{//运算符和数字的问题  还有点
        if(this.data.operaSymbo[id]){ //如果是符号+-*/
            if(this.data.lastIsOperaSymbo){
                //如果是最后一位是符号，就不能在收入符号
                return;
        }
      }
      var sd=this.data.screenData;
      var data;
      //这个if else逻辑很简单
      if(sd==0){
          data=id;
      }else{
          data=sd+id;
      }
      this.setData({
          'screenData':data
      });

      ///置一下最后一位是否为运算符的标志位
      if(this.data.operaSymbo[id]){
        this.setData({"lastIsOperaSymbo":true});
      }else{
        this.setData({"lastIsOperaSymbo":false});
      }
    }
  },
  history:function(){
      wx.navigateTo({
        url: '../history/history'
    })
  }
})