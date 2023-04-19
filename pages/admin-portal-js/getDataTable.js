var data = [
    // {'usn':'2BA17IS048', 'name':'Prathamesh', 'company':'TCS', 'offer':'TCSOfferleter','campus':'on campus'},
    // {'usn':'2BA17IS048', 'name':'Prathamesh', 'company':'COGNI', 'offer':'COGNIOfferleter','campus':'off campus'},
    // {'usn':'2BA17IS049', 'name':'Praneet', 'company':'TCS', 'offer':'TCSOfferleter','campus':'on campus'},
    // {'usn':'2BA17IS047', 'name':'Prathamesh', 'company':'Tech Mahindra', 'offer':'TECHOfferleter','campus':'off campus'},
    // {'usn':'2BA17IS046', 'name':'Prathamesh', 'company':'TCS', 'offer':'TCSOfferleter','campus':'on campus'},
    // {'usn':'2BA17IS045', 'name':'Prathamesh', 'company':'COGNI', 'offer':'COGNIOfferleter','campus':'off campus'},
    // {'usn':'2BA17IS044', 'name':'Praneet', 'company':'TCS', 'offer':'TCSOfferleter','campus':'on campus'},
    // {'usn':'2BA17IS046', 'name':'Prathamesh', 'company':'Tech Mahindra', 'offer':'TECHOfferleter','campus':'on campus'}
  ];

firebase.database().ref('PlacementStudent').once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var obj = {}
        obj.usn = childData.usn,
        obj.name = childData.studentName,
        obj.company = childData.company,
        obj.offer = childData.offer,
        obj.campus = childData.campus,
        data.push(obj)

    });
}).then(() => {
    ShowData()
    
})

    console.log(data)
    document.getElementById('click1').addEventListener('click',()=>{
    
        var o = {
            filename: 'test.doc'
        };
        $(document).googoose(o);
    })

function ShowData() {
        var code = "";

    var newData = {};

    data.forEach(function(item) {
            var key = item.usn + '-' + item.name;
            if (!newData[key]) {
                newData[key] = [];
            }
            newData[key].push({
            company: item.company,
            offer: item.offer,
            campus: item.campus
        });
    });
    console.log(newData)


    var count = 0
    for (var key in newData) {
        if (newData.hasOwnProperty(key)) {
            var usnAndName = key.split('-');
            var usn = usnAndName[0];
            var name = usnAndName[1];
            var companies = newData[key];

            // console.log("USN: " + usn);
            // console.log("Name: " + name);
            count= count+1

            code += "<tr style='border: 1px solid black; border-collapse: collapse;'>"+
                "<td style='border: 1px solid black; border-collapse: collapse;'>"+ count +"</td>"+
                "<td style='border: 1px solid black; border-collapse: collapse;'>"+ name + '<br>'+usn +"</td>";
                
                var companyHtmlOn =''
                var offerHtmlOn = ''
                var companyHtmlOff =''
                var offerHtmlOff = ''
            for (var i = 0; i < companies.length; i++) {
                var company = companies[i].company;
                var offer = companies[i].offer;
                var campus = companies[i].campus;
                console.log(company)
                console.log(offer)
                if(campus === 'ON' && i!== companies.length - 1){
                    // console.log(campus)
                    companyHtmlOn  += "<td style='border-bottom: 1px solid black;border-right:1px solid ; border-collapse: collapse;'>"+ company +"</td>";
                    offerHtmlOn +=  "<td style='border-right:1px solid ;''><a href='"+offer+"'>"+'offer'+"</a></td>";
                }
                if(campus === 'ON' && i== companies.length - 1){
                    // console.log(campus)
                    companyHtmlOn  += "<td style='border-bottom: 1px solid black; border-collapse: collapse;''>"+ company +"</td>";
                    offerHtmlOn +=  "<td style='border: none ''><a href='"+offer+"'>"+offer+"</a></td>";
                }
                if(campus === 'OFF' && i!== companies.length - 1){
                    // console.log(campus)
                    companyHtmlOff  += "<td style='border-bottom: 1px solid black;border-right:1px solid ; border-collapse: collapse;'>"+ company +"</td>";
                    offerHtmlOff +=  "<td style='border-right:1px solid ;''><a href='"+offer+"'>"+offer+"</a></td>";
                }
                if(campus === 'OFF' && i== companies.length - 1){
                    // console.log(campus)
                    companyHtmlOff  += "<td style='border-bottom: 1px solid black; border-collapse: collapse;'>"+ company +"</td>";
                    offerHtmlOff +=  "<td style='border: none ''><a href='"+offer+"'>"+offer+"</a></td>";
                }
                // console.log("Company: " + company);
                // console.log("Offer: " + offer);
                // console.log("campus: " + campus);
            }

            code += "<td style='border: 1px solid black; border-collapse: collapse;'>"+
                    // -------------on campus-------------------
                    "<table style='width: 100%; height: 100%; border: none; border-collapse: collapse; text-align: center;'>"+
                        "<tr style='border-bottom: 0px solid;' id='companiesOn'>"+ companyHtmlOn+
                            // "<td style='border-bottom: 1px solid black;border-right:1px solid ; border-collapse: collapse;'>TCS</td>"+
                            // "<td style='border-bottom: 1px solid black; border-collapse: collapse;''>Cogni</td>"+
                        "</tr>"+
                        "<tr style='border: none' id='offerLettersOn'>"+ offerHtmlOn+
                            // "<td style='border-right:1px solid ;''><a href=''>Offer</a></td>"+
                            // "<td style='border: none ''><a href=''>Offer</a></td>"+
                        "</tr>"+
                    "</table>"+
                "</td>"+
                "<td style='border: 1px solid black; border-collapse: collapse;'>"+ 
                    // -----off campus
                    "<table style='width: 100%; height: 100%; border: none; border-collapse: collapse; text-align: center;'>"+
                        "<tr style='border-bottom: 0px solid;' id='companiesOff'>"+companyHtmlOff+
                            // "<td style='border-bottom: 1px solid black;border-right:1px solid ; border-collapse: collapse;'>TCS</td>"+
                            // "<td style='border-bottom: 1px solid black; border-collapse: collapse;'>Cogni</td>"+
                        "</tr>"+
                        "<tr style='border: none ' id='offerLettersOff'>"+offerHtmlOff+
                            // "<td style='border-right:1px solid ;''><a href=''>Offer</a></td>"+
                            // "<td style='border: none ''><a href=''>Offer</a></td>"+
                        '</tr>'+
                    '</table>'+
                '</td>'+
            '</tr>';

        document.getElementById("addRow").innerHTML = code 

        }
    }
}

    