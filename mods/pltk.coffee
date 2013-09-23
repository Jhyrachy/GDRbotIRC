exports.init = (client,pline) ->
	pline.on "message", (socket, message) ->
		switch message
			when ".reload"
				# Remove require cache
				delete require.cache[x] for x,y of require.cache
				# Unload modules
				cleanClientListeners client
				cleanPLineListeners pline
				mods = {}
				# Reload modules
				loadMods()
		if message.length > 0 and message[0] != "."
			log "<pline> " + message
	log "PLTK -PartyLine ToolKit- has been loaded!"

cleanPLineListeners = (p) ->
	p.removeAllListeners 'message'
	p.removeAllListeners 'connect'
	p.removeAllListeners 'disconnect'

cleanClientListeners = (c) ->
	c.removeAllListeners 'registered'
	c.removeAllListeners 'motd'
	c.removeAllListeners 'names'
	c.removeAllListeners 'topic'
	c.removeAllListeners 'join'
	c.removeAllListeners 'part'
	c.removeAllListeners 'quit'
	c.removeAllListeners 'kick'
	c.removeAllListeners 'kill'
	c.removeAllListeners 'message'
	c.removeAllListeners 'notice'
	c.removeAllListeners 'ping'
	c.removeAllListeners 'pm'
	c.removeAllListeners 'ctcp'
	c.removeAllListeners 'ctcp-notice'
	c.removeAllListeners 'ctcp-privmsg'
	c.removeAllListeners 'ctcp-version'
	c.removeAllListeners 'nick'
	c.removeAllListeners 'invite'
	c.removeAllListeners '+mode'
	c.removeAllListeners '-mode'
	c.removeAllListeners 'whois'
	c.removeAllListeners 'invite'
	c.removeAllListeners 'channellist_start'
	c.removeAllListeners 'channellist_item'
	c.removeAllListeners 'channellist'
	c.removeAllListeners 'raw'
	c.removeAllListeners 'error'