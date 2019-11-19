const express = require('express');
const app = express();
let whiteList = ['http://localhost:3000'];
app.use(function(req, res, next) {
  let origin = req.headers.origin;
  if(whiteList.includes(origin)) {
    // 表示那个源可以访问
    res.setHeader('Access-Control-Allow-Origin', origin);
    // 允许携带那个头
    res.setHeader('Access-Control-Allow-Headers', '*, Authorization');
    // 允许那些方法可以访问我
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    // 允许携带cookie
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 预检测存活时间 单位为秒
    res.setHeader('Access-Control-Max-Age', 6);
    // 允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    if(req.method === 'OPTIONS') {
      res.end(); // OPTIONS 请求不做任何处理
    }
  }
  next();
})
app.get('/getData', function(req, res) {
  console.log(req.query);
  res.end('bbb');
})
app.post('/getData', function(req, res) {
  console.log(req.query);
  res.end('bbb');
})
app.use(express.static(__dirname));

app.listen(4000)