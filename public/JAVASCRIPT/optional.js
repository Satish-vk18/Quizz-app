  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth , signOut , onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js'
  import { getFirestore , getDoc , doc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
  
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
    const db = getFirestore();
    
    onAuthStateChanged(auth , (user)=>{
        const logInUserId = localStorage.getItem("logInUserId");
        if(logInUserId){
            const docRef = doc(db , "users" , logInUserId)
            getDoc(docRef).then((doc) =>{
                if(doc.exists()){
                    const user = doc.data();
                    document.getElementById("welcomeUser").innerHTML = user?.userName;
                }
            })
        }
    })
    export {db};