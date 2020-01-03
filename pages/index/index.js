Page({
  //数据
  data: {
    index_data: []
  },

  //首次进入加载数据
  onLoad: function() {
    this.loadPage()
  },

  //请求网络处理函数，重置数据
  loadPage: function() {
    var that = this;
    wx.request({
      url: 'http://www.luoliming.xyz/page_list',
      method: 'get',
      success: function(res) {
        // console.log('res.data', res.data)
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
    wx.setNavigationBarTitle({
      title: '刷新中……'
    }) //动态设置当前页面的标题。

    wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。

    this.loadPage(); //重新加载产品信息

    wx.hideNavigationBarLoading(); //隐藏导航条加载动画。

    wx.stopPullDownRefresh(); //停止当前页面下拉刷新。

    wx.setNavigationBarTitle({
      title: '武汉高旺能源'
    }) //动态设置当前页面的标题。
  },

  //预览图片
  preview: function(e) {
    var that = this;
    var uuid = e.currentTarget.dataset.uuid;
    var previewImgArr = [];

    for (var i in that.data.index_data) {
      if (uuid == that.data.index_data[i].uuid) {        
        /* 
        var和let的区别：
        1. 用let的方式声明的变量，为局部变量，该变量只会在最靠近{ }内的范围有效，出了{}之后，该变量就不能够再用了，否则会报该变量未定义的错误。也就是说，该变量的作用域为所在的代码块内。
        2. 用var的方式声明的变量，为全局变量，其作用域为所在的函数内。所以重点来了，在当前JS文件的其余函数中，如果直接拿来用，也会报变量未定义的错误。
        */
        var current_img = that.data.index_data[i].images[0];  // 只能用var，不能用let，否则下面会报错current_img变量未被定义
        previewImgArr = that.data.index_data[i].images;
      }
    }
    wx.previewImage({
      current: current_img, // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  },

  // 跳转详情页
  goDetail: function(e){
    var uuid = e.currentTarget.dataset.item_uuid;    

    wx.navigateTo({
      url: '../detail/detail?uuid=' + uuid,
    })
  }

})