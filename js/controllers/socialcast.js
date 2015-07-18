var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

var _url, _email, _password;

module.exports = {
    connect: function (url, email, password) {
        var data = url + "/api/authentication.json?email=" + email + "&password=" + password;
        
        xhr.open("POST", data, false);
        xhr.send();
        
        //Checking response
        if(xhr.responseText.indexOf("error-message") === -1) {
            console.log("Connected to '" + url + "' succesfully!");
            
            _url = url;
            _email = email;
            _password = password;
            
            return true;
        } else {
            console.error("Cannot connect to server!");
            
            return false;
        }
    },
    
    getMessages: function (stream) {
        streamID = getStreamID(stream);
        
        if(streamID === -1) {
            var data = _url + "/api/streams/" + streamID + "/messages.json?email=" + _email + "&password=" + _password;
            
            xhr.open("GET", data, false);
            xhr.send();
            
            return xhr.responseText;
        } else {
            console.error("Don't found stream '" + stream + "'");
        }
    }
}


function getStreamID(stream) {
    var data = _url + "/api/streams.json?email=" + _email + "&password=" + _password;
    
    xhr.open("GET", data, false);
    xhr.send();
    
    var response = JSON.parse(xhr.responseText);
    
    //Searching stream with needed name and returning ID
    for (var i = 0; i < response.length; i++) {
        if(response[i].name === stream) {
            return response[i].id;
        }
    }
    return -1;
}