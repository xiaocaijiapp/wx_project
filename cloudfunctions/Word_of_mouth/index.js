// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const rq = require('request-promise')
//调用本周口碑榜 最近热度高的电影
exports.main = async (event,context)=>{
  let url = ` http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  return rq(url)
  .then(res=>{
    return res
  })
  .catch(err=>{
    return err
  })
}
