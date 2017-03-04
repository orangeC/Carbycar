function send(url, method, data, token, success) {
  wx.request({
    url: "https://api.carbycar.com.cn" + url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json',
      'Authorization': token
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  })

};
module.exports.send = send