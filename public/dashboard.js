let title_ = document.getElementById("title_")
let dp = document.getElementById("dp")
let donated = document.getElementById("donated")
let points = document.getElementById("points")
let bonus = document.getElementById("bonus")
let Spent = document.getElementById("Spent")
balance = document.getElementById("balance")
let UserId
let UserDetails
let hideBal = false

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
    // ...
    UserId = user.Id
    console.log(user.uid);
    title_.innerHTML = `Welcome ${user.displayName}`;


    const db = firebase.firestore();
    var docRef = db.collection("Users").doc(user.email);

    docRef.get().then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        localStorage.setItem("User Details", JSON.stringify({"Balance":(doc.data().Balance), "ProfilePic":doc.data().ProfilePicture}));
        UserDetails = JSON.parse(localStorage.getItem("User Details"))
        console.log(UserDetails.ProfilePic);
        dp.style.backgroundImage = `url('${UserDetails.ProfilePic}')`;
        // console.log(`url('${UserDetails.ProfilePic}')`);
        // bal = doc.data().Balance
        balance.innerHTML = `Balance: &#8358; ${UserDetails.Balance}.00 <img id="privacy" onclick="acct_privacy()" width="20" src="./Images/hide.png" alt="">`;

        // dp.src = doc.data().ProfilePicture
        // console.log(doc.data().ProfilePicture);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    // dp.src = ;
    // console.log(UserId);
  } else {
    // User is signed out
    window.location.href = "login.html"
  }
});

function acct_privacy() {
  hideBal == false ? hideBal = true : hideBal = false
  hideBal == false ? balance.innerHTML = `&#8358; ${UserDetails.Balance}.00 <img id="privacy" onclick="acct_privacy()" width="20" src="./Images/hide.png" alt="">`
  : balance.innerHTML = `&#8358; ***.** <img id="privacy" onclick="acct_privacy()" width="20" src="./Images/show.png" alt="">`;

  hideBal == false ? donated.innerHTML = `&#8358; 00.00 Donated`
  : donated.innerHTML = `&#8358; ***.** Donated`;

  hideBal == false ? bonus.innerHTML = `&#8358; 00.00 Bonus received`
  : bonus.innerHTML = `&#8358; ***.** Bonus received`;

  hideBal == false ? points.innerHTML = `5pts Earned`
  : points.innerHTML = `***.** Earned`;

  hideBal == false ? Spent.innerHTML = `&#8358; 00.00 Spent`
  : Spent.innerHTML = `&#8358; ***.** Spent`;
}



