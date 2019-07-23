Page({
  phonecall: function (e) {
    console.log(e.target.dataset.sss)
    wx.makePhoneCall({
      phoneNumber: this.data.array[e.target.dataset.sss].num
    })
  },
  // getMarkers() {
  //   wx.request({
  //     url: 'http://127.0.0.1:8868/add?a=1&b=2',
  //     method: 'get',
  //     // success: this.setData({ markers })
  //     success(){
  //       console.log("可以访问")
  //     } 
  //   })
  // },
  data: {
    // phonecalls: '13396089753',
    pagenum: 1,
    imglist: ['http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201801/jiaoben5647/img/5.jpg', 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201801/jiaoben5647/img/1.jpg', 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201801/jiaoben5647/img/2.jpg'],
    array: [{
      text: '广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1',
      src: [{img:'../show_img/1.jpg'},
        {img:'../show_img/2.jpg'},
        {img:'../show_img/3.jpg'},
        { img: '../show_img/4.jpg' },
        { img: '../show_img/5.jpg' }],
      address:'地点',
      event:'事件',
      date:'时间',
      person:'人物',
      price:'价格',
      tel: '电话',
      num:'13396089751'
    },{
        text: '广告展示图2广告展示图2广告展示图2广告展示图2广告展示图2广告展示图2广告展示图2',
        src: [{ img: '../show_img/1.jpg' },
        { img: '../show_img/2.jpg' },
        { img: '../show_img/3.jpg' },
        { img: '../show_img/4.jpg' },
        { img: '../show_img/5.jpg' }],
        address: '地点',
        event: '事件',
        date: '时间',
        person: '人物',
        price: '价格',
        tel: '电话',
        num: '13396089752'
      }, {
        text: '广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1',
        src: [{ img: '../show_img/1.jpg' },
        { img: '../show_img/2.jpg' },
        { img: '../show_img/3.jpg' },
        { img: '../show_img/4.jpg' },
        { img: '../show_img/5.jpg' }],
        address: '地点',
        event: '事件',
        date: '时间',
        person: '人物',
        price: '价格',
        tel: '电话',
        num: '13396089753'
      }, {
        text: '广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1',
        src: [{ img: '../show_img/1.jpg' },
        { img: '../show_img/2.jpg' },
        { img: '../show_img/3.jpg' },
        { img: '../show_img/4.jpg' },
        { img: '../show_img/5.jpg' }],
        address: '地点',
        event: '事件',
        date: '时间',
        person: '人物',
        price: '价格',
        tel: '电话',
        num: '13396089754'
      }, {
        text: '广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1',
        src: [{ img: '../show_img/1.jpg' },
        { img: '../show_img/2.jpg' },
        { img: '../show_img/3.jpg' },
        { img: '../show_img/4.jpg' },
        { img: '../show_img/5.jpg' }],
        address: '地点',
        event: '事件',
        date: '时间',
        person: '人物',
        price: '价格',
        tel: '电话',
        num: '1339608975'
      }, {
        text: '广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1',
        src: [{ img: '../show_img/1.jpg' },
        { img: '../show_img/2.jpg' },
        { img: '../show_img/3.jpg' },
        { img: '../show_img/4.jpg' },
        { img: '../show_img/5.jpg' }],
        address: '地点',
        event: '事件',
        date: '时间',
        person: '人物',
        price: '价格',
        tel: '电话',
        num: '13396089756'
      }, {
        text: '广告展示图last广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1广告展示图1',
        src: [{ img: '../show_img/1.jpg' },
        { img: '../show_img/2.jpg' },
        { img: '../show_img/3.jpg' },
        { img: '../show_img/4.jpg' },
        { img: '../show_img/5.jpg' }],
        address: '地点',
        event: '事件',
        date: '时间',
        person: '人物',
        price: '价格',
        tel: '电话',
        num: '13396089757'
      }],  
  },
  bt_click(){
    console.log("已点击")
    wx.navigateTo({
      url: '../publish/publish' 
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'xx小程序',
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
  loadProduct2: function () {
    var that = this;
    wx.request({
      url: 'https://xxx/?page=',
      method: 'get',
      // success: this.setData({ markers })
      success: function (res) {
  //       // 回调函数
  //       var moment_list = that.data.moment;
  //       const oldData = that.data.moment;
  //       that.setData({
  //         moment: oldData.concat(res.data.data)
  //       })
  //       // 隐藏加载框
  //       wx.hideLoading();
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
      title: '小明同学'
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
  topic_preview: function (e) {
    // var that = this;
    // var id = e.currentTarget.dataset.id;
    // var url = e.currentTarget.dataset.url;
    // var previewImgArr = [];
    // //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    // var data = that.data.topic_recomData;
    // for (var i in data) {
    //   if (id == data[i].id) {
    //     previewImgArr = data[i].pic;
    //   }
    // }
    wx.previewImage({
      current: 'https://www.baidu.com/img/bd_logo1.png', // 当前显示图片的http链接
      urls: this.data.imglist// 需要预览的图片http链接列表
    })
  },
})
