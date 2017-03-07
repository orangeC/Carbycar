// pages/editpassword/editpassword.js
var app = getApp();
Page({
    data: {
        userName: '',
        editPasswordStatus: false,
        validCode: '',
        newPassword: '',
        attrC: false,
        attrR: true,
        countTime: 60
    },

    onshow: function () {

    },

    userNameInput: function (e) {
        this.setData({
            userName: e.detail.value
        })
        console.log(this.data.userName)
    },

    validCodeInput: function (e) {
        this.setData({
            validCode: e.detail.value
        })
        console.log(this.data.validCode)
    },

    newPasswordInput: function (e) {
        this.setData({
            newPassword: e.detail.value
        })
        console.log(this.data.newPassword)
    },

    checkNumber: function () {
        var that = this;
        var length = this.data.userName.length;
        if (length != '') {
            if (length == 11) {
                app.send('/message/valid', 'GET',{phone: this.data.userName,},'',function(res){
                    that.setData({
                        attrC: true,
                        attrR: false
                    });
                    setTimeout(function(){that.countdown();}, 1000);
                })

                // wx.request({
                //     url: 'https://api.carbycar.com.cn/message/valid',
                //     data: {
                //         phone: this.data.userName,
                //     },
                //     method: 'GET',
                //     header: {
                //         'content-type': 'application/json'
                //     },
                //     success: function (res) {
                //         that.setData({
                //             attrC: true,
                //             attrR: false
                //         })
                //     },
                //     fail: function (res) {
                //         console.log(res.data)
                //     }
                // })
            } else {
                wx.showToast({
                    title: '手机号码有误请重新输入',
                    icon: 'loading',
                    duration: 1000
                })
            }
        } else {
            wx.showToast({
                title: '请输入手机号码',
                icon: 'loading',
                duration: 1000
            })
        }
    },

    editPassword: function () {
        var that = this;
        if (this.data.userName != '' && this.data.validCode != '' && this.data.newPassword != '') {
            if (this.data.userName.length == 11) {
                if(this.data.newPassword.length >= 6 && this.data.newPassword.length <=20){
                    app.send('/system/findpassword','POST',
                            {
                                UserName: this.data.userName,
                                ValidCode: this.data.validCode,
                                Password: this.data.newPassword
                            },
                            '',
                            function(res){
                                wx.redirectTo({
                                    url: '../login/login',
                                })
                            }
                    )
                }else{
                    wx.showToast({
                        title: '密码长度6-20',
                        icon: 'loading',
                        duration: 1500
                    })
                }
                // wx.request({
                //     url: 'https://api.carbycar.com.cn/system/findpassword',
                //     data: {
                //         UserName: this.data.userName,
                //         ValidCode: this.data.validCode,
                //         Password: this.data.newPassword
                //     },
                //     method: 'POST',
                //     header: {
                //         'content-type': 'application/json'
                //     },
                //     success: function (res) {
                //         console.log('chenggong')
                //         console.log(res.data)
                //         wx.redirectTo({
                //             url: '../login/login',
                //         })
                //     },
                //     fail: function (res) {
                //         console.log('shibai')
                //     }
                // })
            } else {
                wx.showToast({
                    title: '手机号码不完整',
                    icon: 'loading',
                    duration: 1000
                })
            }
        }
    },

    //倒计时函数
    countdown: function () {
        var that = this;
        if (this.data.countTime > 0) {
            this.data.countTime--;
            this.setData({
                countTime: this.data.countTime,
            });
            setTimeout(function () { that.countdown() }, 1000);
            return;
        }
        this.setData({
            countTime: 60,
            attrC: false,
            attrR: true,
        })
    }
})