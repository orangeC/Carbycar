// pages/index/index.js
var app = getApp();
var site = require('../../utils/app.auto.js');
var moment = require('../../utils/moment.js');
Page({
  data:{
      apply:'',
  },
  onLoad:function(){
      var that = this;
      wx.request({
          url: 'https://api.carbycar.com.cn/order/consign',
          data: {

          },
          method: 'GET', 
          header: {
              'content-type': 'application/json'
          }, 
          success: function(res){
              if(res){
                console.log(res.data);
                var apply = res.data;
                for (var i = 0;i < apply.length;i++){
                    apply[i].Starting = site.getCity(apply[i].Starting); 
                    apply[i].Ending   = site.getCity(apply[i].Ending);
                    apply[i].DepartTime = moment.getFormat(apply[i].DepartTime,"yyyy-MM-dd");
                    apply[i].Fromnow;
                    apply[i].Fromnow = moment.getFromnow(apply[i].CreateTime);
                    apply[i].Type == 'Bidding'?apply[i].Estimate = true:apply[i].Estimate = false;
                }
                that.setData({
                    apply:apply,
                });   
              } 
          },
      })
  },

  onReady:function(){
    
  },
//查看订单详情
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
  }
  
  
})