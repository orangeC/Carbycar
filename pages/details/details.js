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
    hiddenGetCar: true,
    hiddenCertificate: true,
    hiddenQuote: true,
    switchTabOne: true,
    switchTabTwo: true,
    switchTabThree: true,
    switchTabFour: true,
    switchTabFive: true,
    switchTabSix: true,
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
    Checker: [],
    Driver: [],
    CheckerPhone: "",
    DriverPhone: "",
    arrContractsImg: "",
    arrCheckoutsImg: "",
    arrInsurancesImg: "",
    arrDeliveriesImg: ""
  },
  onLoad: function (e) {
    console.log("onload");
    console.log(e)
    var that = this;
    //50425344
    app.send("/order/consign/", "GET", { code: 52611072 }, function (res) {
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
          var arrCheckouts = JSON.parse(CarryData.Checkouts);
          var arrContracts = JSON.parse(CarryData.Contracts);
          var arrDeliveries = JSON.parse(CarryData.Deliveries);
          var arrInsurances = JSON.parse(CarryData.Insurances);
          var arrContractsImg = "http://image.3vcar.com" + arrContracts[0].Url;
          var arrCheckoutsImg = "http://image.3vcar.com" + arrCheckouts[0].Url;
          var arrInsurancesImg = "http://image.3vcar.com" + arrInsurances[0].Url;
          var arrDeliveriesImg = "http://image.3vcar.com" + arrDeliveries[0].Url;

          that.setData({ CheckerPhone: arrChecker.Phone, DriverPhone: arrDriver.Phone, })
        }

        //时间转换(年月日 时间)
        var timeCreate = apply.CreateTime;
        var timeTraceInfo = apply.TraceInfo.CreateTime;
        var timeDepart = apply.DepartTime;
        timeCreate = moment.getFormat(timeCreate, "yyyy-MM-dd hh:mm");
        timeTraceInfo = moment.getFormat(timeTraceInfo, "yyyy-MM-dd hh:mm");
        timeDepart = moment.getFormat(timeDepart, "yyyy-MM-dd");
        //设置data值
        that.setData({
          OrderNo: apply.OrderNo, Status: apply.Status, CreateTime: timeCreate, Starting: apply.Starting, Ending: apply.Ending, Price: apply.Price, Cars: arrC, Title: apply.TraceInfo.Title, tipsTime: timeTraceInfo, DepartTime: timeDepart, ContactName: apply.ContactName, Info: arrI, Remark: apply.Remark, QuoteInfos: QuoteData, CarryInfo: CarryData, TakePlace: apply.TakePlace, QuoteInfo: arrQ, Checker: arrChecker, Driver: arrDriver, arrContractsImg: arrContractsImg, arrCheckoutsImg: arrCheckoutsImg, arrInsurancesImg: arrInsurancesImg, arrDeliveriesImg: arrDeliveriesImg, arrCheckouts: arrCheckouts,
          arrContracts: arrContracts, arrDeliveries: arrDeliveries, arrInsurances: arrInsurances
        })
      }
    })
  },
  onReady: function () {
    var that = this;
    console.log("onReady");
    console.log(this.data.CreateTime.length);
    console.log(this.data.arrCheckouts);
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
        that.setData({ Status: "付款中", hiddenQuote: false });
        break;
      case "Send":
        that.setData({ Status: "发货中", hiddenQuote: false });
        break;
      case "Delivery":
        that.setData({ Status: "送达", hiddenQuote: false });
        break;
      case "Receipt":
        that.setData({ Status: "收款", hiddenQuote: false });
        break;
      case "Finish":
        that.setData({ Status: "结束", hiddenQuote: false });
        break;
      case "Cancel":
        that.setData({ Status: "取消", hiddenQuote: false });
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
  bindTips: function () {
    wx.navigateTo({
      url: "/pages/status/status"
    })
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
  bindHiddenSix: function () {
    this.setData({
      hiddenCertificate: !this.data.hiddenCertificate,
      switchTabSix: !this.data.switchTabSix
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