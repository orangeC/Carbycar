// pages/index/index.js
var app = getApp();
Page({
  data:{
      Code:[],//编码
      OrderNo:[],//订单编号 
      Starting:[],//起点编码
      Ending:[],//终点编码
      CreateTime:[],//创建时间
      DepartTime:[],//发车时间
      Car:[],//车辆信息
      Remark:[],//备注
      Price:[],//价格
      QuoteAmount:[],//报价数量
      OrderType:[],//订单类型
      OrderStatus:[],//订单状态
      CarrierCode:[],//托运方编码
      CarrierName:[],//托运方名称
      apply:''
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
                    that.setData({
                        Code:apply[i].Code,//编码
                        OrderNo:apply[i].OrderNo,//订单编号 
                        Starting:apply[i].Starting,//起点编码
                        Ending:apply[i].Ending,//终点编码
                        CreateTime:apply[i].CreateTime,//创建时间
                        DepartTime:apply[i].DepartTime,//发车时间
                        Car:apply[i].Car,//车辆信息
                        Remark:apply[i].Remark,//备注
                        Price:apply[i].Price,//价格
                        QuoteAmount:apply[i].QuoteAmount,//报价数量
                        OrderType:apply[i].OrderType,//订单类型
                        OrderStatus:apply[i].OrderStatus,//订单状态
                        CarrierCode:apply[i].CarrierCode,//托运方编码
                        CarrierName:apply[i].CarrierName//托运方名称
                    })
                }
                that.setData({
                    apply:apply,
                })
                        
              }
              console.log(that.data.Starting)
          },
          fail: function() {

          },
      })
  },

  onReady:function(){
      var that = this;
      //console.log("onReady");
      //console.log(this.data.CreateTime.length);
      var start = this.data.Starting;
      var end = this.data.Ending;

      var getStart = app.getWhereyougo(start);
      var getEnd = app.getWhereyougo(end);
      this.setData({
            Starting: getStart,
            Ending: getEnd
      })
      
  },

  toDetails:function(e){
      var that = this;
      var Code = e.currentTarget.id;
      console.log(Code)
      wx.navigateTo({
        url: '../details/details?Code='+this.data.Code,
        success: function(res){
           
        },
        fail: function() {
            
        }
      })
  }
  
})