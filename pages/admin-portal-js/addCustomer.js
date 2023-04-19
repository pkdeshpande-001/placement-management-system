function saveAddCustomer(){
var inputShopName = document.getElementById("inputShopName").value;
var inputFirstName = document.getElementById("inputFirstName").value;
var inputLastName = document.getElementById("inputLastName").value;
var inputGstNo = document.getElementById("inputGstNo").value;
var inputEmailAddress = document.getElementById("inputEmailAddress").value;
var inputPhone = document.getElementById("inputPhone").value;
var locationCoords = document.getElementById("latandlong").value;
var googleMapAddress = document.getElementById("googleMapAddress").value;
var inputLocation = document.getElementById("address").value == null ? googleMapAddress : document.getElementById("address").value;


console.log(locationCoords)

var key = firebase.database().ref().child('Customer/').push().key;
firebase.database().ref("Customers/" + key).set({
    shopname: inputShopName,
    firstname: inputFirstName,
    lastname: inputLastName,
    gstno: inputGstNo,
    emailAddress: inputEmailAddress,
    locationAddress: inputLocation,
    locationCoords: locationCoords,
    phonenumber: inputPhone,
    key:key,
    googleMapAddress:googleMapAddress
  }).then(
    window.alert("Successfully updated"),
    document.getElementById("myForm").reset()
  );

}