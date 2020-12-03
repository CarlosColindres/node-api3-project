const server = require('./server')

server.listen(process.env.PORT , () => {
    console.log('listening on port 5000')
})
