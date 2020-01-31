// pages/managepc/managepc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:13396089753,
    balance:10000,
    images:["../show_img/4.jpg",
      "../show_img/5.jpg",
      "../show_img/6.jpg",
      "../show_img/7.jpg",
      "../show_img/8.jpg",
    ],
    array: [{
      id: 1,
      state: 1,
      address:'一二三四五六七八九十一二三四五六七八九十',
      event: '双灶',
      date: '2020-1-1 10:10',
      name: '罗先生',
      price: '1.8',
      tel: '电话',
      num: '13396089753'
    }, 
      {
        id: 2,
        text: '生物油研发销售免费维修安装送油箱灶具',
        src: ['../show_img/1.jpg',
          '../show_img/21.jpg'],
        state:2,
        address: '武汉',
        event: '单灶',
        date: '2020',
        name: '黎明',
        price: '1.8',
        tel: '电话',
        num: '13396089753'
      }, 
      {
        id: 3,
        text: '生物油研发销售免费维修安装送油箱灶具',
        src: ['../show_img/1.jpg',
          '../show_img/21.jpg'],
        state: 3,
        address: '武汉',
        event: '老字号',
        date: '2020',
        name: '罗黎明妈',
        price: '1.8',
        tel: '电话',
        num: '13396089753'
      }, 

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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