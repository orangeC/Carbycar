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

    this.send("/order/consign/", "GET", {}, "", function (res) {
      console.log(res)
    });
    //调用API从本地缓存中获取数据
    var routes = wx.getStorageSync('route') || [];
    this.globalData.searchs = routes;

    var user = wx.getStorageSync('user') || { Code: '', Expires: 0 };
    this.globalData.user = user;
    //调用API将版本信息存入本地缓存
    try {
        wx.setStorageSync('version', 'WMP1.0.3');
    } catch (e) {    
    }
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
        if (arrInfo[j].code == start || arrInfo[j].provincecode == start) {
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
  search: function () {
    if (this.globalData.starting.Code == 0 && this.globalData.ending.Code == 0) return;

    var data = {
      Name: this.globalData.starting.Name + '-' + this.globalData.ending.Name,
      No: this.globalData.starting.Code.toString() + this.globalData.ending.Code.toString()
    };

    if (!has) this.globalData.searchs.unshift(data);
    if (this.globalData.searchs.length > 5) this.globalData.searchs.pop();

    wx.setStorageSync('route', this.globalData.searchs);
  },
  user: function () {
    wx.setStorageSync('user', this.globalData.user);
  },
  
  cars:function(){
    var i = this.globalData.id;
  },

  globalData: {
    userInfo: null,
    city: {},
    starting: { Name: '始发', Code: 0 },
    ending: { Name: '终点', Code: 0 },
    user: { Code: '', Expires: 0 },
    consignCar:[],
    id:{},
    // brand:'',
    // style:'',
    // valuation:'',
    // amount:'',
    // newCar:'',
    // canDrive:'',
    // needInsurance:''
    userName:''

  }
})