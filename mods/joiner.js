
exports.init = function (client)
{
    client.on ("message", function (nick, to, text) {
        var parts = text.split(" ");
        var command = parts.splice(0,1);
        if (command.toString().toLowerCase() == "!join") {
            if (parts.length > 0)
            {
                var msg = parts.join(" ");
                client.join(msg);
                client.say(nick, "Channel Joined!");
            }
        }

        if (command.toString().toLowerCase() == "!part") {
            if (parts.length > 0)
            {
                var msg = parts.join(" ");
                client.part(msg);
                client.say(nick, "Channel left!");
            }
        }
    });

    console.log("`Part&Join! loaded");
}