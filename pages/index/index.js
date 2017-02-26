// pages/index/index.js
var app = getApp();
var site = require('../../utils/app.auto.js');
var moment = require('../../utils/moment.js');
Page({
  data:{
    //   Code:[],//编码
    //   OrderNo:[],//订单编号 
    //   Starting:[],//起点编码
    //   Ending:[],//终点编码
    //   CreateTime:[],//创建时间
    //   DepartTime:[],//发车时间
    //   Car:[],//车辆信息
    //   Remark:[],//备注
    //   Price:[],//价格
    //   QuoteAmount:[],//报价数量
    //   OrderType:[],//订单类型
    //   OrderStatus:[],//订单状态
    //   CarrierCode:[],//托运方编码
    //   CarrierName:[],//托运方名称
      apply:'',
  },

  onLoad:function(){
      var that = this;
      wx.request({
          url: 'http://open.3vcar.com/order/consign',
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
                    if(apply[i].Type == 'Bidding'){
                        apply[i].Type = true;
                    }else{
                        apply[i].Type = false;
                    }
                }
                that.setData({
                    apply:apply,
<<<<<<< HEAD
                });   
=======
                }); 
>>>>>>> e109784a2f947c10cb689be15130fcadbe39db03
              } 
          },
          fail: function() {

          },
      })

      try {
          wx.setStorageSync('version', 'WMP1.0.3')
      } catch (e) {    
      }

  },

  onReady:function(){
      
      
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
  }
  
  
})