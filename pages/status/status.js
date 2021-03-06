// pages/status/status.js
var moment = require('../../utils/moment.js');
var app = getApp();
Page({
  data: {
    Status: []
  },
  onLoad: function (options) {
    var oCode = options.code
    var that = this;
    //50425344
    app.send("/consign/order/trace/", "GET", { code: oCode },"", function (res) {
      if (res.data) {
        var apply = res.data;
        //时间转换(年月日 时间)
        for (var i = 0; i < apply.length; i++) {
          var timeCreate = apply[i].CreateTime;
          var newfromTime = moment.getFormat(timeCreate, "yyyy-MM-dd hh:mm");
          apply[i].newTime = newfromTime;
        }
        that.setData({
          Status: res.data
        })
      } else {
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 2000
        })

        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})