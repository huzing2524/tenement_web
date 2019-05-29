//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    latitude:'',
    longitude:'',
    iw:'',
    ih:'',
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../img/pin.png',
      position: {
        left:( app.globalData.iw-22)/2,
        top: (app.globalData.ih - 31) / 2-31,
        width: 22,
        height: 31
      }
    },
      {
        id: 2,
        iconPath: '../../img/center.png',
        position: {
          left: 20,
          top: app.globalData.ih - 80,
          width: 24,
          height: 23
        },
        clickable: true
      }
    ]
  },
  onShow(){
    const _this= this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
    this.getMarkers()
  },
  onReady() {
    this.MapContext = wx.createMapContext("map",this);
  },
  controltap(e) {
    this.MapContext.moveToLocation()
  },
  handlepublish(){
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  handlesearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getMarkers(){
    wx.request({
      url: 'http://localhost:3000/list',
      method:'get',
      success:this.handlegetMarkers.bind(this)
    })
  },
  handlegetMarkers(data){
    console.log(data)
    let markers = data.data.map((item)=>({
      iconPath: "../../resource/img/"+item.type+".png",
      id: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      width: 35,
      height: 35,
    }))
    this.setData({markers})
  },
  markertap(e){
    wx.navigateTo({
      url: '../details/details?id='+e.markerId,
    })
  }
})
