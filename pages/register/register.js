// pages/register/register.js  
var app = getApp();
Page({
    data: {
        registerStatus: true,
        userName: '',
        userPassword: '',
        phone: '',//请求验证码的手机号
        validCode: '',
        accountType: 'Consignor',
        attrC: false,
        attrR: true,
        countTime: 60
    },

    userNameInput: function (e) {
        this.setData({
            userName: e.detail.value
        })
        console.log(e.detail.value)
    },

    userPasswordInput: function (e) {
        this.setData({
            userPassword: e.detail.value
        })
        console.log(e.detail.value)
    },

    validCodeInput: function (e) {
        this.setData({
            validCode: e.detail.value
        })
        console.log(e.detail.value)
    },

    checkboxChange: function (e) {
        var that = this;
        console.log(e.detail.value)
        if (e.detail.value != '') {
            that.setData({
                registerStatus: false,
            })
        } else {
            that.setData({
                registerStatus: true,
            })
        }
    },

    //获取验证码
    checkNumber: function () {
        var that = this;
        var length = this.data.userName.length;
        console.log(length)
        if (length != '') {
            if (length == 11) {
                console.log(length)
                app.send('/message/valid','GET',{phone: this.data.userName,},'',function(res){
                    console.log(res.data)
                    that.setData({
                        attrC: true,
                        attrR: false
                    })
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
                //         console.log(res.data)
                //         that.setData({
                //             attrC: true,
                //             attrR: false
                //         })
                //         setTimeout(function(){that.countdown();}, 1000);
                //     },
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
    //注册
    register: function () {
        var that = this;
        if (this.data.userPassword != '') {
            if (this.data.validCode != '') {
                if (this.data.userName != '') {
                    if(this.data.userPassword.length >= 6 && this.data.userPassword.length <=20){
                        app.send(
                                '/system/signup',
                                'POST',
                                {
                                    UserName: this.data.userName,
                                    Password: this.data.userPassword,
                                    ValidCode: this.data.validCode,
                                    AccountType: this.data.accountType
                                },
                                '',
                                function(res){
                                    wx.redirectTo({
                                        url: '../login/login',
                                    })
                                }
                        )
                    }else {
                        wx.showToast({
                            title: '密码长度6-20',
                            icon: 'loading',
                            duration: 1500
                        })
                    }
                } else {
                    wx.showToast({
                        title: '请填写手机号码',
                        icon: 'loading',
                        duration: 1500
                    })
                }
            } else (
                wx.showToast({
                    title: '请填写验证码',
                    icon: 'loading',
                    duration: 1500
                })
            )
        } else {
            wx.showToast({
                title: '请填写密码',
                icon: 'loading',
                duration: 1500
            })
        }
    },

    //倒计时函数
    countdown:function() {
    var that = this;
        if (this.data.countTime > 0) {
            this.data.countTime--;
            this.setData({
                countTime:this.data.countTime,
            });
            setTimeout(function(){that.countdown()},1000);
            return;
        }
        this.setData({
            countTime: 60,
            attrC: false,
            attrR: true,
        })
    }
})