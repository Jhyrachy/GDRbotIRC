net = require "net"
events = require "events"

passkey = "yourpasswordhere"
sockets = []

global.log = (message) ->
	console.log message
	s.write message + "\r\n" for s in sockets

closeSocket = (self,sock,data) ->
	self.emit "disconnect", sock, data
	i = sockets.indexOf sock
	sockets.splice i,1

Partyline = new events.EventEmitter()

Partyline.listen = (port) ->
	self = this
	Partyline.server = net.createServer (socket) ->
		socket.authenticated = false;
		socket.on "end", (data) -> closeSocket self, socket, data
		socket.on "timeout", (data) -> closeSocket self, socket, data
		socket.on "close", (data) -> closeSocket self, socket, data
		socket.on "data", (data) -> 
			data = data.toString().replace /\r\n|\n|\r/,""
			if socket.authenticated
				self.emit "message", socket, data 
			else
				return socket.end() if data isnt passkey
				socket.authenticated = true 
				sockets.push socket
			socket.write "\n> "
		self.emit "connect", socket
	Partyline.server.listen port, () -> log "Partyline open! :"+port

exports.Partyline = Partyline