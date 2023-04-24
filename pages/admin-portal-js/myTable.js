var objCustData  = [];
var addData  = [];
var updateData  = [];
var deleteData = {}
var msg = document.getElementById("alert");
var alertText = document.getElementById("alertText")
document.getElementById("spinner").style.display = "block";
$(document).ready(function () {

    var data = [
      ];
      $('#example tfoot th').each( function (i) {
        var title = $('#example thead th').eq( $(this).index() ).text();
        $(this).html( '<input type="text" placeholder="search '+title+'"class="form-control" data-index="'+i+'" />' );
    });

    var data = []
   


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
                    'pdf','csv',
                    {
                        text: 'Add',
                        action: function ( e, dt, node, config) {
                            var data = table.rows('.selected').data();
                                addData = []
                                document.getElementById("saveNewCustomer").style.display = "block"
                                updateInputBoxFromFireBase(data[0]);
                                // openAddModelAndClose();
                            }
                    },
                    {
                    text: 'Edit',
                    action: function ( e, dt, node, config) {
                            var data = table.rows('.selected').data();
                            if(data[0]){
                                updateData = []
                                document.getElementById("saveUpdateCustomer").style.display = "block"
                                updateInputBoxFromFireBase(data[0]);
                            }
                        }
                    },
                    {
                        text: 'Delete',
                        action: function ( e, dt, node, config) {
                                var data = table.rows('.selected').data();
                                var data2=[]
                                if(data[0]){
                                    data2 = data[0]
                                    deleteData = objCustData.find(obj => obj.usn === data2[0] && obj.company === data2[2] && obj.campus === data2[4] && obj.passoutYear == data2[5]);
                                    console.log(deleteData)
                                    firebase.database().ref('PlacementStudent/'+deleteData.key).remove().then(alert(data2[0]+" "+data2[2]+" Deleted Successfully"))
                                }
                            }
                        },
                    {
                        text: 'Reload',
                        action: function ( e, dt, node, config ) {
                            dt.ajax.reload();
                        }
                    }
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
                    var obj = {}
                    var fullData = []
                    var innerData = data[i]
                    obj.usn = innerData['usn']
                    obj.studentName = innerData['studentName']
                    obj.company = innerData['company']
                    obj.offer = innerData['offer']
                    obj.campus = innerData['campus']
                    obj.passoutYear = innerData['passoutYear']
                    obj.key = innerData['key']
                    objCustData.push(obj)

                    if(innerData['passoutYear'] == pass || pass === 'All'){

                        
                    fullData.push(innerData['usn'])
                    fullData.push(innerData['studentName'])
                    fullData.push(innerData['company'])
                    fullData.push(innerData['offer'])
                    fullData.push(innerData['campus'])
                    fullData.push(innerData['passoutYear'])
                    CollectRecord.push(fullData) 
                }
               }  
            
               document.getElementById("spinner").style.display = "none";
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
                              "<option id='2017-2018'>2017-2018</option>"+
                              "<option id='2018-2019'>2018-2019</option>"+
                              "<option id='2019-2020'>2019-2020</option>"+
                              "<option id='2020-2021'>2020-2021</option>"+
                              "<option id='2021-2022'>2021-2022</option>"+
                              "<option id='2022-2023'>2022-2023</option>"+
                              "<option id='2023-2024'>2023-2024</option>"+
                              "<option id='2024-2025'>2024-2025</option>"+
                              "<option id='2025-2026'>2025-2026</option>"+
                              "<option id='2028-2027'>2028-2027</option>"+
              "</select>"
                ).appendTo("#example_wrapper .flex-wrap");
        
         $(".flex-wrap").addClass("pull-right");

         $('#year').change(function () {
 
            table.ajax.reload();

        })
    
});

var close1 = document.getElementById("close");
    close1.onclick = function () {
        closeEditAndShowTable();
    };

// function openAddModelAndClose(data) {
//     document.getElementById("editForm").style.display = "block";
//     document.getElementById("tableBox").style.display = "none";
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//         if (event.target == document.getElementById("editForm")) {
//             closeEditAndShowTable();
//         }
//     };
// }



function cancle(){
    closeEditAndShowTable();
}

function updateInputBoxFromFireBase(dataUpdateOrAdd){
    document.getElementById("editForm").style.display = "block";
    document.getElementById("tableBox").style.display = "none";
    window.onclick = function (event) {
        if (event.target == document.getElementById("editForm")) {
            closeEditAndShowTable();
        }
    };
    addData = dataUpdateOrAdd;
    updateData = dataUpdateOrAdd;
    if(Array.isArray(dataUpdateOrAdd) && dataUpdateOrAdd.length){
    document.getElementById("inputUsn").value = dataUpdateOrAdd[0];
    document.getElementById("inputStudentName").value = dataUpdateOrAdd[1];
    document.getElementById("inputCompany").value = dataUpdateOrAdd[2];
    console.log(dataUpdateOrAdd[4])
    document.getElementById("inputOnOffCampus").options.namedItem(""+dataUpdateOrAdd[4]+"").selected = true;
    document.getElementById("inputOnOffCampus").value = dataUpdateOrAdd[4];
    document.getElementById("inutSelectPassoutYear").options.namedItem(""+dataUpdateOrAdd[5]+"").selected = true ;
    document.getElementById("inutSelectPassoutYear").value = dataUpdateOrAdd[5];
    }
}

document.getElementById('saveNewCustomer').addEventListener('click', () => {
    addCustomerToDataBase()
})

document.getElementById('saveUpdateCustomer').addEventListener('click', () => {
    var custObject = objCustData.find(obj => obj.usn === updateData[0] && obj.company === updateData[2] && obj.campus === updateData[4] && obj.passoutYear == updateData[5] );
    console.log(custObject)
    updateStudentToDataBase(custObject.key, custObject.offer);
})

function updateStudentToDataBase(key,offer){
    document.getElementById("spinner").style.display = "block";
    var inputUsn = document.getElementById("inputUsn").value;
    var inputStudentName = document.getElementById("inputStudentName").value;
    var inputCompany = document.getElementById("inputCompany").value;
    var inputOfferLetter = document.getElementById("inputOfferLetter").files[0]; 
    var inputOnOffCampus = document.getElementById("inputOnOffCampus").value;
    var inutSelectPassoutYear = document.getElementById("inutSelectPassoutYear").value;
    var urlDownload = offer
    if(inputOfferLetter !== undefined ) {
        document.getElementById("spinner").style.display = "block";
        inputOfferLetter = document.getElementById("inputOfferLetter").files[0];
        const ref=firebase.storage().ref('StudentDoc');
        const name=inputCompany+"-"+inputUsn;
        const metadata={
          contentType:document.getElementById("inputOfferLetter").files[0].type
        };
        const task=ref.child(name).put(inputOfferLetter,metadata);
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then (url =>{ firebase.database().ref().child("PlacementStudent/" + key).update({
            usn: inputUsn,
            studentName: inputStudentName,
            offer: url,
            key:key,
            company:inputCompany,
            campus: inputOnOffCampus,
            passoutYear: inutSelectPassoutYear
          }).then(
            alert('Updated Successfully.\n PLease click on reload button above table'),
            document.getElementById("saveUpdateCustomer").style.display = "none",
            closeEditAndShowTable()
          ).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + " : " + errorMessage);
                msg.style.display = "block";
                alertText.innerHTML = errorMessage;
                document.getElementById("spinner").style.display = "none";
              });
        });
    } 
    else{

    console.log(key)
    document.getElementById("spinner").style.display = "block",

    firebase.database().ref().child("PlacementStudent/" + key).update({
        usn: inputUsn,
        studentName: inputStudentName,
        offer: urlDownload,
        key:key,
        company:inputCompany,
        campus: inputOnOffCampus,
        passoutYear: inutSelectPassoutYear
      }).then(
        alert('Updated Successfully.\n PLease click on reload button above table'),
        closeEditAndShowTable()
      ).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " : " + errorMessage);
        msg.style.display = "block";
        alertText.innerHTML = errorMessage;
        document.getElementById("spinner").style.display = "none";
      });;
    }
}

 function addCustomerToDataBase(){
    document.getElementById("spinner").style.display = "block";
    var inputUsn = document.getElementById("inputUsn").value;
    var inputStudentName = document.getElementById("inputStudentName").value;
    var inputCompany = document.getElementById("inputCompany").value;
    var inputOfferLetter = document.getElementById("inputOfferLetter").files[0];
    var inputOnOffCampus = document.getElementById("inputOnOffCampus").value;
    var inutSelectPassoutYear = document.getElementById("inutSelectPassoutYear").value;
    
    if(inputCompany===undefined || inputOfferLetter === undefined || inputOnOffCampus === undefined || inutSelectPassoutYear === undefined){
        msg.style.display = "block";
        alertText.innerHTML = "Please provide all the details";
        document.getElementById("spinner").style.display = "none";
    } else{
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
            key:key,
            offer: offerUrl,
            campus: inputOnOffCampus,
            passoutYear: inutSelectPassoutYear
            
          }).then(
                    confirm("Updated Successfully.\n PLease click on reload button above table"),
                    document.getElementById('saveNewCustomer').style.display = "none",
                    closeEditAndShowTable()
            ).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + " : " + errorMessage);
                msg.style.display = "block";
                alertText.innerHTML = errorMessage;
                document.getElementById("spinner").style.display = "none";
              });;
            
  });
}
    
    
    
}

function closeEditAndShowTable() {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("editForm").style.display = "none";
    document.getElementById("tableBox").style.display = "block";
    document.getElementById("saveNewCustomer").style.display = "none";
    document.getElementById("saveUpdateCustomer").style.display = "none";
    document.getElementById("myForm").reset();
}
