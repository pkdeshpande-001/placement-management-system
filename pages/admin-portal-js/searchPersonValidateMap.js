// google.maps.event.addDomListener(window, 'load', initialize);
function initialize(obj) {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
      
      function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var userLocation = new google.maps.LatLng(latitude, longitude);
        var shopLocation = obj.locationCoords.split(",");
        var specifiedLocation = new google.maps.LatLng(parseFloat(shopLocation[0]),parseFloat(shopLocation[1]));
        var distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, specifiedLocation);
        console.log(distance)
        if (distance <= 5) {
          console.log("The specified location is within 5 meters of the user's location.");
        }


        document.getElementById("validate").addEventListener("click", () =>{
          console.log(distance +" inside button")

          var currentdate = new Date(); 
          var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                var isAtLocation;
          if (distance <= 5) {
            console.log(datetime);
            isAtLocation = true;
            alert("successfully validate");
            
          }
          else {
            console.log(datetime)
            isAtLocation=false;
            alert("Sorry you are not at "+obj.shopname+" location ")
          }
          var key = firebase.database().ref().child('salesman_validation/').push().key;
            firebase.database().ref("salesman_validation/" + key).set({
              shopname: obj.shopname,
              shopcords: obj.locationCoords,
              locationCoords: latitude+","+longitude,
              key:key,
              customerkey:obj.key,
              isAtLocation:isAtLocation,
              datetime: datetime
            }).then(
              window.alert("Successfully updated your status. Thanks")
            );
  

        });
      
        var map = new google.maps.Map(document.getElementById("map"), {
          center: specifiedLocation,
          zoom: 20
        });
      
        var userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location"
        });
      
        var specifiedMarker = new google.maps.Marker({
          position: specifiedLocation,
          map: map,
          title: "Specified Location",
          icon: "http://www.google.com/mapfiles/ms/icons/blue-dot.png"
        });
      
        var circle = new google.maps.Circle({
          center: specifiedLocation,
          radius: 5,
          strokeColor: "#007bff",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#007bff",
          fillOpacity: 0.35,
          map: map
        });
      }
      
}
