var send = require('./utils/request.js');
var cityList = require('./utils/city.js');
//app.js
App({
  send: send.send,
  onLaunch: function () {
    var that = this;
    //请求city文件中城市信息
    this.getcityList();
    //调用API从本地缓存中获取数据city并存入内存
    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.globalData.city = res.data;
      }
    });
    this.send("/order/consign/", "GET", {}, function (res) {
      console.log(res)
    })
  },
  //请求city文件中城市信息
  getcityList: function () {
    var that = this;
    //初始化缓存city
    var city = wx.getStorageSync('city') || {};
    console.log("存入缓存");
    wx.setStorageSync('city', cityList.cityList());
  },
  //请求哪个城市(有点慢)
  getWhereyougo: function (start) {
    var arrCity = this.globalData.city;
    for (var i = 0; i < arrCity.length; i++) {
      var arrInfo = arrCity[i].cityInfo;
      for (var j = 0; j < arrInfo.length; j++) {
        if (arrInfo[j].code == start) {
          return arrInfo[j].city
        }
      }
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    city: {}
  }
})