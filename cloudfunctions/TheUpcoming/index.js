// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise')
cloud.init()
exports.main = async (event,context)=>{
  let url = `http://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.xstart}&count=10`;
  return rq(url)
  .then(res=>{
    return res
  })
  .catch(err=>{
    return err
  })
}