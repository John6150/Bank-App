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

function logout_(){
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
      const db = firebase.firestore();
      var docRef = db.collection("Users").doc(user.email);
  
      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          dp.style.backgroundImage = `url('${doc.data().ProfilePicture}')`;
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