var links = {};

exports.init = function (client)
{
    client.on ("message", function (nick, to, text) {
        if (to in links) client.say(links[to],"["+to+"] <"+nick+"> "+text);
        var parts = text.toString().split(" ");
        var command = parts.splice(0,1);
        switch (command.toString().toLowerCase())
        {
            case "!mirror":  // !mirror #sorgente #destinazione
                if (parts.length > 0)
                    var sorgente = parts.splice(0,1);
                    var destinazione = parts.splice(0,1);
                    client.join(sorgente);
                    client.join(destinazione);
                    links[sorgente] = destinazione;
                break;
        }
    });

    console.log("`Mirror! loaded");
}