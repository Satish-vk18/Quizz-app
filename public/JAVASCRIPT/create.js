let questionCount = 0;

function addQuestion() {
  if (questionCount >= 10) {
    alert("Maximum 10 questions allowed.");
    return;
  }

  const container = document.getElementById('questionsContainer');
  const qId = `q${questionCount}`;

  const block = document.createElement('div');
  block.className = 'question-block';
  block.innerHTML = `
    <h3>Question ${questionCount + 1}</h3>
    <input type="text" id="${qId}-text" placeholder="Enter question text" required>
    <input type="text" id="${qId}-opt0" placeholder="Option 1">
    <input type="text" id="${qId}-opt1" placeholder="Option 2">
    <input type="text" id="${qId}-opt2" placeholder="Option 3">
    <input type="text" id="${qId}-opt3" placeholder="Option 4">
    <label>Correct Option (0-3):</label>
    <input type="number" id="${qId}-correct" min="0" max="3">
  `;

  container.appendChild(block);
  questionCount++;
}

function saveQuiz() {
  const title = document.getElementById('quizTitle').value;
  const description = document.getElementById('quizDescription').value;

  if (!title || !description) {
    alert("Title and description are required!");
    return;
  }

  const questions = [];

  for (let i = 0; i < questionCount; i++) {
    const text = document.getElementById(`q${i}-text`).value;
    const options = [
      document.getElementById(`q${i}-opt0`).value,
      document.getElementById(`q${i}-opt1`).value,
      document.getElementById(`q${i}-opt2`).value,
      document.getElementById(`q${i}-opt3`).value,
    ];
    const correct = parseInt(document.getElementById(`q${i}-correct`).value);

    if (!text || options.some(opt => !opt) || isNaN(correct) || correct < 0 || correct > 3) {
      alert(`Please complete all fields for question ${i + 1}`);
      return;
    }

    questions.push({ questionText: text, options, correctOptionIndex: correct });
  }

  const quiz = {
    title,
    description,
    questions,
    savedAt: new Date().toLocaleString()
  };

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('quizzes') || '[]');
  existing.push(quiz);
  localStorage.setItem('quizzes', JSON.stringify(existing));

  alert("Quiz saved successfully!");
  renderSavedQuizzes();
}

function renderSavedQuizzes() {
  const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  const container = document.getElementById('savedQuizzes');
  container.innerHTML = '';

  quizzes.forEach((quiz, index) => {
    const div = document.createElement('div');
    div.className = 'quiz-summary';
    div.innerHTML = `
      <h3>${quiz.title}</h3>
      <p>${quiz.description}</p>
      <p><strong>Saved:</strong> ${quiz.savedAt}</p>
      <button onclick="alert('Questions: ${quiz.questions.length}')">View</button>
    `;
    container.appendChild(div);
  });
}

renderSavedQuizzes();
