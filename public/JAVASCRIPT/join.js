  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getFirestore , getDoc, setDoc , doc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
  
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
  
  const db = getFirestore(app);


let questions = [];
let current = 0;
let score = 0;
let correctAnswers = 0;
let totalTime = 0;
let timer;
let startTime;

const questionBox = document.getElementById('question');
const optionsList = document.getElementById('options');
const timerDisplay = document.getElementById('timer');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');

async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  const data = await res.json();
  questions = data.results.map(q => {
    const options = [...q.incorrect_answers];
    const correctIndex = Math.floor(Math.random() * 4);
    options.splice(correctIndex, 0, q.correct_answer);
    return {
      question: q.question,
      options: options,
      correct: q.correct_answer
    };
  });
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  startTime = Date.now();

  const q = questions[current];
  questionBox.innerHTML = `Q${current + 1}: ${q.question}`;
  optionsList.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${opt}"> ${opt}
      </label>
    `;
    optionsList.appendChild(li);
  });

  submitBtn.disabled = false;
  nextBtn.disabled = true;

  let timeLeft = 60;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitAnswer(); // auto submit on timeout
    }
  }, 1000);
}

submitBtn.addEventListener('click', submitAnswer);

function submitAnswer() {
  clearInterval(timer);
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    const answer = selected.value;
    if (answer === questions[current].correct) {
      score++;
      correctAnswers++;
    }
  }
  totalTime += Math.floor((Date.now() - startTime) / 1000);
  submitBtn.disabled = true;
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById('question-box').classList.add('hidden');
  document.querySelector('.buttons').classList.add('hidden');
  resultBox.classList.remove('hidden');
  const accuracy = ((correctAnswers / questions.length) * 100).toFixed(2);
  const avgTime = (totalTime / questions.length).toFixed(2);
  resultBox.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Score: ${score} / ${questions.length}</p>
    <p>Accuracy: ${accuracy}%</p>
    <p>Average Time per Question: ${avgTime}s</p>
  `;

  // Step 4: Example usage
//   const runExample = async () => {
    const userId = localStorage.getItem("logInUserId");;
    const ScoreData = {
      score : score,
      Accuracy : accuracy,
      Speed : avgTime,
    };
    saveUserData(userId, ScoreData); // Save
    getUserData(userId) , ScoreData;           // Retrieve
  };
  
//   runExample();
// }
const exitbtn = document.getElementById("exitjoinbtn")
  exitbtn.addEventListener("click", function (){
    const res = confirm("Do You want Exit from Quizz")
    if(res){
        window.location.href = "../HTML/optional.html"
    }
  })
const restartbtn = document.getElementById("restartbtn")
    restartbtn.addEventListener("click", function (){
        const res = confirm("Do You really want restart Quiz ?")
        if(res) {
            window.location.href = "../HTML/join.html"
        }
    })

fetchQuestions();


// Step 2: Function to save user data
const saveUserData = async (userId, ScoreData) => {
    try {
      await setDoc(doc(db, "ScoreDetails", userId), ScoreData);
      console.log("User data saved!");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };
  
  // Step 3: Function to retrieve user data
  const getUserData = async (userId) => {
    try {
      const userRef = doc(db, "ScoreDetailes", userId);
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        console.log(" User data retrieved:", docSnap.data());
        return docSnap.data();
      } else {
        console.log(" No user data found!");
        return null;
      }
    } catch (error) {
      console.error(" Error getting user data:", error);
    }
  };
  
  export default db;
  

