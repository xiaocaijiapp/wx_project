// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
//发送ajax请求 获取豆瓣的电影的热映列表

//引入第第三方库request-promise
const rp = require('request-promise');
// 创建main函数
exports.main = async (event,context)=>{
  // https://api.douban.com/v2/movie/in_theaters?city=广州&start=0&count=10
  // let url = `http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=&${event.count}&city=${event.city}`;
  let url = `https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&city=郑州&start=${event.start}&count=${event.count}`
  //向豆瓣发送电影
  return rp(url).then(res=>{
    //返回豆瓣 电影热映内容
    return res;
  }).catch(err=>{
    return err;
  })
}