// pages/details/details.js
var app = getApp();
Page({
  data: {
    OrderNo: "",
    CreateTime: "",
    Starting: "",
    Ending: "",
    Price: 0,
    Title: "",
    tipsTime: "",
    Cars: [],
    hiddenCarDetail:true,
    hiddenConsignInfo:true,
    switchTabOne:true,
    switchTabTwo:true,
    switchTabThree:true,
    DepartTime:"",
    ContactName:"",
    Info:{
      TakeAddress:""
    },
    Remark:"",
    QuoteInfos:[]
  },
  onLoad: function () {
    console.log("onload");
    var that = this;
    app.send("/order/consign/", "GET", { code: 49582080 }, function (res) {
      if(res){
        console.log(res.data);
        var apply = res.data;
        //解析车辆信息
        var arr = apply.Cars;
        var arrC = JSON.parse(arr);
        var arrI = JSON.parse(apply.Info);
        that.setData({ OrderNo: apply.OrderNo , CreateTime: apply.CreateTime, Starting: apply.Starting, Ending: apply.Ending, Price:apply.Price, Title:apply.TraceInfo.Title, tipsTime: apply.TraceInfo.CreateTime, DepartTime: apply.DepartTime, ContactName: apply.ContactName, Info:arrI, Remark:apply.Remark, QuoteInfos:apply.QuoteInfos, Cars:arrC})
      }
    })
  },
  onReady: function () {
    console.log("onReady");
    console.log(this.data.CreateTime.length);
    console.log(this.data.QuoteInfos.length);
  },
  onShow: function () {
    console.log("onshow");
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindHiddenOne:function(){
    this.setData({
      hiddenCarDetail:!this.data.hiddenCarDetail,
      switchTabOne:!this.data.switchTabOne
      })
  },
  bindHiddenTwo:function(){
    this.setData({
      hiddenConsignInfo:!this.data.hiddenConsignInfo,
      switchTabTwo:!this.data.switchTabTwo
      })
  }
})