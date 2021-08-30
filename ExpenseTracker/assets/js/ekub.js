// Import Statments 
import exptrcker,{insertrecord,} from './module.js';
import {db} from './indexDB.js';

// Location Accept
var para = new URLSearchParams(window.location.search);


// These is a teset

// Variables
var userName = para.get("userName")
var ikubName = para.get("ikubName")
var begin_date = para.get("begin_date")
var interval = para.get("interval")
var amount_per_round = para.get("amount_per_round")
var punishment_fee = para.get("punishment_fee")

var team_member2 = JSON.parse(para.get("team_member2"))

var begin_date1 = begin_date.split("-")

var countDownDate = new Date(begin_date1[0], begin_date1[1], begin_date1[2], 0, 0, 0, 0);
var countDownDate2 = new Date(begin_date1[0], begin_date1[1], parseInt(begin_date1[2]) + parseInt(interval), 0, 0, 0, 0);

const cardday1 = document.querySelector(".cardday1")
const cardhour1 = document.querySelector(".cardhour1")
const cardmin1 = document.querySelector(".cardmin1")
const cardsec1 = document.querySelector(".cardsec1")


const cardday2 = document.querySelector(".cardday2")
const cardhour2 = document.querySelector(".cardhour2")
const cardmin2 = document.querySelector(".cardmin2")
const cardsec2 = document.querySelector(".cardsec2")


// CountDown Function
var counter = setInterval(function() {

    var now = new Date().getTime();
    var timeleft1 = countDownDate.getTime() - now;
    var timeleft2 = countDownDate2.getTime() - now;
        
    // Calculating the days, hours, minutes and seconds left
    var days = Math.floor(timeleft1 / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft1 % (1000 * 60)) / 1000);
        

    var days2 = Math.floor(timeleft2 / (1000 * 60 * 60 * 24));
    var hours2 = Math.floor((timeleft2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes2 = Math.floor((timeleft2 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds2 = Math.floor((timeleft2 % (1000 * 60)) / 1000);
        
    // Result is output to the specific element
    cardsec1.innerHTML = seconds
    cardmin1.innerHTML = minutes
    cardhour1.innerHTML = hours
    cardday1.innerHTML = days


    cardsec2.innerHTML = seconds2
    cardmin2.innerHTML = minutes2
    cardhour2.innerHTML = hours2
    cardday2.innerHTML = days2
    
    // Display the message when countdown is over
    if (timeleft1 < 0) {
        clearInterval(counter);
        cardsec1.innerHTML = ""
        cardmin1.innerHTML = ""
        cardhour1.innerHTML = ""
        cardday1.innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP!!";
    }
    if (timeleft2 < 0) {
        clearInterval(counter);
        cardsec2.innerHTML = ""
        cardmin2.innerHTML = ""
        cardhour2.innerHTML = ""
        cardday2.innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP!!";
    }
    }, 1000);




// Document On load
document.addEventListener('DOMContentLoaded', () => {
    nextnavigation()
    });

//  Ikub page
const recordsa = document.querySelector(".recordsa")
const recordsb = document.querySelector(".recordsb")

var x = 0;
var z = 1;

var share = "Expected Payment";
var array1 = new Array();
var array2 = new Array();
var array3 = new Array();
var array4 = new Array();
var checkbox1
var checkbox2
var checkbox3
listera()

// List Contents
function listera() {
team_member2.forEach(element => {
    x++
    recordsa.innerHTML += `
    <div class="row">
        <div class="col-1">${x}</div>
        <div class="col-3">${element}</div>
        <div class="col-3">
            <select class="form-select form-select-xs mb-3 checka${x}" aria-label=".form-select-xs example">
                <option selected>Checked</option>
                <option value="1">Unchecked</option>
            </select>
        </div>
        <div class="col-2">
            <select class="form-select form-select-xs mb-3 checkb${x}" aria-label=".form-select-xs example">
                <option selected>Checked</option>
                <option value="1">Unchecked</option>
            </select>
        </div>
        <div class="col-2">
            <select class="form-select form-select-xs mb-3 checkc${x}" aria-label=".form-select-xs example">
                <option selected>Checked</option>
                <option value="1">Unchecked</option>
            </select>
        </div>
    </div>
    `
});
}

// Insert To Ikub 
function insert() {
    array2 = []
    for (let i = 0; i < team_member2.length; i++) {
        checkbox1 = document.querySelector(`.checka${i+1}`);
        checkbox2 = document.querySelector(`.checkb${i+1}`);
        checkbox3 = document.querySelector(`.checkc${i+1}`);

        var datenow = new Date();
        array1.push(i)
        array1.push(team_member2[i])
        array1.push(checkbox1.options[checkbox1.selectedIndex].text)
        array1.push(checkbox2.options[checkbox2.selectedIndex].text)
        array1.push(checkbox3.options[checkbox3.selectedIndex].text)
        array1.push(datenow)
        array2.push(array1)
        array1 = []
        checkbox1.selectedIndex = 0;
        checkbox2.selectedIndex = 0;
        checkbox3.selectedIndex = 0;        
    }

}
// Send to Database
function ikubExpense(){

    fetch(url + '/ikubexpenses/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ikubname: ikubName,
            teamMember: JSON.stringify(team_member2),
            interval: interval,
            amount_per_round: amount_per_round,
            info: JSON.stringify(array2),
            begin_date: begin_date,
            userName: userName,
            punishment_fee: punishment_fee
            
        })
    }).then(res => {
        return res.json()
    })
    .then(data => {
        if (!(data.message)) {
            console.log("Successfully fetched")
        }
  
        if (data.message) {
          console.log("was not successful")
        }
    })
    .catch(error => {
        console.log(error)
        console.log("error")
    })


    // insertrecord(db.ikub_expense, {
    //     ikubname: ikubName,
    //     team_member: team_member2,
    //     begin_date: begin_date,
    //     interval: interval,
    //     amount_per_round: amount_per_round,
    //     punishment_fee: punishment_fee,
    //     info: array2,
    // });
    }


//  Navigating group pages
var groupRecordSaver = document.querySelector(".grouprecordsaver")
groupRecordSaver.addEventListener('click', saveRecord)


var w = 1
var y = 1;
function saveRecord() {
    insert()
    
    nextnavigation()
}


const url = "http://localhost:3000";
function nextnavigation(){

    ikubExpense()
    fetch(url + `/ikubexpenses/users/${userName}/ikubs/${ikubName}`)
    .then(res => {
        return res.json()
    })
    .then(data => {

        if (!(data.message)) {
            acordion.innerHTML = ""
            data.forEach(element => {
                recordsb.innerHTML = ""
                var number = document.createElement("div")
                var tempo = document.createElement("div")
                tempo.classList.add("container")
                tempo.classList.add("tempo")
                number.innerHTML = `Round ${w}`
                tempo.innerHTML = `
                <div class="row row2">
                            <div class="col-1">NO</div>
                            <div class="col-3">Team Members</div>
                            <div class="col-3">Paid Due</div>
                            <div class="col-2">Punishment</div>
                            <div class="col-2">Won Lottery</div>
                </div>`
                JSON.parse(element.info).forEach(element1 => {
                    tempo.innerHTML += `
                    <div class="row">
                        <div class="col-1">${y}</div>
                        <div class="col-3">${element1[1]}</div>
                        <div class="col-3">
                            <select class="form-select form-select-xs mb-3 checkd${w}${y}" aria-label=".form-select-xs example">
                                <option selected>Checked</option>
                                <option value="1">Unchecked</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <select class="form-select form-select-xs mb-3 checke${w}${y}" aria-label=".form-select-xs example">
                                <option selected>Checked</option>
                                <option value="1">Unchecked</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <select class="form-select form-select-xs mb-3 checkf${w}${y}" aria-label=".form-select-xs example">
                                <option selected>Checked</option>
                                <option value="1">Unchecked</option>
                            </select>
                        </div>
                    </div>
                    `

                    y++
                    // w++
                });
                w++
                recordsb.appendChild(number)
                recordsb.appendChild(tempo)
                y = 1

        });
        }

        if (data.message) {
            console.log("was not successful")
        }

    })
    .then(()=> {
        var h = 1
        data.forEach(element2 => {
            var f = 1
            element2.info.forEach(element3 => {
                checkbox1 = document.querySelector(`.checkd${h}${f}`);
                checkbox2 = document.querySelector(`.checke${h}${f}`);
                checkbox3 = document.querySelector(`.checkf${h}${f}`);
                if (element3[2] == "Unchecked"){
                    checkbox1.value = "1"
                }
                if (element3[3] == "Unchecked"){
                    checkbox2.value = "1"
                }
                if (element3[4] == "Unchecked"){
                    checkbox3.value = "1"
                }
                
                f++
            });
        h++ 
        });
    })
    .catch(error => {
        console.log(error)
        console.log("error")
    })







    
//     let obj1 = new Array()
//     db.ikub_expense.each(entity => {
//     obj1.push(entity)}).then(()=>{
//         recordsb.innerHTML = ""
//         obj1.forEach(element => {
//             var number = document.createElement("div")
//             var tempo = document.createElement("div")
//             tempo.classList.add("container")
//             tempo.classList.add("tempo")
//             number.innerHTML = `Round ${w}`
//             tempo.innerHTML = `
//             <div class="row row2">
//                         <div class="col-1">NO</div>
//                         <div class="col-3">Team Members</div>
//                         <div class="col-3">Paid Due</div>
//                         <div class="col-2">Punishment</div>
//                         <div class="col-2">Won Lottery</div>
//             </div>`
//             element.info.forEach(element1 => {
//                 tempo.innerHTML += `
//                 <div class="row">
//                     <div class="col-1">${y}</div>
//                     <div class="col-3">${element1[1]}</div>
//                     <div class="col-3">
//                         <select class="form-select form-select-xs mb-3 checkd${w}${y}" aria-label=".form-select-xs example">
//                             <option selected>Checked</option>
//                             <option value="1">Unchecked</option>
//                         </select>
//                     </div>
//                     <div class="col-2">
//                         <select class="form-select form-select-xs mb-3 checke${w}${y}" aria-label=".form-select-xs example">
//                             <option selected>Checked</option>
//                             <option value="1">Unchecked</option>
//                         </select>
//                     </div>
//                     <div class="col-2">
//                         <select class="form-select form-select-xs mb-3 checkf${w}${y}" aria-label=".form-select-xs example">
//                             <option selected>Checked</option>
//                             <option value="1">Unchecked</option>
//                         </select>
//                     </div>
//                 </div>
//                 `

//                 y++
//                 // w++
//             });
//             w++
//             recordsb.appendChild(number)
//             recordsb.appendChild(tempo)
//             y = 1

//         });
//     }).then(()=> {
//         var h = 1
//         obj1.forEach(element2 => {
//             var f = 1
//             element2.info.forEach(element3 => {
//                 checkbox1 = document.querySelector(`.checkd${h}${f}`);
//                 checkbox2 = document.querySelector(`.checke${h}${f}`);
//                 checkbox3 = document.querySelector(`.checkf${h}${f}`);
//                 if (element3[2] == "Unchecked"){
//                     checkbox1.value = "1"
//                 }
//                 if (element3[3] == "Unchecked"){
//                     checkbox2.value = "1"
//                 }
//                 if (element3[4] == "Unchecked"){
//                     checkbox3.value = "1"
//                 }
                
//                 f++
//             });
//         h++ 
//         });
// })
w = 1
}