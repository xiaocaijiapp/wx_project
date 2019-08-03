// pages/homework/homework.js
//1:初始化数据库实例对象
const db = wx.cloud.database();

Page({
  data: {
    list:[] //云存储图片fileID
  },
  showPic:function(){
    //函数:此函数负责获取myphoto集合所有记录
    //    并且显示模板中
    //1:获取集合myphoto所有记录10:33
    db.collection("myphoto")//指定集合
    .get()                  //查询
    .then(res=>{            //查询成功
      var list = res.data;
      this.setData({        //将查询结果保存
        list:list           //数据名:值
      })
    })
    .catch(err=>{           //查询失败
      console.log(err);
    })
    //2:将返回数据保存 list
  },
  myupload:function(){
   //函数:此函数负责选中图片并且上传至云存储
   //    上传成功后将图片fileID保存myphoto
   //    集合中
   //1:选择一张图片
   wx.chooseImage({       //选图片
     count:1,             //选中张数
     sizeType:["original",//原图
     "compressed"],       //压缩图
     sourceType:["album", //相册
     "camera"],           //相机
     success: function(res) {//选中成功
   //1.1:选择图片成功后将选中图片上传云存储
   //  1.1.1 上传成功将fileID保存
   //  myphoto集合中
    //2:上传图片
    //2.1:获取选中图片
    var file = res.tempFilePaths[0];
    //2.2:给图片起一新名字9:40
    var newFile = new Date().getTime()+".jpg"
    //2.3:上传图片
    wx.cloud.uploadFile({//上传
      cloudPath:newFile, //新文件名
      filePath:file,     //选中图片名
      success:(res)=>{   //上传成功
         //console.log(res.fileID)//返回值
         //3:将上传fileID保存 myphoto集合中
         //3.1:创建变量保存fileID 10
         var fId = res.fileID;
         //3.2:向集合myphoto添加一行记录
         db.collection("myphoto")
         .add({
            data:{fileID:fId}//记录
         })
         .then(res=>{console.log(res)})
         .catch(err=>{console.log(err)})
         //3.3:成功 失败
      },
      fail:(err)=>{      //上传失败
         console.log(err);//失败原因
      }
    })


   
   
   
   },
     fail:function(err){
         console.log(err)
     }
   })

   
  },
  onLoad: function (options) {

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