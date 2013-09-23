//comando tipo: !b jhy -20
var fs = require('fs');

var macros = {};

exports.init = function (client)
{
     fs.readFile('vita.txt', function (err, data) {
      if (err) throw err;
      macros = JSON.parse(data);
    });
    
    client.on ("message", function (nick, to, text) {
        var parts = text.split(" ");
        var command = parts.splice(0,1);

        if (command.toString().toLowerCase() == "!b") {
            if (parts.length < 2 || !(parts[0].toLowerCase() in macros)) {
                client.say(to,"fak u "+nick); 
                return;
            }
            if (parts.length == 2) {
                macros[parts[0].toLowerCase()] += parseInt(parts[1]); 
                client.say(to, macros[parts[0].toLowerCase()]);
                return;
            }
        }
        
        if (text.toLowerCase() == "!pv reset") {
            fs.readFile('vita.txt', function (err, data) {
                if (err) throw err;
                macros = JSON.parse(data);
                client.say(to,"Reset PV effettuato!");
            });
            return;
        }

        if (command.toString().toLowerCase() == "!pv") {
            if (parts.length < 1 || !(parts[0].toLowerCase() in macros)) {
                client.say(to,"fak u "+nick); 
                return;
            }
            if (parts.length == 1) {
                client.say(to, macros[parts[0].toLowerCase()]); 
                return;
            }
        }

        if (command.toString().toLowerCase() == "!listpv")
        {
            var macrolist = Object.keys(macros).join(" / ");
            var outarr = macrolist.match(/(.{1,100}\s.{1,100})/g);
            outarr[0] = "PV registrati: " + outarr[0];
            for (var i = 0; i < outarr.length; i++)
                client.say(nick,outarr[i]);
            return;
        }

        if (command.toString().toLowerCase() == "!editpv")
        {
            if (parts.length != 2) {
                client.say(to,"fak u "+nick); return;
            }
            macros[parts[0].toLowerCase()] = parseInt(parts[1]);
            var data = JSON.stringify(macros);

            fs.writeFile("vita.txt",data,function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("`Vita! Nuova vita aggiunta!");
                    client.say(to,"Vita aggiunta \""+parts[0]+"\"");
                }
            });
        }
    });
    console.log("`Vita e Battaglia! loaded");
}