// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    uuid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uuid = options.uuid;
    that.setData({ uuid: uuid })
    // console.log('detail--->' + uuid)

    wx.request({
      url: 'http://www.luoliming.xyz/' + uuid,
      // url: 'http://192.168.31.66:8000/' + uuid,
      method: 'GET',
      success(res) {
        if (res.statusCode == "200") {
          // console.log(res.data)
          that.setData({
            'title': res.data.title,
            'address': res.data.address,
            'event': res.data.event,
            'name': res.data.name,
            'price': res.data.price,
            'contact': res.data.contact,
            'images': res.data.images,
            'time': res.data.time
          })

        }
        else if (res.statusCode == "400") {
          wx.showModal({
            title: '提示',
            content: res.data.errmsg,
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
      }
    })

  },

  handleClick: function (e) {
    let that = this;
    that.setData({ flag: true });

    wx.request({
      url: 'http://www.luoliming.xyz/' + that.data.uuid,
      // url: 'http://192.168.31.66:8000/' + that.data.uuid,
      method: 'DELETE',
      header: {
        'Authorization': wx.getStorageSync('jwt_token')
      },
      success(res) {
        if (res.statusCode == "200") {
          wx.showModal({
            title: '提示',
            content: '删除成功！',
            showCancel: false,
            success(res) {
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
            content: res.data.errmsg,
            showCancel: false
          })
        }
        else if (res.statusCode == "401") {
          wx.showModal({
            title: '提示',
            content: res.data.errmsg,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../admin_login/admin_login',
                })
              }
            }
          })
        }
        
      }
    })
  },

  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.images,
      current: that.data.images[e.currentTarget.dataset.index]
    })
  },

  // 打电话
  phoneCall: function (e) {
    let phoneNumber = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
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

  }
})