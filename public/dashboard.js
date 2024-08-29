let title_ = document.getElementById("title_")
let dp = document.getElementById("dp")
let beneficiaries = document.getElementById("beneficiaries")
// let bene1 = document.getElementById("bene1")
let donated = document.getElementById("donated")
let points = document.getElementById("points")
let bonus = document.getElementById("bonus")
let Spent = document.getElementById("Spent")
balance = document.getElementById("balance")
notification_display = document.getElementById("notification_display")
notification_msg = document.getElementById("notification_msg")

let mode = "light"

message_dot = document.getElementById("message_dot")
msg_no = document.getElementById("msg_no")

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
let modal2 = document.getElementById('modal2')
let modal3 = document.getElementById('modal3')
let send_msg = document.getElementById('send_msg')
let sucess_mg = document.getElementById('sucess_mg')

let main = document.getElementById('main')
let network_logo = document.getElementById('network_logo')
let aitime_msg = document.getElementById('aitime_msg')
let recent_details = document.getElementById('recent_details')

let donate_method = document.getElementById('donate_method')
let donate_amount = document.getElementById('donate_amount')

let receiver_acct = document.getElementById('receiver_acct')
let send_amount = document.getElementById('send_amount')
let receiver_name = document.getElementById('receiver_name')
let beneficiarySendAmount = document.getElementById('beneficiarySendAmount')

let receiverEmail
let receiverAcct
let receiverPicture = ''

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
let index = 0;

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
    window.location.href = "login.html";
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

notification_display.style.display = "none"
// notification_display.style = "transform: scale(0)"
function notify_load() {
  const db = firebase.firestore();
  db.collection("History").doc(`${userEmail}`).collection(`${userCredentials.AccountNumber}`).where("New", "==", true)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        notification_dot.style.display = "block"
        message_dot.style.display = "flex"
        message_dot.style.opacity = "1"
        // console.log(querySnapshot.length);
        querySnapshot.forEach((el) => {
          // console.log(el.data());
          if (el.data.Type == "Credit") {
            notification_msg.innerHTML = `&#8358;${el.data().Amount} was transferred to you from ${el.data().Beneficiary.Sender_Name} on ${el.data().Date}. Transaction ID is: ${el.data().Transaction_ID}`
          } else {
            notification_msg.innerHTML = ` You successfully funded your Account with &#8358;${el.data().Amount} on ${el.data().Date}. Transaction ID is: ${el.data().Transaction_ID}`

          }
        })
        querySnapshot.size > 9 ? msg_no.innerHTML = "9+" : msg_no.innerHTML = querySnapshot.size
      }

    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
// let notify_load_ = setInterval(()=>{
//   notify_load()
//   clearInterval(notify_load_)
// },2500)

function notify_() {
  // console.log("yes");
  notification_dot.style.display = "none"
  notification_display.style.display == "none" ? notification_display.style.display = "flex" : notification_display.style.display = "none"
  // notification_display.style == "transform: scale(0)" ? notification_display.style = "transform: scale(1)" : notification_display.style = "transform: scale(0)"
  notification_display.style.transition = "all 500ms ease"
}


function GetUser() {

  for (let pinss = 0; pinss < 4; pinss++) {
    document.getElementsByClassName("input_pins")[pinss].value = ''
  }
  document.body.style = "overflow-y: scroll;";
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
      imageSrc = UserDetails.ProfilePic
      notify_load()
      let clear_card = setInterval(() => {
        load_card()
        acct_details()
        clearInterval(clear_card)
      }, 1000)
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
  for (let i = 0; i < document.getElementsByClassName('cardfaces').length; i++) {
    x == "1" ? document.getElementsByClassName('cardfaces')[i].style.marginLeft = "0px" : document.getElementsByClassName('cardfaces')[i].style.marginLeft = "-400px"
  }
  x == "1" ? cardbtn1.style.backgroundColor = "#8f8f8fa5" : cardbtn1.style.backgroundColor = "#eb7724"
  x == "2" ? cardbtn2.style.backgroundColor = "#8f8f8fa5" : cardbtn2.style.backgroundColor = "#eb7724"
}
function beneficiary_profile(name, acct, i) {
  bene_details.style.display = "flex"
  bene_details.innerHTML = name + " " + acct;

  for (let i = 0; i < bene1.length; i++) {
    bene1[i].style.filter = "grayscale(100%)";
    bene1[i].style.scale = '100%';
    bene1[i].style.transition = "all 500ms ease";
  }

  bene1[--i].style.scale = "117%";
  bene1[i].style.filter = "grayscale(0%)";
  bene1[i].style.transition = "all 500ms ease";
  // console.log(name, acct, i);

}


// Get the canvas element
let ctx = document.getElementById('myChart').getContext('2d');


// Generate random data
let labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
let data = {
  labels,
  datasets: [{
    label: 'Incoming',
    data: labels.map(() => Math.floor(Math.random() * 10000)),
    borderColor: '#eb7824',
    backgroundColor: '#171d27',
    tension: 0.4,
    borderWidth: 1,
  }],
};
ctx.font = "27px"

// Create the chart
let myChart = new Chart(ctx, {
  type: 'line',
  data,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,

      }
    }
  },
  label: {
    fontColor: 'red'
  },
});

fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_WoNJ40Mnc96NyTYwhGiReJj7nLqOe7dZUyVTgSm3").then((res) => res.json()).then((doc) => {
  // console.log(doc.data);
  gbp.innerHTML = Math.floor(1250 / doc.data.GBP)
  usa.innerHTML = Math.floor(1250 / doc.data.USD)
  euro.innerHTML = Math.floor(1250 / doc.data.EUR)
  yuan.innerHTML = Math.floor(1250 / doc.data.CNY)
  cad.innerHTML = Math.floor(1250 / doc.data.CAD)
  dirham.innerHTML = Math.floor(1250 / doc.data.CAD)
  rand.innerHTML = Math.floor(1250 / doc.data.ZAR)
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
let trans_id = ''

function flutter_() {

  document.getElementById("fund_div").action = "https://checkout.flutterwave.com/v3/hosted/pay"
  // window.location.href = "https://checkout.flutterwave.com/v3/hosted/pay"
  document.getElementById("fund_btn").innerHTML = "processing..."
  document.getElementById("fund_btn").style.background = "grey"
  // document.getElementById("fund_btn").disabled = true

  alert("Running...")
}
function flutter_amt() {
  trans_id = ''
  document.getElementById("flutter_amnt").value > 50000 || document.getElementById("flutter_amnt").value == '' || !userCredentials.Email ? fund_btn.disabled = true : fund_btn.disabled = false;
  document.getElementById("flutter_amnt").value > 50000 || document.getElementById("flutter_amnt").value == '' || !userCredentials.Email ? document.getElementById("fund_btn").style.backgroundColor = "#989898" : document.getElementById("fund_btn").style.backgroundColor = "#eb7824";
  document.getElementById("fund_btn").style.transition = "all 300ms ease"
  document.getElementById("userMail").value = userCredentials.Email
  document.getElementById("userName").value = userCredentials.Name
  for (let i = 0; i < 16; i++) {
    trans_id += Math.floor(Math.random() * 10)
  }
  tran_id = trans_id
  document.getElementById("userTranId").value = trans_id

  Self_credit(document.getElementById("flutter_amnt").value)

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
        authenticate_tran('airtime')
      }

  network.value == 'GLO' ? network_logo.style.backgroundImage = 'url(./Images/glo.png)' : network.value == 'AIRTEL' ? network_logo.style.backgroundImage = 'url(./Images/airtel.png)' : network.value == '9MOBILE' ? network_logo.style.backgroundImage = 'url(./Images/9mobile.png)' : ''
  // backgroundImage
}
function close_card() {
  main.style = "filter : none";
  card_title.value = '';
  card_type.value = '';
  card_type[0].selected = true;
  document.getElementById(selected).style.border = "none"
  document.getElementById(selected).style.width = "150px"
  selected = ''
  document.getElementById("modal4").style.display = "none"
  document.getElementById("tran_pin").style.display = "none"

  dashboard_()
  GetUser()
  mode == "dark" ? dark() : light()
}
function close_() {
  user_pin = ''
  next_box = 0
  modal1.style.display = 'none';
  main.style = "filter : none";
  modal2.style.display = 'none';
  modal3.style.display = 'none';
  document.getElementById('pdf').style.display = "none"
  document.getElementById("modal4").style.display = "none"
  document.getElementById("tran_pin").style.display = "none"

  dashboard_()
  GetUser()
  mode == "dark" ? dark() : light()
}

function close_search() {
  document.getElementsByClassName("search_tran")[0].style.display = "none"
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

      load_transaction()
      GetUser()

      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

function donate_funds() {
  // document.getElementById("tran_pin").style.display = "none"
  // donate_method.value == "balance" ? balance_deduct() : donate_method.value == "ussd" ? ussd_pay() : donate_method.value == "cash_deposit" ? cash_deposit() : ''
  balance_deduct();
}

function balance_deduct() {
  if (donate_amount.value < userCredentials.Balance && donate_amount.value != 0 && foundation_id.value) {
    console.log("don");
    proceed()
  } else {
    document.body.style = "overflow: scroll;";
    donate_amount.value == 0 ? alert("Amount too small") : !foundation_id.value ? alert("Please Enter an ID") : alert("Sorry insuffcient funds")
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
    // console.log(tran_id);
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
    Beneficiary: { "Beneficiary_Name": beneName, "Beneficiary_Account": beneAcct },
    Picture: receiverPicture

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
function Create_Card_History(tranType, beneName, beneAcct, amnt, ctype) {
  tran_id = ''
  for (let i = 0; i < 16; i++) {
    tran_id += Math.floor(Math.random() * 10)
    // console.log(tran_id);
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
    Card_Details: { "Card_Name": beneName, "Card_Number": beneAcct },
    Card_Type: ctype
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
  if (send_amount.value < userCredentials.Balance && send_amount.value && receiver_acct.value && receiver_name.value != 'NA' && receiver_name.value && receiver_name.value != userCredentials.Name) {
    proceed()
  } else {
    send_amount.value == 0 ? alert("Amount too small") : receiver_name.value == '' || receiver_name.value == 'NA' ? alert("Invalid Account Number") : receiver_name.value == userCredentials.Name ? alert("You can't send money to yourself") : alert("Sorry insuffcient funds");
    // main.style = "filter : brightness(0.5);";
    document.body.style = "overflow: scroll;";
  }

}

function load_transaction() {
  recent_details.innerHTML = ''
  const db = firebase.firestore();

  db.collection("History").doc(userEmail).collection(userCredentials.AccountNumber).orderBy('Date', 'desc').limit(4).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data().Amount);

      if (doc.data().Type == 'Debit') {
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
      } else if (doc.data().Type == 'Credit' || doc.data().Type == 'Account Funding') {
        recent_details.innerHTML += `<div class="tran1">
        <div class="tran">
            <img width="25" src="./Images/fund.png" alt="">
            <h5>${doc.data().Type}<p>${doc.data().Time} ${doc.data().Date}</p>
            </h5>
      
        </div>
        <span>+${doc.data().Amount}</span>`
      } else if (doc.data().Type == 'Card') {
        recent_details.innerHTML += `<div class="tran1">
        <div class="tran">
            <img width="25" src="./Images/card-design4.png" alt="">
            <h5>${doc.data().Type}<p>${doc.data().Time} ${doc.data().Date}</p>
            </h5>
      
        </div>
        <span>-${doc.data().Amount}</span>`
      }
      // console.log(doc.data().New);
      if (doc.data().New == true) {
        notification_dot.style.display = "block"
      }
    });
  });



}


let interval = setInterval(() => {
  load_transaction()
  clearInterval(interval)
}, 3000)

function acct_number() {
  const db = firebase.firestore();
  db.collection("Users").get().then((querySnapshot) => {
    // querySnapshot.forEach((doc) => {
    //     doc.data().AccountNumber == receiver_acct.value ? receiver_name.value = doc.data().Name : receiver_name.value = "NA";
    //     doc.data().AccountNumber == receiver_acct.value ? return : '';
    // });
    for (let i = 0; i < querySnapshot._delegate.docs.length; i++) {
      if (querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.AccountNumber.stringValue == receiver_acct.value) {
        receiver_name.value = querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.Name.stringValue;
        receiverEmail = querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.Email.stringValue
        receiverAcct = querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.AccountNumber.stringValue
        receiverPicture = querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.ProfilePicture.stringValue
        break
      } else {
        receiver_name.value = "NA";
        receiverEmail = ''
      }
    }
  });
}
function creditAccount(amt) {


  const db = firebase.firestore();
  var docRef = db.collection("Users").doc(receiverEmail);

  docRef.get().then((doc) => {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      var CreditAcct = db.collection("Users").doc(receiverEmail);

      // Set the "capital" field of the city 'DC'
      return CreditAcct.update({
        Balance: doc.data().Balance + Number(amt)
      })
        .then(() => {
          let userhistory = db
            .collection("History").doc(receiverEmail)
            .collection(receiverAcct);

          userhistory.doc(`${tran_id}`).set({
            Type: "Credit",
            Amount: amt,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString(),
            Transaction_ID: Number(tran_id),
            Beneficiary: { "Sender_Name": userCredentials.Name, "Sender_Account": userCredentials.AccountNumber },
            New: true,
            Picture: userCredentials.ProfilePicture,
          })
            .then(() => {
              // console.log("Transaction_History Added");
              // console.log("Document successfully written!");
              // window.location.href = "login.html";
            })
            .catch((error) => {
              console.error("Error writing document:", error);
            });
          // console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}
function Self_credit(amt) {
  const db = firebase.firestore();
  var docRef = db.collection("Users").doc(userCredentials.Email);

  docRef.get().then((doc) => {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      var CreditAcct = db.collection("Users").doc(userCredentials.Email);

      // Set the "capital" field of the city 'DC'
      return CreditAcct.update({
        Balance: doc.data().Balance + Number(amt)
      })
        .then(() => {
          let userhistory = db
            .collection("History").doc(userCredentials.Email)
            .collection(userCredentials.AccountNumber);

          userhistory.doc(`${tran_id}`).set({
            Type: "Account Funding",
            Amount: amt,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString(),
            Transaction_ID: Number(tran_id),
            Beneficiary: { "Sender_Name": userCredentials.Name, "Sender_Account": userCredentials.AccountNumber },
            New: true,
            Picture: userCredentials.ProfilePicture,
          })
            .then(() => {
              // console.log("Transaction_History Added");
              // console.log("Document successfully written!");
              // window.location.href = "login.html";
            })
            .catch((error) => {
              console.error("Error writing document:", error);
            });
          // console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

function addBeneficiary() {
  // console.log("Bene Added");
  createBeneficiary()
  getBeneficiary()
  close_()
}

function createBeneficiary() {
  const db = firebase.firestore();

  var docRef = db.collection("Users").doc(receiverEmail);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const db = firebase.firestore();
      // Add a new document in collection "cities"
      let BeneficiaryData = db
        .collection(`${userCredentials.Email}_Beneficiary`)

      BeneficiaryData.doc(receiverEmail).set({
        Name: doc.data().Name,
        Account: doc.data().AccountNumber,
        Picture: doc.data().ProfilePicture
      })
        .then(() => {
          // console.log("Document successfully written!");

        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  // receiverEmail

}

function getBeneficiary() {
  beneficiaries.innerHTML = ''
  document.getElementsByClassName("userbene")[0].innerHTML = ''

  const db = firebase.firestore();
  db.collection(`${userCredentials.Email}_Beneficiary`).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      index += 1;
      beneficiaries.innerHTML += `
      <div style="background-image: url('${doc.data().Picture}')" onclick="beneficiary_profile('${doc.data().Name}', ${doc.data().Account}, ${index})" id="bene1" class="bene1"></div>
      `
      document.getElementsByClassName("userbene")[0].innerHTML += `
      <div class="bene_list">
                                <div style="border-radius: 100%; width: 60px; height: 60px; background-image: url(${doc.data().Picture}); background-position: center; background-repeat: no-repeat; background-size: cover;" id="Acct_pic" ></div>
                                <img  src="" alt="">
                                    <p>${doc.data().Name}</p>
                                    <button onclick="del_bene(${doc.data().Account})">Delete</button>
                            </div>
      `

      // bene1.style.backgroundImage = 'url(doc.data().Picture)'


    });
  });
  // console.log("Bene");
}

function del_bene(x) {
  console.log(x);
  const db = firebase.firestore();
  db.collection("Users").where("AccountNumber", "==", `${x}`)
    .get()
    .then((querySnapshot) => {
      const db = firebase.firestore();

      querySnapshot.forEach((doc) => {
        db.collection(`${userCredentials.Email}_Beneficiary`).doc(doc.data().Email).delete().then(() => {
          getBeneficiary()
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
        // console.log(doc.id, " => ", doc.data());

      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

}

function beneficiary_send() {
  if (beneficiarySendAmount.value > 0 && beneficiarySendAmount && beneficiarySendAmount.value < userCredentials.Balance) {
    proceed()
    // console.log("Yes");
  } else {
    console.log("No");
    alert("Incomplete details...")
    close_()
  }
}

function creditAccount2(amt) {
  const db = firebase.firestore();
  var docRef = db.collection("Users").doc(receiverEmail);

  docRef.get().then((doc) => {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      var CreditAcct = db.collection("Users").doc(receiverEmail);

      // Set the "capital" field of the city 'DC'
      return CreditAcct.update({
        Balance: doc.data().Balance + Number(amt)
      })
        .then(() => {
          let userhistory = db
            .collection("History").doc(receiverEmail)
            .collection(bene_details.textContent.slice(-10));

          userhistory.doc(`${tran_id}`).set({
            Type: "Credit",
            Amount: amt,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString(),
            Transaction_ID: Number(tran_id),
            Beneficiary: { "Sender_Name": userCredentials.Name, "Sender_Account": userCredentials.AccountNumber },
            New: true,
            Picture: userCredentials.ProfilePicture

          })
            .then(() => {
              // console.log("Transaction_History Added");
              // console.log("Document successfully written!");
              // window.location.href = "login.html";
            })
            .catch((error) => {
              console.error("Error writing document:", error);
            });
          // console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

let getBen = setInterval(() => {
  getBeneficiary()
  clearInterval(getBen)
}, 2000)




dashboardInterface = document.getElementById("dashboard")
transactionsInterface = document.getElementById("transactions")


function dashboard_() {
  dashboardInterface.style.display = "flex"
  transactionsInterface.style.display = "none"
  messagesInterface.style.display = "none"
  cardsInterface.style.display = "none"
  accounts.style.display = "none"
  dashboardInterface.style.opacity = "0" ? dashboardInterface.style.opacity = "1" : dashboardInterface.style.opacity = "0"
  dashboardInterface.style.transition = "all 300ms ease"

}
function transactions_() {
  transactionsInterface.style.display = "flex"
  dashboardInterface.style.display = "none"
  messagesInterface.style.display = "none"
  cardsInterface.style.display = "none"
  accounts.style.display = "none"
  transactionsInterface.style.transition = "all 300ms ease"
  // trans_list.innerHTML = ''
  let hist_load = setInterval(() => {
    trans_history()
    clearInterval(hist_load)
  }, 1500)
}
let trans_list = document.getElementById("trans_list")
let table_list = document.getElementById("table_list")
let trans_list2 = document.getElementById("trans_list2")
let empty_trans = document.getElementById("empty_trans")

function trans_history() {
  // trans_list2.removeChild(document.getElementById("table_body"))
  const db = firebase.firestore();
  db.collection("History").doc(userEmail).collection(userCredentials.AccountNumber).orderBy("Date", "desc").get().then((querySnapshot) => {
    if (querySnapshot.size == 0) {
      empty_trans.style = "display: block;"
      document.getElementById("loading_trans").style = "display:none;"
      console.log("Empty");
    } else {
      let x = 0
      // document.getElementById("loading_trans").style = "display:none"
      document.getElementById("trans_body").innerHTML = ''
      querySnapshot.forEach((doc) => {
        if (doc.data().Type == "Donate") {
          document.getElementById("trans_body").innerHTML += `
          <div onclick="print_tran(${doc.data().Transaction_ID})" class="tran">
            <div class="info1">
              <img style="width: 60px;" src="./Images/donated.png"} " alt="">
              <div class="info_1">
                <p style= "width: 150px;">${doc.data().Type}</p>
                <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
              </div>
            </div>
            <div class="info2">
              <p style = "color: red;">-&#8358;${doc.data().Amount}</p>
              <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
            </div>
        </div>
            `
        } else
          if (doc.data().Type == "Airtime") {
            document.getElementById("trans_body").innerHTML += `
          <div onclick="print_tran(${doc.data().Transaction_ID})" class="tran">
            <div class="info1">
            
            ${doc.data().Beneficiary.Beneficiary_Name == "MTN" ? '<img style="width: 60px;" src="./Images/mtn.png" "alt="">' : doc.data().Beneficiary.Beneficiary_Name == "GLO" ? '<img style="width: 60px;" src="./Images/glo.png" "alt="">' : doc.data().Beneficiary.Beneficiary_Name == "9MOBILE" ? '<img style="width: 60px; height: 50px" src="./Images/9mobile.png" "alt="">' : doc.data().Beneficiary.Beneficiary_Name == "AIRTEL" ? '<img style="width: 60px;" src="./Images/airtel.png" "alt="">' : '<img style="width: 60px;" src="./Images/donated.png" "alt="">'}
              
              <div class="info_1">
                <p style= "width: 150px;">${doc.data().Type}</p>
                <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
              </div>
            </div>
            <div class="info2">
              <p style = "color: red;">-&#8358;${doc.data().Amount}</p>
              <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
            </div>
        </div>
            `
          } else if (doc.data().Type == 'Credit' || doc.data().Type == 'Account Funding') {
            document.getElementById("trans_body").innerHTML += `
                                <div onclick="print_tran(${doc.data().Transaction_ID})" class="tran">
                                  <div class="info1">
                                    <img style="width: 140px; height: 60px; border-radius: 10px;" src="${doc.data().Picture || './Images/Male_User.png'}" alt="">
                                    <div class="info_1">
                                      <p style= "width: 150px;">${doc.data().Type}</p>
                                      <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
                                    </div>
                                  </div>
                                  <div class="info2">
                                  ${doc.data().Type == "Credit" || doc.data().Type == "Account Funding" ? `<p style = "color: rgb(0, 187, 0);">+&#8358;${doc.data().Amount}</p>` : `<p style = "color: red;">-&#8358;${doc.data().Amount}</p>`}
                                    
                                    <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
                                  </div>
                              </div>
                                  `
          } else if (doc.data().Type == 'Card') {
            document.getElementById("trans_body").innerHTML += `
            <div onclick="print_tran(${doc.data().Transaction_ID})" class="tran">
              <div class="info1">
                <img style="width: 100px; height: 40px; border-radius: 10px;" src="./Images/card-design4.png" alt="">
                <div class="info_1">
                  <p style= "width: 150px;">${doc.data().Type}</p>
                  <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
                </div>
              </div>
              <div class="info2">
              <p style = "color: red;">-&#8358;${doc.data().Amount}</p>
                
                <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
              </div>
          </div>
              `
          } else if(doc.data().Type == 'Registration Bonus'){
            document.getElementById("trans_body").innerHTML += `
            <div onclick="print_tran(${doc.data().Transaction_ID})" class="tran">
              <div class="info1">
                <img style="width: 140px; height: 60px; border-radius: 10px;" src="${doc.data().Picture || './Images/Male_User.png'} " alt="">
                <div class="info_1">
                  <p style= "width: 150px;">${doc.data().Type}</p>
                  <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
                </div>
              </div>
              <div class="info2">
              <p style = "color: green;">+&#8358;${doc.data().Amount}</p>
                
                <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
              </div>
          </div>
              `

          } else{
            document.getElementById("trans_body").innerHTML += `
            <div onclick="print_tran(${doc.data().Transaction_ID})" class="tran">
              <div class="info1">
                <img style="width: 140px; height: 60px; border-radius: 10px;" src="${doc.data().Picture || './Images/Male_User.png'} " alt="">
                <div class="info_1">
                  <p style= "width: 150px;">${doc.data().Type}</p>
                  <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
                </div>
              </div>
              <div class="info2">
              <p style = "color: red;">-&#8358;${doc.data().Amount}</p>
                
                <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
              </div>
          </div>
              `

          }


      })
      empty_trans.style.display = "none"
      console.log("done");
    }
  })
}

messagesInterface = document.getElementById("message")


function messages_() {
  messagesInterface.style.display = "flex"
  dashboardInterface.style.display = "none"
  transactionsInterface.style.display = "none"
  cardsInterface.style.display = "none"
  accounts.style.display = "none"
  transactionsInterface.style.transition = "all 300ms ease"
  message_dot.style.opacity = "0"
  message_dot.style.transition = "all 300ms ease"

  const db = firebase.firestore();

  let newTran = db.collection("History").doc(`${userEmail}`).collection(`${userCredentials.AccountNumber}`).where("New", "==", true)

  newTran.get().then((querySnapshot) => {
    // empty_msg.style.display = "none"
    msg_body.innerHTML = ''
    querySnapshot.size == 0 ? msg_body.innerHTML = `<p id="empty_msg" style="margin: auto;">No new messages</p>` : ''
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      msg_body.innerHTML += `<div class="msg">
                            <div class="info1">
                                <h4 style="color: #000000; font-weight: 600; display: flex; align-items: center; gap: 20px;">${doc.data().Type} Alert <p style="font-size: 10px; color: rgb(104, 104, 104); font-weight: 300;">${doc.data().Date} ${doc.data().Time}</p></h4>
                                ${doc.data().Type == "Credit" ? `<p style="text-align: justify; font-weight: 300; font-size: 15px; line-height: 20px;">You have just received  &#8358;${doc.data().Amount} from ${doc.data().Beneficiary.Sender_Account.slice(0, 7)}***. Transaction Desc: PiPay/Transaction/${doc.data().Type}/${doc.data().Beneficiary.Sender_Name}/${doc.data().Transaction_ID}, Time: ${doc.data().Date}. Your current balance is:  &#8358;${userCredentials.Balance}.00</p>` : `<p style="text-align: justify; font-weight: 300; font-size: 15px; line-height: 20px;">You successfully funded your account with &#8358;${doc.data().Amount}. Transaction Desc: PiPay/Transaction/${doc.data().Type}/flutterpay/${doc.data().Transaction_ID}, Time: ${doc.data().Date}. Your current balance is:  &#8358;${userCredentials.Balance}.00</p>`}
                            </div>
                        </div>`
      var hisUpd = db.collection("History").doc(`${userCredentials.Email}`).collection(`${userCredentials.AccountNumber}`).doc(`${doc.data().Transaction_ID}`);

      return hisUpd.update({
        New: false
      })
        .then(() => {

        })
        .catch((error) => {

        });
    });
  })
  // msg_body.innerHTML = `<p>Loading...</p>`


}

let cardsInterface = document.getElementById("card")
function cards_() {
  // console.log("Hey");
  messagesInterface.style.display = "none"
  dashboardInterface.style.display = "none"
  transactionsInterface.style.display = "none"
  cardsInterface.style.display = "block"
  accounts.style.display = "none"
}


let card_title = document.getElementById("card_title")
let card_type = document.getElementById("card_type")
function add_card() {
  card_title.value == '' ? document.getElementById("card_err1").style.opacity = "1" : card_type.value == '' ? document.getElementById("card_err2").style.opacity = "1" : userCredentials.Balance < 1050 ? alert("Sorry, not enough balance") : charge_for_card()
  // !card_title.value || !card_type.value ? '' :  
}

let selected
function design_select(e) {
  selected = e
  let card_designs = document.getElementsByClassName("card_designs")
  for (let i = 0; i < card_designs.length; i++) {
    card_designs[i].style = "transition: width 500ms ease; border: none; width: 150px;"
  }
  document.getElementById(selected).style.border = "1px solid rgb(23, 29, 39)"
  document.getElementById(selected).style.width = "250px"

  // return e;
}
card_title.addEventListener("input", () => {
  document.getElementById("card_err1").style.opacity = "0"
})

card_type.addEventListener("input", () => {
  document.getElementById("card_err2").style.opacity = "0"
})

function charge_for_card() {
  document.getElementById("modal4").style.display = "flex"
  main.style = "filter : brightness(0.5)";
  main.style.pointerEvents = "none";
  mode == "dark" ? dark() : light()
  window.scrollTo(0, 0)
}

function save_card() {

  document.getElementById("card_btn").disabled = true
  document.getElementById("card_btn").innerHTML = "processing..."
  document.getElementById("card_btn").style.background = "grey"

  userCredentials.Balance -= 1050;
  const bd = firebase.firestore();
  var UserUpdate = bd.collection("Users").doc(`${userCredentials.Email}`);

  // Set the "capital" field of the city 'DC'
  return UserUpdate.update({
    Balance: userCredentials.Balance,
    Spent: userCredentials.Spent + 1050,

  })
    .then(() => {
      // console.log(`${userCredentials.Balance}`);


      let card_no = ''
      let card_cvv = ''

      for (let i = 0; i < 15; i++) {
        card_no += Math.floor(Math.random() * 10)
      }
      for (let i = 0; i < 3; i++) {
        card_cvv += Math.floor(Math.random() * 10)
      }
      let exp = Date.now()
      new_exp = (exp + 19184400000000000) / (1000 * 60 * 60 * 24 * 365)
      exp.getDate
      const db = firebase.firestore();

      Create_Card_History("Card", card_title.value, card_no, 1050, card_type.value)

      // Add a new document in collection "cities"
      db.collection("Cards").doc(userCredentials.Email).collection(userCredentials.AccountNumber).doc(`${card_title.value}`).set({
        Card_Title: card_title.value,
        Card_type: card_type.value,
        Card_Design: selected,
        Card_Number: card_no,
        Card_Exp: `${Math.round((((Date.now() + 94608000000) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 365)) * 12)}/${Math.round(((exp + 94608000000) / (1000 * 60 * 60 * 24 * 365) + 1970))}`,
        Card_CVV: card_cvv
      })
        .then(() => {
          load_card()

        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      document.getElementById("modal4").style.display = "none"

      load_transaction()
      close_card()
      GetUser()
      document.getElementById("card_btn").disabled = false
      document.getElementById("card_btn").innerHTML = "Add Card"
      document.getElementById("card_btn").style.background = "#eb7824"

    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

}
function load_card() {
  // console.log("loading");
  const db = firebase.firestore();

  var list_cards = db.collection("Cards").doc(userCredentials.Email).collection(userCredentials.AccountNumber)

  list_cards.get().then((querySnapshot) => {
    document.getElementById("card_list").innerHTML = ''
    document.getElementById("card_lists").innerHTML = ''
    // console.log(querySnapshot.size);
    if (!querySnapshot.size == '0') {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data());
        document.getElementById("card_list").innerHTML += `
    ${doc.data().Card_Design == 'a' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg3.jpg);" class="front_card">' : doc.data().Card_Design == 'b' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg2.jpg);" class="front_card">' : doc.data().Card_Design == 'c' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg1.jpg);" class="front_card">' : '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg4.jpg);" class="front_card">'}
                                          <div class="logo">
                                              <h3><b>Pi</b>Pay</h3>
                                          </div>
                                          <div class="cardic"><img width="35" src="./Images/Card IC.png" alt=""><img
                                                  width="30" src="./Images/signal.png" alt=""></div>
                                          <div class="cardno">
                                              <p id="cardnumber">${doc.data().Card_Number}</p>
                                              <div class="cardname">
                                              ${doc.data().Card_Design == 'd' ? `<p style = "color: #00123d;">${doc.data().Card_Title}</p>` : `<p style = "color: #eb7824;">${doc.data().Card_Title}</p>`}
                                                  <p id="cardexp">${doc.data().Card_Exp}</p>
                                              </div>
                                          </div>
                                          ${doc.data().Card_type == 'mastercard' ? '<div class="cardtype"><img width="40" src="./Images/mastrercard.png" alt="">' : doc.data().Card_type == 'verve' ? '<div class="cardtype"><img width="60" src="./Images/verve.png" alt="">' : '<div class="cardtype"><img width="50" src="./Images/visa.png" alt="">'}
                                          
                                          </div>
                                      </div>
                                                            `
        document.getElementById("card_lists").innerHTML += `
        <div id="cardfaces" class="cardfaces">
                          ${doc.data().Card_Design == 'a' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg3.jpg);" class="front_card">' : doc.data().Card_Design == 'b' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg2.jpg);" class="front_card">' : doc.data().Card_Design == 'c' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg1.jpg);" class="front_card">' : '<div style="background-image: linear-gradient(to bottom right, #0e1f4067, #0000005c), url(./Images/Card-bg4.jpg);" class="front_card">'}
                          <div class="logo">
                              <h3><b>Pi</b>Pay</h3>
                          </div>
                          <div class="cardic"><img width="35" src="./Images/Card IC.png" alt=""><img
                                  width="30" src="./Images/signal.png" alt=""></div>
                          <div class="cardno">
                              <p id="cardnumber">${doc.data().Card_Number}</p>
                              <div class="cardname">
                              ${doc.data().Card_Design == 'd' ? `<p style = "color: #00123d;">${doc.data().Card_Title}</p>` : `<p style = "color: #eb7824;">${doc.data().Card_Title}</p>`}
                              <p id="cardexp">${doc.data().Card_Exp}</p>
                              </div>
                          </div>
                          ${doc.data().Card_type == 'mastercard' ? '<div class="cardtype"><img width="40" src="./Images/mastrercard.png" alt="">' : doc.data().Card_type == 'verve' ? '<div class="cardtype"><img width="60" src="./Images/verve.png" alt="">' : '<div class="cardtype"><img width="50" src="./Images/visa.png" alt="">'}
                          
                          </div>
                      </div>
                      ${doc.data().Card_Design == 'a' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f40ca, #000000c9), url(./Images/Card-bg3.jpg);" class="back_card">' : doc.data().Card_Design == 'b' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f40ca, #000000c9), url(./Images/Card-bg2.jpg);" class="back_card">' : doc.data().Card_Design == 'c' ? '<div style="background-image: linear-gradient(to bottom right, #0e1f40ca, #000000c9), url(./Images/Card-bg1.jpg);" class="back_card">' : '<div style="background-image: linear-gradient(to bottom right, #0e1f40ca, #000000c9), url(./Images/Card-bg4.jpg);" class="back_card">'}                    
                            <div class="tape">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel soluta,
                                    aperiam
                                    enim
                                    autem commodi, quis a eaque error nam atque, provident possimus
                                    laboriosam
                                    neque
                                    aliquid.Blanditiis voluptatum ad pariatur est?</p>
                            </div>
                            <div class="tape2">
                                              <p id="cardcvv">CVV ${doc.data().Card_CVV}</p>
                                          </div>
                                          <div class="cardexp">
                                              <p>
                                                  <span><b>Pi</b>Pay</span>Lorem, ipsum dolor sit amet consectetur
                                                  adipisicing
                                                  elit.
                                                  Nobis dignissimos doloremque vitae sunt quam iusto repellendus rerum
                                                  temporibus
                                                  atque. Magni sequi ad laborum dolore perspiciatis doloremque ipsa ipsum
                                                  expedita
                                                  unde.
                                              </p>
                                          </div>
                        </div>
        </div>
        
        `

      });
    } else {
      document.getElementById("card_lists").innerHTML += `
      <div id="cardfaces" class="cardfaces">
      <div id="front_card" class="front_card">
          <div class="logo">
              <h3><b>Pi</b>Pay</h3>
          </div>
          <div class="cardic"><img width="35" src="./Images/Card IC.png" alt=""><img
                  width="30" src="./Images/signal.png" alt=""></div>
          <div class="cardno">
              <p id="cardnumber">ADD A NEW CARD</p>
              <div class="cardname">
                  <p>USER</p>
                  <p id="cardexp">Exp: 12/99</p>
              </div>
          </div>
          <div class="cardtype"><img width="40" src="./Images/mastrercard.png" alt="">
          </div>
      </div>
      <div class="back_card">
          <div class="tape">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel soluta,
                  aperiam
                  enim
                  autem commodi, quis a eaque error nam atque, provident possimus
                  laboriosam
                  neque
                  aliquid.Blanditiis voluptatum ad pariatur est?</p>
          </div>
          <div class="tape2">
              <p id="cardcvv">CVV 000</p>
          </div>
          <div class="cardexp">
              <p>
                  <span><b>Pi</b>Pay</span>Lorem, ipsum dolor sit amet consectetur
                  adipisicing
                  elit.
                  Nobis dignissimos doloremque vitae sunt quam iusto repellendus rerum
                  temporibus
                  atque. Magni sequi ad laborum dolore perspiciatis doloremque ipsa ipsum
                  expedita
                  unde.
              </p>
          </div>
      </div>
  </div>
                                                            `
      document.getElementById("card_list").innerHTML = ` <div id="cardfaces" class="cardfaces">
    <div id="front_card" class="front_card">
        <div class="logo">
            <h3><b>Pi</b>Pay</h3>
        </div>
        <div class="cardic"><img width="35" src="./Images/Card IC.png" alt=""><img
                width="30" src="./Images/signal.png" alt=""></div>
        <div class="cardno">
            <p id="cardnumber">ADD A NEW CARD</p>
            <div class="cardname">
                <p>USER</p>
                <p id="cardexp">Exp: 12/99</p>
            </div>
        </div>
        <div class="cardtype"><img width="40" src="./Images/mastrercard.png" alt="">
        </div>
    </div>
                                                          `
    }

  });

}

let accounts = document.getElementById("accounts")
let Acct_name = document.getElementById("Acct_name")
let Acct_email = document.getElementById("Acct_email")
let Acct_number = document.getElementById("Acct_number")
let Acct_phn = document.getElementById("Acct_phn")
let Acct_pic = document.getElementById("Acct_pic")
let Acct_country = document.getElementById("Acct_country")

Acct_country.value == '' ? document.getElementById("update_user_btn").disabled = true : document.getElementById("update_user_btn").disabled = false
Acct_country.value == '' ? document.getElementById("update_user_btn").style = "background-color: rgb(163, 163, 163);" : document.getElementById("update_user_btn").style = "background-color: #eb7824"


function Account_() {
  messagesInterface.style.display = "none"
  dashboardInterface.style.display = "none"
  transactionsInterface.style.display = "none"
  cardsInterface.style.display = "none"
  accounts.style.display = "flex"

  acct_details()
}


function acct_details() {
  Acct_name.value = userCredentials.Name
  Acct_email.value = userCredentials.Email
  Acct_number.value = userCredentials.AccountNumber
  Acct_phn.value = userCredentials.PhoneNumber
  Acct_country.value = userCredentials.Country
  Acct_pic.style.backgroundImage = `url(${userCredentials.ProfilePicture})`
  document.getElementById("cpin_").value = userCredentials.Pin
  document.getElementById("pin_").value = userCredentials.Pin
  Acct_country.value == '' ? document.getElementById("update_user_btn").disabled = true : document.getElementById("update_user_btn").disabled = false
  Acct_country.value == '' ? document.getElementById("update_user_btn").style = "background-color: rgb(163, 163, 163);" : document.getElementById("update_user_btn").style = "background-color: #eb7824"

}

function update_user() {
  // console.log("updated");
  // Add a new document in collection "cities"
  if (document.getElementById('pin_').value.length == 4 && document.getElementById('cpin_').value.length == 4) {
    document.getElementById("update_user_btn").innerHTML = "processing..."
    document.getElementById("update_user_btn").disabled = true
    document.getElementById("update_user_btn").style = "background-color: rgb(163, 163, 163)"
    const db = firebase.firestore();
    let userdet = db.collection("Users").doc(userCredentials.Email);
    return userdet.update({
      PhoneNumber: Acct_phn.value,
      ProfilePicture: imageSrc || '',
      Pin: document.getElementById("cpin_").value
    })
      .then(() => {
        acct_set()
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  } else {
    document.getElementById("matchPin").innerHTML = "Pin must be 4 digits"
    document.getElementById("matchPin").style = "opacity: 1; transition: all 300ms ease"

  }

}

let imageSrc
function upload() {
  let pic = document.getElementById("chng_pic").files[0];
  console.log(pic);
  let readImg = new FileReader()
  readImg.onload = function (event) {
    imageSrc = event.target.result;
    console.log(imageSrc);
  };
  readImg.readAsDataURL(pic);
  let upload_time = setInterval(() => {
    Acct_pic.style.backgroundImage = `url(${imageSrc})`
    clearInterval(upload_time)
  }, 1500)
}


function dark_light() {
  mode == "light" ? mode = "dark" : mode = "light";
  mode == "dark" ? dark() : light();
}

function dark() {
  console.log("dark");
  document.getElementsByClassName("main")[0].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementById("ads_main").style = "background: #74747480; backdropFilter: blur(150px)"
  document.getElementsByClassName("graph")[0].style = "background: #74747480;"
  document.getElementsByClassName("cards")[0].style.background = "#ffffff76"
  // document.getElementsByClassName("card_title")[0].style.background = "rgb(23, 29, 39)"
  document.getElementsByClassName("card_title")[0].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementsByClassName("cards")[0].style = "box-shadow: 2.5px 1.5px 20px rgba(146, 146, 146, 0.318);"

  // document.getElementsByClassName("exchange_title")[0].style.background = "rgb(23, 29, 39)"
  document.getElementsByClassName("exchange_title")[0].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"

  // document.getElementsByClassName("beneficiary_title")[0].style.background = "rgb(23, 29, 39)"
  document.getElementsByClassName("beneficiary_title")[0].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"

  // document.getElementsByClassName("recent_title")[0].style.background = "rgb(23, 29, 39)"
  document.getElementsByClassName("recent_title")[0].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"

  document.getElementById("title_").style = "color: white"
  document.getElementById("balance").style = "color: white"
  document.getElementsByClassName("dash_")[0].style = "color: rgba(128, 128, 128, 0.628)"
  document.getElementsByClassName("dash_")[1].style = "color: rgba(128, 128, 128, 0.628)"
  document.getElementsByClassName("dash_")[2].style = "color: rgba(128, 128, 128, 0.628)"
  document.getElementsByClassName("dash_")[3].style = "color: rgba(128, 128, 128, 0.628)"
  document.getElementsByClassName("dash_")[4].style = "color: rgba(128, 128, 128, 0.628)"
  document.getElementsByClassName("dash_")[5].style = "color: rgba(128, 128, 128, 0.628)"
  // document.getElementsByClassName("sidenav")[0].style.background = "rgb(23, 29, 39)"
  document.getElementsByClassName("sidenav")[0].style.backgroundImage = "linear-gradient(to bottom left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementsByClassName("sidenav")[0].style = "box-shadow: 0.5px 0.5px 50px rgba(146, 146, 146, 0.318);"

  document.getElementById("Spent").style = "color: white"
  document.getElementById("donated").style = "color: white"
  document.getElementById("bonus").style = "color: white"
  document.getElementById("points").style = "color: white"
  document.getElementById("beneficiarySendAmount").style = "border: 1px solid rgb(23, 29, 39)"
  document.getElementById("card_title").style = "border: 1px solid rgb(23, 29, 39); color: rgb(23, 29, 39);"
  document.getElementById("card_type").style = "border: 1px solid rgb(23, 29, 39); color: rgb(23, 29, 39);"
  document.getElementById("add_card").style = "colo: 1px solid rgb(23, 29, 39)"
  document.getElementById("des_card").style = "color: rgb(23, 29, 39);"
  document.getElementById("bene_del").style = "color: rgb(23, 29, 39);;"
  document.getElementsByClassName("Shape")[0].style.fill = "#b4b4b4"
  document.getElementById("home_icn").src = "./Images/Home2.png"
  document.getElementById("bell").src = "./Images/bell2.png"
  document.getElementById("searching").style.color = "white"
  document.getElementsByClassName("menu_footer")[0].style = "border-top: .7px solid rgba(150, 150, 150, 0.614);"
  userCredentials == undefined || userCredentials == "" ? document.getElementById("dp").style.backgroundImage = "url(./Images/Male_User2.png)" : ''
  document.getElementById("mode").innerHTML = "Light Mode"
  document.getElementById("mode_icn").src = "./Images/light.png"
  document.getElementById("mode_icn").style = "transform: rotateZ(-90deg); transition: all 900ms ease"
  document.getElementsByClassName("modal_header")[0].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementById("modal2").style.background = "#ffffff57"
  document.getElementById("modal2").style.backdropFilter = "blur(150px)"
  document.getElementsByClassName("modal_header")[1].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementsByClassName("modal_header")[2].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementsByClassName("modal_header")[3].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementsByClassName("modal_header")[4].style.backgroundImage = "linear-gradient(to top left, #000000, rgb(0, 0, 0), rgb(0, 15, 42), rgb(4, 14, 33))"
  document.getElementById("modal4").style.background = "#ffffff57"
  document.getElementById("modal4").style.backdropFilter = "blur(150px)"
  document.getElementById("tran_pin").style.background = "#ffffff57"
  document.getElementById("tran_pin").style.backdropFilter = "blur(150px)"
  document.getElementById("notification_display").style.background = "#ffffff57"
  document.getElementById("tran_pin").style.backdropFilter = "blur(150px)"
  document.getElementById("bene_details").style.color = "#191919d6"
}


function light() {
  console.log("light");
  document.getElementsByClassName("main")[0].style.backgroundImage = "linear-gradient(to top right, #eb77242c, white, #eb772434, white)"
  // document.getElementsByClassName("main")[0].style = "transition: all 300ms ease"
  // document.getElementsByClassName("main")[0].style.backgroundColor = "white);"
  document.getElementById("ads_main").style = "background: #eb7824; backdropFilter: blur(150px)"
  document.getElementsByClassName("graph")[0].style = "background: #ffffff76;"
  document.getElementsByClassName("cards")[0].style.background = "##ffffff76"
  document.getElementsByClassName("card_title")[0].style.background = "#eb7824"
  document.getElementById("card_title").style.border = "1px solid #eb7824"
  document.getElementsByClassName("exchange_title")[0].style.background = "#eb7824"
  document.getElementsByClassName("beneficiary_title")[0].style.background = "#eb7824"
  document.getElementsByClassName("recent_title")[0].style.background = "#eb7824"
  document.getElementById("title_").style = "color: black"
  document.getElementById("balance").style = "color: black"
  document.getElementsByClassName("dash_")[0].style = "color: black"
  document.getElementsByClassName("dash_")[1].style = "color: black"
  document.getElementsByClassName("dash_")[2].style = "color: black"
  document.getElementsByClassName("dash_")[3].style = "color: black"
  document.getElementsByClassName("dash_")[4].style = "color: black"
  document.getElementsByClassName("dash_")[5].style = "color: black"
  document.getElementsByClassName("sidenav")[0].style = "background-image: linear-gradient(to bottom, #020b1c, #3618024a);"
  document.getElementById("Spent").style = "color: black"
  document.getElementById("donated").style = "color: black"
  document.getElementById("bonus").style = "color: black"
  document.getElementById("points").style = "color: black"
  document.getElementById("beneficiarySendAmount").style = "border: 1px solid #eb7824"
  // document.getElementById("card_title").style. = "white"
  document.getElementById("add_card").style = "color: #eb7824;"
  document.getElementById("des_card").style = "color: #eb7824;"

  document.getElementById("card_type").style = "border: 1px solid #eb7824"
  document.getElementById("bene_del").style = "color: #eb7824;"

  document.getElementById("mode").innerHTML = "Dark Mode"
  document.getElementById("mode_icn").src = "./Images/dark.png"
  document.getElementById("mode_icn").style = "transform: rotateZ(90deg); transition: all 900ms ease"

  document.getElementsByClassName("modal_header")[0].style.background = "#eb7824"
  document.getElementsByClassName("modal_header")[1].style.background = "#eb7824"
  document.getElementsByClassName("modal_header")[2].style.background = "#eb7824"
  document.getElementsByClassName("modal_header")[3].style.background = "#eb7824"
  document.getElementsByClassName("modal_header")[4].style.background = "#eb7824"
  document.getElementsByClassName("menu_footer")[0].style = "border-top: .7px solid rgb(219, 219, 219);"


  document.getElementsByClassName("Shape")[0].style.fill = "#171d27"
  document.getElementById("home_icn").src = "./Images/Home.png"
  document.getElementById("bell").src = "./Images/bell.png"
  document.getElementById("searching").style.color = "#040e21"
  // document.getElementsByClassName("Shape")[1].style.fill = "#171d27"
  userCredentials == undefined || userCredentials == "" ? document.getElementById("dp").style.backgroundImage = "url(./Images/Male_User.png)" : ''


  document.getElementById("modal4").style.background = "#fffff"
  document.getElementById("modal4").style.backdropFilter = "blur(150px)"

  document.getElementById("tran_pin").style.background = "#fffff"
  document.getElementById("tran_pin").style.backdropFilter = "blur(150px)"

  document.getElementById("notification_display").style.background = "#070e1fd6"
  // document.getElementById("notification_display").documentElement.style.background = "#070e1fd6"
  document.getElementById("tran_pin").style.backdropFilter = "blur(150px)"

  document.getElementById("bene_details").style.color = "#929292"

}

function acct_set() {
  // modal3.style. = "flex";
  window.scrollTo(0, 0)
  document.body.style = "overflow: hidden;";

  modal3.style = "display: flex; transform: translateY(-20px) transition: all 300ms ease"
  main.style = "filter : brightness(0.5)";
  main.style.pointerEvents = "none";
  document.getElementById("update_user_btn").innerHTML = "Update Account"
  document.getElementById("update_user_btn").disabled = false
  document.getElementById("update_user_btn").style = "background-color: #eb7824"
  mode == "dark" ? dark() : light()
}

let look = document.getElementById("searching")
function search() {
  let loading_ = document.getElementById("search_loading")
  let loading_null = document.getElementById("search_failed")
  let load_bucket = document.getElementsByClassName("search_tran_content")[0]

  while (document.getElementsByClassName("search_tran_content")[0].hasChildNodes()) {
    document.getElementsByClassName("search_tran_content")[0].removeChild(document.getElementsByClassName("search_tran_content")[0].firstChild);
  }

  load_bucket.appendChild(loading_)
  load_bucket.appendChild(loading_null)


  document.getElementsByClassName("search_tran")[0].style = "display: flex;"
  document.getElementById("search_loading").style = 'display: flex; margin: auto;'
  document.getElementById("search_failed").style.display = 'none'
  let found = '';

  let found_no = 0;
  let check
  // console.log("searching");
  // console.log(userCredentials.Email);
  const db = firebase.firestore();
  let search_trans = db.collection("History").doc(`${userCredentials.Email}`).collection(`${userCredentials.AccountNumber}`)
  search_trans.orderBy('Date', 'asc').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      found = ''
      found = doc.data().Transaction_ID
      // console.log(doc.data().Type)
      if (doc.data().Type == "Debit") {
        check = (look.value).toString()
        // console.log(look.value);
        if ((found == check || found.toString().startsWith(check) || (doc.data().Beneficiary.Beneficiary_Account).toString().startsWith(`${look.value}`) || (doc.data().Beneficiary.Beneficiary_Name).startsWith(`${look.value}`)) && look.value != '') {
          found_no = 1
          document.getElementById("search_loading").style.display = 'none'
          document.getElementById("search_failed").style.display = 'none'
          console.log(found_no);
          document.getElementsByClassName("search_tran_content")[0].innerHTML += `
              <div class="tran">
                <div class="info1">
                  <img style="width: 140px; height: 60px; border-radius: 10px;" src="${doc.data().Picture || './Images/Male_User.png'} " alt="">
                  <div class="info_1">
                    <p style= "width: 150px;">${doc.data().Type}</p>
                    <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
                  </div>
                </div>
                <div class="info2">
                ${doc.data().Type == "Credit" ? `<p style = "color: rgb(0, 187, 0);">+&#8358;${doc.data().Amount}</p>` : `<p style = "color: red;">-&#8358;${doc.data().Amount}</p>`}
                  
                  <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
                </div>
            </div>

                      `

        }
      } else if (doc.data().Type == "Credit") {
        check = (look.value).toString()
        if ((found == check || found.toString().startsWith(check) || (doc.data().Beneficiary.Sender_Account).toString().startsWith(`${look.value}`) || (doc.data().Beneficiary.Sender_Name).startsWith(`${look.value}`)) && look.value != '') {
          found_no = 1
          // console.log(found);
          document.getElementById("search_loading").style.display = 'none'
          document.getElementById("search_failed").style.display = 'none'
          console.log(found_no);
          document.getElementsByClassName("search_tran_content")[0].innerHTML += `
          <div class="tran">
            <div class="info1">
              <img style="width: 140px; height: 60px; border-radius: 10px;" src="${doc.data().Picture || './Images/Male_User.png'} " alt="">
              <div class="info_1">
                <p style= "width: 150px;">${doc.data().Type}</p>
                <p style="color: black; font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
              </div>
            </div>
            <div class="info2">
            ${doc.data().Type == "Credit" ? `<p style = "color: rgb(0, 187, 0);">+&#8358;${doc.data().Amount}</p>` : `<p style = "color: red;">-&#8358;${doc.data().Amount}</p>`}
              
              <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
            </div>
        </div>

                  `
        }

      } else if (doc.data().Type == "Airtime") {
        if ((found == check || found.toString().startsWith(check) || (doc.data().Beneficiary.Beneficiary_Account).toString().startsWith(check) || (doc.data().Beneficiary.Beneficiary_Name).startsWith(check)) && look.value != '') {
          found_no = 1;
          // console.log(found);
          document.getElementById("search_loading").style.display = 'none'
          document.getElementById("search_failed").style.display = 'none'
          console.log(found_no);

          document.getElementsByClassName("search_tran_content")[0].innerHTML += `
          <div class="tran">
            <div class="info1">
            
            ${doc.data().Beneficiary.Beneficiary_Name == "MTN" ? '<img style="width: 60px;" src="./Images/mtn.png" "alt="">' : doc.data().Beneficiary.Beneficiary_Name == "GLO" ? '<img style="width: 60px;" src="./Images/glo.png" "alt="">' : doc.data().Beneficiary.Beneficiary_Name == "9MOBILE" ? '<img style="width: 60px; height: 50px" src="./Images/9mobile.png" "alt="">' : doc.data().Beneficiary.Beneficiary_Name == "AIRTEL" ? '<img style="width: 60px;" src="./Images/airtel.png" "alt="">' : '<img style="width: 60px;" src="./Images/donated.png" "alt="">'}
              
              <div class="info_1">
                <p>${doc.data().Type}</p>
                <p style="color: rgb(148, 148, 148); font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
              </div>
            </div>
            <div class="info2">
              <p style = "color: red;">-&#8358;${doc.data().Amount}</p>
              <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
            </div>
        </div>
            `
        }
      } else if (doc.data().Type == "Donate") {
        check = (look.value).toString()
        if ((found == check || found.toString().startsWith(check) || (doc.data().Beneficiary.Beneficiary_Account).toString().startsWith(check) || (doc.data().Beneficiary.Beneficiary_Name).startsWith(check)) && look.value != '') {
          found_no = 1
          document.getElementById("search_loading").style.display = 'none'
          document.getElementById("search_failed").style.display = 'none'
          console.log(found_no);
          document.getElementsByClassName("search_tran_content")[0].innerHTML += `
            <div class="tran">
            <div class="info1">
              <img style="width: 60px;" src="./Images/donated.png"} " alt="">
              <div class="info_1">
                <p>${doc.data().Type}</p>
                <p style="color: rgb(148, 148, 148); font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
              </div>
            </div>
            <div class="info2">
              <p style = "color: red;">-&#8358;${doc.data().Amount}</p>
              <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
            </div>
        </div>
            `

        }
      } else if (doc.data().Type == "Card") {
        check = (look.value).toString()
        if ((found == check || found.toString().startsWith(check) || (doc.data().Card_Details.Card_Name).toString().startsWith(check) || (doc.data().Card_Details.Card_Number).startsWith(check)) && look.value != '') {
          found_no = 1;
          document.getElementById("search_loading").style.display = 'none'
          document.getElementById("search_failed").style.display = 'none'
          console.log(found_no);
          document.getElementsByClassName("search_tran_content")[0].innerHTML += `
            <div class="tran">
              <div class="info1">
              
              <img style="width: 120px; height: 40px; border-radius: 10px;" src="./Images/card-design1.png" alt="">
                
                <div class="info_1">
                  <p>${doc.data().Type}</p>
                  <p style="color: rgb(148, 148, 148); font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
                </div>
              </div>
              <div class="info2">
                <p style = "color: red;">-&#8358;${doc.data().Amount}</p>
                <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
              </div>
          </div>
              `
        }
      } else if (doc.data().Type == "Account Funding") {
        check = (look.value).toString()
        if ((found == check || found.toString().startsWith(check) || (doc.data().Beneficiary.Sender_Account).toString().startsWith(check) || (doc.data().Beneficiary.Sender_Name).startsWith(check)) && look.value != '') {
          found_no = 1;
          document.getElementById("search_loading").style.display = 'none'
          document.getElementById("search_failed").style.display = 'none'
          console.log(found_no);
          document.getElementsByClassName("search_tran_content")[0].innerHTML += `
            <div class="tran">
              <div class="info1">
              
              <img style="width: 140px; height: 60px; border-radius: 10px;" src="./Images/fund.png" alt="">
                
                <div class="info_1">
                  <p style = "width: 200px;">${doc.data().Type}</p>
                  <p style="color: rgb(148, 148, 148); font-size: 12px;">${doc.data().Date} by ${doc.data().Time}</p>
                </div>
              </div>
              <div class="info2">
                <p style = "color: rgb(0, 187, 0);">+&#8358;${doc.data().Amount}</p>
                <p style="background-color: rgba(0, 128, 0, 0.722); border-radius: 5px; font-size: 10px; padding: 5px; color: white;">Completed</p>
              </div>
          </div>
              `
        }
      }
    });
    if (found_no == 0) {
      console.log(found_no);
      document.getElementById("search_loading").style = 'display: none;'
      document.getElementById("search_failed").style = 'display: flex; margin: auto;'
    }

  })
}

let next_box = 0
function next() {
  let pins = document.getElementsByClassName("pins")[0]
  let in_ar = pins.childNodes
  next_box == 3 ? next_box = 0 : document.getElementsByClassName("input_pins")[next_box += 1].focus();
}


function confirm_disabled() {
  document.getElementById("cpin_").disabled = false
  confirm_pin()
}

function confirm_pin() {
  document.getElementById("matchPin").innerHTML = "Pins must match"
  document.getElementById("pin_").value == document.getElementById("cpin_").value ? document.getElementById("matchPin").style = "opacity: 0; transition: all 300ms ease" : document.getElementById("matchPin").style = "opacity: 1; transition: all 300ms ease"
  document.getElementById("pin_").value == document.getElementById("cpin_").value ? document.getElementById("update_user_btn").disabled = false : document.getElementById("update_user_btn").disabled = true
  document.getElementById("pin_").value == document.getElementById("cpin_").value ? document.getElementById("update_user_btn").style = "background-color: #eb7824;" : document.getElementById("update_user_btn").style = "background-color: rgb(163, 163, 163);"
}

let user_pin = ''
let transaction_type

function authenticate_tran(x) {
  document.body.style = "overflow: hidden;";
  transaction_type = x
  window.scrollTo(0, 0)
  if (x == 'card') {
    add_card()
  } else if (x == 'send') {
    sendFunds()
  } else if (x == 'donate') {
    donate_funds()
  } else if (x == 'ben_send') {
    beneficiary_send()

  } else {
    proceed()
  }
}

function proceed() {

  document.getElementsByClassName("input_pins")[0].style = "border: 1px solid black;"
  document.getElementsByClassName("input_pins")[1].style = "border: 1px solid black;"
  document.getElementsByClassName("input_pins")[2].style = "border: 1px solid black;"
  document.getElementsByClassName("input_pins")[3].style = "border: 1px solid black;"


  main.style = "filter : brightness(0.5);";
  document.body.style = "overflow: hidden;";
  main.style.pointerEvents = "none";
  document.getElementById("modal4").style.display = "none"
  document.getElementById("tran_pin").style.display = "flex"
  mode == "dark" ? dark() : light();
}

function tran_type_trigger() {
  user_pin = ''

  for (let pin = 0; pin < 4; pin++) {
    user_pin += document.getElementsByClassName("input_pins")[pin].value
  }

  if (userCredentials.Pin == undefined || userCredentials.Pin == null || userCredentials.Pin == '') {
    alert("Set a Transaction Pin First")
    close_()
    Account_()
    window.scrollTo(0, 1300)
  }

  if (user_pin == userCredentials.Pin && userCredentials.Pin != '') {
    document.getElementsByClassName("input_pins")[1].style = "border: 1.5px solid rgb(0, 185, 0);"
    document.getElementsByClassName("input_pins")[0].style = "border: 1.5px solid rgb(0, 185, 0);"
    document.getElementsByClassName("input_pins")[2].style = "border: 1.5px solid rgb(0, 185, 0);"
    document.getElementsByClassName("input_pins")[3].style = "border: 1.5px solid rgb(0, 185, 0);"
    document.getElementsByClassName("input_pins")[0].style.transition = "all 200ms ease-in-out"
    document.getElementsByClassName("input_pins")[1].style.transition = "all 200ms ease-in-out"
    document.getElementsByClassName("input_pins")[2].style.transition = "all 200ms ease-in-out"
    document.getElementsByClassName("input_pins")[3].style.transition = "all 200ms ease-in-out"

    if (transaction_type == 'card') {
      save_card()
      // add_card()
      close_()

    } else if (transaction_type == 'airtime') {
      window.scrollTo(0, 0)
      modal1.style.display = 'flex';
      document.getElementById("tran_pin").style.display = "none"
      aitime_msg.innerHTML = `Recharge ${mobile_number.value} with &#8358;${airtime_amount.value} ?`
      main.style = "filter : brightness(0.5)";
      main.style.pointerEvents = "none";
      mode == "dark" ? dark() : light()
    } else if (transaction_type == 'donate') {
      document.getElementById("donate_btn").disabled = true
      document.getElementById("donate_btn").style.transition = "all 300ms ease"
      document.getElementById("donate_btn").innerHTML = "processing..."
      document.getElementById("donate_btn").style.background = "grey"

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
          close_()

          load_transaction()
          GetUser()
          donate_amount.value = ''
          foundation_id.value = ''
          foundation_name.value = ''
          donate_method[0].selected = true
          console.log("Document successfully updated!");
          document.getElementById("donate_btn").disabled = false
          document.getElementById("donate_btn").innerHTML = "Donate"
          document.getElementById("donate_btn").style.background = "#eb7824"
          document.getElementById("tran_pin").style.display = "none"

        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else if (transaction_type == 'send') {
      // console.log("Forward");
      userCredentials.Balance -= send_amount.value;

      document.getElementById("send_funds_btn").disabled = true
      document.getElementById("send_funds_btn").innerHTML = "processing..."
      document.getElementById("send_funds_btn").style.background = "grey"
      document.getElementById("send_funds_btn").style.transition = "all 300ms ease"
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
          Create_History("Debit", receiver_name.value, receiver_acct.value, Number(send_amount.value))
          GetUser()
          creditAccount(send_amount.value)
          load_transaction()
          window.scrollTo(0, 0)
          modal2.style.display = "flex"
          send_msg.innerHTML = `Do you want to add ${receiver_name.value} as your beneficiary?`
          sucess_mg.innerHTML = `&#8358;${send_amount.value} Sent`
          main.style = "filter : brightness(0.5)";
          main.style.pointerEvents = "none";
          mode == "dark" ? dark() : light()
          console.log("Document successfully updated!");
          let creditInterval = setInterval(() => {
            receiver_acct.value = ''
            receiver_name.value = ''
            send_amount.value = ''
            clearInterval(creditInterval)
          }, 2000)
          document.getElementById("send_funds_btn").disabled = false
          document.getElementById("send_funds_btn").innerHTML = "Send"
          document.getElementById("send_funds_btn").style.background = "#eb7824"
          document.getElementById("tran_pin").style.display = "none"

        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else if (transaction_type == 'ben_send') {
      document.getElementById("beneficiary_send_btn").disabled = true
      document.getElementById("beneficiary_send_btn").innerHTML = "processing..."
      document.getElementById("beneficiary_send_btn").style.background = "grey"
      document.getElementById("beneficiary_send_btn").style.fontSize = "12px"

      userCredentials.Balance -= beneficiarySendAmount.value;

      const db = firebase.firestore();
      var UserUpdate = db.collection("Users").doc(`${userCredentials.Email}`);

      // Set the "capital" field of the city 'DC'
      return UserUpdate.update({
        Balance: userCredentials.Balance,
        Spent: userCredentials.Spent + Number(beneficiarySendAmount.value),

      })
        .then(() => {
          alert("Funds Sent")

          const db = firebase.firestore();
          db.collection("Users").get().then((querySnapshot) => {
            // querySnapshot.forEach((doc) => {
            //     doc.data().AccountNumber == receiver_acct.value ? receiver_name.value = doc.data().Name : receiver_name.value = "NA";
            //     doc.data().AccountNumber == receiver_acct.value ? return : '';
            // });
            for (let i = 0; i < querySnapshot._delegate.docs.length; i++) {
              if (querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.AccountNumber.stringValue == bene_details.textContent.slice(-10)) {
                // receiver_name.value = querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.Name.stringValue;
                receiverEmail = querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.Email.stringValue
                receiverPicture = querySnapshot._delegate.docs[i]._document.data.value.mapValue.fields.ProfilePicture.stringValue
                // console.log(receiverPicture);
                break
              } else {
                receiver_name.value = "NA";
                receiverEmail = ''
              }
            }
          });


          let setInt = setInterval(() => {
            Create_History("Debit", bene_details.textContent.slice(0, -10), bene_details.textContent.slice(-10), beneficiarySendAmount.value, receiverPicture)
            load_transaction()
            GetUser()
            creditAccount2(beneficiarySendAmount.value)
            beneficiarySendAmount.value = ''
            document.getElementById("beneficiary_send_btn").disabled = false
            document.getElementById("beneficiary_send_btn").innerHTML = "Send"
            document.getElementById("beneficiary_send_btn").style.background = "#eb7824"
            clearInterval(setInt)
            close_()

          }, 2000);

        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

    }
  } else {
    document.getElementsByClassName("input_pins")[0].style = "border: 1.5px solid red;"
    document.getElementsByClassName("input_pins")[1].style = "border: 1.5px solid red;"
    document.getElementsByClassName("input_pins")[2].style = "border: 1.5px solid red;"
    document.getElementsByClassName("input_pins")[3].style = "border: 1.5px solid red;"
    document.getElementsByClassName("input_pins")[0].style.transition = "all 200ms ease-in-out"
    document.getElementsByClassName("input_pins")[1].style.transition = "all 200ms ease-in-out"
    document.getElementsByClassName("input_pins")[2].style.transition = "all 200ms ease-in-out"
    document.getElementsByClassName("input_pins")[3].style.transition = "all 200ms ease-in-out"
  }

}

function savePage() {
  var divContents = document.getElementById("pdf").innerHTML;
  var a = window.open('', '', 'height=400, width=800');
  a.document.write('<html>');
  a.document.write(divContents);
  a.document.write('</body></html>');
  a.print();
  a.document.close();
  window.close()
  close_()
  // window.print()
}

function print_tran(x) {
  // console.log(x);
  const db = firebase.firestore();
  let root = db.collection("History").doc(userCredentials.Email).collection(userCredentials.AccountNumber)
  root.where("Transaction_ID", "==", x)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        document.getElementById('pdf_amount').innerHTML = doc.data().Amount
        doc.data().Type != 'Card' ? document.getElementById('pdf_ben').innerHTML = doc.data().Beneficiary.Beneficiary_Name || doc.data().Beneficiary.Beneficiary_Account || userCredentials.Name : 'NA'
        doc.data().Type != 'Card' ? document.getElementById('pdf_sender').innerHTML = doc.data().Beneficiary.Sender_Name || userCredentials.Name : document.getElementById('pdf_sender').innerHTML = 'NA'
        doc.data().Type != 'Card' ? document.getElementById('pdf_acct').innerHTML = doc.data().Beneficiary.Beneficiary_Account || userCredentials.AccountNumber : document.getElementById('pdf_acct').innerHTML = 'NA'
        document.getElementById('pdf_type').innerHTML = doc.data().Type
        document.getElementById('pdf_id').innerHTML = doc.data().Transaction_ID;
        document.getElementById('pdf_date').innerHTML = doc.data().Date;
        document.getElementById('pdf').style.display = 'flex'
        main.style = "filter : brightness(0.5);";
        document.body.style = "overflow: hidden;";
        main.style.pointerEvents = "none";
        mode == "dark" ? dark() : light()
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

