// pages/mine/mine.js
var app = getApp();
Page({
  data:{
      token   :'',
      userName:'未登录',
      pricing:0,       //报价中
      pendingPay:0,    //待付款
      pendingSend:0,   //待发货
      pendingReceive:0,//待收货
  },
  onLoad:function(){
      var that = this;
      var value = wx.getStorageSync('id_token');
      var name = wx.getStorageSync('name');
      if(value != ''){
          that.setData({
             token:value,
             userName:name
          });
          app.send(
             '/consignor/summary',
             'GET',
             {},
             that.data.token,
             function(res){
                 that.setData({
                     pricing:res.data.Pricing,
                     pendingPay:res.data.PendingPay,
                     pendingSend:res.data.PendingSend,
                     pendingReceive:res.data.PendingReceive,
                 })
             }
          )
      } 
  },
  onShow:function(){
        var that = this;
        var value = wx.getStorageSync('id_token');
        var name = wx.getStorageSync('name');
        if(value != ''){
            that.setData({
                token:value,
                userName:name
            });
            app.send(
                '/consignor/summary',
                'GET',
                {},
                that.data.token,
                function(res){
                    that.setData({
                        pricing:res.data.Pricing,
                        pendingPay:res.data.PendingPay,
                        pendingSend:res.data.PendingSend,
                        pendingReceive:res.data.PendingReceive,
                    })
                }
            )
        }else{
            that.setData({
                token:'',
                userName:'未登录',
            })
        }       
  },

  onHide:function(){
        var that = this;
        var value = wx.getStorageSync('id_token');
        var name = wx.getStorageSync('name');
        if(value != ''){
            that.setData({
                token:value,
                userName:name
            });
        }else{
            that.setData({
                token:'',
                userName:'未登录',
                pricing:0,       
                pendingPay:0,   
                pendingSend:0,   
                pendingReceive:0,
            })
        }
  },
//去登录页面
  goLogin:function(){
      var that = this;
      if(that.data.token){
            
      }else{
            wx.navigateTo({
                url: '../login/login',
            })
      }
  },
//去发布页面
  publish:function(){
        var that = this;
        if(that.data.token){
            wx.navigateTo({
                url: '../publish/publish',
            })
        }else{
            wx.navigateTo({
                url: '../login/login',
            })
        } 
  },
//我的订单
  myOrder:function(){
      var that = this;
      if(that.data.token){
            wx.navigateTo({
                url: '../myorder/myorder',
            })
      }else{
            wx.navigateTo({
                url: '../login/login',
            })
      }
  },
//退出登陆
  logOut:function(){
        try {
            wx.removeStorageSync('id_token');
            wx.removeStorageSync('code');
            wx.removeStorageSync('name');
            wx.removeStorageSync('phone');
        } catch(e) {

        }
        wx.navigateTo({
            url: '../login/login',
        })    
  },

  statusList:function(e){
        var that = this;
        var id = e.currentTarget.id;
        if(that.data.token){
            wx.navigateTo({
                url: '../statuslist/statuslist?id=' + id,
            })
        }else{
            wx.navigateTo({
                url: '../login/login',
            })
        }
  },
//修改密码
  editPassword:function(){
        var that = this;
        wx.navigateTo({
          url: '../editpassword/editpassword',
        })
  },

//关于车拉车
  about:function(){
        wx.navigateTo({
          url: '../about/about',
        })
  },


})