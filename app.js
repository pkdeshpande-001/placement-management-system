function login() {
    // document.getElementById("myNav").style.display = "block"
    
    // var emails = document.getElementById("email").value;
    // var passor = document.getElementById("password").value;
    // var msg = document.getElementById("alert");
    // var alertText = document.getElementById("alertText");
  
    // firebase.auth().signInWithEmailAndPassword(emails, passor)
    //   .then((userCredential) => {
        // firebase.auth().onAuthStateChanged(function (user) {
        //   if (user) {
            // User is signed in.
            // console.log(user.uid);
            // firebase.database().ref("user").child(user.uid).once('value', function (snapshot) {
              // console.log("database" + user.uid)
              // console.log(snapshot.val().role)
              // if (snapshot.val().role === "admin") {
                window.alert("Sigin Successfully")
                window.location.href = "pages/AllOfferLetterDetails.html";
              // }
              // else if (snapshot.val().role === "staff") {
              //     window.alert("signin Staff")
              //   window.location.href = "Staff/staff.html";
              // }
            // })
        //   }
        // });
    //   })
    //   .catch(function (error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode + " : " + errorMessage);
    //     msg.style.display = "block";
    //     alertText.innerHTML = errorMessage;
    //   });
    
  
  }