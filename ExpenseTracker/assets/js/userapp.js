// Exporting the database to allow access
import {insertrecord,} from './module.js';
import {db} from './indexDB.js';

// On Document load 
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("id") == "1") {
        swapper1()
    }
    if (localStorage.getItem("id") == "2") {
        swapper2()
    }
    if (localStorage.getItem("id") == "3") {
        swapper3()
    }
    if (localStorage.getItem("id") == "4") {
        swapper4()
    }
    expenseGetData1();
    expenseGetData4();
    mongoExpenseLoader();
    mongoIncomeLoader();
});

// Defining UI variables
const category1 = document.querySelector(".category1")
const expense_type1 = document.querySelector(".expense_type1")
const amount1 = document.querySelector(".amount1")
const date1 = document.querySelector(".date1")
const time1 = document.querySelector(".time1")
const button1 = document.querySelector(".button1")


const category2 = document.querySelector(".category2")
const income_type2 = document.querySelector(".income_type2")
const amount2 = document.querySelector(".amount2")
const date2 = document.querySelector(".date2")
const time2 = document.querySelector(".time2")
const button2 = document.querySelector(".button2")

const wrapExpense = document.querySelector(".wrapExpense")
const wrapIncome = document.querySelector(".wrapIncome")


// Action Listners
button1.addEventListener('click',createMongoExpense);
button2.addEventListener('click',createMongoIncome);

//Accepting username from index.html
var para = new URLSearchParams(window.location.search);

var nameLogin = para.get("nameLoginU")
var nameSign = para.get("nameSignUp")

// Functions

const url = "http://localhost:3000";
function mongoIncomeLoader(){
  console.log(url + `/incomes`)

  fetch(url + `/incomes/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")

      let obj1 = new Array()
      data.forEach(element => {
        console.log(element)
        console.log(element.category)
        if (!(obj1.includes(element.category))) {
          obj1.push(element.category);
        }
      });
      console.log(obj1)
      let i = 0
      wrapIncome.innerHTML = ""
      obj1.forEach(element => {
        var wrapper = document.createElement("div")
        wrapper.innerHTML = 
        `
        <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${i}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                    ${element}
                    </button>
                </h2>
                <div id="flush-collapse${i}" class="accordion-collapse collapse " aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body acord${element}"> 
                        <div class="row"> <div class="col-1">No.</div> <div class="col-3">Expense_type</div> <div class="col-2">Amount</div> <div class="col-2">Date</div> <div class="col-2">Time</div> <div class="col-1">Edit</div><div class="col-1">Delete</div> </div>
                    </div>
                  
                </div>
        </div>
        `
        console.log(wrapper)
        wrapIncome.appendChild(wrapper)
        let j = 1
        data.forEach(element2 => {
          if (element2.category === element){
            const accord = document.querySelector('.acord'+ `${element}`);
            accord.innerHTML += `
            <div class="row"> <div class="col-1">${j}</div> <div class="col-3">${element2.incomeType || element2.expenseType}</div> <div class="col-2">${element2.amount}</div> <div class="col-2">${element2.date}</div> <div class="col-2">${element2.time}</div> <div class="col-1"><i class="fas fa-edit" style="color: lightgreen;"></i></div><div class="col-1"><i class="fas fa-trash-alt" style="color: red;"></i></div> </div>             
            `
            j++
          }
          
        });
        i++
      });
      
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })
}

function mongoExpenseLoader(){
  console.log(url + `/expenses`)

  fetch(url + `/expenses/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")

      let obj1 = new Array()
      data.forEach(element => {
        console.log(element)
        console.log(element.category)
        if (!(obj1.includes(element.category))) {
          obj1.push(element.category);
        }
      });
      console.log(obj1)
      let i = 0
      wrapExpense.innerHTML = ""
      obj1.forEach(element => {
        var wrapper = document.createElement("div")
        wrapper.innerHTML = 
        `
        <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${i}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                    ${element}
                    </button>
                </h2>
                <div id="flush-collapse${i}" class="accordion-collapse collapse " aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body acord${element}"> 
                        <div class="row"> <div class="col-1">No.</div> <div class="col-3">Expense_type</div> <div class="col-2">Amount</div> <div class="col-2">Date</div> <div class="col-2">Time</div> <div class="col-1">Edit</div><div class="col-1">Delete</div> </div>
                    </div>
                  
                </div>
        </div>
        `
        console.log(wrapper)
        wrapExpense.appendChild(wrapper)
        let j = 1
        data.forEach(element2 => {
          if (element2.category === element){
            const accord = document.querySelector('.acord'+ `${element}`);
            accord.innerHTML += `
            <div class="row"> <div class="col-1">${j}</div> <div class="col-3">${element2.incomeType || element2.expenseType}</div> <div class="col-2">${element2.amount}</div> <div class="col-2">${element2.date}</div> <div class="col-2">${element2.time}</div> <div class="col-1"><i class="fas fa-edit" style="color: lightgreen;"></i></div><div class="col-1"><i class="fas fa-trash-alt" style="color: red;"></i></div> </div>             
            `
            j++
          }
          
        });
        i++
      });
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })
}

function createMongoExpense(){

  fetch(url + '/expenses/', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          expenseType : expense_type1.value,
          userName : nameSign || nameLogin,
          category : category1.value,
          amount : amount1.value,
          time : time1.value,
          date : JSON.stringify(date1.value)
      })
  }).then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
        category1.value = expense_type1.value = amount1.value = date1.value = time1.value = ""
        mongoExpenseLoader();
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })
}

function createMongoIncome(){

  fetch(url + '/incomes/', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        incomeType: income_type2.value,
        userName: nameSign || nameLogin,
        category: category2.value,
        amount: amount2.value,
        time: time2.value,
        date: date2.value
        
      })
  }).then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
        category2.value = income_type2.value = amount2.value = date2.value = time2.value = ""
        mongoIncomeLoader();
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })
}
// the end
















// Ui Variables For Expense and Income Block
var click1 = document.querySelector(".click1")
var click2 = document.querySelector(".click2")
var click3 = document.querySelector(".click3")
var click4 = document.querySelector(".click4")
var block1 = document.querySelector(".block1")
var block2 = document.querySelector(".block2")
var block3 = document.querySelector(".block3")
var block4 = document.querySelector(".block4")

// Event Listner for Buttons
click1.addEventListener('click', swapper1)
click2.addEventListener('click', swapper2)
click3.addEventListener('click', swapper3)
click4.addEventListener('click', swapper4)

// Display Functions For the Divs of Expense And Income

function swapper1() {
    block1.classList.remove("blocka");
    block2.classList.add("blocka")
    block3.classList.add("blocka")
    block4.classList.add("blocka")
    console.log("successful1")
    localStorage.setItem("id", "1")
    mongoExpenseLoader()
  // boxx1.children.style.transform = "translate()";
}
function swapper2() {
    block2.classList.remove("blocka");
    block1.classList.add("blocka")
    block3.classList.add("blocka")
    block4.classList.add("blocka")
    console.log("successful2")
    localStorage.setItem("id", "2")
    mongoIncomeLoader()
}
function swapper3() {
  block3.classList.remove("blocka");
  block1.classList.add("blocka")
  block2.classList.add("blocka")
  block4.classList.add("blocka")
  console.log("successful3")
  expenseGetData1()
  expenseGetData2()
  expenseGetData3()
  expenseGetData4()
  expenseGetData5()
  expenseGetData6()
  localStorage.setItem("id", "3")
}
function swapper4() {
  block4.classList.remove("blocka");
  block1.classList.add("blocka")
  block2.classList.add("blocka")
  block3.classList.add("blocka")
  console.log("successful4")
  localStorage.setItem("id", "4")
}

// Increment amount value


var plus1 = document.querySelector(".plus1")
var minus1 = document.querySelector(".minus1")
var plus2 = document.querySelector(".plus2")
var minus2 = document.querySelector(".minus2")
var plus3 = document.querySelector(".plus3")
var minus3 = document.querySelector(".minus3")
var plus4 = document.querySelector(".plus4")
var minus4 = document.querySelector(".minus4")
var plus5 = document.querySelector(".plus5")
var minus5 = document.querySelector(".minus5")
var days1 = document.querySelector(".days1")

// Increment value event listeners

plus1.addEventListener('click', increment1)
plus2.addEventListener('click', increment2)
plus3.addEventListener('click', increment3)
plus4.addEventListener('click', increment4)
plus5.addEventListener('click', increment5)
minus1.addEventListener('click', decrement1)
minus2.addEventListener('click', decrement2)
minus3.addEventListener('click', decrement3)
minus4.addEventListener('click', decrement4)
minus5.addEventListener('click', decrement5)
let y = "0.00"

// Increment value functions

function increment1() {
    if (amount1.value == "") {
      amount1.value = y
    }
    amount1.value = parseFloat(amount1.value) + 1.00
  }
  function increment2() {
    if (amount2.value == "") {
      amount2.value = y
    }
    amount2.value = parseFloat(amount2.value) + 1.00
  }
  function increment3() {
    if (days1.value == "") {
      days1.value = y
    }
    days1.value = parseFloat(days1.value) + 1.00
  }
  function increment4() {
    if (amount_per_round.value == "") {
      amount_per_round.value = y
    }
    amount_per_round.value = parseFloat(amount_per_round.value) + 1.00
  }
  function increment5() {
    if (punishment_fee.value == "") {
      punishment_fee.value = y
    }
    punishment_fee.value = parseFloat(punishment_fee.value) + 1.00
  }
  function decrement1() {
    if (amount1.value == "") {
      amount1.value = y
    }
    amount1.value = parseFloat(amount1.value) - 1.00
  }
  function decrement2() {
    if (amount2.value == "") {
      amount2.value = y
    }
    amount2.value = parseFloat(amount2.value) - 1.00
  }
  function decrement3() {
    if (days1.value == "") {
      days1.value = y
    }
    days1.value = parseFloat(days1.value) - 1.00
  }
  function decrement4() {
    if (amount_per_round.value == "") {
      amount_per_round.value = y
    }
    amount_per_round.value = parseFloat(amount_per_round.value) - 1.00
  }
  function decrement5() {
    if (punishment_fee.value == "") {
      punishment_fee.value = y
    }
    punishment_fee.value = parseFloat(punishment_fee.value) - 1.00
  }

  
//   End for Increment values

// Group and Ikub Home page

// variables for group and ikub reception
var team_member = new Array();
var team_member2 = new Array();
var add1 = document.querySelector(".add1")
var add2 = document.querySelector(".add2")
var groupName = document.querySelector(".groupName")
var ikubName = document.querySelector(".ikubName")
var member1 = document.querySelector(".member1")
var member2 = document.querySelector(".member2")
var members1 = document.querySelector(".members1")
var members2 = document.querySelector(".members2")
var begindate = document.querySelector(".begindate")
var interval = document.querySelector(".days1")
var amount_per_round = document.querySelector(".amntperrnd")
var punishment_fee = document.querySelector(".pnshmntfee")

// Event listeners for the group reception
add1.addEventListener('click', addMember1)
add2.addEventListener('click', addMember2)
members1.addEventListener('click', removeMember1)
members2.addEventListener('click', removeMember2)

// Functions for the group reception
function addMember1() {
    members1.innerHTML += `

    <li class="list-group-item"><p style = "display: inline">${member1.value}</p><a href="#" class="edit-item secondary-content" style="color : red;"><i class="fas fa-edit" style="color: lightgreen;"></i></a>        <a href="#" class="delete-item secondary-content" style="color : red;"><i class="fa fa-remove"></i></a> </li>
    `
    team_member.push(member1.value)
    console.log(team_member)
    member1.value = ""
    console.log(JSON.stringify(team_member))
    console.log(JSON.parse(JSON.stringify(team_member)))

}

function addMember2() {
  

  members2.innerHTML += `

  <li class="list-group-item"><p style = "display: inline">${member2.value}</p><a href="#" class="edit-item secondary-content" style="color : red;"><i class="fas fa-edit" style="color: lightgreen;"></i></a>        <a href="#" class="delete-item secondary-content" style="color : red;"><i class="fa fa-remove"></i></a> </li>
  
  `
  team_member2.push(member2.value)
  console.log(team_member2)
  member2.value = ""
}
  function removeMember1(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure to delete?')) {
            console.log(e.target.parentElement.parentElement.firstElementChild.textContent);
            console.log(team_member)
            var index = team_member.indexOf(e.target.parentElement.parentElement.firstElementChild.textContent);
              if (index > -1) {
                team_member.splice(index, 1);
              }
              console.log(team_member)
            e.target.parentElement.parentElement.remove();
        }
  
    }
  
    if (e.target.parentElement.classList.contains('edit-item')) {
      if (confirm('Are You Sure to Edit?')) {
          e.target.parentElement.parentElement.remove();
          console.log(e.target.parentElement.parentElement.firstElementChild.textContent)
          member1.value = e.target.parentElement.parentElement.firstElementChild.textContent
          var index = team_member.indexOf(e.target.parentElement.parentElement.firstElementChild.textContent);
          if (index > -1) {
            team_member.splice(index, 1);
          }
  
      }
  
  }
}

function removeMember2(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are You Sure to delete?')) {
        var index = team_member2.indexOf(e.target.parentElement.parentElement.firstElementChild.textContent);
        if (index > -1) {
          team_member2.splice(index, 1);
        }
          e.target.parentElement.parentElement.remove();
      }

  }

  if (e.target.parentElement.classList.contains('edit-item')) {
    if (confirm('Are You Sure to Edit?')) {
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.firstElementChild.textContent)
        member2.value = e.target.parentElement.parentElement.firstElementChild.textContent
          var index = team_member2.indexOf(e.target.parentElement.parentElement.firstElementChild.textContent);
          if (index > -1) {
            team_member2.splice(index, 1);
          }

        

    }

}
}


// The end for group reception

// Storing and sending values from the homepage to the group page
const group = document.querySelector(".group")
const ikub = document.querySelector(".ikub")
group.addEventListener('click', grouppage)
ikub.addEventListener('click', ikubpage)
function grouppage() {
    console.log(team_member)
    var para = new URLSearchParams()
    para.append("userName", nameLogin || nameSign)
    para.append("groupName", groupName.value);
    para.append("team_member", JSON.stringify(team_member))
    for (var value of para.values()) {
      console.log(value)
    }
    location.href = "./group.html?" + para.toString();
}
function ikubpage() {
  console.log(team_member2)
  var para = new URLSearchParams()
  para.append("userName", nameLogin || nameSign)
  para.append("ikubName", ikubName.value);
  para.append("begin_date", begindate.value);
  para.append("interval", interval.value);
  para.append("amount_per_round", amount_per_round.value);
  para.append("punishment_fee", punishment_fee.value);
  para.append("team_member2", JSON.stringify(team_member2))
  for (var value of para.values()) {
    console.log(value)
  }
  location.href = "./ekub.html?" + para.toString();
}
// End for the storing and sending values to the group page

// These is to test
// Statistics Page

//  variables for swapping between the daily weekly and monthly tabs
var tab1 = document.querySelector(".tab1")
var tab2 = document.querySelector(".tab2")
var tab3 = document.querySelector(".tab3")
var tab4 = document.querySelector(".tab4")
var tab5 = document.querySelector(".tab5")
var tab6 = document.querySelector(".tab6")
var stat1 = document.querySelector(".stat1")
var stat2 = document.querySelector(".stat2")
var stat3 = document.querySelector(".stat3")
var stat4 = document.querySelector(".stat4")
var stat5 = document.querySelector(".stat5")
var stat6 = document.querySelector(".stat6")

var expswap = document.querySelector(".expswap")
var incswap = document.querySelector(".incswap")
var statblock1 = document.querySelector(".statblock1")
var statblock2 = document.querySelector(".statblock2")


// Event listeners for the tabs indicated above
tab1.addEventListener('click', swappers1)
tab2.addEventListener('click', swappers2)
tab3.addEventListener('click', swappers3)
tab4.addEventListener('click', swappers4)
tab5.addEventListener('click', swappers5)
tab6.addEventListener('click', swappers6)

expswap.addEventListener('click', swapperb1)
incswap.addEventListener('click', swapperb2)

// Functions for the swapping tabs in the statistics page
function swappers1() {
    stat1.classList.remove("blocka");
    stat2.classList.add("blocka")
    stat3.classList.add("blocka")
    expenseGetData1()
    console.log("successful3")
  }
  function swappers2() {
    stat2.classList.remove("blocka");
    stat1.classList.add("blocka")
    stat3.classList.add("blocka")
    expenseGetData2()
    console.log("successful3")
  }
  function swappers3() {
    stat3.classList.remove("blocka");
    stat1.classList.add("blocka")
    stat2.classList.add("blocka")
    expenseGetData3()
    console.log("successful3")
  }
  function swappers4() {
    stat4.classList.remove("blocka");
    stat5.classList.add("blocka")
    stat6.classList.add("blocka")
    expenseGetData4()
    console.log("successful3")
  }
  function swappers5() {
    stat5.classList.remove("blocka");
    stat4.classList.add("blocka")
    stat6.classList.add("blocka")
    expenseGetData5()
    console.log("successful3")
  }
  function swappers6() {
    stat6.classList.remove("blocka");
    stat4.classList.add("blocka")
    stat5.classList.add("blocka")
    expenseGetData6()
    console.log("successful3")
  }
  function swapperb1() {
    statblock1.classList.remove("blocka");
    statblock2.classList.add("blocka")
    expenseGetData1()
    console.log("successful5")
  }
  
  function swapperb2() {
    statblock2.classList.remove("blocka");
    statblock1.classList.add("blocka")
    expenseGetData4()
    console.log("successful6")
  }

// Getting random colors for the pie chart
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// Getting data for the pie chart and plotting the pie chart


// Pie chart drawer for the daily tab
var chartData1;
var chartOptions1;
function expenseGetData1(){
  var track1 = true
  let track2 = new Array()

  fetch(url + `/expenses/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
      var today = new Date()
      chartOptions1 = [{
        "captions": [{}],
        "color": [{}],
        "xaxis": "Catagory",
        "xaxisl1": "Type",
        "yaxis": "Price"
        }]
      chartData1 = []
      data.forEach(element => {
        var str = element.date.slice(8, 10);
        
        track2.forEach(element2 => {

          if (element.category.toUpperCase() == element2) {
            track1 = false
          }
        });
          
          if((((today.getTime() - Date.parse(element.date))/115741000) <= 1)){
            if (track1 == true){
              var cat = element.category.toUpperCase()
              chartOptions1[0]["captions"][0][`${cat}`] = cat
              chartOptions1[0]["color"][0][`${cat}`] = getRandomColor()
                var object1 = {}
                object1["Catagory"] = `${cat}`
                object1["Type"] = element.expenseType
                object1["Price"] = parseInt(element.amount)
                chartData1.push(object1)
                track2.push(cat)
              track1 = true
            }
            else {
              for (var key in chartOptions1[0]["captions"][0]) {
                if (chartOptions1[0]["captions"][0].hasOwnProperty(key)) {
                    if(chartOptions1[0]["captions"][0][key] == element.category.toUpperCase()){
                      var object1 = {}
                      object1["Catagory"] = key
                      object1["Type"] = element.expenseType
                      object1["Price"] = parseInt(element.amount)
                      chartData1.push(object1)
                      track1 = true
                    }
                }
              }
            }
          }
      });
      $(document).ready(function () {
        Plot1(innerCont1, chartInnerDiv1);
      });
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })

}



// Pie chart drawer for the weekly tab
var chartData2;
var chartOptions2;
function expenseGetData2(){
  var track1 = true
  let track2 = new Array()

  fetch(url + `/expenses/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
      var today = new Date()
      chartOptions2 = [{
        "captions": [{}],
        "color": [{}],
        "xaxis": "Catagory",
        "xaxisl1": "Type",
        "yaxis": "Price"
        }]
      chartData2 = []
      data.forEach(element => {
        var str = element.date.slice(8, 10);
        
        track2.forEach(element2 => {

          if (element.category.toUpperCase() == element2) {
            track1 = false
          }
        });
        console.log(element.date)
          console.log(Date.parse(element.date))
          console.log(today.getTime())
          console.log(((today.getTime() - Date.parse(element.date))/115741000))
          if((((today.getTime() - Date.parse(element.date))/115741000) <= 7)){
            if (track1 == true){
              var cat = element.category.toUpperCase()
              chartOptions2[0]["captions"][0][`${cat}`] = cat
              chartOptions2[0]["color"][0][`${cat}`] = getRandomColor()
                var object1 = {}
                object1["Catagory"] = `${cat}`
                object1["Type"] = element.expenseType
                object1["Price"] = parseInt(element.amount)
                chartData2.push(object1)
                track2.push(cat)
              track1 = true
            }
            else {
              for (var key in chartOptions2[0]["captions"][0]) {
                if (chartOptions2[0]["captions"][0].hasOwnProperty(key)) {
                    if(chartOptions2[0]["captions"][0][key] == element.category.toUpperCase()){
                      var object1 = {}
                      object1["Catagory"] = key
                      object1["Type"] = element.expenseType
                      object1["Price"] = parseInt(element.amount)
                      chartData2.push(object1)
                      track1 = true
                    }
                }
              }
            }
          }
      });
      $(document).ready(function () {
        Plot2(innerCont2, chartInnerDiv2);
      });
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })

}





// Pie chart drawer for the monthly tab

var chartData3
var chartOptions3;
function expenseGetData3(){
  var track1 = true
  let track2 = new Array()

  fetch(url + `/expenses/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
      var today = new Date()
      chartOptions3 = [{
        "captions": [{}],
        "color": [{}],
        "xaxis": "Catagory",
        "xaxisl1": "Type",
        "yaxis": "Price"
        }]
      chartData3 = []
      data.forEach(element => {
        var str = element.date.slice(8, 10);
        
        track2.forEach(element2 => {

          if (element.category.toUpperCase() == element2) {
            track1 = false
          }
        });
        console.log(element.date)
          console.log(Date.parse(element.date))
          console.log(today.getTime())
          console.log(((today.getTime() - Date.parse(element.date))/115741000))
          if((((today.getTime() - Date.parse(element.date))/115741000) <= 30)){
            if (track1 == true){
              var cat = element.category.toUpperCase()
              chartOptions3[0]["captions"][0][`${cat}`] = cat
              chartOptions3[0]["color"][0][`${cat}`] = getRandomColor()
                var object1 = {}
                object1["Catagory"] = `${cat}`
                object1["Type"] = element.expenseType
                object1["Price"] = parseInt(element.amount)
                chartData3.push(object1)
                track2.push(cat)
              track1 = true
            }
            else {
              for (var key in chartOptions3[0]["captions"][0]) {
                if (chartOptions3[0]["captions"][0].hasOwnProperty(key)) {
                    if(chartOptions3[0]["captions"][0][key] == element.category.toUpperCase()){
                      var object1 = {}
                      object1["Catagory"] = key
                      object1["Type"] = element.expenseType
                      object1["Price"] = parseInt(element.amount)
                      chartData3.push(object1)
                      track1 = true
                    }
                }
              }
            }
          }
      });
      $(document).ready(function () {
        Plot3(innerCont3, chartInnerDiv3);
      });
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })

}


var chartData4;
var chartOptions4;
function expenseGetData4(){
  var track1 = true
  let track2 = new Array()

  fetch(url + `/incomes/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
      var today = new Date()
      chartOptions4 = [{
        "captions": [{}],
        "color": [{}],
        "xaxis": "Catagory",
        "xaxisl1": "Type",
        "yaxis": "Price"
        }]
      chartData4 = []
      data.forEach(element => {
        var str = element.date.slice(8, 10);
        
        track2.forEach(element2 => {

          if (element.category.toUpperCase() == element2) {
            track1 = false
          }
        });
          
          if((((today.getTime() - Date.parse(element.date))/115741000) <= 1)){
            if (track1 == true){
              var cat = element.category.toUpperCase()
              chartOptions4[0]["captions"][0][`${cat}`] = cat
              chartOptions4[0]["color"][0][`${cat}`] = getRandomColor()
                var object1 = {}
                object1["Catagory"] = `${cat}`
                object1["Type"] = element.expenseType
                object1["Price"] = parseInt(element.amount)
                chartData4.push(object1)
                track2.push(cat)
              track1 = true
            }
            else {
              for (var key in chartOptions4[0]["captions"][0]) {
                if (chartOptions4[0]["captions"][0].hasOwnProperty(key)) {
                    if(chartOptions4[0]["captions"][0][key] == element.category.toUpperCase()){
                      var object1 = {}
                      object1["Catagory"] = key
                      object1["Type"] = element.expenseType
                      object1["Price"] = parseInt(element.amount)
                      chartData4.push(object1)
                      track1 = true
                    }
                }
              }
            }
          }
      });
      $(document).ready(function () {
        Plot4(innerCont4, chartInnerDiv4);
      });
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })

}




var chartData5;
var chartOptions5;
function expenseGetData5(){
  var track1 = true
  let track2 = new Array()

  fetch(url + `/incomes/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
      var today = new Date()
      chartOptions5 = [{
        "captions": [{}],
        "color": [{}],
        "xaxis": "Catagory",
        "xaxisl1": "Type",
        "yaxis": "Price"
        }]
      chartData5 = []
      data.forEach(element => {
        var str = element.date.slice(8, 10);
        
        track2.forEach(element2 => {

          if (element.category.toUpperCase() == element2) {
            track1 = false
          }
        });
        console.log(element.date)
          console.log(Date.parse(element.date))
          console.log(today.getTime())
          console.log(((today.getTime() - Date.parse(element.date))/115741000))
          if((((today.getTime() - Date.parse(element.date))/115741000) <= 7)){
            if (track1 == true){
              var cat = element.category.toUpperCase()
              chartOptions5[0]["captions"][0][`${cat}`] = cat
              chartOptions5[0]["color"][0][`${cat}`] = getRandomColor()
                var object1 = {}
                object1["Catagory"] = `${cat}`
                object1["Type"] = element.expenseType
                object1["Price"] = parseInt(element.amount)
                chartData5.push(object1)
                track2.push(cat)
              track1 = true
            }
            else {
              for (var key in chartOptions5[0]["captions"][0]) {
                if (chartOptions5[0]["captions"][0].hasOwnProperty(key)) {
                    if(chartOptions5[0]["captions"][0][key] == element.category.toUpperCase()){
                      var object1 = {}
                      object1["Catagory"] = key
                      object1["Type"] = element.expenseType
                      object1["Price"] = parseInt(element.amount)
                      chartData5.push(object1)
                      track1 = true
                    }
                }
              }
            }
          }
      });
      $(document).ready(function () {
        Plot5(innerCont5, chartInnerDiv5);
      });
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })

}




var chartData6;
var chartOptions6;
function expenseGetData6(){
  var track1 = true
  let track2 = new Array()

  fetch(url + `/incomes/users/${nameSign || nameLogin}`)
  .then(res => {
      return res.json()
  })
  .then(data => {

      if (!(data.message)) {
        console.log("was successful")
      }

      if (data.message) {
        console.log("was not successful")
      }
      console.log(data)
      console.log("succesful")
      var today = new Date()
      chartOptions6 = [{
        "captions": [{}],
        "color": [{}],
        "xaxis": "Catagory",
        "xaxisl1": "Type",
        "yaxis": "Price"
        }]
      chartData6 = []
      data.forEach(element => {
        var str = element.date.slice(8, 10);
        
        track2.forEach(element2 => {

          if (element.category.toUpperCase() == element2) {
            track1 = false
          }
        });
        console.log(element.date)
          console.log(Date.parse(element.date))
          console.log(today.getTime())
          console.log(((today.getTime() - Date.parse(element.date))/115741000))
          if((((today.getTime() - Date.parse(element.date))/115741000) <= 30)){
            if (track1 == true){
              var cat = element.category.toUpperCase()
              chartOptions6[0]["captions"][0][`${cat}`] = cat
              chartOptions6[0]["color"][0][`${cat}`] = getRandomColor()
                var object1 = {}
                object1["Catagory"] = `${cat}`
                object1["Type"] = element.expenseType
                object1["Price"] = parseInt(element.amount)
                chartData6.push(object1)
                track2.push(cat)
              track1 = true
            }
            else {
              for (var key in chartOptions6[0]["captions"][0]) {
                if (chartOptions6[0]["captions"][0].hasOwnProperty(key)) {
                    if(chartOptions6[0]["captions"][0][key] == element.category.toUpperCase()){
                      var object1 = {}
                      object1["Catagory"] = key
                      object1["Type"] = element.expenseType
                      object1["Price"] = parseInt(element.amount)
                      chartData6.push(object1)
                      track1 = true
                    }
                }
              }
            }
          }
      });
      $(document).ready(function () {
        Plot6(innerCont6, chartInnerDiv6);
      });
  })
  .catch(error => {
      console.log(error)
      console.log("error")
  })

}





// Pie chart main plotter functions

// Variables

var innerCont1 = " .innerCont1"
var innerCont2 = " .innerCont2"
var innerCont3 = " .innerCont3"
var innerCont4 = " .innerCont4"
var innerCont5 = " .innerCont5"
var innerCont6 = " .innerCont6"
var chartInnerDiv1 = '<div class="innerCont1" style="overflow: auto;top:0px; left: 0px; height:91% ; Width:100% ;overflow: hidden;"/>';
var chartInnerDiv2 = '<div class="innerCont2" style="overflow: auto;top:0px; left: 0px; height:91% ; Width:100% ;overflow: hidden;"/>';
var chartInnerDiv3 = '<div class="innerCont3" style="overflow: auto;top:0px; left: 0px; height:91% ; Width:100% ;overflow: hidden;"/>';
var chartInnerDiv4 = '<div class="innerCont4" style="overflow: auto;top:0px; left: 0px; height:91% ; Width:100% ;overflow: hidden;"/>';
var chartInnerDiv5 = '<div class="innerCont5" style="overflow: auto;top:0px; left: 0px; height:91% ; Width:100% ;overflow: hidden;"/>';
var chartInnerDiv6 = '<div class="innerCont6" style="overflow: auto;top:0px; left: 0px; height:91% ; Width:100% ;overflow: hidden;"/>';
var runningColors;
var runningData;
    
// main functions


function Plot1(innerCont, chartInnerDiv) {
    TransformChartData(chartData1, chartOptions1, 0);
    BuildPie("chart1", chartData1, chartOptions1, 0, innerCont, chartInnerDiv)
}
function Plot2(innerCont, chartInnerDiv) {
    TransformChartData(chartData2, chartOptions2, 0);
    BuildPie("chart2", chartData2, chartOptions2, 0, innerCont, chartInnerDiv)
}
function Plot3(innerCont, chartInnerDiv) {
    TransformChartData(chartData3, chartOptions3, 0);
    BuildPie("chart3", chartData3, chartOptions3, 0, innerCont, chartInnerDiv)
}
function Plot4(innerCont, chartInnerDiv) {
  TransformChartData(chartData4, chartOptions4, 0);
  BuildPie("chart4", chartData4, chartOptions4, 0, innerCont, chartInnerDiv)
}
function Plot5(innerCont, chartInnerDiv) {
  TransformChartData(chartData5, chartOptions5, 0);
  BuildPie("chart5", chartData5, chartOptions5, 0, innerCont, chartInnerDiv)
}
function Plot6(innerCont, chartInnerDiv) {
  TransformChartData(chartData6, chartOptions6, 0);
  BuildPie("chart6", chartData6, chartOptions6, 0, innerCont, chartInnerDiv)
}
function BuildPie(id, chartData, options, level, innerCont, chartInnerDiv) {
    var xVarName;
    var divisionRatio = 2.5;
    var legendoffset = (level == 0) ? 0 : -40;

    d3.selectAll("#" + id + innerCont).remove();
    $("#" + id).append(chartInnerDiv);
    var chart = d3.select("#" + id + innerCont);

    var yVarName = options[0].yaxis;
    var width = $(chart[0]).outerWidth(),
    height = $(chart[0]).outerHeight(),
    radius = Math.min(width, height) / divisionRatio;
    console.log(width)
    console.log(height)
    if (level == 1) {
        xVarName = options[0].xaxisl1;
    }
    else {
        xVarName = options[0].xaxis;
    }

    var rcolor = d3.scale.ordinal().range(runningColors);

    var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - 160);

    var arcOver = d3.svg.arc().outerRadius(radius + 20).innerRadius(radius - 150);

    chart = chart
            .append("svg")  //append svg element inside #chart
            .attr("width", width)    //set width
            .attr("height", height)  //set height
            .append("g")
            .attr("transform", "translate(" + (width / divisionRatio) + "," + ((height / divisionRatio) + 30) + ")");

    var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d.Price;
                });

    var g = chart.selectAll(".arc")
                .data(pie(runningData))
                .enter().append("g")
                .attr("class", "arc");

    var count = 0;

    var path = g.append("path")
                .attr("d", arc)
                .attr("id", function (d) { return "arc-" + (count++); })
                .style("opacity", function (d) {
                    return d.data["op"];
                });

    path.on("mouseenter", function (d) {
        d3.select(this)
            .attr("stroke", "white")
            .transition()
            .duration(200)
            .attr("d", arcOver)
            .attr("stroke-width", 1);
    })
     .on("mouseleave", function (d) {
         d3.select(this).transition()
             .duration(200)
             .attr("d", arc)
             .attr("stroke", "none");
     })
     .on("click", function (d) {
         if (this._listenToEvents) {
             // Reset inmediatelly
             d3.select(this).attr("transform", "translate(0,0)")
             // Change level on click if no transition has started
             path.each(function () {
                 this._listenToEvents = false;
             });
         }
         d3.selectAll("#" + id + " svg").remove();
         if (level == 1) {
             TransformChartData(chartData, options, 0, d.data[xVarName]);
             BuildPie(id, chartData, options, 0, innerCont, chartInnerDiv);
         }
         else {
             var nonSortedChart = chartData.sort(function (a, b) {
                 return parseFloat(b[options[0].yaxis]) - parseFloat(a[options[0].yaxis]);
             });
             TransformChartData(nonSortedChart, options, 1, d.data[xVarName]);
             BuildPie(id, nonSortedChart, options, 1, innerCont, chartInnerDiv);
         }

     });

    path.append("svg:title")
    .text(function (d) {
        return d.data["title"] + " (" + d.data[yVarName] + ")";
    });

    path.style("fill", function (d) {
        return rcolor(d.data[xVarName]);
    })
     .transition().duration(1000).attrTween("d", tweenIn).each("end", function () {
         this._listenToEvents = true;
     });


    g.append("text")
     .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
     .attr("dy", ".35em")
     .style("text-anchor", "middle")
     .style("opacity", 1)
     .text(function (d) {
         return d.data[yVarName];
     });

    count = 0;
    var legend = chart.selectAll(".legend")
        .data(runningData).enter()
        .append("g").attr("class", "legend")
        .attr("legend-id", function (d) {
            return count++;
        })
        .attr("transform", function (d, i) {
            return "translate(15," + (parseInt("-" + (runningData.length * 10)) + i * 28 + legendoffset) + ")";
        })
        .style("cursor", "pointer")
        .on("click", function () {
            var oarc = d3.select("#" + id + " #arc-" + $(this).attr("legend-id"));
            oarc.style("opacity", 0.3)
            .attr("stroke", "white")
            .transition()
            .duration(200)
            .attr("d", arcOver)
            .attr("stroke-width", 1);
            setTimeout(function () {
                oarc.style("opacity", function (d) {
                    return d.data["op"];
                })
               .attr("d", arc)
               .transition()
               .duration(200)
               .attr("stroke", "none");
            }, 1000);
        });

    var leg = legend.append("rect");

    leg.attr("x", width / 2)
        .attr("width", 18).attr("height", 18)
        .style("fill", function (d) {
            return rcolor(d[yVarName]);
        })
        .style("opacity", function (d) {
            return d["op"];
        });
    legend.append("text").attr("x", (width / 2) - 5)
        .attr("y", 9).attr("dy", ".35em")
        .style("text-anchor", "end").text(function (d) {
            return d.caption;
        });

    leg.append("svg:title")
    .text(function (d) {
        return d["title"] + " (" + d[yVarName] + ")";
    });

    function tweenOut(data) {
        data.startAngle = data.endAngle = (2 * Math.PI);
        var interpolation = d3.interpolate(this._current, data);
        this._current = interpolation(0);
        return function (t) {
            return arc(interpolation(t));
        };
    }

    function tweenIn(data) {
        var interpolation = d3.interpolate({ startAngle: 0, endAngle: 0 }, data);
        this._current = interpolation(0);
        return function (t) {
            return arc(interpolation(t));
        };
    }

}

function TransformChartData(chartData, opts, level, filter) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = opts[0].yaxis;

    if (level == 1) {
        xVarName = opts[0].xaxisl1;

        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if ((data[xVarName] == chartData[i][xVarName]) && (chartData[i][opts[0].xaxis]) == filter) {
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }

            }
            if ((hasMatch == false) && ((chartData[i][opts[0].xaxis]) == filter)) {
                if (result.length < 9) {
                    var ditem = {}
                    ditem[xVarName] = chartData[i][xVarName];
                    ditem[yVarName] = chartData[i][yVarName];
                    ditem["caption"] = chartData[i][xVarName].substring(0, 10) + '...';
                    ditem["title"] = chartData[i][xVarName];
                    ditem["op"] = 1.0 - parseFloat("0." + (result.length));
                    result.push(ditem);

                    resultColors[counter] = opts[0].color[0][chartData[i][opts[0].xaxis]];

                    counter += 1;
                }
            }
        }
    }
    else {
        xVarName = opts[0].xaxis;

        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if (data[xVarName] == chartData[i][xVarName]) {
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }
            }
            if (hasMatch == false) {
                ditem = {};
                ditem[xVarName] = chartData[i][xVarName];
                ditem[yVarName] = chartData[i][yVarName];
                ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["op"] = 1;
                result.push(ditem);

                resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

                counter += 1;
            }
        }
    }


    runningData = result;
    runningColors = resultColors;
    return;
}


// End of the pie chart plotter function