//logs.js
const util = require('../../utils/util.js')

Page({
  data:{
    inputVal:'',
    list:[]
  },
  handleSearch(e){
    this.setData({
      inputVal:e.detail.value
    })
  },
  handleSend(){
     var _this = this;
     wx.request({
       url: 'http://localhost:3000/list?q='+_this.data.inputVal,
       method: "get",
       success: this.handlePublishSuccess.bind(this)
     })
  }, 
  handlePublishSuccess(data) {
     this.setData({
       list:data.data
     })
     console.log(data.data)
  },
  handleTo(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  }
})
