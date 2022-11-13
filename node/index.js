const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(
      path.join(__dirname, 'public', 'index.html'),
      (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' })
          res.end('<h1>Server Error</h1>')
        }

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      }
    )
  }

  if (req.url === '/about') {
    fs.readFile(
      path.join(__dirname, 'public', 'about.html'),
      (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' })
          res.end('<h1>Server Error!</h1>')
        }

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      }
    )
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server start on port: ${PORT}`))
