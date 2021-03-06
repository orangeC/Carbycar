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
    contactPhone: '',
    remark: '',
    info: [],
    startingCode: '',
    endingCode: '',
    areaHide: true,
    cars: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
      var phone = wx.getStorageSync('phone')
      this.setData({
        startTime: date.formatTime(new Date),
        contactPhone: phone
      })
  },
  //页面显示
  onShow: function (e) {
    var that = this;
    wx.getStorage({
      key: 'consignCar',
      success: function (res) {
        if (that.data.setCategory) {
            for (var i = 0; i < res.data.length; i++) {
              that.data.consignCar.push(res.data[i])
            }
            that.setData({
              consignCar: that.data.consignCar
            })
        }
      }
    });
    this.setData({
        starting: app.globalData.starting,
        ending: app.globalData.ending,
        startingCode: app.globalData.starting.Code.toString(),
        endingCode: app.globalData.ending.Code.toString()
    })
    var that = this;
    if (app.globalData.starting.Code !== 0) {
        app.send('/system/city','GET',{code: app.globalData.starting.Code},'',function(res){
            var areas = new Array();
            for (var i = 0; i < res.data.length; i++) {
              areas.push(res.data[i].name);
            };
            that.setData({
              area: areas
            });
        })
    }
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
  },
  //价格开关
  priceChange: function (e) {
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
  },
  //添加车辆信息
  addCar: function () {
    wx.navigateTo({
      url: 'consignCar/consignCar',
    })
  },
 
  deleteCar: function (e) {
    var that = this;
    var eId = e.currentTarget.dataset.id;
    this.setData({ eId: eId });
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        that.setData({ confirm: res.confirm })
        if (res.confirm) {
          that.data.consignCar.splice(eId, 1);
          wx.setStorageSync('consignCar', that.data.consignCar)
          that.setData({ consignCar: that.data.consignCar });

        }

      }
    })
  },
  onReady: function () {
  },
  //订单信息
  homeTake: function (e) {
    if (app.globalData.starting.Code !== 0) {
      this.setData({
        takeCar: true,
        homeTake: true
      })
    } else {
      wx.showToast({
        title: '请选择始发地',
        icon: 'loading',
        duration: 2000
      });
    }
  },

  needInvoice: function (e) {
    this.setData({
      needInvoice: true
    });
  },
  //提车区域
  takeDistrict: function (e) {
    this.setData({
      index: e.detail.value
    });

    for(var i=0;i<this.data.area.length;i++){
      if(i==e.detail.value){
        this.setData({
          takeDistrict:this.data.area[i]
        })
      }
    }
  },
  //提车地点
  takeAddress: function (e) {
    this.setData({
      takeAddress: e.detail.value
    });
  },

  noHomeTake: function () {
    this.setData({
      homeTake: false,
      takeCar: false,
      takeDistrict:'',
      takeAddress: ''
    });
  },
  noNeedInvoice: function () {
    this.setData({
      needInvoice: false
    });
  },
  //联系人
  contactName: function (e) {
    this.setData({
      contactName: e.detail.value
    });
  },
  //联系电话
  contactPhone: function (e) {
    this.setData({
      contactPhone: e.detail.value
    });
  },
  //备注
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    });
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
    if (app.globalData.starting.Code == 0) {
      wx.showToast({
        title: '请选择始发地',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (app.globalData.ending.Code == 0) {
      wx.showToast({
        title: '请选择目的地',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.date == '请选择发车时间') {
      wx.showToast({
        title: '请选择发车时间',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.consignCar.length == 0) {
      wx.showToast({
        title: '请添加车辆信息',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.contactName == '') {
      wx.showToast({
        title: '请输入联系人',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.contactPhone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 2000
      });
      return;
    }
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