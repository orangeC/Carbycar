var app = getApp();
var date = require('../../utils/util.js');
Page({
  data: {
    starting: app.globalData.starting,
    ending: app.globalData.ending,
    date: '请选择发车时间',
    bidding: 'open',
    pricing: '',
    consignCar: [],
    offer: true,
    Type: 'Bidding',
    price: 0,
    startTime: '',
    takeCar: false,
    homeTake: false,
    needInvoice: false,
    areas: [],
    area: {},
    index: 0,
    takeDistrict: '',
    takeAddress: '',
    contactName: '',
    contactphone: '',
    remark: '',
    info: [],
    startingCode: '',
    endingCode: '',
    areaHide: true,
    cars: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      startTime: date.formatTime(new Date)
    })
  },
  //页面显示
  onShow: function (e) {
    if (this.data.setCategory) {
      for (var i = 0; i < app.globalData.consignCar.length; i++) {
        this.data.cars.push(app.globalData.consignCar[i])
      }
      this.setData({
        consignCar: this.data.cars
      })

      var that = this;
      if (app.globalData.starting.Code !== 0) {
        wx.request({
          url: 'http://open.3vcar.com/system/city',
          data: {
            code: app.globalData.starting.Code
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { 'content-type': 'application/json' }, // 设置请求的 header
          success: function (res) {
            var areas = new Array();
            for (var i = 0; i < res.data.length; i++) {
              areas.push(res.data[i].name);
            };
            that.setData({
              area: areas
            });
            console.log(areas);
          },
        })
      }
    }
    this.setData({
      starting: app.globalData.starting,
      ending: app.globalData.ending,
      startingCode: app.globalData.starting.Code.toString(),
      endingCode: app.globalData.ending.Code.toString()
    })

  },
  //事件处理函数
  starting: function () {
    wx.navigateTo({
      url: '../city/city?category=starting'
    });
  },
  ending: function () {
    wx.navigateTo({
      url: '../city/city?category=ending'
    });
  },
  //时间选择器
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    console.log('日期：', e.detail.value)
  },
  //价格开关
  priceChange: function (e) {
    console.log('switch类型开关当前状态-----', e.detail.value);
    if (e.detail.value == true) {
      this.setData({
        bidding: '',
        pricing: 'open',
        offer: false,
        Type: 'Pricing'
      })
    } else {
      this.setData({
        bidding: 'open',
        pricing: '',
        offer: true,
        Type: 'Bidding',
        price: 0
      })
    }
  },
  pricing: function (e) {
    this.setData({
      price: parseInt(e.detail.value)
    })
    console.log('定价：', this.data.price, '元')
  },
  //添加车辆信息
  addCar: function () {
    wx.navigateTo({
      url: 'consignCar/consignCar',
    })
  },
  // editCar: function (e) {
  //   var that = this;
  //   console.log(e.currentTarget.dataset.id);
  //   for (var i = 0; i < this.data.cars.length; i++) {
  //     if (i == e.currentTarget.dataset.id) {
  //       wx.navigateTo({
  //         url: 'consignCar/consignCar?brand='+JSON.stringify(this.data.cars[i])
  //         // success:function(res){
  //         //   that.data.cars.splice(i, 1)
  //         // }
  //       })
  //       console.log(this.data.cars[i])
  //     }
  //   };
  // wx.redirectTo({
  //   url: '/pages/publish/publish'
  // })
  // },
  deleteCar: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.cars.length; i++) {
            if (i == e.currentTarget.dataset.id) {
              that.data.cars.splice(i, 1)
            }
          };
          wx.redirectTo({
            url: '/pages/publish/publish'
          })
        }
      }
    })
  },
  //订单信息
  homeTake: function (e) {
    if (app.globalData.starting.Code !== 0) {
      this.setData({
        takeCar: e.detail.value
      })
    } else {
      wx.showToast({
        title: '请选择始发地',
        duration: 2000
      });
    }
    this.setData({
      homeTake: e.detail.value
    })
    console.log('上门提车：', e.detail.value)
  },

  needInvoice: function (e) {
    this.setData({
      needInvoice: e.detail.value
    });
    console.log('需要发票：', e.detail.value)
  },
  //提车区域(待修改)
  takeDistrict: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  //提车地点
  takeAddress: function (e) {
    this.setData({
      takeAddress: e.detail.value
    });
    console.log('提车地点：', e.detail.value)
  },
  //联系人
  contactName: function (e) {
    this.setData({
      contactName: e.detail.value
    });
    console.log('contactName：', e.detail.value)
  },
  //联系电话
  contactPhone: function (e) {
    this.setData({
      contactPhone: e.detail.value
    });
    console.log('contactPhone：', e.detail.value)
  },
  //备注
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    });
    console.log('remark：', e.detail.value)
  },

  //发布委托
  submit: function (e) {
    var that = this;
    var apply = that.data
    this.setData({
      info: {
        HomeTake: this.data.homeTake,
        TakeAddress: this.data.takeAddress,
        TakeDistrict: this.data.takeDistrict,
        NeedInvoice: this.data.needInvoice
      }
    });
    wx.showToast({
      title: '234',
      duration: 2000
    });
    this.setData({
      info: {
        HomeTake: this.data.homeTake,
        TakeAddress: this.data.takeAddress,
        TakeDistrict: this.data.takeDistrict,
        NeedInvoice: this.data.needInvoice
      }
    });

    wx.showToast({
      title: '正在提交',
      icon: 'loading',
      duration: 3000,
      success: function (res) {
        //获取token
        wx.getStorage({
          key: 'id_token',
          success: function (res) {
            app.send("/order/publish", "POST", {
              Starting: apply.startingCode,
              Ending: apply.endingCode,
              DepartTime: apply.date,
              Type: apply.Type,
              Price: apply.price,
              ContactName: apply.contactName,
              ContactPhone: apply.contactPhone,
              Remark: apply.remark,
              Cars: apply.consignCar,
              Info: apply.info
            }, res.data, function (res) { 
              console.log('上传成功')
              wx.switchTab({
                url: '/pages/index/index',
              })
            })
          }
        });

      }
    });
  }

})