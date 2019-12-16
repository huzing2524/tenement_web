//logs.js
// pages/publish/publish.js
var idx = require('../index/index.js')
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,

    publicinfo: "发 布",
    swiperIndex: 0,
    image: [],
    title: '最多输入30字！',
    address: '最多输入60字！',
    event: '最多输入100字！',
    name: '最多输入30字！',
    price: '保留2位小数！',
    contact: '请填写您的手机号！',
    flag: true
  },

  // 删除图片
  clearImg: function(e) {
    var nowList = []; //新数据
    var uploaderList = this.data.uploaderList; //原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function(e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function(e) {
    var that = this;
    wx.chooseImage({
      count: 5 - that.data.uploaderNum, // 默认5
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 5) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
        console.log(uploaderList.length)
        console.log(uploaderList)
      }
    })
  },

  chooseItem: function(e) {
    wx.navigateTo({
      url: '../upload/upload',
    })
  },
  swiperChange(e) {
    var that = this;
    that.setData({
      swiperIndex: e.detail.current,
      /*定义当前数据的swiperIndex等于当前数据的current*/
    })
  },
  info: {
    images: []
  },
  handleinfo(e) {
    this.info.title = e.detail.value
  },
  handleinfo1(e) {
    this.info.address = e.detail.value
  },
  handleinfo2(e) {
    this.info.event = e.detail.value
  },
  handleinfo4(e) {
    this.info.name = e.detail.value
  },
  handleinfo5(e) {
    var price = e.detail.value
    this.info.price = parseFloat(price)
  },
  handleinfo6(e) {
    var contact = e.detail.value
    this.info.contact = contact
  },
  handlepic(e) {
    this.info.images.push(e)
  },
  handleClick() {
    let that = this;
    console.log(that.info)

    if (that.info.title && that.info.address && that.info.event && that.info.name && that.info.price && that.info.contact) {
      wx.request({
        url: 'http://www.luoliming.xyz/publication_info',
        data: that.info,
        method: "post",
        success: function(res) {
          that.handlePublishSuccess()
          if (res.statusCode == '400') {
            wx.showModal({
              title: '提示',
              content: res.data.errmsg,
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/index',
                  })
                }
              }
            })
          } else if (res.statusCode == '200') {
            // wx.navigateTo({
            //   url: '../index/index',
            // })
            wx.showModal({
              title: '提示',
              content: '发布成功！',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              }
            })
          }
        },
        fail: function() {
          console.log("发布请求失败")


        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整内容！',
        showCancel: false
      })
    }
  },
  handlePublishSuccess(data) {
    this.setData({
      flag: false
    })
  },



  /* handleHome() {
    wx.navigateBack({
      url: '../index/index',
    })
  }, */

  /* uploadpic: function() {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  }, */

  /* chooseWxImage: function(type) {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        // console.warn(tempFilePaths, 'tempFilePaths')
        // console.warn(tempFilePaths.length)
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              that.handlepic(res.data)
            }
          })
        }

        that.setData({
          image: [...that.data.image, ...tempFilePaths]
        })
      }
    })
  }, */

  /* admin: function(e) {
    wx.previewImage({
      current: "", // 当前显示图片的http链接
      urls: ['https://huzing2524.oss-cn-shenzhen.aliyuncs.com/tenement/test/default.jpg'] // 需要预览的图片http链接列表
    })
  } */
})