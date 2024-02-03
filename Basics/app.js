const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>My First Page</title></head><body><h1> Hello My node js Server</h1></body></html>"
  );
  res.end();
});

server.listen(3000);
