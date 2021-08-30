import exptrcker,{insertrecord} from './module.js';
import {db} from './indexDB.js';
var swiper = new Swiper('.swiper-container', {
    pagination: {el:'.swiper-pagination',clickable: true},
    direction: 'vertical',
    spaceBetween: 20,
    mousewheel: {
      releaseOnEdges: true,
      slidesPerView: 1,
    },
    parallex: true,
    speed: 600,
  });



  
  // The third slides javascript file

  var cont3 = document.querySelector(".cont3")
  var cont4 = document.querySelector(".cont4")
  var cont5 = document.querySelector(".cont5")
  var boxx1 = document.querySelector(".boxx1")
  var boxx2 = document.querySelector(".boxx2")
  var boxx3 = document.querySelector(".boxx3")
  console.log(boxx2)
  cont3.addEventListener('mouseover', swap1)
  cont4.addEventListener('mouseover', swap2)
  cont5.addEventListener('mouseover', swap3)
  function swap1() {
    boxx1.className = "boxx"
    boxx2.classList.remove("boxx");
    boxx3.classList.remove("boxx");
    boxx2.className = "boxy"
    boxx3.className = "boxy"
    console.log(boxx1)
    // boxx1.children.style.transform = "translate()";
  }
  function swap2() {
    boxx2.className = "boxx"
    boxx1.classList.remove("boxx");
    boxx3.classList.remove("boxx");
    boxx1.className = "boxy"
    boxx3.className = "boxy"
    console.log(boxx2)
  }
  function swap3() {
    boxx3.className = "boxx"
    boxx1.classList.remove("boxx");
    boxx2.classList.remove("boxx");
    boxx1.className = "boxy"
    boxx2.className = "boxy"
    console.log(boxx3)
  }

  // Slide 3 ends here
  // login 
const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container1');
sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
})
sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
})




// login and signup pages
const signupUserName = document.querySelector('#signupUserName');
const loginName = document.querySelector('#loginUserName');
const password = document.querySelector('#password');
const loginPassword = document.querySelector('#loginPassword');
const account = document.querySelector('#account');
const p = document.querySelector('#p');

const signup = document.querySelector('#signup')
const login = document.querySelector('#login')
const errorMessage = document.querySelector('#error_message')
const errorMessage2 = document.querySelector('#error_message2')
const errorMessage3 = document.querySelector('#error_message3')
const errorMessage4 = document.querySelector('#error_message4')
const errorMessage5 = document.querySelector('#error_message5')




login.addEventListener('click',joinmongo);
signup.addEventListener('click',addmongo);

// login and signup pages
function createUser (){
  insertrecord(db.Users, {
      UserName: signupUserName.value,
      Password: password.value,
      AccountNumber: account.value
      
  });
}

const url = "http://localhost:3000";
function addmongo(){
    const arr = [];
    var passw=  /[A-Za-z0-9]\w{8,16}$/;
    var user=  /[A-Za-z]$/;
    var acc = /[0-9]\w{13,14}$/;


    if(!(password.value.match(passw))){
        errorMessage3.style.display = "block";
        errorMessage3.innerHTML = "numbers of length 8 & above";
        errorMessage3.style.color = "#ff0000";
    }
    else{
        errorMessage3.style.display = "none";
    }
    if (!(signupUserName.value.match(user))){
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Only letters are allowed!";
        errorMessage.style.color = "#ff0000";
        
    }
    else{
        errorMessage.style.display = "none";
    }
    if(!(account.value.match(acc))){
        errorMessage2.style.display = "block";
        errorMessage2.innerHTML = "only 13 digits from 0-9.";
        errorMessage2.style.color = "#ff0000";
        
    }
    else{
        errorMessage2.style.display = "none";
    }
    if(password.value.match(passw) && signupUserName.value.match(user) && account.value.match(acc)){

        fetch(url + '/auth/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accountNumber : account.value,
                userName : signupUserName.value,
                password : password.value
            })
        }).then(res => {
            return res.json()
        })
        .then(data => {
            if (!(data.message)) {
                errorMessage.style.display = "none";
                var para = new URLSearchParams()
                para.append("nameSignUp", signupUserName.value);
                location.href = "./user.html?" + para.toString();
            }
            if (data.message) {
                errorMessage.style.display = "block";
                errorMessage.innerHTML = data.message;
                errorMessage.style.color = "#ff0000";
            }
            console.log(data)
            console.log("succesful")
        })
        .catch(error => {
            console.log(error)
            console.log("error")
        })
  
    }


    // fetch(url + '/auth', {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         accountNumber : 298725349857234,
    //         userName : "tolata",
    //         password : "testpassword"
    //     })
    // }).then(res => {
    //     return res.json()
    // })
    // .then(data => {
    //     console.log(data)
    //     console.log("succesful")
    // })
    // .catch(error => {
    //     console.log(error)
    //     console.log("error")
    // })
}



function joinmongo(){

    fetch(url + '/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName : loginName.value.toString(),
            password : loginPassword.value.toString()
        })
    }).then(res => {
        return res.json()
    })
    .then(data => {

        if (!(data.message)) {
            errorMessage5.style.display = "none";
            var para = new URLSearchParams()
            para.append("nameLoginU", loginName.value);
            location.href = "./user.html?" + para.toString();
        }

        if (data.message) {
            errorMessage4.style.display = "none";
            errorMessage5.style.display = "none";

            errorMessage5.innerHTML = data.message;
            errorMessage5.style.display = "block";
            errorMessage5.style.color = "#ff0000";
        }
        console.log(data)
        console.log("succesful")
    })
    .catch(error => {
        console.log(error)
        console.log("error")
    })
}



//     var arr = [];
//     db.Users.each(user =>arr.push(user)).then(() => {
//         for(var index = 0; index < arr.length; index++){
//             errorMessage4.style.display = "none";
//             errorMessage5.style.display = "none";
//             if(arr[index].UserName.toString() === loginName.value.toString()){
//                 var pass = arr[index].Password;
//                 if(loginPassword.value !== pass){
//                     errorMessage5.innerHTML = "Wrong password";
//                     errorMessage5.style.display = "block";
//                     errorMessage5.style.color = "#ff0000";
//                     return;
//                 }
//                 else{
//                     errorMessage5.style.display = "none";
//                     var para = new URLSearchParams()
//                     para.append("nameLoginU", loginName.value);
//                     location.href = "./user.html?" + para.toString();
//                     return;
//                 }
//             }
//         }

//         errorMessage4.innerHTML = "Wrong UserName";
//         errorMessage4.style.display = "block";
//         errorMessage4.style.color = "#ff0000";

//     }
// )}



