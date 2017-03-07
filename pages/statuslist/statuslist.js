// pages/statuslist/statuslist.js
var app = getApp();
var site = require('../../utils/app.auto.js');
var moment = require('../../utils/moment.js');
Page({
  data:{
      apply:'',
      token:'',
      Pricing:'',
      id:''
  },
  onLoad:function(e){
      var eid = e.id;
      var that = this;
      this.setData({
          id:eid,
      });
      try {
          var value = wx.getStorageSync('id_token');
          if(value != ''){
                that.setData({
                    token:value,
                });
          }
      } catch (e) {
      };
      app.send(
            '/consignor/order',
            'GET',
            {category:this.data.id,},
            that.data.token,
            function(res){
                if(res){
                    console.log(res.data);
                    console.log(that.data.token)
                    var apply = res.data;
                    for (var i = 0;i < apply.length;i++){
                        apply[i].Starting = site.getCity(apply[i].Starting); 
                        apply[i].Ending   = site.getCity(apply[i].Ending);
                        apply[i].DepartTime = moment.getFormat(apply[i].DepartTime,"yyyy-MM-dd");
                        apply[i].Fromnow;
                        apply[i].Fromnow = moment.getFromnow(apply[i].CreateTime);
                        apply[i].Type == 'Bidding'?apply[i].Estimate = true:apply[i].Estimate = false;
                        apply[i].Remark == null?apply[i].Remark = "无":apply[i].Remark=apply[i].Remark;
                    }
                    that.setData({
                        apply:apply,
                    });   
                } 
            },
            function(res){
                console.log('error');
            }
      )
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

  toDetails:function(e){
      var that = this;
      var Code = e.currentTarget.id;
      var me = 13911006493;
      wx.navigateTo({
        url: '../details/details?Code='+ Code + '&me='+ me,
      })
  },
})