document.getElementById('frndName').innerHTML = ""+localStorage.getItem('ls_friend_name');
var chatWind = document.getElementById('chatWindow');

var gapOneLine = document.createElement('br');
var gapOneLine1 = document.createElement('br');

var msgNode1 = localStorage.getItem('ls_id')+""+localStorage.getItem('ls_friend_key');
var msgNode2 = localStorage.getItem('ls_friend_key')+""+localStorage.getItem('ls_id');


firebase.database().ref("Chats/"+msgNode1)
.on('child_added', (data) => {

    if (data.val().id == localStorage.getItem('ls_id')) {

        var myMsg = document.createElement('div');
        myMsg.setAttribute('class','alert alert-primary float-right mx-2 my-2');
        myMsg.setAttribute('role','alert');
        myMsg.setAttribute('style','border:solid; width:50%; height: auto; overflow-wrap: break-word;');
        myMsg.innerHTML = ""+data.val().msg;

        chatWind.appendChild(myMsg);
        chatWind.appendChild(gapOneLine);

    }

    else if (data.val().id != localStorage.getItem('ls_id')) {
        var frndMsg = document.createElement('div');
        frndMsg.setAttribute('class','alert alert-success float-left mx-2 my-2');
        frndMsg.setAttribute('role','alert');
        frndMsg.setAttribute('style','border:solid; width:50%; height: auto; overflow-wrap: break-word;');
        frndMsg.innerHTML = ""+data.val().msg;

        chatWind.appendChild(frndMsg);
        chatWind.appendChild(gapOneLine1);
    }


});




function sendMessage() {
    var userMessage = document.getElementById('message_body').value;
    var userKey = localStorage.getItem('ls_id');

    var skey1 = firebase.database().ref("Chats/"+msgNode1).push();

    var messageObj = {
        id : userKey,
        msg : userMessage,
    }

    skey1.set(messageObj);


    var skey2 = firebase.database().ref("Chats/"+msgNode2).push();

    var messageObj = {
        id : userKey,
        msg : userMessage,
    }

    skey2.set(messageObj);

    userMessage.innerHTML="";

}

function deleteChat() {

    var emptyObj = {

    }

    firebase.database().ref("Chats/"+msgNode1).set(emptyObj).then(function(success) {
        location.reload();
    });

}



function logOffUser() {
    firebase.auth().signOut()
    
    .then(function() {
        // Sign-out successful.
        localStorage.clear();
        location.href="index.html"
    })
      
      .catch(function(error) {
        // An error happened.
    });
}