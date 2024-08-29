let dp = document.getElementById('dp')


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

  function Account_2(){
    window.location.href = "home.html"
    // Account_();
<<<<<<< HEAD
  }

  function abt_vid(){
    document.getElementsByClassName('abt_video')[0].style.pointerEvents = "all"
    document.getElementsByClassName('abt_video')[0].style.opacity = "1"
    document.getElementsByClassName('abt_video')[0].style.transition = "all 300ms ease-in"
    let main = document.getElementsByClassName('carousel')[0];
    document.getElementsByTagName('body')[0].style = "overflow: hidden";
    main.style =  "filter: brightness(0.4) blur(1px);"
    main.style.pointerEvents= "none";
    window.scroll ({top:0, behavior:"smooth"});
    let vid = document.getElementById('abt_vids')
      vid.play()
  }
  function close_(){
    document.getElementsByClassName('abt_video')[0].style.opacity = "0"
    document.getElementsByClassName('abt_video')[0].style.pointerEvents = "none"
    document.getElementsByClassName('abt_video')[0].style.transition = "all 300ms ease-in"
    let vid = document.getElementById('abt_vids')
    vid.pause()
  
    let main = document.getElementsByClassName('carousel')[0];
    document.getElementsByTagName('body')[0].style = "overflow: scroll";
    // main.style =  "filter: brightness(0.2)"
    main.style = "filter : brightness(1);";
    main.style.pointerEvents= "all";
  }
  
  function forward_() {
    document.getElementsByClassName('char_car_content')[0].style = 'transform: translate(-800px, 0px); transition: all 500ms ease'
    document.getElementsByClassName('slide_btn1')[0].style = "background-color: grey"
    document.getElementsByClassName('slide_btn2')[0].style = "background-color: #162136f4"
  }
  
  function backward_() {
    
    document.getElementsByClassName('slide_btn1')[0].style = "background-color: #162136f4"
    document.getElementsByClassName('char_car_content')[0].style = 'transform: translate(0px, 0px); transition: all 500ms ease'
    document.getElementsByClassName('slide_btn2')[0].style = "background-color: grey"  
  }
  
  document.getElementsByClassName('review_vid')[0].addEventListener('mouseover', ()=>{
    document.getElementsByClassName('review_vid')[0].play()
  })
  document.getElementsByClassName('review_vid')[0].addEventListener('mouseout', ()=>{
    document.getElementsByClassName('review_vid')[0].pause()
  })
  document.getElementsByClassName('review_vid')[1].addEventListener('mouseover', ()=>{
    document.getElementsByClassName('review_vid')[1].play()
  })
  document.getElementsByClassName('review_vid')[1].addEventListener('mouseout', ()=>{
    document.getElementsByClassName('review_vid')[1].pause()
  })
  document.getElementsByClassName('review_vid')[2].addEventListener('mouseover', ()=>{
    document.getElementsByClassName('review_vid')[2].play()
  })
  document.getElementsByClassName('review_vid')[2].addEventListener('mouseout', ()=>{
    document.getElementsByClassName('review_vid')[2].pause()
  })
  
=======
  }
>>>>>>> 0ffd2663da87c94a8a8b1ed1bd9b74bee2451bb9
