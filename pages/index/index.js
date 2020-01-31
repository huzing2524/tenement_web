
Page({
  //数据
  data: {
    psw:88888,
    num: 53869,
    array: [
      
    ],
  },
  //打电话
  phonecall: function (e) {
    // console.log(e.target.dataset.sss)
    wx.makePhoneCall({
      phoneNumber: this.data.array[e.target.dataset.sss].contact
    })
  },
  //首次进入加载数据
  onLoad:function(){
    this.loadProduct2()
  },
  //校验密码的正确性
  pass:{},
  password:function(e){
    this.pass.word = e.detail.value
  },
  bt_click(){
    wx.navigateTo({
      url: '../referencespc/referencespc' 
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '餐饮业小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  //请求网络处理函数，重置数据
  loadProduct2: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.13.128:8000/page_list',
      method: 'get',
      // success: this.setData({ markers })
      success: function (res) {
        
        // console.log(res.data)
        // 回调函数
        // var array_list = that.data.array;
        // const oldData = that.data.array; oldData.concat(res.data)新老数据连接需要处理
        that.setData({
          array: res.data
        })
        // 隐藏加载框
        wx.hideLoading();
      },fail:function(){
      }
    })//发起网络请求。使用前请先阅读说明。
  },
  onPullDownRefresh: function () {
    console.log("下拉");

    wx.setNavigationBarTitle({
      title: '刷新中……'
    })//动态设置当前页面的标题。

    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。

    this.loadProduct2();//重新加载产品信息

    wx.hideNavigationBarLoading();//隐藏导航条加载动画。

    wx.stopPullDownRefresh();//停止当前页面下拉刷新。

    console.log("关闭");

    wx.setNavigationBarTitle({
      title: '高旺能源欢迎您'
          })//动态设置当前页面的标题。
        },
  // onReachBottom: function () {
  //   console.log("上滑")
  //   var that = this;
  //   // 显示加载图标
  //   wx.showLoading({
  //     title: '玩命加载中',
  //   })
  //   setTimeout(function(){
  //     wx.hideLoading()
  //   },2000)
    
  //   // 页数+1
  //   page = page + 1;
  //   wx.request({
  //     url: 'https://xxx/?page=' + page,
  //     method: "GET",
  //     // 请求头部
  //     header: {
  //       'content-type': 'application/text'
  //     },
  //     success: function (res) {
  //       // 回调函数
  //       var moment_list = that.data.moment;
  //       const oldData = that.data.moment;
  //       that.setData({
  //         moment: oldData.concat(res.data.data)
  //       })
  //       // 隐藏加载框
  //       wx.hideLoading();
  //     }
  //   })
  // },
  //预览图片
  topic_preview: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    console.log(that.data.array)
    var previewImgArr = [];
    for (var i in that.data.array) {
      if (id == that.data.array[i].uuid) {
        console.log("into")
        var current_img = that.data.array[i].images[0].img;
        previewImgArr = that.data.array[i].images;
      }
    }
    wx.previewImage({
      current: current_img, // 当前显示图片的http链接
      urls:previewImgArr// 需要预览的图片http链接列表
    })
  },
  //二维码预览识别跳转
  nav:function(){
    wx.previewImage({
      urls: ['https://pic1.ajkimg.com/m/03cd6a84e1cca9163e33f95595feb426/120x120n@2x.jpg', 'http://pic7.58cdn.com.cn/bizmp/n_v2fa935e12728e4836a5c93d41e6c36d55_e43e0f2c00f5ddeb.jpg']
    })
    // wx.navigateToMiniProgram({
    //   appId: 'wxfb1ff0f3u0abe913', // 要跳转的小程序的appid
    //   path: 'page/index/index', // 跳转的目标页面
    //   extarData: {
    //     open: 'auth'
    //   },
    //   success(res) {
    //     // 打开成功  
    //     console.log("跳转成功")
    //   },
    //   fail(res){
    //     console.log("fail")
    //     console.log(res)
    //   }
    // }) 
  },
  my_deleteinfo:{},
  //校验密码删除信息
  del_info:function(e){
    let that=this
    if (that.pass.word =='高旺环保88888'){
      that.my_deleteinfo.uuid = e.target.dataset.aaa
      // console.log(e.target.dataset.aaa)//找寻需要删除的信息的id值
      // console.log("密码正确")
      // console.log(that.my_deleteinfo)
      wx.request({
        url: 'http://192.168.13.128:8000/info_delete',
        data: that.my_deleteinfo,
        method: "delete",
        success: function(res){
            that.loadProduct2()
        }
      })
    }else{
      console.log("密码错误")
      that.setData({
        'value': ''
      })
      that.setData({
        'psw': '请重新输入'
      })
    }
  },
  navigagetonamage: function (e) {
    let that = this
    if (that.pass.word == '高旺环保88888') {
      console.log("跳转到发布页")
      wx.navigateTo({
        url: '../managerpc/managerpc'
      }),
      //这里需要换不同的url,管理员的个人中心
      wx.request({
        url: 'http://192.168.13.128:8000/info_delete',
        data: that.my_deleteinfo,
        method: "delete",
        success: function (res) {
          that.loadProduct2()
        }
      })
    } else {
      console.log("密码错误")
      that.setData({
        'value': ''
      })
      that.setData({
        'psw': '请重新输入'
      })
    }
  }

})
