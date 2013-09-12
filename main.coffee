irc    = require "irc"
fs     = require "fs
"
config = require "./config"

console.log "placebot2 - github.com/Hamcha/placebot2"

# Connect to server
console.log "Connecting to " + config.server + " .. "
global.client = new irc.Client config.server, config.nickname, { channels: config.autojoin, realName: config.realname, userName: config.nickname }
# Setup Error handler
global.client.on "error", (e) -> console.log e

console.log "Loading mods .."

# Load custom modules

global.mods = {}

fs.readdir "mods", (err, files) ->
	for f,file in files
		modname = f.replace /\.js|\.coffee/ig,""
		mods.modname = require "./mods/"+modname
		mods.modname.init client
	console.log "All mods have been loaded!"
