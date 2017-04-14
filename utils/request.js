
function send(url, method, data, token, success, fail) {
  var token = wx.getStorageSync('id_token');
  console.log(token)
  //https://api.carbycar.com.cn
  //http://open.3vcar.com
  wx.request({
    url: "http://open.3vcar.com" + url,
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