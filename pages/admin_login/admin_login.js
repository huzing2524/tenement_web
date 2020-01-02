// pages/admin_login/admin_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: true,
    passwordFlag: true,
    input_type: "password",
    account: "",
    password: ""
  },
  getAccount: function (e) {
    this.data.account = e.detail.value
  },
  getPassword: function (e) {
    this.data.password = e.detail.value
  },

  //点击小眼睛图标
  showOrHide: function (e) {
    if (this.data.passwordFlag) {
      this.setData({
        passwordFlag: false,
        input_type: "text"
      })
    } else {
      this.setData({
        passwordFlag: true,
        input_type: "password"
      })
    }
  },
  adminLogin: function (e) {
    var that = this;
    that.setData({ passwordFlag: false })

    console.log('account', that.data.account);
    console.log('password', that.data.password);
    if (that.data.account && that.data.password) {
      wx.request({
        url: 'http://www.luoliming.xyz/admin_login',
        data: {
          "account": that.data.account,
          "password": that.data.password
        },
        method: "post",
        success: function (res) {
          if (res.statusCode == "200") {
            wx.showModal({
              title: '提示',
              content: '登录成功！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '../index/index',
                  })
                }
              }
            })
          }
          else if (res.statusCode == "400") {
            wx.showModal({
              title: '提示',
              content: '参数不足，请重试！',
              showCancel: false
            })
          }
          else if (res.statusCode == "404") {
            wx.showModal({
              title: '提示',
              content: '请求地址不存在！',
              showCancel: false
            })
          }
          else if (res.statusCode == "500") {
            wx.showModal({
              title: '提示',
              content: '服务器错误，请重试！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '../admin_login/admin_login',
                  })
                }
              }
            })
          }
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请输入帐号和密码！',
        showCancel: false
      })
    }
  }
})