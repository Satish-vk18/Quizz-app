  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getFirestore , getDoc,  doc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
  
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      // apiKey: "AIzaSyDbGshP3oEP_MDVyVG0hBnWsqVm95TdFj0",
      authDomain: "quizz-login-46241.firebaseapp.com",
      projectId: "quizz-login-46241",
      storageBucket: "quizz-login-46241.firebasestorage.app",
      messagingSenderId: "676761941723",
      appId: "1:676761941723:web:f44082681fb89531d07efe"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  
    const db = getFirestore(app);

const userId = localStorage.getItem("logInUserId");

const score = document.getElementById("score")
const accuracy = document.getElementById("accuracy")
const speed = document.getElementById("speed")
score.innerText = 0;
accuracy.innerHTML = 0;
speed.innerHTML = 0;



const getUserData = async (userId) => {
  try {
    const docRef = doc(db, "ScoreDetails", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    //   console.log("User Data:", docSnap.data());
      const data = docSnap.data();
      console.log(data);
      score.innerText = data.score;
      accuracy.innerHTML = data.Accuracy;
      speed.innerHTML = data.Speed;

    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
};
getUserData(userId);

const exitBtn = document.getElementById("Exit-btn")
exitBtn.addEventListener("click", ()=> {
    window.location.href = "../HTML/optional.html"
})










