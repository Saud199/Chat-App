var mainCont = document.getElementsByClassName("container");

var cont = document.createElement('div');
cont.setAttribute('class','container');

var gridRow = document.createElement('div');
gridRow.setAttribute('class','row');

var gapOneLine = document.createElement('br');

cont.appendChild(gapOneLine);

firebase.database().ref('Users/').orderByChild("email")
.on('child_added', (data) => {

    //snapshot.forEach(function(childSnapshot) {

        if(data.val().email != localStorage.getItem('ls_email')) {
            var userCard = document.createElement('div');
            userCard.setAttribute('class','card my-3 mx-3');
            userCard.setAttribute('style','width: 18rem;');
            userCard.setAttribute('align','center');

            var userCardInsideDiv = document.createElement('div');
            userCardInsideDiv.setAttribute('class','card-body');


            var userName = document.createElement('h5');
            userName.setAttribute('class','card-title');
            userName.innerHTML = ""+data.val().uname;


            var userEmail = document.createElement('p');
            userEmail.setAttribute('class','card-text');
            userEmail.innerHTML = ""+data.val().email;

            var userChatBtn = document.createElement('a');
            userChatBtn.setAttribute('class','btn btn-outline-primary');
            userChatBtn.setAttribute('href','#');
            userChatBtn.innerHTML = "Chat";
            userChatBtn.onclick = function () {
                var friendName = data.val().uname;
                var frinedKey = data.val().id;
                localStorage.setItem('ls_friend_name',""+friendName);
                localStorage.setItem('ls_friend_key',""+frinedKey);

                location.href="messenger.html";
            }

            userCardInsideDiv.appendChild(userName);
            userCardInsideDiv.appendChild(userEmail);
            userCardInsideDiv.appendChild(userChatBtn);


            userCard.appendChild(userCardInsideDiv);
        

            gridRow.appendChild(userCard);
        }

    //});

    cont.appendChild(gridRow);
    mainCont[0].appendChild(cont);

});


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