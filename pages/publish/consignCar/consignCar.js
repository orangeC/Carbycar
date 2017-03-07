// pages/publish/consignCar/consignCar.js
var app = getApp();
Page({
  data: {
    warning: true,
    brand: '请选择品牌',
    style: '',
    valuation: '',
    valuationN: 1,
    amount: 1,
    amountN: 1,
    newCar: true,
    canDrive: true,
    needInsurance: false,
    consignCar: [],
    submit: false,
    options: null
  },
  onLoad: function (options) {
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

    this.setData({
      brand: app.globalData.title
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //获取输入价格和品牌
  brand: function () {
    wx.navigateTo({
      url: '../brand/brand',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  valuation: function (e) {
    if (e.detail.value.length > 3) {
      this.setData({
        warning: false
      })
    } else {
      this.setData({
        warning: true
      })
    };
    this.setData({
      valuation: parseInt(e.detail.value),
      valuationN: e.detail.value
    });
  },
  //获取汽车数量
  amount: function (e) {
    this.setData({
      amount: parseInt(e.detail.value),
      amountN: e.detail.value
    });
  },
  //获取汽车状态
  newCar: function (e) {
    this.setData({
      newCar: e.detail.value
    });
  },
  canDrive: function (e) {
    this.setData({
      canDrive: e.detail.value
    });
  },
  //是否需要保险
  needInsurance: function (e) {
    this.setData({
      needInsurance: true
    });
  },
  noNeedInsurance: function (e) {
    this.setData({
      needInsurance: false
    });
  },
  //保存车辆信息
  save: function () {
    var that = this;
    var apply = that.data;
    if (apply.brand == '请选择品牌') {
      wx.showToast({
        title: '请选择品牌',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (apply.valuationN.length == 0 || apply.valuation == 0) {
      wx.showToast({
        title: '请估值',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (apply.amountN.length == 0 || apply.amount == 0) {
      wx.showToast({
        title: '请填写数量',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    this.setData({
      consignCar: [
        {
          Brand: apply.brand,
          Style: app.globalData.style,
          Valuation: apply.valuation,
          Amount: apply.amount,
          NewCar: apply.newCar,
          CanDrive: apply.canDrive,
          NeedInsurance: apply.needInsurance
        }
      ]
    });
    wx.setStorageSync('consignCar', this.data.consignCar)
    wx.navigateBack({
      delta: 1
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      setCategory: true
    })
  }
})