// pages/myalloforder/myalloforder.js
var app = getApp();
var site = require('../../utils/app.auto.js');
var moment = require('../../utils/moment.js');
Page({
  data:{
      apply:'',
      userName:'',
      token:'',
      category:0
  },
  onLoad:function(options){
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
      if(value != ''){
          wx.request({
              url: 'http://open.3vcar.com/consignor/order',
              data: {
                  category:0,
              },
              method: 'GET', 
              header: {
                  'content-type': 'application/json',
                  'Authorization': that.data.token
              }, 
              success: function(res){
                  if(res){
                    console.log(res.data);
                    console.log(that.data.token)
                    var apply = res.data;
                    for (var i = 0;i < apply.length;i++){
                        apply[i].Starting = site.getCity(apply[i].Starting); 
                        apply[i].Ending   = site.getCity(apply[i].Ending);
                        apply[i].DepartTime = moment.getFormat(apply[i].DepartTime,"yyyy-MM-dd");
                        apply[i].Fromnow;
                        apply[i].Fromnow = moment.getFromnow(apply[i].CreateTime);
                        if(apply[i].Type == 'Bidding'){
                            apply[i].Type = true;
                        }else{
                            apply[i].Type = false;
                        }
                    }
                    that.setData({
                        apply:apply,
                    });   
                  } 
              },
              fail: function() {
                console.log('error')
              },
          })
      }else{
          wx.redirectTo({
            url: '../login/login',
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
      }
         
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

  toDetails:function(e){
      var that = this;
      var Code = e.currentTarget.id;
      wx.navigateTo({
        url: '../details/details?Code='+ Code,
        success: function(res){
           
        },
        fail: function() {
            
        }
      })
  },

  

})