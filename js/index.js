function logInToAccount() {
    var em = document.getElementById('u_email').value;
    var pass = document.getElementById('u_pass').value;


    firebase.auth().signInWithEmailAndPassword(em, pass)
    
    .then(function(success) {

        firebase.database().ref("Users/").orderByChild("email").equalTo(""+em).on("value", function(snapshot) {

            snapshot.forEach(function(childSnapshot) {

                localStorage.setItem('ls_name' , childSnapshot.val().uname);
                localStorage.setItem('ls_email' , childSnapshot.val().email);
                localStorage.setItem('ls_id' , childSnapshot.val().id);

                location.href='selectuser.html';

            });

        });

        //location.href='selectuser.html';
    })
    
    
    .catch(function(error) {
        alert("Error : "+error);
    });

}