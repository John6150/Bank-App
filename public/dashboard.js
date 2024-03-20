let title_ = document.getElementById("title_")
let dp = document.getElementById("dp")
let donated = document.getElementById("donated")
let points = document.getElementById("points")
let bonus = document.getElementById("bonus")
let Spent = document.getElementById("Spent")
balance = document.getElementById("balance")

let cardnumber = document.getElementById("cardnumber")
let cardexp = document.getElementById("cardexp")
let cardcvv = document.getElementById("cardcvv")

let send = document.getElementById("send")
let send_ = document.getElementById("send_")

let fund_div = document.getElementById("fund_div")
let fund_ = document.getElementById("fund_")

let airtime_div = document.getElementById("airtime_div")
let airtime_ = document.getElementById("airtime_")

let donate = document.getElementById("donate")
let donate_ = document.getElementById("donate_")

let foundation_id = document.getElementById("foundation_id")
let foundation_name = document.getElementById("foundation_name")

let cardbtn1 = document.getElementById("cardbtn1")
let cardbtn2 = document.getElementById("cardbtn2")

let bene_details = document.getElementById("bene_details")
let network = document.getElementById("network")
let mobile_number = document.getElementById("mobile_number")

const mtn = ['07025', "0703", "07026", "0704", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913", "0916"]
const glo = ['0705', '0805', '0807', '0811', '0815', '0905', '0915']
const airtiel = ['0701', '0708', '0802', '0808', '0812', '0901', '0902', '0902', '0904', '0907', '0912', '0911']
const _9mobile = ['0809', '0817', '0818', '0909', '0908']

let airtime_amount = document.getElementById('airtime_amount')
let network_error = document.getElementById('network_error')
let modal1 = document.getElementById('modal1')

let main = document.getElementById('main')
let network_logo = document.getElementById('network_logo')
let aitime_msg = document.getElementById('aitime_msg')
let recent_details = document.getElementById('recent_details')

let donate_method = document.getElementById('donate_method')
let donate_amount = document.getElementById('donate_amount')

let receiver_acct = document.getElementById('receiver_acct')
let send_amount = document.getElementById('send_amount')
let receiver_name = document.getElementById('receiver_name')

let UserId
let UserDetails
let userCredentials
let userEmail
let hideBal = false

let usa = document.getElementById('usa')
let euro = document.getElementById('euro')
let gbp = document.getElementById('gbp')
let yuan = document.getElementById('yuan')
let cad = document.getElementById('cad')
let dirham = document.getElementById('dirham')
let rand = document.getElementById('rand')
let ngn = document.getElementById('ngn')

let tran_id = ''
const firebaseConfig = {
  apiKey: "AIzaSyD2tptyBhGz-29stYz5IWa2s0u9ud6ooNQ",
  authDomain: "fintech-project-b3d8e.firebaseapp.com",
  projectId: "fintech-project-b3d8e",
  storageBucket: "fintech-project-b3d8e.appspot.com",
  messagingSenderId: "458851384286",
  appId: "1:458851384286:web:34349d89c3945d12ea3b4f",
  measurementId: "G-131HXY3P8B"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

function logout_() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = "index.html";
  }).catch((error) => {
    // An error happened.
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userEmail = user.email
    title_.innerHTML = `Welcome ${user.displayName}`;
    GetUser()
  } else {
    // User is signed out
    window.location.href = "login.html"
  }
});
function GetUser() {
  const db = firebase.firestore();
  var docRef = db.collection("Users").doc(`${userEmail}`);

  docRef.get().then((doc) => {
    if (doc.exists) {
      userCredentials = doc.data()
      localStorage.setItem("User Details", JSON.stringify({ "Balance": (doc.data().Balance), "ProfilePic": doc.data().ProfilePicture, "Donated": doc.data().Donated, "Spent": doc.data().Spent, "Points": doc.data().Points },));
      UserDetails = JSON.parse(localStorage.getItem("User Details"))
      dp.style.backgroundImage = `url('${UserDetails.ProfilePic}')`;
      points.innerHTML = `${doc.data().Points}pts Earned`
      donated.innerHTML = `&#8358;${doc.data().Donated} Donated`
      Spent.innerHTML = `&#8358;${doc.data().Spent} Spent`
      balance.innerHTML = `Balance: &#8358; ${UserDetails.Balance}.00 <img id="privacy" onclick="acct_privacy()" width="20" src="./Images/hide.png" alt="">`;

    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

}

function acct_privacy() {
  hideBal == false ? hideBal = true : hideBal = false
  hideBal == false ? balance.innerHTML = `&#8358; ${UserDetails.Balance}.00 <img id="privacy" onclick="acct_privacy()" width="20" src="./Images/hide.png" alt="">`
    : balance.innerHTML = `&#8358; ***.** <img id="privacy" onclick="acct_privacy()" width="20" src="./Images/show.png" alt="">`;

  hideBal == false ? donated.innerHTML = `&#8358; ${UserDetails.Donated}.00 Donated`
    : donated.innerHTML = `&#8358; ***.** Donated`;

  hideBal == false ? bonus.innerHTML = `&#8358; 00.00 Bonus received`
    : bonus.innerHTML = `&#8358; ***.** Bonus received`;

  hideBal == false ? points.innerHTML = `&#8358; ${UserDetails.Points}pts Earned`
    : points.innerHTML = `***.** Earned`;

  hideBal == false ? Spent.innerHTML = `&#8358; ${UserDetails.Spent}.00 Spent`
    : Spent.innerHTML = `&#8358; ***.** Spent`;

  hideBal == false ? cardnumber.innerHTML = `1234567891234567`
    : cardnumber.innerHTML = `12345678912*****`;

  hideBal == false ? cardexp.innerHTML = `Exp:06/25`
    : cardexp.innerHTML = `Exp: **/**`;

  hideBal == false ? cardcvv.innerHTML = `CVV 234`
    : cardcvv.innerHTML = `CVV ***`;
}

function transact(tran) {
  tran == "send" ? send.style.display = "flex" : send.style.display = "none"
  tran == "send" ? send_.style.backgroundColor = "#036db3" : send_.style.backgroundColor = "#036db362"
  tran == "fund" ? fund_div.style.display = "flex" : fund_div.style.display = "none"
  tran == "fund" ? fund_.style.backgroundColor = "#00d447" : fund_.style.backgroundColor = "#00c14081"
  tran == "airtime" ? airtime_div.style.display = "flex" : airtime_div.style.display = "none"
  tran == "airtime" ? airtime_.style.backgroundColor = "#ff0000" : airtime_.style.backgroundColor = "#ff000074"
  tran == "donate" ? donate.style.display = "flex" : donate.style.display = "none"
  tran == "donate" ? donate_.style.backgroundColor = "#7d00c1" : donate_.style.backgroundColor = "#7d00c163"
}
function numberChk(ev) {
  let key = ev.keyCode
  // console.log(key);
  if (key < 48 || key > 57) {
    ev.preventDefault();
  }
}
function cardscr(x) {
  x == "1" ? cardfaces.style.marginLeft = "0px" : cardfaces.style.marginLeft = "-400px"
  x == "1" ? cardbtn1.style.backgroundColor = "#8f8f8fa5" : cardbtn1.style.backgroundColor = "#eb7724"
  x == "2" ? cardbtn2.style.backgroundColor = "#8f8f8fa5" : cardbtn2.style.backgroundColor = "#eb7724"
}
function beneficiary_profile() {
  bene_details.style.display = "flex"
}


// Get the canvas element
const ctx = document.getElementById('myChart').getContext('2d');

// Generate random data
const labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
const data = {
  labels,
  datasets: [{
    label: 'Incoming',
    data: labels.map(() => Math.floor(Math.random() * 10000)),
    borderColor: '#eb7824',
    backgroundColor: '#171d27',
    tension: 0.4
  }]
};


// Create the chart
const myChart = new Chart(ctx, {
  type: 'line',
  data,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_WoNJ40Mnc96NyTYwhGiReJj7nLqOe7dZUyVTgSm3").then((res) => res.json()).then((doc) => {
  console.log(doc.data);
  gbp.innerHTML = Math.floor(1595 / doc.data.GBP)
  usa.innerHTML = Math.floor(1595 / doc.data.USD)
  euro.innerHTML = Math.floor(1595 / doc.data.EUR)
  yuan.innerHTML = Math.floor(1595 / doc.data.CNY)
  cad.innerHTML = Math.floor(1595 / doc.data.CAD)
  dirham.innerHTML = Math.floor(1595 / doc.data.CAD)
  rand.innerHTML = Math.floor(1595 / doc.data.ZAR)
  // ngn.innerHTML = doc.data.ZAR

})

function network_type() {
  phone_number = mobile_number.value
  network_error.style.display = "none"
  let mobile_no = mtn.find((el) => phone_number.startsWith(el))
  mobile_no ? network.value = "MTN" : mobile_no = glo.find((el) => phone_number.startsWith(el)) ? network.value = "GLO" : mobile_no = _9mobile.find((el) => phone_number.startsWith(el)) ? network.value = "9MOBILE" : mobile_no = airtiel.find((el) => phone_number.startsWith(el)) ? network.value = 'AIRTEL' : mobile_no = '' ? network.value = '' : network.value = 'NA'
  phone_number.length > 11 ? network.value = "Incorrect Mobile" : ''
}

function prevDefault_(ev) {
  ev.preventDefault()
  // console.log(airtime_amount.value)
}
function airtime_purchase() {
  airtime_amount.value
  network_error.style.display = "none"
  if (network.value == 'Incorrect Mobile' || network.value == 'NA' || network.value == '') {
    network_error.style = "transform: translateY(50%); display: block; transition: all 300ms ease; font-size: 13px";
  } else
    if (airtime_amount.value < 50) {
      console.log("Invalid amount");
      network_error.innerHTML = 'Amount has to be &#8358;50 and above';
      network_error.style = "transform: translateY(50%); display: block; transition: all 300ms ease; font-size: 13px";

    } else
      if (UserDetails.Balance < airtime_amount.value) {
        network_error.innerHTML = 'Insufficient funds'
        network_error.style = "transform: translateY(50%); display: block; transition: all 300ms ease; font-size: 13px";

      } else {
        modal1.style.display = 'flex';
        aitime_msg.innerHTML = `Recharge ${mobile_number.value} with &#8358;${airtime_amount.value} ?`
        main.style = "filter : brightness(0.7)";
        main.style.pointerEvents = "none";
      }

  network.value == 'GLO' ? network_logo.style.backgroundImage = 'url(./Images/glo.png)' : network.value == 'AIRTEL' ? network_logo.style.backgroundImage = 'url(./Images/airtel.png)' : network.value == '9MOBILE' ? network_logo.style.backgroundImage = 'url(./Images/9mobile.png)' : ''
  // backgroundImage
}
function close_() {
  modal1.style.display = 'none';
  main.style = "filter : none";
  main.style.pointerEvents = "visible";
}

function buyAirtime() {
  userCredentials.Balance -= airtime_amount.value
  const db = firebase.firestore();
  var UserUpdate = db.collection("Users").doc(`${userCredentials.Email}`);

  // Set the "capital" field of the city 'DC'
  return UserUpdate.update({
    Balance: userCredentials.Balance,
    // Donated: userCredentials.Donated + Number(donate_amount.value),
    Spent: userCredentials.Spent + Number(airtime_amount.value),
    // Points: userCredentials.Points + Math.floor(donate_amount.value * 0.001)
  })
    .then(() => {
      console.log(`${userCredentials.Balance}`);
      Create_History("Airtime", network.value, mobile_number.value, airtime_amount.value)
      network.value = ''
      mobile_number.value = ''
      airtime_amount.value = ''

      close_()
      GetUser()
      load_transaction()

      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

function donate_funds() {
  donate_method.value == "balance" ? balance_deduct() : donate_method.value == "ussd" ? ussd_pay() : donate_method.value == "cash_deposit" ? cash_deposit() : ''
}

function balance_deduct() {
  if (donate_amount.value < userCredentials.Balance && donate_amount.value != 0) {
    userCredentials.Balance -= donate_amount.value;
    const db = firebase.firestore();
    var UserUpdate = db.collection("Users").doc(`${userCredentials.Email}`);

    // Set the "capital" field of the city 'DC'
    return UserUpdate.update({
      Balance: userCredentials.Balance,
      Donated: userCredentials.Donated + Number(donate_amount.value),
      Spent: userCredentials.Spent + Number(donate_amount.value),
      Points: userCredentials.Points + Math.floor(donate_amount.value * 0.001),
      // Transaction: 

    })
      .then(() => {
        console.log(`${userCredentials.Balance}`);
        Create_History("Donate", foundation_name.value, foundation_id.value, Number(donate_amount.value))
        GetUser()
        load_transaction()
        donate_amount.value = ''
        foundation_id.value = ''
        foundation_name.value = ''
        donate_method[0].selected = true
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  } else {
    donate_amount.value == 0 ? alert("Amount too small") : alert("Sorry insuffcient funds")

  }

}

function ussd_pay() {
  console.log("ussd");

}
function cash_deposit() {
  console.log("cash");

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
    .collection("History").doc(userEmail)
    .collection(userCredentials.AccountNumber);

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
function sendFunds() {
  if (send_amount.value < userCredentials.Balance && send_amount.value != 0 && receiver_acct != '') {
    // console.log("Forward");
    userCredentials.Balance -= send_amount.value;
    const db = firebase.firestore();
    var UserUpdate = db.collection("Users").doc(`${userCredentials.Email}`);

    // Set the "capital" field of the city 'DC'
    return UserUpdate.update({
      Balance: userCredentials.Balance,
      Spent: userCredentials.Spent + Number(send_amount.value),
      // Points: userCredentials.Points + Math.floor(donate_amount.value * 0.001),
      // Transaction: 

    })
      .then(() => {
        console.log(`${userCredentials.Balance}`);
        Create_History("Send", receiver_name.value, receiver_acct.value, Number(send_amount.value))
        GetUser()
        load_transaction()
        donate_amount.value = ''
        foundation_id.value = ''
        foundation_name.value = ''
        donate_method[0].selected = true
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  } else {
    send_amount.value == 0 ? alert("Amount too small") : alert("Sorry insuffcient funds")

  }

}

function load_transaction() {
  recent_details.innerHTML = ''
  const db = firebase.firestore();

  db.collection("History").doc(userEmail).collection(userCredentials.AccountNumber).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data().Amount);

      if (doc.data().Type == 'Send') {
        recent_details.innerHTML += `<div class="tran1">
  <div class="tran">
      <img width="25" src="./Images/send.png" alt="">
      <h5>${doc.data().Type}<p>${doc.data().Time} ${doc.data().Date}</p>
      </h5>

  </div>
  <span>-${doc.data().Amount}</span>`
      } else if (doc.data().Type == 'Donate') {
        recent_details.innerHTML += `<div class="tran1">
        <div class="tran">
            <img width="25" src="./Images/donated.png" alt="">
            <h5>${doc.data().Type}<p>${doc.data().Time} ${doc.data().Date}</p>
            </h5>
      
        </div>
        <span>-${doc.data().Amount}</span>`
      } else if (doc.data().Type == 'Registration Bonus') {
        recent_details.innerHTML += `<div class="tran1">
        <div class="tran">
            <img width="25" src="./Images/fund.png" alt="">
            <h5>${doc.data().Type}<p>${doc.data().Time} ${doc.data().Date}</p>
            </h5>
      
        </div>
        <span>+${doc.data().Amount}</span>`
      } else if (doc.data().Type == 'Airtime') {
        recent_details.innerHTML += `<div class="tran1">
        <div class="tran">
            <img width="25" src="./Images/dial.png" alt="">
            <h5>${doc.data().Type}<p>${doc.data().Time} ${doc.data().Date}</p>
            </h5>
      
        </div>
        <span>-${doc.data().Amount}</span>`
      }

    });
  });



}


let interval = setInterval(() => {
  load_transaction()
  clearInterval(interval)
}, 3000)
