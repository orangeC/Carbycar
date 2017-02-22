var app = getApp();
var date = require('../../utils/util.js');
Page({
  data:{
    starting:'始发',
    ending:'终点',
    date: '选择发车时间',
    bidding:'open',
    pricing:'',
    consignCar:[
      {brand:'',valuation:'',amount:'',newCar:'',canDrive:'',needInsurance:''}
    ],
    offer:true,
    orderType:'',
    homeTake:false,
    needInvoice:false,
    takeCar:false,
    price:'',
    startTime:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(date.formatTime(new Date));
    var that = this;
    that.setData({
      startTime:date.formatTime(new Date)
    })
  },
  //页面显示
  onShow:function(){
    this.setData({
      starting:app.globalData.starting
    })
    console.log(this.data.starting);
    this.setData({
      ending:app.globalData.ending
    })
    console.log(this.data.ending);
    this.setData({
      consignCar:app.globalData.consignCar
    })
    console.log(this.data.consignCar)
  },
  //选择始发地
  starting:function(){
    wx.navigateTo({
      url: '/pages/city/start/start',
      success: function(res){
        console.log('城市初始化成功')
      },
      fail: function() {
        console.log('城市初始化失败')
      }
    })
  },
  //选择终点地
  ending:function(){
    wx.navigateTo({
      url: '/pages/city/end/end',
      success: function(res){
        console.log('城市初始化成功')
      },
      fail: function() {
        console.log('城市初始化失败')
      }
    })
  },
  //时间选择器
  bindDateChange: function(e) {
    
    this.setData({
      date: e.detail.value
    })
    console.log('日期：',e.detail.value)
  },
  //价格开关
  priceChange:function(e){
    console.log('switch类型开关当前状态-----', e.detail.value);
    if(e.detail.value==true){
      this.setData({
        bidding:'',
        pricing:'open',
        offer:false,
        orderType:'竞价'
      })
    }else{
      this.setData({
        bidding:'open',
        pricing:'',
        offer:true,
        orderType:'定价',
        price:null
      })
    }
  },
  pricing:function(e){
    this.setData({
      price:e.detail.value
    })
    console.log('定价：',this.data.price,'元')
  },
  //添加车辆信息
  addCar:function(){
    wx.navigateTo({
      url: 'consignCar/consignCar',
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
  },
  //订单信息
  homeTake:function(e){
    if(e.detail.value==true){
      this.setData({
        takeCar:true
      })
    }else{
      this.setData({
        takeCar:false
      })
    };
    this.setData({
      homeTake:e.detail.value
    })
    console.log('上门提车：',e.detail.value)
  },

  needInvoice:function(e){
    this.setData({
      needInvoice:e.detail.value
    });
    console.log('需要发票：',e.detail.value)
  }



})