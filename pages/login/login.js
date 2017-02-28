// pages/login/login.js
var app = getApp() 
Page({
  data:{
    userName:'',  
    userPassword:'',  
    id_token:'',//方便存在本地的locakStorage  
    response:'' //存取返回数据

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
    wx.request({  
        url: 'http://open.3vcar.com/system/login',  
        data: {  
            username: this.data.userName,  
            password: this.data.userPassword,
            version:'WMP1.0.3'  
        }, 
        header: { 
            'content-type': 'application/json'
        }, 
        method: 'GET',  
        success: function (res) {
            var success = res.data.Success;
            if(success){
                that.setData({  
                    id_token: res.data.Token,  
                    response:res  
                })  
                try {  
                    wx.setStorageSync('id_token', res.data.Token)
                    wx.setStorageSync('userName', res.data.Name)  
                } catch (e) {  
                }  
                wx.switchTab({
                    url: '../me/me',
                })
            }else{
                wx.showToast({
                    title: '登陆失败请重新登录',  
                    icon : 'loading',  
                    duration : 1000
                })
            }            
            console.log(res.data);  
        },  
        fail: function (res) {
            wx.showToast({  
                title: '网络有问题',  
                icon : 'loading',  
                duration : 1000  
            })  
        }  
    })  
  },

  
})