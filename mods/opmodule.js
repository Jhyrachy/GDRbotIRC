var pwd = "yourpassword";

exports.init = function (client)
{
    client.on ("message", function (nick, to, text) {
        var parts = text.split(" ");
        var password = parts.splice(0,1);
        if (password != pwd) return;
        var command = parts.splice(0,1);
        switch (command.toString().toLowerCase())
        {
            case "!kick":
                if (parts.length > 0)
                    client.send("kick",parts.splice(0,1), parts.splice(0,1), parts.join(" "));
                break;
                
            case "!ban":
                if (parts.length > 0)
                    client.send("mode",parts.splice(0,1),"+b", parts.join(" "));
                break;
            
            case "!invite": // !invite nick #channel
                if (parts.length > 0)
                    client.send("invite", parts.splice(0,1), parts.join(" "));
                break;
            
            case "!unban":
                if (parts.length > 0)
                    client.send("mode",parts.splice(0,1),"-b", parts.join(" "));
                break;
                
            case "!op":
                if (parts.length > 0)
                    client.send("mode",parts.splice(0,1),"+o", parts.join(" "));
                break;
                
            case "!deop":
                if (parts.length > 0)
                    client.send("mode",parts.splice(0,1),"-o", parts.join(" "));
                break; 
             
            case "!say": // !say #canale [messaggio]
                if (parts.length > 0)
                    client.say(parts.splice(0,1),parts.join(" "));
                break;
            
            case "!voice":
                if (parts.length > 0)
                    client.send("mode",parts.splice(0,1),"+v", parts.join(" "));
                break;
            
            case "!devoice":
                if (parts.length > 0)
                    client.send("mode",parts.splice(0,1),"-v", parts.join(" "));
                break;
            
            case "!raw": // !raw [COMANDO IRC]
                if (parts.length > 0)
                    client.send(parts.join(" "));
                break;
        }
    });

    log("`Op Module! loaded");
}