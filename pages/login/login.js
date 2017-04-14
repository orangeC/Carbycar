// pages/login/login.js
var app = getApp() 
Page({
  data:{
    userName:'',  
    userPassword:'',  
    id_token:'',//方便存在本地的locakStorage  
  },
  
  onLoad:function(){
      
  },
//获取输入的用户名
  userNameInput:function(e){  
    this.setData({  
      userName: e.detail.value  
    })  
  },
//获取输入的密码
  userPasswordInput:function(e){  
    this.setData({  
      userPassword: e.detail.value  
    })    
  },
//登录方法
  logIn:function(){  
    var that = this
    var version = wx.getStorageSync('version');
    app.send(
        '/system/login',
        'GET',
        {
            username: this.data.userName,  
            password: this.data.userPassword,
            version: "WMP1.2.0"
        },
        '',
        function(res){
            var success = res.data.Success;
            var type = res.data.Type;
            if(success && type == "Consignor"){
                that.setData({  
                    id_token: res.data.Token,  
                });                
                wx.setStorageSync('id_token', res.data.Token);
                app.globalData.token = res.data.Token;             
                app.send("/consignor/profile/", "GET", {}, res.data.Token, function (res) {
                    wx.setStorageSync('code', res.data.Code);
                    wx.setStorageSync('name', res.data.Name);
                    wx.setStorageSync('phone', res.data.Phone);
                    app.globalData.name = res.data.Name; 
                });
                wx.switchTab({
                    url: '../index/index',
                });
            }else{
                wx.showToast({
                    title: res.data.Message,  
                    icon : 'loading',  
                    duration : 1000
                })
            }            
        },
        function(res){
            wx.showToast({  
                title: '网络有问题',  
                icon : 'loading',  
                duration : 1000  
            })
        }

    )
  },
//跳转到注册页
  register:function(){
        wx.navigateTo({
          url: '../register/register',
        })
  },
//跳转到忘记密码页 
  forgetPassword:function(){
        wx.navigateTo({
          url: '../forgetpassword/forgetpassword',
        })
  }
})