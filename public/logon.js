let mobile = document.getElementById("mobile")
let tcs = document.getElementById("tcs")
let privacy = document.getElementById("privacy")
let pass = document.getElementById("pass")
let pass2 = document.getElementById("cpass")
let passConfirm = document.getElementById("passConfirm")
let email = document.getElementById("email")
let fullName = document.getElementById("fullName")
let countries = document.getElementById("countries")
let country = []
let imageSrc
let AccountNumber = ''


fetch("https://restcountries.com/v3.1/all").then((res) => res.json()).then((data) => {
    data.forEach((el, index) => {
        country.push(el.name.common)
        country.sort()
    })
    country.forEach((el, index) => {
        countries.innerHTML += `<option value="${el}">${el}</option>`
    })
})



const firebaseConfig = {
    apiKey: "AIzaSyD2tptyBhGz-29stYz5IWa2s0u9ud6ooNQ",
    authDomain: "fintech-project-b3d8e.firebaseapp.com",
    projectId: "fintech-project-b3d8e",
    storageBucket: "fintech-project-b3d8e.appspot.com",
    messagingSenderId: "458851384286",
    appId: "1:458851384286:web:811316dca6ef047fea3b4f",
    measurementId: "G-PQK2KZZWL2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// let red = setInterval(() => {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             window.location.href = "dashboard.html"
//   ...
// } else {
//   User is signed out
//   ...
//         }
//     });
//     clearInterval(red)
// }, 4000)


function home() {
    window.location.href = "index.html"
}
function login_() {
    window.location.href = "login.html"
}
function numberChk(ev) {
    let key = ev.keyCode
    // console.log(key);
    if (key < 48 || key > 57) {
        ev.preventDefault();
    }
}
function passChk() {
    tcs.checked = false
    pass.value == pass2.value ? tcs.disabled = false : tcs.disabled = true
    // pass.value == pass2.value ?  null : alert("Sorry, passwords do not match")
}
function passCon() {
    tcs.checked = false
    // pass.value == pass2.value ? tcs.disabled = false : tcs.disabled = true
    pass.value == pass2.value ? null : alert("Sorry, passwords do not match")
}

function private() {
    pass2.type == "password" ? privacy.src = "./Images/hide.png" : privacy.src = "./Images/show.png"
    pass2.type == "password" ? pass2.type = "text" : pass2.type = "password"
}
function private2() {
    pass.type == "password" ? privacy2.src = "./Images/hide.png" : privacy2.src = "./Images/show.png"
    pass.type == "password" ? pass.type = "text" : pass.type = "password"
}

function upload() {
    pic = document.getElementById("dp").files[0];
    let readImg = new FileReader()
    readImg.onload = function (event) {
        imageSrc = event.target.result;
        console.log(imageSrc);

    };
    readImg.readAsDataURL(pic);
}

function signup() {
    if (!fullName.value || !mobile.value) {
        alert("Please fill in the required details")
    } else {
        firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
            .then((userCredential) => {
                // Signed in 
                // var user = userCredential.user;
                const user = firebase.auth().currentUser;

                user.updateProfile({
                    displayName: fullName.value,
                    // photoURL: document.getElementById("dp").value,
                    phoneNumber: mobile.value
                }).then(() => {
                    console.log(user);
                    // Update successful
                }).catch((error) => {
                });
                for (let i = 0; i < 10; i++) {
                    AccountNumber += Math.floor(Math.random() * 10)
                }

                const db = firebase.firestore();
                // Add a new document in collection "cities"
                db.collection("Users").doc(`${email.value}`).set({
                    Name: fullName.value,
                    Email: email.value,
                    PhoneNumber: mobile.value,
                    Country: countries.value,
                    ProfilePicture: imageSrc,
                    Id: user.uid,
                    AccountNumber: AccountNumber,
                    Balance: 5000,
                    Points: 0,
                    Donated: 0,
                    Spent: 0,

                })
                    .then(() => {
                        console.log("Document successfully written!");
                        Create_History("Registration Bonus", fullName.value, AccountNumber, Number(5000))
                        window.location.href = "login.html"

                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            })
            .catch((error) => {
                alert("Sorry, Email is already registered")
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

}

function dial_(e) {
    fetch(`https://restcountries.com/v3.1/name/${countries.value}`).then((res) => res.json()).then((data) => {
        mobile.value = ''
        mobile.value = `${data[0].idd.root + data[0].idd.suffixes}(0) `
    })
}

function Create_History(tranType, beneName, beneAcct, amnt) {
    tran_id = ''
    for (let i = 0; i < 16; i++) {
      tran_id += Math.floor(Math.random() * 10)
      console.log(tran_id);
    }
    const db = firebase.firestore();
    // Add a new document in collection "cities"
    // db.collection("History").doc(userEmail).doc(`${tran_id}`).set({
  
    let userhistory = db
      .collection("History").doc(email.value)
      .collection(AccountNumber);
  
    userhistory.doc(`${tran_id}`).set({
      Type: tranType,
      Amount: amnt,
      Date: new Date().toLocaleDateString(),
      Time: new Date().toLocaleTimeString(),
      Transaction_ID: Number(tran_id),
      Beneficiary: { "Beneficiary_Name": beneName, "Beneficiary_Account": beneAcct }
    })
      .then(() => {
        console.log("Transaction_History Added");
        console.log("Document successfully written!");
        // window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Error writing document:", error);
      });
  }

