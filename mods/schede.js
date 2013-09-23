var fs = require('fs');

var macros = {};

exports.init = function(client)
{
    fs.readFile('schede.txt', function (err, data) {
      if (err) throw err;
      macros = JSON.parse(data);
    });
    
    client.on("message",function(nick, to, text, message){
        var msg = text.split(" ");
        if (msg[0] == "!scheda")
        {
            if (msg.length != 2 || macros[msg[1].toLowerCase()] === undefined)
            {
                client.say(to,"fak u "+nick); return;
            }
            
            client.say(to,macros[msg[1].toLowerCase()]);
            return;
        }
        
        if (msg[0] == "!listschede" || msg[0] == "!schedelist")
        {
            var macrolist = Object.keys(macros).join(" / ");
            var outarr = macrolist.match(/(.{1,100}\s.{1,100})/g);
            outarr[0] = "Schede disponibili: " + outarr[0];
            for (var i = 0; i < outarr.length; i++)
            	client.say(nick,outarr[i]);
            return;
        }
        
        if (msg[0] == "!addscheda")
        {
            var msg = text.split(" ");
            if (msg.length != 3) {
                client.say(to,"fak u "+nick); return;
            }
            macros[msg[1].toLowerCase()] = msg[2];
            var data = JSON.stringify(macros);

            fs.writeFile("schede.txt",data,function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("`Scheda! New Scheda Added!");
                    client.say(to,"Scheda aggiunta \""+msg[1]+"\"");
                }
            });
        }
    });
    
    console.log("`Schede! loaded");
};