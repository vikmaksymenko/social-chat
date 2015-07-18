var sc = require('./controllers/socialcast.js');
var fs = require('fs');

//Paste your data here
var connected = sc.connect("link", "email", "password");

if(connected) {
    fs.writeFile("messages.json", 
        JSON.stringify(sc.getMessages("Company Stream")),
        function(err) {
            if(err) {
                console.log(err);
            }
        });
}