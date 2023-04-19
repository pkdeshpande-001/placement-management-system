function saveAddCustomer(){
  var inputUsn = document.getElementById("inputUsn").value;
  var inputStudentName = document.getElementById("inputStudentName").value;
  var inputCompany = document.getElementById("inputCompany").value;
  var inputOfferLetter = document.getElementById("inputOfferLetter").files[0];
  var inputOnOffCampus = document.getElementById("inputOnOffCampus").value;
  var inutSelectPassoutYear = document.getElementById("inutSelectPassoutYear").value;
  
  
  // console.log(key)

  var offerUrl;
  const ref=firebase.storage().ref('StudentDoc');
    const name=inputCompany+"-"+inputUsn;
    const metadata={
        contentType:document.getElementById("inputOfferLetter").files[0].type
    };

    const task=ref.child(name).put(inputOfferLetter,metadata);
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then (url =>{
     
        console.log(url);
        offerUrl=url;
        var key = firebase.database().ref().child('PlacementStudent/').push().key;
        firebase.database().ref('PlacementStudent/'+key).set({
          usn: inputUsn,
          studentName: inputStudentName,
          key:key,
          company:inputCompany,
          offer: offerUrl,
          campus: inputOnOffCampus,
          passoutYear: inutSelectPassoutYear
          
        }).then(
                  alert("Successfully added")
          );
          
});

}