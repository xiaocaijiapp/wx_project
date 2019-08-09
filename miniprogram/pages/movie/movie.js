// miniprogram/pages/movie/movie.js
var amapFile = require('../../libs/amap-wx.js')
Page({
    /**
   * 页面的初始数据
   */
  data: {
    current:1,
    winHeight:0,
    movieList:[],
    isHidden:false,
    isShow:true,
    start:0,
    count:10,
    MapKey: 'e7553c3f5d8a44616fb089ffe3dcd23f',
    city:'' ,
    dyLists:[],
    upcomingLists:[],
    xstart:0
  },
  searchBtn(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  jumpDetails(e){
    var _id=e.currentTarget.dataset.uid
    console.log(_id);
    if(e.target.id == 'btn'){
      return
    }else{
      wx.navigateTo({
        url: '/pages/details/details?_id='+_id,
      })
    }
    
  },
  //获取即将上映的电影列表
  getUpcoming(xstart = 0){
    //调用云函数
    wx.cloud.callFunction({
      name:'TheUpcoming',
      data:{
        xstart
      }
    })
    .then(res=>{
      const upcomintList = JSON.parse(res.result).subjects
      console.log(upcomintList);
      if(res){
        this.setData({
          xstart: this.data.xstart + 10,
          upcomingLists: this.data.upcomingLists.concat(upcomintList)
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  },
  //获取本周口碑数据
  getMouth(){
    wx.cloud.callFunction({
      name:'Word_of_mouth'
    }).then(res=>{
      var movieArr = JSON.parse(res.result).subjects
      this.setData({
        dyLists: movieArr
      })
      // console.log(movieArr);
    }).catch(err=>{
      console.log(err);
    })
  },
  cityChange(){
    wx.navigateTo({
      url: "/pages/city/city",
    })
  },
  clickTab(e){
   if(this.data.current == e.target.dataset.current){
     return false;
   }else{
     this.setData({
       current: e.target.dataset.current
     })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取即将上映的电影
    this.getUpcoming();
    //给header设置内容
    wx.setNavigationBarTitle({ title: '猫眼电影' })  
    this.setData({
      //动态获取窗口的高度
      winHeight: wx.getSystemInfoSync().windowHeight
    });
   //高德地图获取定位返回值
    this.getPos().then(res=>{
      this.setData({
        city : res
      })
    })
    this.requestDate();
    //获取口碑数据
    this.getMouth();
  },
  getPos(){
    return new Promise((resolve,reject)=>{
    //高德地图获取定位信息
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key:this.data.MapKey});
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        var city = data[0].regeocodeData.addressComponent.city;
        resolve(city)
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    })
  },
  requestDate(start=0,count=10){
    wx.cloud.callFunction({
      name: "reshots",
      data: {
        start,
        count,
        city:this.data.city
      },
    }).then(res => {
      if(res){
        this.setData({
          start:this.data.start + 10
        })
      }
      var arr = JSON.parse(res.result).subjects
      this.setData({
        movieList: this.data.movieList.concat(arr)
      })
      if (arr.length < 10) {
        this.setData({
          isHidden: true,
          isShow: false
        })
      }
    }).catch(err => {
      return err
    })
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      movieList:[],
      start:0,
      count:10
    })
    this.requestDate(0,10);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.requestDate(this.data.start)
    console.log(this.data.xstart);
    this.getUpcoming(this.data.xstart)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})