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
      app.send('/consign/order/consign','GET',{},'',function(res){
          if(res){
                var apply = res.data;
                for (var i = 0;i < apply.length;i++){
                    apply[i].Starting = site.getCity(apply[i].Starting); 
                    apply[i].Ending   = site.getCity(apply[i].Ending);
                    apply[i].DepartTime = moment.getFormat(apply[i].DepartTime,"yyyy-MM-dd");
                    apply[i].Fromnow = moment.getFromnow(apply[i].CreateTime);
                    apply[i].Type == 'Bidding'?apply[i].Estimate = true:apply[i].Estimate = false;
                    apply[i].Remark == null?apply[i].Remark = "无":apply[i].Remark=apply[i].Remark;
                }
                that.setData({
                    apply:apply,
                });   
          } 
      });
  },

  onShow:function(){
        var that = this;
        app.send('/consign/order/consign','GET',{},'',function(res){
            if(res){
                var apply = res.data;
                for (var i = 0;i < apply.length;i++){
                    apply[i].Starting = site.getCity(apply[i].Starting); 
                    apply[i].Ending   = site.getCity(apply[i].Ending);
                    apply[i].DepartTime = moment.getFormat(apply[i].DepartTime,"yyyy-MM-dd");
                    apply[i].Fromnow = moment.getFromnow(apply[i].CreateTime);
                    apply[i].Type == 'Bidding'?apply[i].Estimate = true:apply[i].Estimate = false;
                    apply[i].Remark == null?apply[i].Remark = "无":apply[i].Remark=apply[i].Remark;
                }
                that.setData({
                    apply:apply,
                });   
            } 
        });
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
  },

})