// pages/register/register.js  
Page({
  data:{
      registerStatus:true,
      userName:'',  
      userPassword:'',
      phone:'',//请求验证码的手机号
      validCode:'',
      accountType:'Consignor'

  },

  userNameInput:function(e){  
      this.setData({  
          userName: e.detail.value  
      }) 
      console.log(e.detail.value) 
  },  

  userPasswordInput:function(e){  
      this.setData({  
          userPassword: e.detail.value  
      })  
      console.log(e.detail.value)  
  },

  validCodeInput:function(e){
      this.setData({
          validCode:e.detail.value
      })
      console.log(e.detail.value)
  },

  checkboxChange:function(e){
      var that = this;
      console.log(e.detail.value)
      if(e.detail.value != ''){
          that.setData({
              registerStatus:false,
          })
      }else{
          that.setData({
              registerStatus:true,
          })
      }
  },
  
  checkNumber:function(){
      var that = this;
      var length = this.data.userName.length;
      console.log(length)
      if(length != ''){
            if(length == 11){
                console.log(length)
                wx.request({
                    url: 'http://open.3vcar.com/message/valid',
                    data: {
                      phone:this.data.userName,
                    },
                    method: 'GET',
                    header: { 
                        'content-type': 'application/json'
                    },
                    success: function(res){
                      console.log(res.data)

                    },
                    fail: function(res) {
                      console.log(res.data)
                    }
                })
            }else{
                wx.showToast({  
                    title: '手机号码有误请重新输入',  
                    icon : 'loading',  
                    duration : 1000  
                })  
            }
      }else{
            wx.showToast({
              title:'请输入手机号码',
              icon:'loading',
              duration:1000
            })
      }
      
  },

  register:function(){
      var that = this;
      if(this.data.userPassword != ''){
          if(this.data.validCode != ''){
              if(this.data.userName != ''){
                  wx.request({
                      url: 'http://open.3vcar.com/system/signup',
                      data: {
                          UserName :this.data.userName,
                          Password :this.data.userPassword,
                          ValidCode:this.data.validCode,
                          AccountType:this.data.accountType
                      },
                      method: 'POST', 
                      header: {
                          'content-type': 'application/json'
                      }, 
                      success: function(res){
                          wx.redirectTo({
                            url: '../login/login',
                          })
                      },
                      fail: function() {
                          console.log('shibai')
                      }
                  })
              }else{
                  wx.showToast({
                    title:'请填写手机号码',
                    icon:'loading',
                    duration:1500
                  })
              }
          }else(
              wx.showToast({
                title:'请填写验证码',
                icon:'loading',
                duration:1500
              })
          )
      }else{ 
          wx.showToast({
            title:'请填写密码',
            icon:'loading',
            duration:1500
          })
      }
  },
  

  
})