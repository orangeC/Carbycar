// pages/mine/mine.js
Page({
  data:{
      token:'',
      userName:'未登录'
  },
  onLoad:function(){
    //   var that = this;
    //   try {
    //       var value = wx.getStorageSync('id_token');
    //       var name = wx.getStorageSync('userName');
    //       if(value != ''){
    //             that.setData({
    //                 token:value,
    //                 userName:name
    //             });
    //       }
    //   } catch (e) {
    //   }
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
  onUnload:function(){
    // 页面关闭
  },

  goLogin:function(){
      var that = this;
      if(that.data.token){
            
      }else{
            wx.navigateTo({
                url: '../login/login',
            })
      }
  },

  publish:function(){
    wx.navigateTo({
          url: '../publish/publish',
      })
  },

  myAllOfOrder:function(){
      var that = this;
      if(that.data.token){
            wx.navigateTo({
                url: '../myalloforder/myalloforder',
            })
      }else{
            wx.navigateTo({
                url: '../login/login',
            })
      }
  },

  logOut:function(){
        try {
            wx.clearStorageSync();
        } catch(e) {

        }
        wx.navigateTo({
            url: '../login/login',
        })
        
  },

  statusList:function(e){
        var that = this;
        var id = e.currentTarget.id;
        if(that.data.token){
            wx.navigateTo({
                url: '../statuslist/statuslist?id=' + id,
            })
        }else{
            wx.navigateTo({
                url: '../login/login',
            })
        }
  },

  mineEditPassword:function(){
        var that = this;
        wx.navigateTo({
          url: '../mineeditpassword/mineeditpassword',
        })
  }
  
})