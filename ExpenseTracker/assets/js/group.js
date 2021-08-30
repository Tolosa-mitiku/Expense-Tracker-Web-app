import exptrcker,{insertrecord,} from './module.js';
import {db} from './indexDB.js';
document.addEventListener('DOMContentLoaded', () => {
    lister1()
    lister2()

    });


// receiving and storing the groupNAme and team members 
var para = new URLSearchParams(window.location.search);

var groupName = para.get("groupName")
var userName = para.get("userName")
var team_member = JSON.parse(para.get("team_member"))

// Variables for Recording group data
const records1 = document.querySelector(".records1")
const records2 = document.querySelector(".records2")
const total1 = document.querySelector(".total1")
const total2 = document.querySelector(".total2")
var y = 1;
var z = 1;
var share = "Expected Payment";


// Adding event listeners for inputs and buttons
total1.addEventListener("keyup", shareamount1)
total2.addEventListener("keyup", shareamount2)

// Adding functions for the above

function shareamount1() {
    share = parseInt(total1.value) / team_member.length
    records1.innerHTML = ""
    y = 1
    lister1()
}

function shareamount2() {
    share = parseInt(total2.value) / team_member.length
    records2.innerHTML = ""
    z = 1
    lister2()
}


//  Lister functions that list the team members info

function lister1() {
    team_member.forEach(element => {
        records1.innerHTML += `
        <div class="row">
            <div class="col-sm-12 col-lg-1">${y}</div>
            <div class="col-sm-12 col-lg-5">${element}</div>
            <div class="col-sm-12 col-lg-3">
                <div class="input-group mb-3">
                    <input type="text" class="form-control groupName" placeholder="${share}" aria-label="Username" disabled>
                </div>
            </div>
            <div class="col-sm-12 col-lg-3">
                <div class="input-group mb-3">
                    <input type="text" class="form-control status1${y}" placeholder="Payment Status" aria-label="Username">
                </div>
            </div>
        </div>
    `
        y++
    });

}
function lister2() {
    team_member.forEach(element => {
        records2.innerHTML += `
        <div class="row">
            <div class="col-sm-12 col-lg-1">${z}</div>
            <div class="col-sm-12 col-lg-5">${element}</div>
            <div class="col-sm-12 col-lg-3">
                <div class="input-group mb-3">
                    <input type="text" class="form-control share${z}" placeholder="${share}" aria-label="Username" disabled>
                </div>
            </div>
            <div class="col-sm-12 col-lg-3">
                <div class="input-group mb-3">
                    <input type="text" class="form-control status2${z}" placeholder="Payment Status" aria-label="Username">
                </div>
            </div>
        </div>
    `
        z++
    });

}



// main function to populate our database table groupExpense

function groupExpense(){

    fetch(url + '/groupexpenses/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: groupCategory1.value || groupCategory2.value,
            groupName: groupName,
            teamMember: JSON.stringify(team_member),
            info: JSON.stringify(array2),
            date: datenow,
            userName: userName
        })
    }).then(res => {
        return res.json()
    })
    .then(data => {
        if (!(data.message)) {
            console.log("Successfully fecthed")
        }
  
        if (data.message) {
          console.log("was not successful")
        }
    })
    .catch(error => {
        console.log(error)
        console.log("error")
    })
}


// Navigating group pages

// variables for the group page
var groupCategory1 = document.querySelector(".groupCategory1")
var groupCategory2 = document.querySelector(".groupCategory2")
var groupRecordViewer = document.querySelector(".grouprecordviewer")
var groupRecordSaver = document.querySelector(".grouprecordsaver")
var groupRecordSaver2 = document.querySelector(".grouprecordsaver2")
var blockcategory = document.querySelector(".blockcategory")
var blockcategory2 = document.querySelector(".blockcategory2")
var datenow;
var acordion = document.querySelector(".accordion")
var x = 0;
var j = 0;
var array1 = new Array();
var array2 = new Array();


// Event listeners for the group page
groupRecordViewer.addEventListener('click', listViewer)
groupRecordSaver.addEventListener('click', listRecord)
groupRecordSaver2.addEventListener('click', listRecord)

// Fucntions for the group pages
const url = "http://localhost:3000";

function nextnavigation() {
    fetch(url + `/groupexpenses/users/${userName}/groups/${groupName}`)
    .then(res => {
        return res.json()
    })
    .then(data => {

        if (!(data.message)) {
            acordion.innerHTML = ""
            data.forEach(element => {
           
            blockcategory2.classList.remove("blocka");
            blockcategory.classList.add("blocka")
            acordion.innerHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${x}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${x}" aria-expanded="false" aria-controls="flush-collapse${x}">
                        ${element.category}
                    </button>
                </h2>
                <div id="flush-collapse${x}" class="accordion-collapse collapse acord1" aria-labelledby="flush-heading${x}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body teaminfo${x}">
                        <div class="row">
                            <div class="col">NO</div>
                            <div class="col">Team Members</div>
                            <div class="col">Expected Payment</div>
                            <div class="col">Payment Status</div>
                        </div>
                    </div>
                </div>
            </div>
            `
            z=1
            var teaminfo = document.querySelector(".teaminfo" + x)
            JSON.parse(element.teamMember).forEach(element2 => {
                var status1 = document.querySelector(".status1" + z)
                var status2 = document.querySelector(".status2" + z)
                var share1 = document.querySelector(".share" + z)
                teaminfo.innerHTML += `
                <div class="row">
                    <div class="col-1">${z}</div>
                    <div class="col-5">${element2}</div>
                    <div class="col-3">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control groupName" placeholder="${JSON.parse(element.info)[z-1][2]}" aria-label="Username" disabled>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control status1" placeholder="${JSON.parse(element.info)[z-1][3]}" aria-label="Username" disabled>
                        </div>
                    </div>
                </div>
                `
                z++
                share1.setAttribute("placeholder", "Expected Payment")
            });
            x++
    
            });
            groupCategory1.value = groupCategory2.value = total1.value = total2.value = ""
        }

        if (data.message) {
            console.log("was not successful")
        }

        })
        .catch(error => {
            console.log(error)
            console.log("error")
        })
}

function listViewer() {
nextnavigation()
}


function listRecord(){
array2 = []
j = 1
team_member.forEach(element => {
    var status1 = document.querySelector(".status1" + j)
    var status2 = document.querySelector(".status2" + j)
    datenow = new Date();
    array1.push(z)
    array1.push(element)
    array1.push(share)
    console.log(status1.value || status2.value)
    array1.push(status1.value || status2.value)
    array1.push((status1.value || status2.value) - share)
    array1.push(datenow)
    array2.push(array1)
    array1 = []
    j++
    status1.value = status2.value = ""
});
groupExpense()
nextnavigation()
}


// 