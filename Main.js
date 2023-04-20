function RouteToNext(event) {
    console.log("calleld lelvent")
    console.log("event===", event.target.id)
    if (event.target.id == 'Great_Expectation_Table') {
        aws_tableData()
    }
    else if (event.target.id == 'mailer') {
        aws_tableData()
        //   alert("called next")
    }
    window.location.href = "http://127.0.0.1:5000/route_to_next?id=" + event.target.id;

}

// Taking data from dataframe to show in the final page data dynamically. This will operate in upload file

async function getData() {
    localStorage.removeItem('file');
    const fileData = document.getElementById("file").files[0];
    const delimeter = document.getElementById("sep").value
    // const demieter_value={"delimeter":delimeter}
    console.log("FFFFFF", fileData);
    const formData = new FormData()
    formData && formData.append('file', fileData)
    formData && formData.append('delimeter', delimeter)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = xhttp.responseText;
            let response = JSON.parse(res)
            console.log(JSON.parse(response.tableData));
            localStorage.setItem("file", (response.tableData))
            document.getElementById("Great_Expectation_Table").style.display = "block";
            alert("Uploaded Successfully.")
        } else if (this.readyState == 4 && (this.status == 404 || this.status == 500 || this.status == 303)) {
            alert("Error With the Data.")
        }
    };
    xhttp.open("POST", "http://127.0.0.1:5000/upload", true);
    xhttp.send(formData);
}


//Sending AWS credintials to backend

function aws_crud() {
    localStorage.removeItem('file');
    const File = document.getElementById("aws_file").files[0]
    const file_name = document.getElementById("aws_file").files[0]["name"];
    const bucket_name = document.getElementById("aws_bucket_name").value;
    const file_path = document.getElementById("aws_file_path").value;
    const aws_credentials = { "File_name": file_name, "Bucket_name": bucket_name, "File_path": file_path }

    // console.log(gcp_credentials)
    const formData = new FormData()
    formData.append("aws_credentials", JSON.stringify(aws_credentials))
    formData.append("file", File)

    console.log(formData, formData.get("aws_credentials"))

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("Gcp_Great_Expectation_table").style.display = "block";


            var res = xhttp.responseText;
            let response = JSON.parse(res)
            if (response?.success) {
                localStorage.setItem("file", (response.tableData))
                alert("Uploaded Successfully.")
                const jsondata = {
                    target: {
                        id: "Great_Expectation_Table"
                    }
                }
                RouteToNext(jsondata)
                aws_tableData()

            } else {
                alert("Please enter valid credentials and try again")
            }




            // alert("Uploaded Successfully.")
        } else if (this.readyState == 4 && (this.status == 404 || this.status == 500 || this.status == 303)) {
            alert("Error With the Data.")
        }
    };

    xhttp.open("POST", "http://127.0.0.1:5000/aws_crud", true);
    xhttp.send(formData);
}



//Calling api because taking file from flask api

function aws_tableData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = xhttp.responseText;
            let response = JSON.parse(res)
            console.log(JSON.parse(response.tableData));
            localStorage.setItem("aws_file", (response.tableData))
            // renderTableData()
        } else if (this.readyState == 4 && (this.status == 404 || this.status == 500 || this.status == 303)) {
            alert("Error With the Data.")
        }
    };

    xhttp.open("POST", "http://127.0.0.1:5000/aws_GE", true);
    xhttp.send({});

}

//If the response true in aws_tableData it will call

// function renderTableData (){
//     const tableData = JSON.parse(localStorage.getItem('file'));
//     let MainHeaderColumns = ''
//     let SubHeaderColumns = ''
//     let tempArray = []

//     Object.keys(tableData).forEach((eachCol, colIndex) => {
//         tempArray.push(tableData[eachCol].length)
//         MainHeaderColumns += `<th colspan="3" class="text-center" >${eachCol}</th>`
//         SubHeaderColumns += `<th class="text-center">Requirred</th>
//             <th class="text-center">Expectations</th>
//             <th class="text-center">Value</th>`
//     });

//     let maxSize = Math.max(...tempArray)
//     let TableRows = ""

//     for (let i = 0; i < maxSize; i++) {
//         TableRows += `<tr>`
//         Object.keys(tableData).map((eachCol, colIndex) => {
//             let id = eachCol.toLowerCase() + '-' + tableData[eachCol][i];
//             TableRows += `<td> <input type="checkbox" id="${id + "-checkbox"}" /> </td><td>${tableData[eachCol][i]}</td><td><input id="${id}" type="text"/></td>`

//         })
//         TableRows += `</tr>`

//         document.getElementById("tbody").innerHTML = TableRows;

//     }

//         let CommonExpectationsData = "";
//     ["expect_column_to_exist",

//         "expect_table_columns_to_match_ordered_list",

//         "expect_table_columns_to_match_set",

//         "expect_table_row_count_to_be_between",

//         "expect_table_row_count_to_equal",

//         "expect_table_row_count_to_equal_other_table"].map((eachExpe, expIndex) => {
//             CommonExpectationsData += `
//     <tr>
//     <td>
//         <label for=${eachExpe}></label>
//         <input type="checkbox" id="${eachExpe + "-checkbox"}" >
//     </td>
//     <td>${eachExpe}
//     <td> <input type="text" id=${eachExpe} ></td>
//   </tr>
//     `
//         })

//         document.getElementById("CommonExpectationsTableBody").innerHTML = CommonExpectationsData;

//             document.getElementById('MainColumns').innerHTML = MainHeaderColumns
//             document.getElementById('SubColumns').innerHTML = SubHeaderColumns
// }



//Complete GCP code

function gcp_crud() {
    localStorage.removeItem('file');
    const File = document.getElementById("gcp_file").files[0]
    const file_name = document.getElementById("gcp_file").files[0]["name"];
    const bucket_name = document.getElementById("Gcp_bucket_name").value;
    const file_path = document.getElementById("Gcp_FilePath").value;
    const gcp_credentials = { "File_name": file_name, "Bucket_name": bucket_name, "File_path": file_path }

    // console.log(gcp_credentials)
    const formData = new FormData()
    formData.append("gcp_credentials", JSON.stringify(gcp_credentials))
    formData.append("file", File)

    console.log(formData, formData.get("gcp_credentials"))

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("Gcp_Great_Expectation_table").style.display = "block";


            var res = xhttp.responseText;
            let response = JSON.parse(res)
            if (response?.success) {
                localStorage.setItem("file", (response.tableData))
                alert("Uploaded Successfully.")
                const jsondata = {
                    target: {
                        id: "Great_Expectation_Table"
                    }
                }
                RouteToNext(jsondata)
                aws_tableData()

            } else {
                alert("Please enter valid credentials and try again")
            }




            // alert("Uploaded Successfully.")
        } else if (this.readyState == 4 && (this.status == 404 || this.status == 500 || this.status == 303)) {
            alert("Error With the Data.")
        }
    };

    xhttp.open("POST", "http://127.0.0.1:5000/gcp_crud", true);
    xhttp.send(formData);
    // Result_page();
}




//Calling api because taking file from flask api

function gcp_tableData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = xhttp.responseText;
            let response = JSON.parse(res)
            console.log(JSON.parse(response.tableData));
            localStorage.setItem("gcp_file", (response.tableData))
            // gcp_renderTableData()
        } else if (this.readyState == 4 && (this.status == 404 || this.status == 500 || this.status == 303)) {
            alert("Error With the Data.")
        }
    };

    xhttp.open("POST", "http://127.0.0.1:5000/gcp_GE", true);
    xhttp.send({});

}



function onFieldsChangeAwsCloud(event) {

    const File = document.getElementById("aws_file")?.files[0]
    const file_name = document.getElementById("aws_file")?.files[0]["name"];
    // const File_Path=document.getElementById("filePath").value;
    const bucket_name = document.getElementById("aws_bucket_name").value;
    const file_path = document.getElementById("aws_file_path").value;
    // console.log({file_name, bucket_name, file_path})
    if (file_name && bucket_name && file_path) {
        document.getElementById('valid_aws').disabled = false;
    }
}
function onFieldsChangeGCPCloud(event) {

    const File = document.getElementById("gcp_file")?.files[0]
    const file_name = document.getElementById("gcp_file")?.files[0]["name"];
    // const File_Path=document.getElementById("filePath").value;
    const bucket_name = document.getElementById("Gcp_bucket_name").value;
    const file_path = document.getElementById("Gcp_FilePath").value;
    // console.log({file_name, bucket_name, file_path})
    if (file_name && bucket_name && file_path) {
        document.getElementById('gcp_submit').disabled = false;
    }
}


async function mail_crud() {
    const sender_mail = document.getElementById("sender").value;
    const receiver_mail = document.getElementById("receiver").value;
    const Subject = document.getElementById('Subject').value;
    const mail_credentials = { "sender_name": sender_mail, "receiver_mail": receiver_mail, "Subject": Subject }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = xhttp.responseText;
            let response = (res)
            console.log(JSON.parse(response));
            document.getElementById("success").style.display = "block";
        } else if (this.readyState == 4 && (this.status == 404 || this.status == 500 || this.status == 303)) {
            alert("Error With the Data.")
        }
    };
    xhttp.open("POST", "http://127.0.0.1:5000/mail_crud", true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(mail_credentials));
}


//Display the columns in dropdown
let CommonExpectationsData = "";
    ["expect_column_to_exist",

        "expect_table_columns_to_match_ordered_list",

        "expect_table_columns_to_match_set",

        "expect_table_row_count_to_be_between",

        "expect_table_row_count_to_equal",

        "expect_table_row_count_to_equal_other_table"].map((eachExpe, expIndex) => {
            CommonExpectationsData += `
            <div class="row">
    <tr>
       <div class="col-md-2">
       <td>
        <label for=${eachExpe}></label>
        <input type="checkbox" id="${eachExpe + "-checkbox"}" onchange="Common_GE_onInputChange(event)" >
       </td>
    </div>
    <div class="col-md-8">

    <td>${eachExpe}</td>
    </div>
    <div class="col-md-2">

    <td> <input type="text" id=${eachExpe} style="background-color:transparent; font-weight:bold; color:white;" onchange="CE_delte_checked_function(event);"  placeholder="Comma Seperated Values" ></td>
    </div>

  </tr>
  </div>
    `
        })

function loadJsonData() {
    // localStorage.removeItem('expectationTableData');
    // document.getElementById("user_show2").style.display = "none";
    const kk = localStorage.getItem("file");
    console.log(JSON.parse(kk))
    let tableData = JSON.parse(kk);
    const columns = Object.keys(tableData)
    document.getElementById('firstCol').innerHTML = `<ul>` + columns.map((c) => {
        return `<li> <input id=${c.split(" ").join("_") + "-checkbox"} name=${c.split(" ").join("_") + "-checkbox"} type="checkbox" onchange="change(event)" ><span id=${c.split(" ").join("_")} class="selCol">${c}</span></li>`
    }).join(" ") + `</ul>`
    
    
    document.getElementById("thirdcol").innerHTML = CommonExpectationsData;


    cs = document.getElementsByClassName("selCol")
    console.log("cs==", cs)
    for (i = 0; i < cs.length; i++) {
        // cs[i].addEventListener("mouseover", onHover, true);
    }

}



function change(e) {
    const toBeRemoved = e.target.name.split("-")[0]
    console.log(e.target.name, toBeRemoved, e.target.checked)
    if (!e.target.checked) {
        delete tableData1[toBeRemoved.split("_").join(" ")]
        console.log(tableData1)
        tableData()
    } else {
        onHover({ target: { id: toBeRemoved } })
    }
}



function sub_change(e) {
    // const toBeRemoved2 = e.target.name.split("=")[2].split("-")[0];
    
    const [parent, childBody] = e.target.id.split('=');
    const child = childBody.split('-')[0]
    console.log(e.target.id, e.target.checked)
    if (!e.target.checked) {
        delete tableData1[parent.split("_").join(' ')][child]
        tableData()
    }
}

let User_Clicked_Expectation={}
function onHover(e) {
    console.log(document.getElementById(e.target.id + "-checkbox")?.checked, e.target.id)
    if (document.getElementById(e.target.id + "-checkbox")?.checked) {
        
        const kk = localStorage.getItem("file");
        console.log(JSON.parse(kk))
        let tableData = JSON.parse(kk);
        console.log(e.target.id, tableData1)

        document.getElementById('secondCol').innerHTML = `<div>` + tableData[e.target.id.split("_").join(" ")].map((d) => {
            const existsValue = (tableData1[e.target.id.split("_").join(" ")] && tableData1[e.target.id.split("_").join(" ")][d]);
            return `<div class="row"><div class="col-md-1"><input type="checkbox" id="${e.target.id + "=" + d + "-checkbox"}" onchange="sub_change(event)" value="${existsValue}" /></div><div class="col-md-7">${d}</div> <div class="col-md-2"><input type="text" style="background-color:transparent; font-weight:bold; color:white;"  placeholder="Comma Seperated Values:"; id="${e.target.id + "=" + d}" onblur="onInputChange(event)" value="${existsValue ? tableData1[e.target.id.split("_").join(" ")][d] : ""}" /></div></div>`
        }).join(" ") + `</div>`

        
                

    } else {
        console.log(e.target.name)
    }
}


function Checked_CE(e){
    console.log(e.target.id)
    User_Clicked_Expectation[e.target.id] = e.target.value;
    console.log("User_Clicked_Expectation==",User_Clicked_Expectation)
    check_box=e.target.id + "-checkbox";
    if(document.getElementById(check_box).checked){
        
        localStorage.setItem("User_Clicked_Expectation", JSON.stringify(User_Clicked_Expectation))

    tableData2=User_Clicked_Expectation;
    // document.getElementById("user_show2").style.display = "none";
    Common_Exp_tableData();
    }

}

     
function CE_sub_change(e) {
    // const toBeRemoved2 = e.target.name.split("=")[2].split("-")[0];
    
    const CE_checkbox = e.target.id;
    console.log("CE_checkbox===",CE_checkbox);

    console.log("CE_sub_change")
    if (!e.target.checked) {
        delete tableData2[CE_checkbox]

    Common_Exp_tableData();
    localStorage.setItem("_Clicked_Expectation",JSON.stringify(tableData2))

    }
    // else if(tableData2.size==0){
        // delete tableData2;
        // cmn=document.getElementById("common_show")
        // cmn.innerHTML="";
        // localStorage.setItem("_Clicked_Expectation",JSON.stringify(tableData2))

    // }
}

function CE_delte_checked_function(e){
    Checked_CE(e);
    CE_sub_change(e);
}




//Sendig the data to server from Drop Down document.getElementById("user_show2").style.display = "none";

let expectationTableData = {}

function onInputChange(e) {
    const inputId = e.target.id;

    if (document.getElementById(inputId + "-checkbox").checked) {
        console.log("target value", e.target.value)
        const parentKey = inputId.trim().split("=")
        // expectationTableData[]
        expectationTableData[parentKey[0].split("_").join(" ")] = expectationTableData[parentKey[0].split("_").join(" ")] || {}
        expectationTableData[parentKey[0].split("_").join(" ")][parentKey[1]] = e.target.value;
        console.log("expectationTableData==", expectationTableData)
        localStorage.setItem("expectationTableData", JSON.stringify(expectationTableData))
        tableData1 = expectationTableData;
        document.getElementById("user_show").style.display = "none";
        tableData()
    }

}
let tableData2={};
function Common_GE_onInputChange(e) {
   console.log(e.target.id)
   const cmnExpID=e.target.id;
   if(document.getElementById(cmnExpID).checked){
    localStorage.setItem("User_Clicked_Expectation", JSON.stringify(User_Clicked_Expectation))

    tableData2=User_Clicked_Expectation;
    // document.getElementById("user_show2").style.display = "none";
    Common_Exp_tableData(); 
   }
   else{
      delete tableData2[cmnExpID.split("-")[0]];
      localStorage.setItem("User_Clicked_Expectation", JSON.stringify(tableData2));
      Common_Exp_tableData();
   }
}

var Expectation_Values={
    "UniqueExpectationValues": expectationTableData,"CommonExpectation": User_Clicked_Expectation
}

function Next_Expectation() {
    const url = "http://localhost:5000/file_GE"
    fetch(url, { method: 'POST', body: JSON.stringify({ "Expectation_Values":Expectation_Values}) }).then((response) => {
        console.log(response)
        alert("send successfully");
        RouteToNext({ target: { id: "mailer" } });
    })
}
let tableData1 = {}
function tableData() {

    document.getElementById("user_show").style.display = "block";
    
    document.getElementById("tbody").innerHTML = "";

    const kk = localStorage.getItem("expectationTableData");
    // console.log(JSON.parse(kk))
    // let tableData = JSON.parse(kk);
    console.log("tableData=", tableData1)



    let MainHeaderColumns = ''
    let SubHeaderColumns = ''
    let selected_values = ''
    let tempArray = []

    //   console.log(Object.keys(tableData1))
    Object.keys(tableData1).map((eachCol, colIndex) => {
        tempArray.push(Object.keys(tableData1[eachCol]).length)

        MainHeaderColumns += `
          
          <th colspan="2" class="text-center" >${eachCol}</th>
          `
        SubHeaderColumns += `
          <th class="text-center">Expectations</th>
          <th class="text-center">Value</th>
          `
        selected_values += ``

    })

    let maxSize = Math.max(...tempArray)
    let TableRows = ""
    console.log({ tempArray, maxSize })

    for (let i = 0; i < maxSize; i++) {
        TableRows += `<tr>`
        Object.keys(tableData1).map((eachCol, colIndex) => {
            let id = eachCol.toLowerCase() + '-' + Object.keys(tableData1[eachCol])[i];
            TableRows += Object.keys(tableData1[eachCol]).length > i ? `<td>${Object.keys(tableData1[eachCol])[i]}</td><td>${tableData1[eachCol][Object.keys(tableData1[eachCol])[i]]}</td>` : `<td></td><td></td>`;
        })
        TableRows += `</tr>`

        document.getElementById("tbody").innerHTML = TableRows;

    }

    document.getElementById('MainColumns').innerHTML = MainHeaderColumns
    document.getElementById('SubColumns').innerHTML = SubHeaderColumns

}



// function Common_Exp_tableData() {

//     document.getElementById("user_show2").style.display = "block";
    
//     document.getElementById("CExptbody").innerHTML = "";

//     // const kk = localStorage.getItem("expectationTableData");
//     // console.log(JSON.parse(kk))
//     // let tableData = JSON.parse(kk);
//     console.log("User_Clicked_Expectation=", User_Clicked_Expectation)



//     // let MainHeaderColumns = ''
//     let CExpSubColumns = ''
//     let CExptbody = ''
//     let tempArray = []

//     //   console.log(Object.keys(tableData1))
//     Object.keys(tableData2).forEach((eachCol, colIndex) => {
//         tempArray.push(Object.keys(tableData2).length)

//         // MainHeaderColumns += `
          
//         //   <th colspan="2" class="text-center" >${eachCol}</th>
//         //   `
//         CExpSubColumns += `
//           <th class="text-center">Expectations</th>
//           <th class="text-center">Value</th>
//           `
//           CExptbody += ``

//     })

//     let maxSize = Math.max(...tempArray)
//     let TableRows = ""
//     console.log({ tempArray, maxSize })

//     for (let i = 0; i < maxSize; i++) {
//         TableRows += `<tr>`
//         Object.keys(tableData2).map((eachCol, colIndex) => {
//             let id = eachCol.toLowerCase() + '-' + Object.keys(tableData2[eachCol])[i];
//             TableRows += Object.keys(tableData2[eachCol]).length > i ? `<td>${Object.keys(tableData2[eachCol])[i]}</td><td>${tableData2[eachCol][Object.keys(tableData2[eachCol])[i]]}</td>` : `<td></td><td></td>`;
//         })
//         TableRows += `</tr>`

//         document.getElementById("CExptbody").innerHTML = TableRows;

//     }

//     // document.getElementById('MainColumns').innerHTML = MainHeaderColumns
//     document.getElementById('CExpSubColumns').innerHTML = CExpSubColumns

// }


function Common_Exp_tableData(){
    // tableData2
    const start = `<table class="table table-bordered" style="margin:auto;">
    <thead id="common_show">
    <tr style="background-color: black;color:white;">
    <th class="text-center">Expectations</th>
          <th class="text-center">Value</th>
    </tr>
    </thead>
    <tbody>`
    
    const end = `
    </tbody>
    </table>`
    kk=localStorage.getItem('User_Clicked_Expectation')
    tableData2=JSON.parse(kk);
    const keys = Object.keys(tableData2)
    const body = keys.map((key) => `<tr id="${key}"><td>${key}</td>  <td>${tableData2[key]}</td></tr>`).join("")
    document.getElementById('CommonExpectation').innerHTML = start + body + end;
    
}
