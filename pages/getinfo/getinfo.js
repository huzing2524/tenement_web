// pages/getinfo/getinfo.js
const app = getApp();

Page({
  data: {
    Explain: "支付名字请慎重填写哦!~",
    flag: true,
  },
  // 创建一个字典对象
  info: {
  },
  laternext: function (e) {
    this.info.role = e.detail.value;//获取radio值，类型：字符串
    // console.log(this.info.role)
  },
  handleinfo(e) {
    this.info.myname = e.detail.value
    // console.log(this.info.myname)
  },

  /**获取手机号js代码 -------------------------------------------------------------------------------------------*/
  getPhoneNumber: function (e) {
    console.log('e.detail...', e.detail);    

    // var ivObj = e.detail.iv;
    // var telObj = e.detail.encryptedData;
    // var codeObj = "";
    // var that = this;
    // if (!that.info.role) {
    //   console.log('我的角色为空', that.info.role)
    //   wx.showToast({
    //     title: '角色不能为空',
    //     icon: 'info',
    //     duration: 3000
    //   })
    // }

  },
  /**
   * 页面的初始数据
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        console.log('code...', res.code);
        console.log('res', res)
        //用code传给服务器调换session_key
        wx.request({
          url: 'http://192.168.31.66:8000/login', //接口地址
          method: 'GET',
          data: {
          code: res.code
          },
          success: function (res) {
            console.log('success...', res)
            app.globalData.openid = res.openid;
            // phoneObj = res.data.phoneNumber;
            // console.log("手机号=", phoneObj)
            // wx.setStorage({   //存储数据并准备发送给下一页使用
            //   key: "phoneObj",
            //   data: res.data.phoneNumber,
            // })
          },
          fail: function (res) {
            console.log("请求接口失败fail")
            wx.redirectTo({
              url: '../getinfo/getinfo',
            })
          }
        })

        //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
        // if (e.detail.errMsg == 'getPhoneNumber:user deny' || e.detail.errMsg == 'getPhoneNumber:fail Error: 该 appid 没有权限') { //用户点击拒绝
        //   wx.redirectTo({
        //     url: '../index/index',
        //   })
        // } else { //允许授权执行跳转
        //   console.log(e.detail.errMsg)
        //   wx.redirectTo({
        //     url: '../index/index',
        //   })
        // }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})