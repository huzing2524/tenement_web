Page({
  //数据
  data: {
    psw: 88888,
    num: 53869,
    index_data: [],
  },
  //打电话
  phonecall: function(e) {
    // console.log(e.target.dataset.sss)
    wx.makePhoneCall({
      phoneNumber: this.data.index_data[e.target.dataset.sss].contact
    })
  },
  //首次进入加载数据
  onLoad: function() {
    this.loadProduct2()
  },
  //校验密码的正确性
  pass: {},
  password: function(e) {
    this.pass.word = e.detail.value
  },
  bt_click() {
    wx.navigateTo({
      url: '../publish/publish'
    })
  },
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '餐饮业小程序',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  //请求网络处理函数，重置数据
  loadProduct2: function() {
    var that = this;
    wx.request({
      url: 'http://www.luoliming.xyz/page_list',
      method: 'get',
      // success: this.setData({ markers })
      success: function(res) {

        // console.log(res.data)
        // 回调函数
        // var array_list = that.data.index_data;
        // const oldData = that.data.index_data; oldData.concat(res.data)新老数据连接需要处理
        that.setData({
          index_data: res.data
        });
        
        // 隐藏加载框
        wx.hideLoading();
      },
      fail: function() {}
    }) //发起网络请求。使用前请先阅读说明。
  },
  onPullDownRefresh: function() {
    console.log("下拉");

    wx.setNavigationBarTitle({
      title: '刷新中……'
    }) //动态设置当前页面的标题。

    wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。

    this.loadProduct2(); //重新加载产品信息

    wx.hideNavigationBarLoading(); //隐藏导航条加载动画。

    wx.stopPullDownRefresh(); //停止当前页面下拉刷新。

    console.log("关闭");

    wx.setNavigationBarTitle({
      title: '高旺能源欢迎您'
    }) //动态设置当前页面的标题。
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
  topic_preview: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    console.log(that.data.index_data)
    var previewImgArr = [];
    for (var i in that.data.index_data) {
      if (id == that.data.index_data[i].uuid) {
        console.log("into")
        var current_img = that.data.index_data[i].images[0].img;
        previewImgArr = that.data.index_data[i].images;
      }
    }
    wx.previewImage({
      current: current_img, // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  },
  //二维码预览识别跳转
  click: function() {
    wx.previewImage({
      urls: ['https://huzing2524.oss-cn-shenzhen.aliyuncs.com/tenement/prod/%E8%BD%AC%E8%A1%8C.jpg']
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
  my_deleteinfo: {},
  //校验密码删除信息
  del_info: function(e) {
    let that = this
    if (that.pass.word == '高旺环保88888') {
      that.my_deleteinfo.uuid = e.target.dataset.aaa
      // console.log(e.target.dataset.aaa)//找寻需要删除的信息的id值
      // console.log("密码正确")
      // console.log(that.my_deleteinfo)
      wx.request({
        url: 'http://192.168.13.128:8000/info_delete',
        data: that.my_deleteinfo,
        method: "delete",
        success: function(res) {
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