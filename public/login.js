let pass = document.getElementById("pass")
let email = document.getElementById("email")
let privacy = document.getElementById("privacy")
let reg_ = []
let user


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

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();



function private() {
    pass.type == "password" ? privacy.src = "./Images/hide.png" : privacy.src = "./Images/show.png"
    pass.type == "password" ? pass.type = "text" : pass.type = "password"
}
function home() {
    window.location.href = "index.html"
}
function logon() {
    window.location.href = "logon.html"
}

function signin_() {
    if (!email.value || !pass.value) {
        alert("Sorry, fill in your details")
    } else {
        db.collection("Users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                reg_.push(doc.data().Email)
            });
            user = reg_.find((element) =>
                element == email.value
            )
            if (user) {
                firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
                    .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;
                        alert("Login Successful")
                        window.location.href = 'dashboard.html'
                    }).catch((error) => {
                        alert("Your password is incorrect")
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });
            } else {
                alert("User not found")
                window.location.href = 'logon.html'
            }
        })
    }
}

