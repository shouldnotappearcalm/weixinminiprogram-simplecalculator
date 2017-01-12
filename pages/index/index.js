//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '简易计算器',
    userInfo: {},
    defaultSize:'default',
    disabled:false,
    iconType:'info_cycle'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  //到计算器界面
  toCalc:function(){
    wx.navigateTo({
      url: '../cal/cal'
    })
  }
})