var customerOjectList= [];
window.addEventListener("load", (event) => {
    var table = document.getElementById("table");
    firebase
    .database()
    .ref("Customers")
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        // var childKey = childSnapshot.key();
        var childData = childSnapshot.val();
        var obj = {};
        obj.shopname = childData.shopname;
        obj.firstname = childData.firstname;
        obj.lastname =childData.lastname;
        obj.gstno = childData.gstno;
        obj.key = childData.key;
        obj.locationAddress = childData.locationAddress;
        obj.locationCoords = childData.locationCoords;
        obj.phonenumber = childData.phonenumber;
        obj.emailAddress = childData.emailAddress;
        obj.googleMapAddress = childData.googleMapAddress;
                    
        customerOjectList.push(obj);

        addToSearchTableList(obj)

      });
    });
  });

  function addToSearchTableList(obj) {
    var code;
    var newRow = document.getElementById("tableTbody");
    code = "<tr id='"+obj.key +"' onclick='show(this)'>"+
    "<td scope='row'>"+
      "<div class='d-flex px-2 py-1'>"+
        "<div>"+
        "</div>"+
        "<div class='d-flex flex-column justify-content-center'>"+
         " <h6 class='mb-0 text-sm'>"+ obj.shopname+"</h6>"+
          "<p class='text-xs text-secondary mb-0'>"+obj.firstname+" "+obj.lastname+"</p>"+
        "</div>"+
     " </div>"+
    "</td>"+
    "<td>"+
      "<p class='text-xs font-weight-bold mb-0'>"+obj.phonenumber+"</p>"+
    //  " <p class='text-xs text-secondary mb-0'>"+obj.gstno+"</p>"+
    "</td>"+
  "</tr>";


    newRow.innerHTML += code;
  }
  


  function show(event) {
    var rowId = event.id;
    let result = customerOjectList.find(a => a.key === rowId);
    document.getElementById("filterInput").value = result.shopname;
    document.getElementById("shopname").innerHTML = "&nbsp; "+ result.shopname;
    document.getElementById("fullName").innerHTML = "<strong class='text-dark'>Full Name:</strong> &nbsp; "+ result.firstname+" "+result.lastname;
    document.getElementById("mobile").innerHTML = "<strong class='text-dark'>Mobile:</strong> &nbsp; "+ result.phonenumber;
    document.getElementById("email").innerHTML = "<strong class='text-dark'>Email:</strong> &nbsp; "+ result.emailAddress;
    document.getElementById("address").innerHTML = "<strong class='text-dark'>Location:</strong> &nbsp; "+ result.locationAddress;
    document.getElementById("gstno").innerHTML = "<strong class='text-dark'>GSTIN:</strong> &nbsp; "+ result.gstno;
    document.getElementById("searchTable").style.display = "none";
    initialize(result)
    
}


document.addEventListener('mouseup', function clickOutside(event) {

    let get = document.getElementById('containerTable');
  
    if (!get.contains(event.target)) {
  
        document.getElementById("searchTable").style.display = "none";
  
    }
  
  });

document.getElementById("filterInput").addEventListener('input', function handleClickOutsideBox(event){
    
    document.getElementById("searchTable").style.display = "block";
    var input, filter, table, tr, td, i, txtValue, dataTobeSearched;
    if(document.getElementById("selectSearch").value === 'phone'){
        dataTobeSearched = 1;
    }
    else{
        dataTobeSearched = 0;
    }
    input = document.getElementById("filterInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[dataTobeSearched];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  });