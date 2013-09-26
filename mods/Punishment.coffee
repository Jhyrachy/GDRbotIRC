fs = require "fs"
bannedList = []
pwd = "cmd"
pchan = "#brony.it"

exports.init = (client) ->
    fs.readFile 'bannedlist.txt', (err,data) ->
        try
            bannedList = JSON.parse data
        catch e
            return
    client.on "message", (nick,to,text) ->
        parts = text.split " "
        return if parts.length < 2
        password = parts.splice 0, 1
        command = parts.splice 0, 1
        host = parts.splice 0, 1
        return if password.toString() isnt pwd
        switch command.toString()
            when "!punish"
                return if parts.length < 3
                bannedList.push host.toString()
                data = JSON.stringify bannedList
                client.say pchan, host.toString()+" is going to be punished!"
                client.send "mode",pchan,"+b","*!*@"+host.toString()
                fs.writeFile "bannedlist.txt", bannedList
            when "!grace"
                return if parts.length < 3
                nicki = bannedList.indexOf host.toString()
                client.say pchan, host.toString()+" has been graced!"
                client.send "mode",pchan,"-b","*!*@"+host.toString()
                bannedList.splice nicki, 1 if nicki >= 0
                fs.writeFile "bannedlist.txt", bannedList
            when "!banlist"
                moi = bannedList.join ", "
                client.say nick, "Banned hosts/nicks: " + moi
    
    client.on "join", (chan,nick,msg) ->
        return if chan isnt pchan
        host = msg.host
        if host in bannedList or nick in bannedList
            client.send "mode",chan,"+b",host
    client.on "part", (chan,nick,res,msg) ->
        return if chan isnt pchan
        host = msg.host
        if host in bannedList or nick in bannedList
            client.send "mode",chan,"-b",host
    client.on "quit", (nick,chans,res,msg) ->
        host = msg.host
        if host in bannedList or nick in bannedList
            client.send "mode",chan,"-b",host
    client.on "kick", (chan,nick,whom,res,msg) ->
        return if chan isnt pchan
        host = msg.host
        if host in bannedList or nick in bannedList
            client.send "mode",chan,"-b",host

    log "Punishment! loaded!"