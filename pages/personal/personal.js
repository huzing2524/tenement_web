// pages/personal/personal.js

var app = getApp()
Page({
  data: {
    userInfo: {},
    list: [
      {
        list_tool: [
          {
            img: "../icons/admin.png",
            name: "管理员登录",
            url: "../admin_login/admin_login"  // 跳转页面
          },
          {
            img: "",
            name: "待续1...",
            url: ""
          },
          {
            img: "",
            name: "待续2...",
            url: ""
          }
        ]
      },

    ]
  },
  
  goPage: function (event) {
    // console.log(event.currentTarget.dataset.log);
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },
  // onLoad: function () {
  //   wx.showNavigationBarLoading();
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   that.setData({
  //     userInfo: app.globalData.userInfo
  //   })
  // }
})
