// pages/mine/mine.js
Page({
  data:{
      token:'',
      userName:'未登录'
  },
  onLoad:function(){

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
            }else{
                that.setData({
                    token:'',
                    userName:'未登录'
                })
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
 
            }else{
                that.setData({
                    token:'',
                    userName:'未登录'
                })
            }

        } catch (e) {

        }
  },
//去登录页面
  goLogin:function(){
      var that = this;
      if(that.data.token){
            
      }else{
            wx.navigateTo({
                url: '../login/login',
            })
      }
  },
//去发布页面
  publish:function(){
    wx.navigateTo({
          url: '../publish/publish',
      })
  },
//我的订单
  myOrder:function(){
      var that = this;
      if(that.data.token){
            wx.navigateTo({
                url: '../myorder/myorder',
            })
      }else{
            wx.navigateTo({
                url: '../login/login',
            })
      }
  },
//退出登陆
  logOut:function(){
        try {
            wx.removeStorageSync('id_token','userName')
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
//修改密码
  editPassword:function(){
        var that = this;
        wx.navigateTo({
          url: '../editpassword/editpassword',
        })
  }
  
})