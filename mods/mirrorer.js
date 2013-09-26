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
                if (parts.length > 1)
                    var sorgente = parts.splice(0,1);
                    var destinazione = parts.splice(0,1);
                    client.join(sorgente.toString());
                    client.join(destinazione.toString());
		              client.say(nick , "Mirroring Iniziato!");
                    links[sorgente] = destinazione;
                break;

            case "!stopmirror":
                delete links[canale];
                client.say(nick , "Mirroring Terminato!");
                break;
        }
    });

    console.log("`Mirror! loaded");
}
