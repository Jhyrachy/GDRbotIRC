var fs = require('fs');

var logfolder = "logs/";
var currentlog = {};

function createlog() {
    var date = new Date();
    var timestamp = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + "." 
                    + date.getHours() + "_" + date.getMinutes();
    
    for (chan in currentlog) {
        var data = JSON.stringify(currentlog[chan]);
        fs.writeFile(logfolder+chan+"."+timestamp+".log",data,function(err) {
            if(err) { console.log(err);}
        }); 
    }
    console.log("/LOGMAN/ Hourly Log saved! ["+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()+"]");
    currentlog = {};
}

exports.init = function(client){
    client.on("message",function(nick, to, text, message){
        if (text == "!log") {
            createlog();
            client.say(to,"Log salvati!");
        }
        if (!(to in currentlog)) { currentlog[to] = []; }
        currentlog[to].push({ nick : nick, message : text });
    });
    
    setInterval(createlog,3600000);
    
    console.log("/LOGMAN/ has started loggin'!");
};

//Un saluto da Danjel :3