const fs = require('fs')


const reuestHandler = (req, res) => {
    const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
      const body =[];
      req.on('data', (chunk) => {
          body.push(chunk)
      })
      req.on('end', () => {
          const parseBody = Buffer.concat(body).toString();
          const message = parseBody.split('=')[1];
          fs.writeFileSync("message.txt", message);
      })
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("context-type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Server</title></head>");
  res.write("<body><h1>I finally created my server</h1></body>");
  res.write("</html>");
  res.end();
//   process.exit();
}

module.exports = reuestHandler;
