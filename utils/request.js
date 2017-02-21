function send(url, method, data, success) {
  wx.request({
    url: "http://open.3vcar.com"+url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      success(res);
    },
    fail:function(res){
        fail(res);
    }
  })
};
module.exports.send = send