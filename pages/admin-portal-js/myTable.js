var objCustData  = [];

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
                                
                                openAddModelAndClose(data);
                            }
                    },
                    {
                    text: 'Edit',
                    action: function ( e, dt, node, config) {
                            var data = table.rows('.selected').data();
                            if(data[0]){
                                updateInputBoxFromFireBase(data);
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
        addCustomerToDataBase()
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

function updateInputBoxFromFireBase(data){
    document.getElementById("editForm").style.display = "block";
    document.getElementById("tableBox").style.display = "none";
    window.onclick = function (event) {
        if (event.target == document.getElementById("editForm")) {
            document.getElementById("editForm").style.display = "none";
            document.getElementById("tableBox").style.display = "block";
        }
    };
    var data1 = data[0]
    document.getElementById("inputUsn").value = data1[0];
    document.getElementById("inputStudentName").value = data1[1];
    document.getElementById("inputCompany").value = data1[2];
    console.log(data1[4])
    document.getElementById("inputOnOffCampus").options.namedItem(""+data1[4]+"").selected = true;
    document.getElementById("inputOnOffCampus").value = data1[4];
    document.getElementById("inutSelectPassoutYear").options.namedItem(""+data1[5]+"").selected = true ;
    document.getElementById("inutSelectPassoutYear").value = data1[5];
    const custObject = objCustData.find(obj => obj.usn === data1[0] && obj.company === data1[2] && obj.campus === data1[4] && obj.passoutYear == data1[5] );
        // updateStudent(custObject.key);
        // console.log(custObject.key)
        document.getElementById('saveUpdateCustomer').addEventListener('click', () => {
            updateStudentToDataBase(custObject.key,custObject.offer);
        })
    
}

function updateStudentToDataBase(key,offer){
    var inputUsn = document.getElementById("inputUsn").value;
    var inputStudentName = document.getElementById("inputStudentName").value;
    var inputCompany = document.getElementById("inputCompany").value;
    var inputOfferLetter = document.getElementById("inputOfferLetter").files[0]; 
    var inputOnOffCampus = document.getElementById("inputOnOffCampus").value;
    var inutSelectPassoutYear = document.getElementById("inutSelectPassoutYear").value;
    var urlDownload = offer
    if(inputOfferLetter !== undefined ) {
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
            alert('Updated Successfully.\nPlease click on reload button above the table'),
            document.getElementById("editForm").style.display = "none",
            document.getElementById("tableBox").style.display = "block"
          );
        });
    } 
    else{

    console.log(key)

    firebase.database().ref().child("PlacementStudent/" + key).update({
        usn: inputUsn,
        studentName: inputStudentName,
        offer: urlDownload,
        key:key,
        company:inputCompany,
        campus: inputOnOffCampus,
        passoutYear: inutSelectPassoutYear
      }).then(
        alert('Updated Successfully.\nPlease click on reload button above the table'),
        document.getElementById("editForm").style.display = "none",
        document.getElementById("tableBox").style.display = "block"
      );
    }
}

 function addCustomerToDataBase(){
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
            key:key,
            offer: offerUrl,
            campus: inputOnOffCampus,
            passoutYear: inutSelectPassoutYear
            
          }).then(
                    alert("Successfully added")
            );
            
  });
    
    
    
}
