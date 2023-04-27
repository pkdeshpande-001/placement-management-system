function saveAddCustomer(){
  document.getElementById("spinner").style.display = "block";
  var inputUsn = document.getElementById("inputUsn").value;
  var inputStudentName = document.getElementById("inputStudentName").value;
  var inputCompany = document.getElementById("inputCompany").value;
  var inputOfferLetter = document.getElementById("inputOfferLetter").files[0];
  var inputOnOffCampus = document.getElementById("inputOnOffCampus").value;
  var inutSelectPassoutYear = document.getElementById("inutSelectPassoutYear").value;
  var inputExprienceLetter = document.getElementById("inputExprienceLetter").files[0];

  var offerName = inputUsn+"-"+inputCompany+"-OfferLetter"
  var expName = inputUsn+"-"+inputCompany+"-exprienceLetter"

    const promises = [];
        promises.push(uploadImageAsPromise(inputOfferLetter,offerName))
        promises.push(uploadImageAsPromise(inputExprienceLetter,expName))
    
    //The Promise.all() will stop the execution, until all of the promises are resolved.
    Promise.all(promises).then((fileURLS)=>{
        //Once all the promises are resolved, you will get the urls in a array.
        console.log(fileURLS)
        addToFileBase( inputUsn, inputStudentName, inputCompany, inputOnOffCampus, inutSelectPassoutYear,fileURLS);
    })
  


}
const storageRef = firebase.storage().ref('StudentDoc');

  //Upload Image Function returns a promise  
  async function uploadImageAsPromise(imageFile,name) {
    return new Promise(function (resolve, reject) {
      const task = storageRef.child(name).put(imageFile);

      task.on(
        "state_changed",
        function progress(snapshot) {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },

        function error(err) {
          reject(err);
        },

        async function complete() {
          //The getDownloadURL returns a promise and it is resolved to get the image url.
          const imageURL = await task.snapshot.ref.getDownloadURL();
          resolve(imageURL);
        }
      );
    });
  }
  
  //Handling the files
  


function addToFileBase( inputUsn, inputStudentName, inputCompany, inputOnOffCampus, inutSelectPassoutYear,fileURLS) {
  console.log(fileURLS[0]);
  console.log(fileURLS[1]);
  var offerUrl = fileURLS[0];
  var expUrl = fileURLS[1];
  var key = firebase.database().ref().child('PlacementStudent/').push().key;
  firebase.database().ref('PlacementStudent/' + key).set({
    usn: inputUsn,
    studentName: inputStudentName,
    key: key,
    company: inputCompany,
    offer: offerUrl,
    exp: expUrl,
    campus: inputOnOffCampus,
    passoutYear: inutSelectPassoutYear
  }).then(
    alert("Successfully added"),
    document.getElementById("spinner").style.display = "none"
  );
  return offerUrl;
}
