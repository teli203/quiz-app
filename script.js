const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What is the primary programming language supported by Amazon Web Services (AWS)?",
    answers: [
      { text: "Java", correct: true },
      { text: "Ruby", correct: false },
      { text: "Python", correct: false },
      { text: "PHP", correct: false },
    ],
  },
  {
    question: "What cloud provider is known for its serverless computing service called Azure?",
    answers: [
      { text: "Microsoft", correct: true },
      { text: "AWS", correct: false },
      { text: "IBM", correct: false },
      { text: "GCP", correct: false },
    ],
  },
  {
    question: "What container orchestration service is provided bt Google Cloud platform?",
    answers: [
      { text: "Azure Kubernetes Service (AKS)", correct: false },
      { text: "Amazon Elastic Kubernetes Service", correct: false },
      { text: "Google Kubernetes Engine (GKE)", correct: true },
      { text: "IBM Kubernetes Service", correct: false },
    ],
  },
  {
    question: "Which cloud provider is associated with the slogan 'The Intelligent Cloud'?",
    answers: [
      { text: "Oracle", correct: false },
      { text: "AWS", correct: false },
      { text: "Microsoft Azure", correct: true },
      { text: "Alibaba", correct: false },
    ],
  },
  {
    question: "What is the name of the object storage offered by AWS?",
    answers: [
      { text: "Amazon S3", correct: true },
      { text: "Cloud Data Buckets", correct: false },
      { text: "GKE Object Containers", correct: false },
      { text: "Google Java Storage", correct: false },
    ],
  },
  {
    question: "Which cloud provider is known for its area of expertise in AI and Machine services?",
    answers: [
      { text: "Azure", correct: false },
      { text: "Ruby", correct: false },
      { text: "IBM", correct: false },
      { text: "AWS", correct: true },
    ],
  },
  {
    question: "What networking service is provided by Google Cloud Platform for connecting on-premises networks to Google infrastructure?",
    answers: [
      { text: "Google Public Cloud", correct: false },
      { text: "Google Virtual Private Cloud", correct: true },
      { text: "Google Infrastructer RoBot", correct: false },
      { text: "Google Search", correct: false },
    ],
  },
  {
    question: "Which cloud provider is associated with the term 'Elastic Load Balancer'?",
    answers: [
      { text: "IBM", correct: false },
      { text: "Google", correct: false },
      { text: "AWS", correct: true },
      { text: "PHP", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");        /* bringing back the next btn */
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}