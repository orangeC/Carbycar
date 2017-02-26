// pages/mine/mine.js
Page({
  data:{
      token:'',
      userName:'未登录'
  },
  onLoad:function(e){
      var that = this;
      try {
          var value = wx.getStorageSync('id_token');
          var name = wx.getStorageSync('userName');
          if(value != ''){
                that.setData({
                    token:value,
                    userName:name
                });
          }
      } catch (e) {
      }
  },
  onReady:function(){
      
  },
  onShow:function(){
        var that = this;
        try {
            var value = wx.getStorageSync('id_token');
            var name = wx.getStorageSync('userName');
            if(value != ''){
                    that.setData({
                        token:value,
                        userName:name
                    });
            }
        } catch (e) {
        }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  goLogin:function(){
      wx.navigateTo({
          url: '../login/login',
      })
  },

  publish:function(){
    wx.navigateTo({
          url: '../publish/publish',
      })
  },

  myAllOfOrder:function(){
      wx.navigateTo({
        url: '../myalloforder/myalloforder',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },

  logOut:function(){
        try {
            wx.clearStorageSync()
        } catch(e) {

        }

  }
})