// pages/details/details.js
var moment = require('../../utils/moment.js');
var app = getApp();
Page({
  data: {
    OrderNo: "",
    Status: "",
    CreateTime: "",
    Starting: "",
    Ending: "",
    Price: 0,
    Title: "",
    tipsTime: "",
    Cars: [],
    hiddenCarDetail: true,
    hiddenConsignInfo: true,
    hiddenPricing: true,
    hiddenAcceptInfo: true,
    hiddenGetCar:true,
    switchTabOne: true,
    switchTabTwo: true,
    switchTabThree: true,
    switchTabFour: true,
    switchTabFive: true,
    DepartTime: "",
    ContactName: "",
    Info: {
      TakeAddress: ""
    },
    Remark: "",
    QuoteInfos: [],
    CarryInfo: {},
    QuoteInfo: [],
    TakePlace: "",
    Checker:[],
    Driver:[],
    CheckerPhone:"",
    DriverPhone:""
  },
  onLoad: function () {
    console.log("onload");
    var that = this;
    //50425344
    app.send("/order/consign/", "GET", { code: 50425344 }, function (res) {
      if (res) {
        console.log(res.data);
        var apply = res.data;
        //解析车辆信息
        var arr = apply.Cars;
        var arrC = JSON.parse(arr);
        var arrI = JSON.parse(apply.Info);
        var QuoteData = apply.QuoteInfos;
        var CarryData = apply.CarryInfo;

        if (QuoteData) {
          //时间转换(处理接收到的数据多少小时前)
          for (var i = 0; i < QuoteData.length; i++) {
            var fromTime = QuoteData[i].QuoteTime;
            var newfromTime = moment.getFromnow(fromTime);
            QuoteData[i].ExpiredTime = newfromTime;
          }
        }
        if (CarryData) {
          //String转json
          var arrQ = JSON.parse(CarryData.QuoteInfo);
          var arrChecker = JSON.parse(CarryData.Checker);
          var arrDriver = JSON.parse(CarryData.Driver);
          console.log(arrDriver)
        }

        //时间转换(年月日 时间)
        var timeCreate = apply.CreateTime;
        var timeTraceInfo = apply.TraceInfo.CreateTime;
        var timeDepart = apply.DepartTime;
        timeCreate = moment.getFormat(timeCreate, "yyyy-MM-dd hh:mm");
        timeTraceInfo = moment.getFormat(timeTraceInfo, "yyyy-MM-dd hh:mm");
        timeDepart = moment.getFormat(timeDepart, "yyyy-MM-dd");
        //设置data值
        that.setData({ OrderNo: apply.OrderNo, Status: apply.Status, CreateTime: timeCreate, Starting: apply.Starting, Ending: apply.Ending, Price: apply.Price,  Cars: arrC, Title: apply.TraceInfo.Title, tipsTime: timeTraceInfo, DepartTime: timeDepart, ContactName: apply.ContactName, Info: arrI, Remark: apply.Remark, QuoteInfos: QuoteData, CarryInfo: CarryData, TakePlace: apply.TakePlace, QuoteInfo: arrQ, Checker: arrChecker,Driver: arrDriver, CheckerPhone: arrChecker.Phone, DriverPhone: arrDriver.Phone })
      }
    })
  },
  onReady: function () {
    var that = this;
    console.log("onReady");
    console.log(this.data.CreateTime.length);
    console.log(this.data.CarryInfo);
    //设置状态
    var thatStatus = this.data.Status;
    switch (thatStatus) {
      case "Publish":
        that.setData({ Status: "发布中" });
        break;
      case "Quote":
        that.setData({ Status: "报价中" });
        break;
      case "Refuse":
        that.setData({ Status: "拒绝" });
        break;
      case "Confirm":
        that.setData({ Status: "确认中" });
        break;
      case "Pay":
        that.setData({ Status: "付款中" });
        break;
      case "Send":
        that.setData({ Status: "发货中" });
        break;
      case "Delivery":
        that.setData({ Status: "送达" });
        break;
      case "Receipt":
        that.setData({ Status: "收款" });
        break;
      case "Finish":
        that.setData({ Status: "结束" });
        break;
      case "Cancel":
        that.setData({ Status: "取消" });
        break;
    }
    var start = this.data.Starting;
    var end = this.data.Ending;
    //更改城市地址
    var getStart = app.getWhereyougo(start);
    var getEnd = app.getWhereyougo(end);
    this.setData({
      Starting: getStart,
      Ending: getEnd
    })
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
  bindHiddenOne: function () {
    this.setData({
      hiddenCarDetail: !this.data.hiddenCarDetail,
      switchTabOne: !this.data.switchTabOne
    })
  },
  bindHiddenTwo: function () {
    this.setData({
      hiddenConsignInfo: !this.data.hiddenConsignInfo,
      switchTabTwo: !this.data.switchTabTwo
    })
  },
  bindHiddenThree: function () {
    this.setData({
      hiddenPricing: !this.data.hiddenPricing,
      switchTabThree: !this.data.switchTabThree
    })
  },
  bindHiddenFour: function () {
    this.setData({
      hiddenAcceptInfo: !this.data.hiddenAcceptInfo,
      switchTabFour: !this.data.switchTabFour
    })
  },
  bindHiddenFive: function () {
    this.setData({
      hiddenGetCar: !this.data.hiddenGetCar,
      switchTabFive: !this.data.switchTabFive
    })
  },
  bindCallsb: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.CheckerPhone
    })
  },
  bindCallDriver: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.DriverPhone
    })
  }
})