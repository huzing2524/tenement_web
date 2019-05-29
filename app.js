//app.js
App({
  onShow() {
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.globalData.iw = res.windowWidth;
        _this.globalData.ih = res.windowHeight;
      }
    })
  },
  globalData: {
    iw: "",
    ih: ""
  }
})