var app = getApp();
var date = require('../../utils/util.js');
Page({
  data:{
    starting:'始发',
    ending:'终点',
    date: '选择发车时间',
    bidding:'open',
    pricing:'',
    consignCar:[],
    offer:true,
    orderType:'',
    price:'',
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
    info:[]
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
        orderType:'定价'
      })
    }else{
      this.setData({
        bidding:'open',
        pricing:'',
        offer:true,
        orderType:'竞价',
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
    wx.request({
      url: 'http://open.3vcar.com/system/city',
      data: {
        name:this.data.starting
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/json'}, // 设置请求的 header
      success: function(res){
        that.setData({
          cityName:res.data
        });
        console.log(res.data)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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

  submit:function(){
    var that=this;
    var apply = that.data
    this.setData({
      info:[
        {
          homeTake:this.data.homeTake,
          takeAddress:this.data.takeAddress,
          takeDistrict:this.data.takeDistrict,
          needInvoice:this.data.needInvoice
        }
      ]
    });
    console.log(this.data.info)
    
        console.log("始发 : " + apply.starting)
        console.log("终点： " + apply.ending)
        console.log("日期： " + apply.date)
        console.log("车辆信息： " + apply.consignCar)
        console.log("价格类型： " + apply.orderType)
        console.log("定价价格： " + apply.price)
        // console.log("上门提车： " + apply.homeTake)
        // console.log("提车区域： " + apply.takeDistrict)
        // console.log("提车地点： " + apply.takeAddress)
        // console.log('需要发票：',apply.needInvoice)
        console.log("联系人： " + apply.contactName)
        console.log("电话： " + apply.contactphone)
        console.log("备注： " + apply.remark)
        console.log("订单详情：",apply.info)
    wx.showToast({
      title: '已提交，请等待审核',
      icon: 'loading',
      duration: 3000,
      success: function (res) {
        
        wx.request({
          url: 'http://open.3vcar.com/order/publish',
          data: {
            starting:apply.starting,
            ending:apply.ending,
            date: apply.date,
            orderType: apply.orderType,
            price:apply.price,
            contactName:apply.contactName,
            contactPhone:apply.contactPhone,
            remark:apply.remark,
            consignCar:apply.consignCar,
            info:apply.info
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