//logs.js
// pages/publish/publish.js
Page({
  data: {
    address: "点击选择，要勾选哦",
    Explain:'填写您的具体需求',
    connect:'填写您的联系方式',
    flag:true
  },

  info: {
    type: "buy",
    explain: ""
  },
  radioChange(e) { 
    this.info.type = e.detail.value
  },
  handleinfo(e) {
    this.info.explain = e.detail.value
  },
  handletel(e) {
    this.info.tel = e.detail.value
  },
  handleMap() {
    const _this = this;
    wx.chooseLocation({
      success(data) {
        _this.setData({
          address: data.address
        })
        _this.info.address = data.address
        _this.info.latitude = data.latitude
        _this.info.longitude = data.longitude
      }
    })
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
  }
})
