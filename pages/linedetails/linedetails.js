// pages/details/details.js
var moment = require('../../utils/moment.js');
var cityList = require('../../utils/citys.js');
var app = getApp();
Page({
  data: {
    ConsignorCode: "",
    OrderNo: "",
    Status: "",
    whichType: true,
    CreateTime: "",
    Starting: "",
    Ending: "",
    Price: 0,
    Title: "",
    tipsTime: "",
    Cars: [],
    hiddenCarDetail: false,
    hiddenConsignInfo: false,
    hiddenPricing: false,
    hiddenPricingControl: false,//为了控制当前报价模块在某些订单状态下是否可见
    hiddenAcceptInfo: false,
    hiddenGetCar: false,
    hiddenCertificate: false,
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
    arrInfo: [],
    // 图片预览模式
    previewModeOne: false,
    previewModeTwo: false,
    previewModeThree: false,
    previewModeFour: false,
    Code: ""
  },
  onLoad: function (e) {
    var eCode = e.Code;
    var that = this;
    var me = e.me
    var token = wx.getStorageSync('id_token')
    app.send("/consignor/profile/", "GET", {}, token, function (res) {
      that.setData({
        Code: res.data.Code
      })
    });
    app.send("/line/order/detail", "GET", { code: eCode }, token, function (res) {
      console.log(res)
      if (res) {
        var apply = res.data;
        //解析车辆信息
        var arr = apply.CarInfo;
        var arrC = arr;
        console.log(arrC)
        var QuoteData = apply.QuoteInfos;
        var CarryData = apply.ConsignInfo;
        console.log(CarryData)

        if (QuoteData) {
          //时间转换(处理接收到的数据多少小时前)
          for (var i = 0; i < QuoteData.length; i++) {
            var fromTime = QuoteData[i].QuoteTime;
            QuoteData[i].ExpiredTime = moment.getFromnow(fromTime);
            //为整数字符串在末尾添加.00
            if (!/\./.test(QuoteData[i].CarrierScore)) {
              QuoteData[i].CarrierScore += '.0';
            }
          }
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
          ConsignorCode: apply.ConsignorCode,
          OrderNo: apply.OrderNo,
          Status: apply.Status,
          Type: apply.Type,
          CreateTime: timeCreate,
          Starting: apply.Starting,
          Ending: apply.Ending,
          Price: apply.Price,
          Cars: arrC,
          CarPick: apply.CarPick,
          Title: apply.TraceInfo.Title,
          tipsTime: timeTraceInfo,
          DepartTime: timeDepart,
          ContactName: apply.ContactName,
          ContactPhone: apply.ContactPhone,
          TakeAddress: apply.TakeAddress,
          TakeDistrict: apply.TakeDistrict,
          Remark: apply.Remark,
          QuoteInfos: QuoteData,
          CarryInfo: CarryData,
          TakePlace: apply.TakePlace,
          eCode: eCode,
          CarryData: CarryData
        })
      }
    })
  },
  onReady: function () {
    var that = this;
    wx.showToast({
      title: '玩命加载中',
      icon: 'loading',
      duration: 10000,
      success: function (res) {
        //设置状态
        var thatStatus = {
          "Publish": "发布中",
          "Quote": "报价中",
          "Refuse": "拒绝",
          "Confirm": "确认中",
          "Pay": "付款中",
          "Send": "发货中",
          "Delivery": "送达",
          "Receive": "收货",
          "Receipt": "收款",
          "Finish": "结束",
          "Cancel": "取消",
          "Refund": "退款"
        };
        that.setData({
          Status: thatStatus[that.data.Status]
        })
        //设置隐藏状态
        if (that.data.Status == "确认中" || that.data.Status == "付款中" || that.data.Status == "发货中" || that.data.Status == "送达" || that.data.Status == "收货" || that.data.Status == "收款") {
          that.setData({
            hiddenQuote: false,
          });
        }
        if (that.data.Status == "发布中" || that.data.Status == "报价中" || that.data.Status == "拒绝" || that.data.Status == "结束" || that.data.Status == "取消" || that.data.Status == "退款") {
          that.setData({
            hiddenQuote: true,
            hiddenAcceptInfo: true,
            hiddenGetCar: true,
            hiddenCertificate: true,
          });
        }
        if (that.data.Status == "确认中" || that.data.Status == "付款中" || that.data.Status == "发货中" || that.data.Status == "送达" || that.data.Status == "收货" || that.data.Status == "收款" || that.data.Status == "结束" || that.data.Status == "取消" || that.data.Status == "退款") {
          that.setData({
            hiddenPricingControl: true
          });
        }
        //设置type
        var typeControl = {
          "Pricing": true,
          "Bidding": false
        }
        that.setData({
          whichType: typeControl[that.data.Type]
        })

        var start = that.data.Starting;
        var end = that.data.Ending;
        //更改城市地址
        var getStart = cityList.getCity(start);
        var getEnd = cityList.getCity(end);
        that.setData({
          Starting: getStart,
          Ending: getEnd
        })

        if (that.data.CarryData) {
          var CarryData = that.data.CarryData;

          //先判断Checker与Driver
          if (CarryData.Checker && CarryData.Driver) {
            var arrChecker = JSON.parse(CarryData.Checker);
            var arrDriver = JSON.parse(CarryData.Driver);
            that.setData({
              Checker: arrChecker,
              Driver: arrDriver
            })
          } else {
            that.setData({
              Checker: CarryData.Checker,
              Driver: CarryData.Driver
            })
          }
          //初始化一个新数组将物流凭证信息Push
          var arrCate = [];
          arrCate.push(CarryData.Checkouts, CarryData.Contracts, CarryData.Deliveries, CarryData.Insurances);
          //测试换 "https://image.carbycar.com.cn"
          //       http://open.3vcar.com
          var imgHTTP = "http://image.3vcar.com";
          //分别插入4个图片（很没有效率）
          if (arrCate[0] != "" && JSON.parse(arrCate[0])[0].Url) {
            var imgSrcOne = imgHTTP + JSON.parse(arrCate[0])[0].Url;
            var arrSrcOne = [];
            for (var i = 0; i < JSON.parse(arrCate[0]).length; i++) {
              arrSrcOne.push(imgHTTP + JSON.parse(arrCate[0])[i].Url)
            }
            that.setData({
              imgOneLength: JSON.parse(arrCate[0]).length,
              arrSrcOne: arrSrcOne
            })
          } else {
            var imgSrcOne = "";
            that.setData({
              imgOneLength: 0
            })
          };
          if (arrCate[1] != "" && JSON.parse(arrCate[1])[0].Url) {
            var imgSrcTwo = imgHTTP + JSON.parse(arrCate[1])[0].Url;
            var arrSrcTwo = [];
            for (var i = 0; i < JSON.parse(arrCate[1]).length; i++) {
              arrSrcTwo.push(imgHTTP + JSON.parse(arrCate[1])[i].Url)
            }
            that.setData({
              imgTwoLength: JSON.parse(arrCate[1]).length,
              arrSrcTwo: arrSrcTwo
            })
          } else {
            var imgSrcTwo = "";
            that.setData({
              imgTwoLength: 0
            })
          };
          console.log()
          if (arrCate[2] != "" && JSON.parse(arrCate[2])[0].Url) {
            var imgSrcThree = imgHTTP + JSON.parse(arrCate[2])[0].Url;
            var arrSrcThree = [];
            for (var i = 0; i < JSON.parse(arrCate[2]).length; i++) {
              arrSrcThree.push(imgHTTP + JSON.parse(arrCate[2])[i].Url)
            }
            that.setData({
              imgThreeLength: JSON.parse(arrCate[2]).length,
              arrSrcThree: arrSrcThree
            })
          } else {
            var imgSrcThree = "";
            that.setData({
              imgThreeLength: 0
            })
          };
          if (arrCate[3] != "" && JSON.parse(arrCate[3])[0].Url) {
            var imgSrcFour = imgHTTP + JSON.parse(arrCate[3])[0].Url;
            var arrSrcFour = [];
            for (var i = 0; i < JSON.parse(arrCate[3]).length; i++) {
              arrSrcFour.push(imgHTTP + JSON.parse(arrCate[3])[i].Url)
            }
            that.setData({
              imgFourLength: JSON.parse(arrCate[3]).length,
              arrSrcFour: arrSrcFour
            })
          } else {
            var imgSrcFour = "";
            that.setData({
              imgFourLength: 0
            })
          };
          that.setData({
            imgSrcOne: imgSrcOne,
            imgSrcTwo: imgSrcTwo,
            imgSrcThree: imgSrcThree,
            imgSrcFour: imgSrcFour
          })
        }

      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '打开失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
  },
  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindTips: function () {
    wx.navigateTo({
      url: "/pages/linestatus/linestatus?code=" + this.data.eCode
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
      phoneNumber: that.data.Checker.Phone
    })
  },
  bindCallDriver: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.Driver.Phone
    })
  },
  // 进入预览模式
  enterPreviewModeOne(event) {
    if (this.data.imgOneLength != 0) {
      this.setData({ previewModeOne: true, });
    } else {
      return;
    }
  },
  enterPreviewModeTwo(event) {
    if (this.data.imgTwoLength != 0) {
      this.setData({
        previewModeTwo: true,
      });
    } else {
      return;
    }

  },
  enterPreviewModeThree(event) {
    if (this.data.imgThreeLength != 0) {
      this.setData({
        previewModeThree: true,
      });
    } else {
      return;
    }

  },
  enterPreviewModeFour(event) {
    if (this.data.imgFourLength) {
      this.setData({
        previewModeFour: true,
      });
    } else {
      return;
    }

  },

  // 退出预览模式
  leavePreviewMode() {
    this.setData({
      previewModeOne: false,
      previewModeTwo: false,
      previewModeThree: false,
      previewModeFour: false,
    });
  }
})