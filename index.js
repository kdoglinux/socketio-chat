var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

//SERVE STATIC PAGE
app.get('/', function(req,res){
 res.sendFile(__dirname + '/index.html')
})


io.on('connection', function(socket){
 console.log('user connected: ' + socket.id )
 socket.broadcast.emit('chat message', socket.id+' entered the room')


 socket.on('disconnect', function(){
  console.log('user disconnected: ' + socket.id )
  io.emit('chat message', socket.id+' left the room')
 })


 socket.on('chat message', function(msg){
  console.log('a message sent by '+socket.id+": "+msg )
  io.emit('chat message', socket.id+": "+msg)
 })

})

http.listen(process.argv[2], function(){
 console.log('listening on port %d',process.argv[2])
})
