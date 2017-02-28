// pages/editpassword/editpassword.js
Page({
  data:{
      userName:'', 
      editPasswordStatus:false,
      validCode:'',
      newPassword:''
      
  },

  onshow:function(){
      
  },

  userNameInput:function(e){  
      this.setData({  
          userName: e.detail.value  
      }) 
      console.log(this.data.userName) 
  },

  validCodeInput:function(e){
      this.setData({
          validCode:e.detail.value
      })
      console.log(this.data.validCode)
  },

  newPasswordInput:function(e){  
      this.setData({  
          newPassword:e.detail.value  
      })  
      console.log(this.data.newPassword)  
  },

  checkNumber:function(){
      var that = this;
      var length = this.data.userName.length;
      if(length != ''){
            if(length == 11){
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

  editPassword:function(){
      var that = this;
      if(this.data.userName != '' && this.data.validCode != '' && this.data.newPassword != ''){
          if(this.data.userName.length == 11){
              wx.request({
                    url: 'http://open.3vcar.com/system/findpassword',
                    data: {
                        UserName:this.data.userName,
                        ValidCode:this.data.validCode,
                        Password:this.data.newPassword
                    },
                    method: 'POST',
                    header: { 
                        'content-type': 'application/json'
                    },
                    success: function(res){
                        console.log('chenggong')
                        console.log(res.data)
                        wx.redirectTo({
                          url: '../login/login',
                        })
                    },
                    fail: function(res) {
                        console.log('shibai')
                    }
              })
          }else{
              wx.showToast({
                  title   :'手机号码不完整',
                  icon    :'loading',
                  duration:1000
              })
          }
      }
  }    
})