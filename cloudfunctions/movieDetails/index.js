// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const rq = require('request-promise')
exports.main = async (event,context)=>{
  let url = `https://api.douban.com/v2/movie/subject/${event._id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  return rq(url)
  .then(res=>{
    return res
  })
  .catch(err=>{
    return err
  })
}
