const http = require('http');
const url = require('url');
const util = require('util');
const fs = require('fs');
const lookup = require('mime-types').lookup;

const port = 1000;



const server = http.createServer(function(req, res) {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;

  path = path.replace(/^\/+|\/+$/g, "");
  console.log(path);

  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();

  if (path == "") {
    path = "index.html";
  }



    console.log(`Requested path ${path} `);

    let file = __dirname + "\\" + path;

    fs.readFile(file, function(err, content) {
      if (err) {
        console.log(`File Not Found ${file}`);
        res.writeHead(404);
        res.end();
      } else {
        console.log(`Returning ${path}`);
        res.setHeader("X-Content-Type-Options", "nosniff");
        let mime = lookup(path);
        res.writeHead(200, { "Content-type": mime });
        console.log("Mime is: " + mime);
        res.end(content);
      }
    });
});


server.listen(port, function() {
  console.log("Server running on port " + port);
});
