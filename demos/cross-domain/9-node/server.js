const http = require('http');
const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.end(JSON.stringify({data: 'ccc'}))
  }
})

const port = 4000;
server.listen(port, () => {
  console.log(`port listen: ${port}`);
})