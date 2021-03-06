const express = require('express');

const server = express();

const postRouter = require('./posts/postRouter')

const userRouter = require('./users/userRouter')

server.use(express.json())
server.use(logger)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/posts', postRouter)

server.use('/users', userRouter)

//custom middleware

function logger(req, res, next) {
  console.log(req.url)
  next()
}

module.exports = server;
