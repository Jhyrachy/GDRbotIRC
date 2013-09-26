exports.init = function (client)
{
    client.on ("message", function (nick, to, text) {
        if (text == "!comandi") {
            
                client.say(nick, "Macro (\"!macro [macroname]\" to get the macro, \"!addmacro [macroname] {macro}\" to add a macro and \"!macrolist\" to list all the macro)");
                client.say(nick, "Quotes (\"!quote\" to get a random quote, \"!addquote [quote]\" to add a quote and \"!quote [number]\" to get a specific quote");
                client.say(nick, "Join & part (\"!join #channel\" and \"!part #channel\")");
                client.say(nick, "Turni (\"!turni [msg]\" to register a message and \"!turni\" for receive the messagge in query)");
                client.say(nick, "Schede (\"!addscheda [playername] {link}\" to add a new one and \"!scheda [playername]\" to get it)");
                client.say(nick, "Battaglia (\"!editpv [playername] {life}\" to register it \"!pv [nomeplayer]\" to get it. \"!b [playername] {damage/heal}\" to edit pv during battle and \"!pv reset\" to refresh pv to the original value)");
        }
    });
 log("`Help! loaded");
}