// pages/publish/brand/brand.js
var app = getApp();
Page({
  data: {
    brand:'',
    brands: [],
    category: '',
    // 搜索相关
    searchLetter: [],
    isShowLetter: false,
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    scrollTop: 0
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    wx.request({
      url: 'http://open.3vcar.com/system/brand',
      data: {

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        that.setData({
            brand:res.data
        })
      }
    });
    console.log(this.data.brand)
    var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
    // 获取系统信息
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    //添加要匹配的字母范围值
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    };
    var groups = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var group = {
        initial: searchLetter[i],
        brands: []
      };

      for (var j = 0; j < this.data.brand.length; j++) {
        var brand = this.data.brand[j];
        if (group.initial == brand.initial) {
          brand.json = JSON.stringify(brand);
          group.brands.push(brand);
        }
      }
    groups.push(group);
    this.setData({
      category: options.category,
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      brands: groups
    })
    }
  },

  searchStart: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this, showLetter);
    this.nowLetter(pageY, this);
    this.setData({
      showLetter: showLetter,
      startPageY: pageY,
      isShowLetter: true,
    })
  },

  searchMove: function (e) {
    var pageY = e.touches[0].pageY;
    var startPageY = this.data.startPageY;
    var tHeight = this.data.tHeight;
    var bHeight = this.data.bHeight;
    var showLetter = 0;
    console.log(pageY);
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) {
        this.nowLetter(pageY, this);
      }
    }
  },
  searchEnd: function (e) {
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  nowLetter: function (pageY, that) {
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that, showLetter);

    that.setData({
      bHeight: bHeight,
      tHeight: tHeight,
      showLetter: showLetter,
      startPageY: pageY
    })
  },

bindScroll: function (e) {
    console.log(e.detail)
  },
  setScrollTop: function (that, showLetter) {
    var scrollTop = 0;
    var brands = that.data.brands;
    var brandCount = 0;
    var initialCount = 0;
    for (var i = 0; i < brands.length; i++) {
      if (showLetter == brands[i].initial) {
        scrollTop = initialCount * 30 + brandCount * 41;
        break;
      } else {
        initialCount++;
        brandCount += brands[i].brands.length;
      }
    }

    that.setData({
      scrollTop: scrollTop
    })
  },
  bindCity: function (e) {
    var brand = JSON.parse(e.target.dataset.json);
    app.globalData[this.data.category].Name = brand.name;
    app.globalData[this.data.category].Code = brand.code;
    wx.navigateBack();
  }

})