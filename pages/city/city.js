// pages/city/city.js
// 城市列表
var util = require('../../utils/citys.js')
var app = getApp();

Page({
  data: {
    citys: [],
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
    var searchLetter = util.getCityInitials();
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
    }

    this.setData({
      category: options.category,
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      citys: util.getCityGroups()
    })
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
  },
  setScrollTop: function (that, showLetter) {
    var scrollTop = 0;
    var citys = that.data.citys;
    var cityCount = 0;
    var initialCount = 0;
    for (var i = 0; i < citys.length; i++) {
      if (showLetter == citys[i].initial) {
        scrollTop = initialCount * 30 + cityCount * 41;
        break;
      } else {
        initialCount++;
        cityCount += citys[i].citys.length;
      }
    }

    that.setData({
      scrollTop: scrollTop
    })
  },
  bindCity: function (e) {
    var city = JSON.parse(e.target.dataset.json);
    app.globalData[this.data.category].Name = city.name;
    app.globalData[this.data.category].Code = city.code;
    wx.navigateBack();
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      setCategory: false
    })
  }
})