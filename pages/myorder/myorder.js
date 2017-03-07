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
  
  onLoad:function(){
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
          app.send(
                '/consignor/order',
                'GET',
                {category:0,},
                that.data.token,
                function(res){
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
                            apply[i].Type == 'Bidding'?apply[i].Estimate = true:apply[i].Estimate = false;
                            apply[i].Remark == null?apply[i].Remark = "无":apply[i].Remark=apply[i].Remark;
                            var thatStatus = {
                                "Publish" : "发布中",
                                "Quote"   : "报价中",
                                "Refuse"  : "已拒绝",
                                "Confirm" : "确认中",
                                "Pay"     : "付款中",
                                "Send"    : "发货中",
                                "Delivery": "已送达",
                                "Receive" : "已收货",
                                "Receipt" : "已收款",
                                "Finish"  : "已结束",
                                "Cancel"  : "已取消",
                                "Refund"  : "已退款"
                            };
                            apply[i].Status = thatStatus[apply[i].Status];
                        }
                        that.setData({
                            apply:apply,
                        });   
                    } 
                },
                function(res){
                    console.log('error');
                }
          )
      }else{
          wx.redirectTo({
            url: '../login/login',
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
      var me = 13911006493;
      wx.navigateTo({
        url: '../details/details?Code='+ Code + '&me='+ me,
        success: function(res){
           
        },
        fail: function() {
            
        }
      })
  },

  getStatus:function(e){
      var that = this;
      var category = e.currentTarget.id;
      app.send(
          '/consignor/order',
          'GET',
          {category:category,},
          that.data.token,
          function(res){
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
                        apply[i].Type == 'Bidding'?apply[i].Estimate = true:apply[i].Estimate = false;
                        apply[i].Remark == null?apply[i].Remark = "无":apply[i].Remark=apply[i].Remark;
                        var thatStatus = {
                            "Publish" : "发布中",
                            "Quote"   : "报价中",
                            "Refuse"  : "已拒绝",
                            "Confirm" : "确认中",
                            "Pay"     : "付款中",
                            "Send"    : "发货中",
                            "Delivery": "已送达",
                            "Receive" : "已收货",
                            "Receipt" : "已收款",
                            "Finish"  : "已结束",
                            "Cancel"  : "已取消",
                            "Refund"  : "已退款"
                        };
                        apply[i].Status = thatStatus[apply[i].Status];
                    }
                    that.setData({
                        apply:apply,
                    });   
                }
          },
          function(res){
                console.log('error');
          }
      )
  },
  
})