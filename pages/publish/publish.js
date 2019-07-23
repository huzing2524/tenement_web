//logs.js
// pages/publish/publish.js

var util = require('../../utils/util.js')
Page({
  data: {
    swiperIndex: 0,
    image: [],
    Explain: "填写您的具体需求title0",
    Explain1:'填写您的具体需求title1',
    Explain2: '填写您的具体需求title2',
    Explain4: '填写您的具体需求title4',
    Explain5: '填写您的具体需求title5',
    Explain6: '填写您的具体需求title6',
    flag:true,
    imglist: "../../resource/img/sell.png"
  },
  swiperChange(e) {
    var that = this;
    that.setData({
      swiperIndex: e.detail.current,           /*定义当前数据的swiperIndex等于当前数据的current*/
    })
  },
  info: {
    pic:[]
  },
  handleinfo(e) {
    this.info.title = e.detail.value
  },
  handleinfo1(e) {
    this.info.address = e.detail.value
  },
  handleinfo2(e) {
    this.info.incident = e.detail.value
  },
  handleinfo4(e) {
    this.info.name = e.detail.value
  },
  handleinfo5(e) {
    this.info.price = e.detail.value
  },
  handleinfo6(e) {
    this.info.tel = e.detail.value
  },
  handlepic(e) {
    this.info.pic.push(e)
  },
  handleClick() {
    var _this = this;
    console.log(this.info)
    wx.request({
      url: 'http://localhost:3000/list',
      data: this.info,
      method: "post",
      success: this.handlePublishSuccess.bind(this)
    })
  }, 
  handlePublishSuccess(data) {
    this.setData({
      flag:false
    })
  },
  handleHome(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  uploadpic: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.warn(tempFilePaths, 'tempFilePaths')
        
        that.setData({
          image: [...that.data.image, ...tempFilePaths]
        })
        that.handlepic(tempFilePaths)
      }
    })
  },
})
