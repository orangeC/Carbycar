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
    // wx.getStorage({
    //   key: 'id_token',
    //   success: function(res) {
    //       console.log(res.data)
          
    //   } 
    // })
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
            version:'WMP'  
        }, 
        header: { 
            'content-type': 'application/json'
        }, 
        method: 'GET',  
        success: function (res) {  
            that.setData({  
                id_token: res.data.Token,  
                response:res  
            })  
            try {  
                wx.setStorageSync('id_token', res.data.Token)  
            } catch (e) {  
            }  
            wx.switchTab({
                url: '../mine/mine',
                success: function(res){
                  // success
                },
                fail: function() {
                  // fail
                }
            })
            console.log(res.data);  
        },  
        fail: function (res) {
            wx.showToast({  
                title: '登陆失败请重新登录',  
                icon : 'loading',  
                duration : 1000  
            })  
        }  
    })  
  },

  
})