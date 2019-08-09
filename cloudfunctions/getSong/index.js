// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const rq = require('request-promise')
exports.main = async (event,context)=>{
  let url = `https://v1.itooi.cn/tencent/search?keyword=${event.value}&type=song&pageSize=5&page=0`
  return rq(url)
  .then(res=>{
    return res
  })
  .catch(err=>{
    return err
  })
}
