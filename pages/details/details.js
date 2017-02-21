// pages/details/details.js
var app = getApp();
Page({
  data:{
    order:123355555555555,
    publish:123456789,
    start:"北京",
    end:"西安",
    money:"2500",
    tipsInfo:"订单创建成功等待接单",
    tipsTime:"1234-567-89",
    Cars:[
      {Brand:"奥迪奥迪A1 1辆;宝马宝马2系旅行车(进口) 1辆",carType:"新车能开",Valuation:"80",NeedInsurance:false,CanDrive:false,NewCar:false,Style:"标准轿车"},
      {Brand:"奥迪奥迪A1 1辆;宝马宝马2系旅行车(进口) 1辆",carType:"新车能开",Valuation:"80",NeedInsurance:false,CanDrive:false,NewCar:false,Style:"高级轿车"}
    ]
  },
  onLoad:function(){
    app.send("/order/consign/","GET",{code:50308608},function(res){
      console.log(res.data);
    })
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
  }
})