const http = require("http");
const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);

  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      '<html><head><title>Enter Message</title></head><body><form action="/message" method="POST"><input type="text" name="message"><button>Enter</button></form></body></html>'
    );
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>My First Page</title></head><body><h1> Hello My node js Server</h1></body></html>"
  );
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: "som hard coded text",
};
