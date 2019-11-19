const http = require('http');

// 第一步: 接收客户端请求
const server = http.createServer((req, res) => {
  // 代理服务器, 直接和浏览器通信, 需要设置cors的报文头部
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': '*',
  })

  // 第二步: 将请求转发给服务器
  const proxyRequest = http
  .request({
      host: '127.0.0.1',
      port: 4000,
      url: '/',
      method: res.method,
      headers: res.headers,
    }, serverResponse => {
      // 第三步: 收到服务器请求
      let body = '';
      serverResponse.on('data', chunk => {
        body += chunk
      })
      serverResponse.on('end', () => {
        console.log('The data is' + body);
        // 第四步: 将响应结果转发给浏览器
        res.end(body)
      })
    })
  .end()
})

const port = 3000;
server.listen(port, () => {
  console.log(`port listen: ${port}`)
})
