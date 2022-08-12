const express = require('express');
const server = express()

/* route requests for static files to appropriate directory */
server.use('/', express.static(__dirname + '/dist/'))

server.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

const port = 8000;
server.listen(port, function() {
    console.log('server listening on port ' + port)
})