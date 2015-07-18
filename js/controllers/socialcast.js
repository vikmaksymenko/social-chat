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

        if(streamID !== -1) {
            var data = _url + "/api/streams/" + streamID + "/messages.json";

            xhr.open("GET", data, false, _email, _password);
            xhr.send();

            return JSON.parse(xhr.responseText).messages;
        } else {
            console.error("Don't found stream '" + stream + "'");
        }
    }
}


function getStreamID(stream) {
    var data = _url + "/api/streams.json";

    xhr.open("GET", data, false, _email, _password);
    xhr.send();

    var streams = JSON.parse(xhr.responseText).streams;

    //Searching stream with needed name and returning ID
    for (var i = 0; i < streams.length; i++) {
        if(streams[i].name === stream) {
            return streams[i].id;
        }
    }
    return -1;
}