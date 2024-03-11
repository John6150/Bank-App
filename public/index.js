// let login_ = document.getElementById("login")



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
//   const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();


function login_(){
    window.location.href = "login.html"
}
function logon(){
    window.location.href = "logon.html"
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    // var uid = user.uid;
    window.location.href = "dashboard.html"
    // ...
  } else {
    // User is signed out
    // ...
  }
});