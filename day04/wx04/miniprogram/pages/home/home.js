// pages/home/home.js
Page({
  data: {
    //3:保存数据
    list:[]
  },
  loadMore:function(){
    //console.log(123);
    //1:调用云函数movielist3
    wx.cloud.callFunction({ //调用云函数
      name:"movielist3",    //函数名
      data:{start:0,count:10}//参数
    }).then(res=>{          //调用成功
        //console.log(res)    //结果
        //问题:res.result 查询结果字符串
        //解决:将字符串转js对象
        var obj = JSON.parse(res.result);
        //保存电影列表 subjects 电影列表
        this.setData({
          list: obj.subjects
        });
        console.log(obj.subjects);
        //

    }).catch(err=>{         //调用失败
        console.log(err);   //失败原因
    })
    //2:将返回结果保存

  },
  onLoad: function (options) {
    this.loadMore();
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