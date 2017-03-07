// pages/mineeditpassword/mineeditpassword.js
Page({
  data:{
      oldPassword:'',
      newPassword:'',
      checkNewPassword:'',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  oldPasswordInput:function(e){
      this.setData({  
          oldPassword: e.detail.value,  
      })      
  },

  newPasswordInput:function(e){
      this.setData({  
          newPassword: e.detail.value,  
      }) 
  },

  checkNewPasswordInput:function(e){
      this.setData({  
          checkNewPassword: e.detail.value, 
      }) 
  },

  saveNewPassword:function(){
      var that = this;
      if(that.data.oldPassword !='' && that.data.newPassword !='' && that.data.checkNewPassword !=''){
          if(that.data.newPassword == that.data.checkNewPassword){
                if(this.data.newPassword.length >= 6 && this.data.newPassword.length <=20){
                    app.send(
                                '/account/password',
                                'POST',
                                {
                                    OldPassword:that.data.oldPassword,
                                    NewPassword:that.data.newPassword,
                                },'',
                                function(){
                                    if(res){
                                        console.log(res.data)
                                        wx.showToast({  
                                            title: '修改成功',  
                                            icon : 'loading',  
                                            duration : 1000,
                                            success:function(res){
                                                wx.switchTab({
                                                    url: '../me/me',
                                                })
                                            }  
                                        })
                                    }
                                }
                    )
                }else{
                    wx.showToast({
                        title: '密码长度6-20',
                        icon: 'loading',
                        duration: 1500
                    })
                }
            //   wx.request({
            //       url: 'https://api.carbycar.com.cn/account/password',
            //       data: {
            //           OldPassword:that.data.oldPassword,
            //           NewPassword:that.data.newPassword,
            //       },
            //       method: 'POST', 
            //       header: {
            //           'content-type': 'application/json'
            //       },
            //       success: function(res){
            //           if(res){
            //               console.log(res.data)
            //               wx.showToast({  
            //                   title: '修改成功',  
            //                   icon : 'loading',  
            //                   duration : 1000,
            //                   success:function(res){
            //                       wx.switchTab({
            //                           url: '../me/me',
            //                       })
            //                   }  
            //               })
            //           }
            //       },
            //       fail: function(res) {
            //           console.log(res.data)
            //       },
            //   })
          }else{
              wx.showToast({  
                  title: '新密码与确认密码必须相同',  
                  icon : 'loading',  
                  duration : 1000  
              })
          }
      }else{
          wx.showToast({  
              title: '请填写所有信息',  
              icon : 'loading',  
              duration : 1000  
          })
      }
  }
})