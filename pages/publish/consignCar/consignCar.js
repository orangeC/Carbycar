// pages/publish/consignCar/consignCar.js
var app=getApp();
Page({
  data:{
    warning:false,
    brand:'Alpina',
    style:'B4 BITURBO',
    valuation:0,
    amount:1,
    newCar:true,
    canDrive:true,
    needInsurance:false,
    consignCar:[]
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
  //获取输入价格和品牌
  brand:function(){
    wx.navigateTo({
      url: '../brand/brand',
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
  valuation:function(e){
    console.log('输入价格长度为',e.detail.value.length)
    if(e.detail.value.length>3){
      this.setData({
        warning:true
      })
    }else{
      this.setData({
        warning:false
      })
    };
    this.setData({
      valuation:parseInt(e.detail.value)
    });
    console.log('获取输入价格为',parseInt(e.detail.value));
    console.log('获取输入品牌为',this.data.brand);
    console.log('获取输入类型为',this.data.style)
  },
  //获取汽车数量
  amount:function(e){
    this.setData({
      amount:parseInt(e.detail.value)
    });
  },
  //获取汽车状态
  newCar:function(e){
    this.setData({
      newCar:e.detail.value
    });
    console.log('是否新车',e.detail.value)
  },
  canDrive:function(e){
    this.setData({
      canDrive:e.detail.value
    });
    console.log('是否能开',e.detail.value)
  },
  //是否需要保险
  needInsurance:function(e){
    this.setData({
      needInsurance:e.detail.value
    });
    console.log('是否需要单车险',e.detail.value)
  },
  //保存车辆信息
  save:function(){
    var that = this;
    var apply = that.data;
    this.setData({
      consignCar:[
        {Brand:apply.brand,
         Style:apply.style,
         Valuation:apply.valuation,
         Amount:apply.amount,
         NewCar:apply.newCar,
         CanDrive:apply.canDrive,
         NeedInsurance:apply.needInsurance
        }
      ]
    });
    app.globalData.consignCar=apply.consignCar
    console.log(app.globalData.consignCar);
    wx.navigateBack({
      url: '/pages/publish/publish'
    });

  }
})