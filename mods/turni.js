var testo = "Nessun messaggio registrato";

exports.init = function (client)
{
    client.on ("message", function (nick, to, text) {
        var parts = text.split(" ");
        var command = parts.splice(0,1);
        if (command.toString().toLowerCase() == "!turni") {
            if (parts.length > 0)
            {
                var msg = parts.join(" ");
                if (msg == "reset") {
                   testo = "Nessun messaggio registrato";
                }
                else testo = msg
            } else {
                client.say(nick, testo);
            }
        }
    });

    log("`Turni! loaded");
}