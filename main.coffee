irc       = require "irc"
fs        = require "fs"
config    = require "./config"
partyline = require("./partyline").Partyline

console.log "placebot2 - github.com/Hamcha/placebot2"

global.createClient = () ->
	# Connect to server
	log "Connecting to " + config.server + " .. "
	global.client = new irc.Client config.server, config.nickname, { channels: config.autojoin, realName: config.realname, userName: config.nickname }
	global.client.setMaxListeners 50
	# Setup Error handler
	global.client.on "error", (e) -> log e

createClient()

# Create partyline
partyline.listen config.partylinePort

# Load custom modules
global.loadMods = () ->
	global.mods = {}
	log "Loading mods .."
	# Get all modules from mods folder
	fs.readdir "mods", (err, files) ->
		for f,file in files
			modname = f.replace /\.js|\.coffee/ig,""
			mods.modname = require "./mods/"+modname
			mods.modname.init client, partyline
		log "All mods have been loaded!"

loadMods()