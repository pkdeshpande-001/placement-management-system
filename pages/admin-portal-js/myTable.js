var objCustData ;

$(document).ready(function () {

    var data = [
      ];
      $('#example tfoot th').each( function (i) {
        var title = $('#example thead th').eq( $(this).index() ).text();
        $(this).html( '<input type="text" placeholder="search '+title+'"class="form-control" data-index="'+i+'" />' );
    });

   


      var table=  $('#example').DataTable({
        processing: true,
        // fixedHeader: true,
        responsive: true,
        scrollX:true,
        altEditor: true, 
        select: true,
        searching: true,
        dom: 'Blfrtip',
        buttons: [
                    'pdf','csv','xlsx',
                    {
                        text: 'Add',
                        action: function ( e, dt, node, config) {
                                
                                openAddModelAndClose(data);
                            }
                    },
                    {
                        text: 'Reload',
                        action: function ( e, dt, node, config ) {
                            dt.ajax.reload();
                        }
                    },
                    
                    // {
                    // text: 'Edit',
                    // action: function ( e, dt, node, config) {
                    //         var data = table.rows('.selected').data();
                            
                    //         if(data[0]!==undefined){
                    //            openEditModelAndClose(data);
                            
                    //         }
                    //     }
                    // },
                ],
        columns: [
            { 
                name: 'first',
                title: 'USN'
            },
            {
                name: 'second', 
                title: 'Student Name'
            },
            { title: 'Company' },
            { 
                title: 'offer letter',
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<a href='"+oData[3]+"' target='_blank'>"+"Offer Letter"+"</a>");
                } 
            },
            { title: 'ON/OFF Campus' },
            { title: 'Year' }
        ],
        ajax: {
            "url": "https://student-lms-5740d-default-rtdb.firebaseio.com/PlacementStudent.json",
            "dataSrc": function (data,callback, settings) {
                
                var data = Object.values(data);
                var CollectRecord = []
                var pass = document.getElementById("year").value;
                localStorage.setItem('passoutYear',pass)
                
                for ( var i=0; i<data.length; i++ ) {
                    var fullData = []
                    var innerData = data[i]
                    if(innerData['passoutYear'] == pass || pass === 'All'){

                    console.log(innerData['usn'])
                        
                    fullData.push(innerData['usn'])
                    fullData.push(innerData['studentName'])
                    fullData.push(innerData['company'])
                    fullData.push(innerData['offer'])
                    fullData.push(innerData['campus'])
                    fullData.push(innerData['passoutYear'])
                    CollectRecord.push(fullData) 
                }
               }  
               console.log(CollectRecord)
            
                      
                   return CollectRecord;
            }   
          },
        //   data: data,
          rowsGroup: [
            'first:name',
            'second:name'
          ],
          destroy: true,
        //   fixedColumns:   true
          
        });

        $( table.table().container() ).on( 'keyup', 'tfoot input', function () {
            table
                .column( $(this).data('index') )
                .search( this.value )
                .draw();
        } );
        $(
            "<select  class='' style='width:130px;height: 40px;' id='year' >" +
                              "<option>All</option>"+
                             " <option>2017-2018</option>"+
                              "<option>2018-2019</option>"+
                              "<option>2019-2020</option>"+
                              "<option>2020-2021</option>"+
                              "<option>2021-2022</option>"+
                              "<option>2022-2023</option>"+
                              "<option>2023-2024</option>"+
                              "<option>2024-2025</option>"+
                              "<option>2025-2026</option>"+
                              "<option>2028-2027</option>"+
              "</select>"
                ).appendTo("#example_wrapper .flex-wrap");
        
         $(".flex-wrap").addClass("pull-right");
    
});

var close1 = document.getElementById("close");
    close1.onclick = function () {
        document.getElementById("editForm").style.display = "none";
        document.getElementById("tableBox").style.display = "block";
    };

function openAddModelAndClose(data) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("tableBox").style.display = "none";

   

    document.getElementById('saveUpdateCustomer').addEventListener('click', () => {
        addCustomerToDataBase();
    })
    

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == document.getElementById("editForm")) {
            document.getElementById("editForm").style.display = "none";
            document.getElementById("tableBox").style.display = "block";
        }
    };
}

function cancle(){
    document.getElementById("editForm").style.display = "none";
    document.getElementById("tableBox").style.display = "block";
}

// function addInputBoxFromFireBase(){
//     // console.log(data)
//     // console.log(objCustData)
//     const custObject = objCustData.find(obj => obj.shopname === data[0]);
//     console.log(custObject)
//     document.getElementById("inputShopName").value = custObject.shopname;
//     document.getElementById("inputFirstName").value =custObject.firstname;
//     document.getElementById("inputLastName").value = custObject.lastname;
//     document.getElementById("inputGstNo").value = custObject.gstno;
//     document.getElementById("inputEmailAddress").value = custObject.emailAddress;
//     document.getElementById("inputPhone").value = custObject.phonenumber;
//     document.getElementById("latandlong").value = custObject.locationCoords;
//     document.getElementById("googleMapAddress").value = custObject.googleMapAddress;
//     document.getElementById("address").value = custObject.locationAddress;
//     var latsAndLongs = custObject.locationCoords.split(',')
//     var myLatlng = new google.maps.LatLng(latsAndLongs[0],latsAndLongs[1]);
//     markOnMapAndDragable(myLatlng)
//     document.getElementById('saveUpdateCustomer').addEventListener('click', () => {
//         updateCustomer(custObject.key);
//     });
    
// }

function ExportToExcel(type, fn, dl) {
    // var elt = document.getElementById('example');
    // var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    // return dl ?
    //   XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
    //   XLSX.writeFile(wb, fn || ('CustomerList.' + (type || 'xlsx')));

    
 }

 function addCustomerToDataBase(key){
    var inputUsn = document.getElementById("inputUsn").value;
    var inputStudentName = document.getElementById("inputStudentName").value;
    var inputCompany = document.getElementById("inputCompany").value;
    var inputOfferLetter = document.getElementById("inputOfferLetter").files[0];
    var inputOnOffCampus = document.getElementById("inputOnOffCampus").value;
    var inutSelectPassoutYear = document.getElementById("inutSelectPassoutYear").value;
    
    
    // console.log(key)

    var offerUrl;
    const ref=firebase.storage().ref('StudentDoc');
    // document.getElementById("cv").files[0];
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
            company:inputCompany,
            offer: offerUrl,
            campus: inputOnOffCampus,
            passoutYear: inutSelectPassoutYear
            
          }).then(
                    alert("Successfully added")
            );
            
  });
    
    // firebase.database().ref().child("Customers/" + key).update({
    //     usn: inputUsn,
    //     studentName: inputStudentName,
    //     offer: inputOfferLetter,
    //     campus: inputOnOffCampus,
    //     passoutYear: inutSelectPassoutYear
    //   }).then(
    //     alert('Updated Successfully.\nPlease click on reload button above the table'),
    //     document.getElementById("editForm").style.display = "none",
    //     document.getElementById("tableBox").style.display = "block"
    //   );
    
}
