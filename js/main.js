(function() {
	mainFlow();
    setInterval(mainFlow, 5000);
})();

function mainFlow() {
    $.getJSON("index.php", function(json) {
        console.log(json);
        checkForUpdates(json.messages.reverse());
    });
}

function checkForUpdates(messages) {
    for (var i = 0; i < messages.length; i++) {
        if (!document.getElementById(messages[i].id)) {
            console.log("in add");
            addMessage(messages[i]);
        } else {
            updateMessage(messages[i]);
        }
    }
}

function updateMessage(message) {
    var preffix = "#" + message.id + " ";
    $(preffix + "img.author-img").attr('src', message.user.avatars.square140);
    $(preffix + "figcaption").html(message.user.name);
    $(preffix + "h4.message-title").html(message.title);
    $(preffix + "p.message-text-content").html($(message.html_body).html());
    $(preffix + "em.message-date").html(new Date(message.updated_at).toLocaleString());
    $(preffix + "span.likes-number").html(message.likes_count);
    $(preffix + "span.comments-number").html(message.comments_count);

    var imgs = "";
    for(var i = 0; i < message.media_files.length; i++) {
        imgs += "<img src='" + message.media_files[i].thumbnails.scaled480 + "' height='" + ($(window).height()/5) + "px'>";
        console.log(imgs);
    }
    $(preffix + ".message-imgs").html(imgs);
}

function addMessage(message) {
    var newMessage = $("div.message.dummy").clone().removeClass("dummy").attr("id", message.id).prependTo("div.main");
    updateMessage(message);
    newMessage.removeClass("hidden");
}
