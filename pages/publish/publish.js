var app = getApp();
var date = require('../../utils/util.js');
Page({
  data:{
    starting:app.globalData.starting,
    ending:app.globalData.ending,
    date:'请选择发车时间',
    bidding:'open',
    pricing:'',
    consignCar:[],
    offer:true,
    Type:'Bidding',
    price:0,
    startTime:'',
    takeCar:false,
    homeTake:false,
    needInvoice:false,
    cityName:'',
    takeDistrict:'',
    takeAddress:'',
    contactName:'',
    contactphone:'',
    remark:'',
    info:[],
    startingCode:'',
    endingCode:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      startTime:date.formatTime(new Date)
    })
  },
  //页面显示
  onShow:function(e){
    this.setData({
      starting: app.globalData.starting,
      ending: app.globalData.ending,
      startingCode:app.globalData.starting.Code.toString(),
      endingCode:app.globalData.ending.Code.toString(),
      consignCar:app.globalData.consignCar
    })
  },
  //事件处理函数
  starting: function () {
    this.setData({
      Category: 'starting'
    });
    wx.navigateTo({
      url: '../city/city?category='+ this.data.category
    });
  },
  ending: function () {
    this.setData({
      Category: 'ending'
    });
    wx.navigateTo({
      url: '../city/city?category=ending'
    });
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
        Type:'Pricing'
      })
    }else{
      this.setData({
        bidding:'open',
        pricing:'',
        offer:true,
        Type:'Bidding',
        price:0
      })
    }
  },
  pricing:function(e){
    this.setData({
      price:parseInt(e.detail.value)
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
    if(e.detail.value){
      this.setData({
        takeCar:true
      })
    }else{
      this.setData({
        takeCar:false,
        takeAddress:''
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
  },
  //提车区域(待修改)
  takeDistrict:function(){
    var that=this;
    if(app.globalData.starting.Code!==0){
        wx.request({
          url: 'http://open.3vcar.com/system/city',
          data: {
            code:app.globalData.starting.Code
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {'content-type': 'application/json'}, // 设置请求的 header
          success: function(res){
            that.setData({
              cityName:res.data
            });
            console.log(res.data)
          },
          
        })
    }else{
      wx.showToast({
        title: '请选择提车区域',
        duration: 2000
      });
    }
    
  },
  //提车地点
  takeAddress:function(e){
    this.setData({
      takeAddress:e.detail.value
    });
    console.log('提车地点：',e.detail.value)
  },
  //提车信息
  contactName:function(e){
    this.setData({
      contactName:e.detail.value
    });
    console.log('contactName：',e.detail.value)
  },

  contactPhone:function(e){
    this.setData({
      contactPhone:e.detail.value
    });
    console.log('contactPhone：',e.detail.value)
  },

  remark:function(e){
    this.setData({
      remark:e.detail.value
    });
    console.log('remark：',e.detail.value)
  },

  startingInput:function(e){
    console.log('始发：',e.detail.value)
  },

  submit:function(e){
    var that=this;
    var apply = that.data
    this.setData({
      info:{
          HomeTake:this.data.homeTake,
          TakeAddress:this.data.takeAddress,
          TakeDistrict:this.data.takeDistrict,
          NeedInvoice:this.data.needInvoice
        }
    });

            wx.showToast({
              title: '234',
              duration: 2000
            });
          this.setData({
      info:{
          HomeTake:this.data.homeTake,
          TakeAddress:this.data.takeAddress,
          TakeDistrict:this.data.takeDistrict,
          NeedInvoice:this.data.needInvoice
        }
    });

    wx.showToast({
      title: '正在提交',
      icon: 'loading',
      duration: 3000,
      success: function (res) {
        
        wx.request({
          url: 'http://open.3vcar.com/order/publish',
          data: {
            Starting:apply.startingCode,
            Ending:apply.endingCode,
            DepartTime: apply.date,
            Type: apply.Type,
            Price:apply.price,
            ContactName:apply.contactName,
            ContactPhone:apply.contactPhone,
            Remark:apply.remark,
            Cars:apply.consignCar,
            Info:apply.info
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header:{'authorization':'eyJWYWxpZCI6dHJ1ZX0.NTA0MDk0NzI.NzQ0YWU2ZmFiZmJlZDM1OWQ1ZjVmMDMxZDMxMmFjYzU2OTAzZmViNQ'
            }, // 设置请求的 header
          success: function(res){
            console.log(res)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
      });
    }
      
})