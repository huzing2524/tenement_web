// pages/publish/publish.js
var idx = require('../index/index.js')
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    title: '',
    address: '',
    event: '',
    name: '',
    price: '',
    contact: '',
    images: [],

    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    flag: true
  },

  handleinfo(e) {
    this.data.title = e.detail.value
  },
  handleinfo1(e) {
    this.data.address = e.detail.value
  },
  handleinfo2(e) {
    this.data.event = e.detail.value
  },
  handleinfo4(e) {
    this.data.name = e.detail.value
  },
  handleinfo5(e) {
    var price = e.detail.value
    this.data.price = parseFloat(parseFloat(price).toFixed(2))
  },
  handleinfo6(e) {
    var contact = e.detail.value
    this.data.contact = contact
  },

  // 删除图片
  clearImg: function (e) {
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
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 5 - that.data.uploaderNum, // 默认5
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 5) {
          that.setData({
            showUpload: false
          })
        }
        // 上传图片       
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths[i], // 选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调              
              that.data.images.push(res.data)
            }
          })
        };
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length
        })
      }
    })
  },
  handlePublishSuccess(data) {
    this.setData({
      flag: false
    })
  },
  // 防止按钮重复提交
  handleClick() {
    let that = this;
    that.handlePublishSuccess();

    if (that.data.title && that.data.address && that.data.event && that.data.name && that.data.price && that.data.contact) {
      // 手机号码格式 正则表达式校验      
      if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(that.data.contact)) {
        // 价格 校验数据类型
        if (!isNaN(that.data.price)) {
          wx.request({
            url: 'http://www.luoliming.xyz/publication_info',
            data: {
              'title': that.data.title,
              'address': that.data.address,
              'event': that.data.event,
              'name': that.data.name,
              'price': that.data.price,
              'contact': that.data.contact,
              'images': that.data.images,
            },
            method: "post",
            success: function (res) {
              if (res.statusCode == '400') {
                wx.showModal({
                  title: '提示',
                  content: res.data.errmsg,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.reLaunch({
                        url: '../publish/publish',
                      })
                    }
                  }
                })
              } else if (res.statusCode == '200') {
                wx.showModal({
                  title: '提示',
                  content: '发布成功！',
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
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '发布信息失败，请重试！',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.reLaunch({
                      url: '../publish/publish',
                    });
                  }
                },
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '价格请输入数字！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../publish/publish',
                });
              }
            },
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '手机号码格式错误！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '../publish/publish',
              });
            }
          },
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整内容！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            /* 
            wx.redirectTo：关闭当前页，跳转到指定页。
            wx.navigateTo：保留当前页，跳转到指定页。
            wx.reLaunch：关闭所有页面，打开到应用内的某个页面。
            wx.switchTap：只能用于跳转到tabbar页面，并关闭其他非tabbar页面。
            wx.navigateBack：关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()获取当前的页面栈，决定需要返回几层。
            */
            wx.reLaunch({
              url: '../publish/publish',
            });
          }
        },
      })
    }
  }
})