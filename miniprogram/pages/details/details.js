// miniprogram/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},
    value: 3,
    isZk:'展开',
    iszs:true
  },
  textChange(){

    if (this.data.iszs){
      this.setData({
        isZk: '收起',
        iszs: false
      })
    }else{
      this.setData({
        isZk: '展开',
        iszs: true
      })
    }
    
  },
  onChange(event) {
    console.log(event);
    this.setData({
      value: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载数据..'
    })
    let _id = options._id;
    wx.cloud.callFunction({
      name:"movieDetails",
      data:{
        _id
      }
    })
    .then(res=>{
      if(res){wx.hideLoading()}
      var _res = JSON.parse(res.result)  
      this.setData({
        details :_res
      })
      console.log(this.data.details);
    })
    .catch(err=>{
      console.log(err);
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})