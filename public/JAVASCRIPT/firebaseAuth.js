  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js'
import { getFirestore , setDoc , doc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDbGshP3oEP_MDVyVG0hBnWsqVm95TdFj0",
    authDomain: "quizz-login-46241.firebaseapp.com",
    projectId: "quizz-login-46241",
    storageBucket: "quizz-login-46241.firebasestorage.app",
    messagingSenderId: "676761941723",
    appId: "1:676761941723:web:f44082681fb89531d07efe"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  export const db = getFirestore(app);

  //getting input values from form for register account


const createAccountBtn = document.getElementById("create-btn");
createAccountBtn.addEventListener("click" ,(event) => {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;



    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      const userData = {
        userName : userName,
        email : email,
        password : password,
      }
      alert("Account Created successfully");
      const docRef = doc(db , "users" , user.uid)
      setDoc(docRef, userData).then(()=>{
        window.location.href = "../HTML/login.html"
      }).catch((err)=>{
        console.log(err)
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      if(errorCode == "auth/email-already-in-use"){
        alert("Email Already Existed")
      }
      else{
        alert("Enter correct Email or Password")
      }
    });
})

// login existed account using email and password

const loginAccountBtn = document.getElementById("login-btn");
loginAccountBtn.addEventListener("click" , function(event){
    event.preventDefault()
    const email = document.getElementById("Exist-email").value;
    const password = document.getElementById("Exist-password").value;
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Welcome : \n" + user?.email);
        localStorage.setItem("logInUserId", user.uid)
        window.location.href = "../HTML/optional.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      if(errorCode == "auth/invalid-credential"){
        alert("Invalid email/password ");
      }else{
        alert("Enter email/password")
      }
    });
})


// forget password and send password reset email

const forgetpass = document.getElementById("forgetpassBtn")
forgetpass.addEventListener("click" , function(event){
    event.preventDefault();
    const emailInput = document.getElementById("Exist-email").value;
    if(emailInput == ""){
        alert("Enter Email To reset Password")
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, emailInput )
    .then(() => {
        alert("A Password Reset Link has been sent to your Email")
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    })
})


