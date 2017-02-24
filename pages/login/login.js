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

  userNameInput:function(e){  
    this.setData({  
      userName: e.detail.value  
    })  
  },

  userPasswordInput:function(e){  
    this.setData({  
      userPassword: e.detail.value  
    })  
    // console.log(e.detail.value)  
  },

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
            if(success == true){
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
                    url: '../mine/mine',
                    success: function(res){
                      
                    },
                    fail: function() {

                    }
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