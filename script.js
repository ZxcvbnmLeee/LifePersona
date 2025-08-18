console.log("Script loaded!");

// Your Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyCu7P_RDUrwtMSX6CbbXBOkDuBnnKUFxIkJ7Ez7is-kEocfMVgG3XxegOrwGVuwdUx/exec";

/* ---------- State Flags ---------- */
let quizResultsSent = false;         // Prevent sending quiz results twice
let contactFormSent = false;         // Prevent sending contact form twice
let resultType = "";                 // Stores final quiz persona

/* ---------- Simple page show/hide ---------- */
function showPage(id) {
  ["home", "intro-page", "quiz-page", "contact-page", "result-page"].forEach(p => {
    const el = document.getElementById(p);
    if (el) el.style.display = p === id ? "block" : "none";
  });
}

/* ---------- QUIZ ---------- */
let currentQuestionIndex = 0;
let captainbackup1 = 0, whynotwanderer2 = 0, ultimatechillpill3 = 0;
let thefunnomad4 = 0, detectivedata5 = 0, lifestrategist6 = 0;
let walletwhisperer7 = 0, connectioncurator8 = 0;

const questions = [
    // QUESTION 1
    {
      question:
        "You've been planning a project for months, but an unexpected change forces you to alter your plan. What will you do next?",
      choices: [
        "Make a backup plan on the spot",
        "Call someone I trust",
        "Go with the flow",
        "Panic for 2 mins, then decide",
      ],
      weights: [
        { captainbackup1: +1, detectivedata5: +1 },
        { connectioncurator8: +1, whynotwanderer2: +1 },
        { whynotwanderer2: +1, ultimatechillpill3: +1 },
        { thefunnomad4: +1, lifestrategist6: +1 },
      ],
    },
    // QUESTION 2
    {
      question: "Which one feels most like 'security' to you?",
      choices: [
        "A big fat savings account",
        "Friends who pick me up (and feed me)",
        "A life plan that looks like IKEA instructions",
        "The ability to eat carbs without guilt",
      ],
      weights: [
        { captainbackup1: +1, walletwhisperer7: +1 },
        { connectioncurator8: +1, ultimatechillpill3: +1 },
        { lifestrategist6: +1, detectivedata5: +1 },
        { thefunnomad4: +1, whynotwanderer2: +1 },
      ],
    },
    // QUESTION 3
    {
      question: "Life throws you a plot twist. What's your first reaction?",
      choices: [
        "Open 47 browser tabs (Google is my friend)",
        "Mum... you free?",
        "Eh, I'll freestyle it",
        "Pretend nothing happened",
      ],
      weights: [
        { captainbackup1: +1, detectivedata5: +1 },
        { connectioncurator8: +1, ultimatechillpill3: +1 },
        { whynotwanderer2: +1, thefunnomad4: +1 },
        { ultimatechillpill3: +1, walletwhisperer7: +1 },
      ],
    },
    // QUESTION 4
    {
      question: "If you could pick ONE magic life power, what would you pick?",
      choices: [
        "100% healthy forever",
        "Infinite money (bye adulting)",
        "Calm mode unlocked",
        "Extra time to enjoy life",
      ],
      weights: [
        { captainbackup1: +1, lifestrategist6: +1 },
        { thefunnomad4: +1, walletwhisperer7: +1 },
        { ultimatechillpill3: +1, connectioncurator8: +1 },
        { thefunnomad4: +1, whynotwanderer2: +1 },
      ],
    },
    // QUESTION 5
    {
      question: "Your monthly spending style looks like...",
      choices: [
        "Only what's necessary",
        "Balanced spender (snacks + savings)",
        "Big spender on experiences",
        "I close my eyes and hope for the best",
      ],
      weights: [
        { captainbackup1: +1, walletwhisperer7: +1 },
        { lifestrategist6: +1, ultimatechillpill3: +1 },
        { whynotwanderer2: +1, thefunnomad4: +1 },
        { thefunnomad4: +1, connectioncurator8: +1 },
      ],
    },
    // QUESTION 6
    {
      question: "Whose advice do you trust most?",
      choices: [
        "A famous person on a TED Talk",
        "Family and friends",
        "Someone who shows clear proof",
        "I trust my own gut",
      ],
      weights: [
        { detectivedata5: +1, whynotwanderer2: +1 },
        { connectioncurator8: +1, ultimatechillpill3: +1 },
        { lifestrategist6: +1, captainbackup1: +1 },
        { thefunnomad4: +1, walletwhisperer7: +1 },
      ],
    },
    // QUESTION 7
    {
      question:
        "If life was a weather forecast, what do you do before the storm?",
      choices: [
        "Stock up & prepare like a survival drama hero",
        "Watch the news and wait",
        "Just stay home and chill",
        "Hope the storm skips my area",
      ],
      weights: [
        { captainbackup1: +1, walletwhisperer7: +1 },
        { detectivedata5: +1, lifestrategist6: +1 },
        { ultimatechillpill3: +1, connectioncurator8: +1 },
        { thefunnomad4: +1, whynotwanderer2: +1 },
      ],
    },
    // QUESTION 8
    {
      question:
        "You have to grab one thing in an emergency. Which do you choose?",
      choices: [
        "Important documents",
        "My emergency snack bag",
        "My favourite keepsake (My lucky souvenir)",
        "My phone/photos",
      ],
      weights: [
        { captainbackup1: +1, detectivedata5: +1 },
        { walletwhisperer7: +1, ultimatechillpill3: +1 },
        { connectioncurator8: +1, thefunnomad4: +1 },
        { thefunnomad4: +1, whynotwanderer2: +1 },
      ],
    },
    // QUESTION 9
    {
      question:
        "A wise merlion says: 'I can give you tips for a smoother future!' You... ",
      choices: [
        "Say 'Yes! Tell me more!'",
        "Ask 'What's the catch?'",
        "Smile and say no",
        "Only if it's short and fun",
      ],
      weights: [
        { captainbackup1: +1, detectivedata5: +1 },
        { lifestrategist6: +1, walletwhisperer7: +1 },
        { ultimatechillpill3: +1, whynotwanderer2: +1 },
        { thefunnomad4: +1, connectioncurator8: +1 },
      ],
    },
    // QUESTION 10
    {
      question: "What makes you feel happiest at the end of the day?",
      choices: [
        "Knowing I’ve planned for chaos",
        "Trying something new",
        "Time with people I care about",
        "Treating myself (Buying dessert with no regrets)",
      ],
      weights: [
        { captainbackup1: +1, lifestrategist6: +1 },
        { whynotwanderer2: +1, thefunnomad4: +1 },
        { connectioncurator8: +1, ultimatechillpill3: +1 },
        { thefunnomad4: +1, walletwhisperer7: +1 },
      ],
    },
  ];

function startQuiz() {
  console.log("Starting quiz…");

  // Reset scores & state
  currentQuestionIndex = 0;
  captainbackup1 = whynotwanderer2 = ultimatechillpill3 = 0;
  thefunnomad4 = detectivedata5 = lifestrategist6 = 0;
  walletwhisperer7 = connectioncurator8 = 0;
  quizResultsSent = false;
  resultType = "";

  displayCurrentQuestion();
}

function displayQuestionImage(questionIndex) {
  const imageURLs = [
    "./images/1_planner.png",
    "./images/2_security.png",
    "./images/3_life.png",
    "./images/4_magic.png",
    "./images/5_spending.png",
    "./images/6_advice.png",
    "./images/7_storm.png",
    "./images/8_emergency.png",
    "./images/9_future.png",
    "./images/10_happiness.png",
  ];
  const el = document.getElementById("question-image");
  if (el) el.src = imageURLs[questionIndex] || "";
}

function updateProgressBar() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  const bar = document.getElementById("progress-bar");
  if (bar) bar.style.width = progress + "%";
}

function displayCurrentQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showContactPage();
    return;
  }

  const q = questions[currentQuestionIndex];
  const qEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  if (!qEl || !choicesEl) return;

  qEl.textContent = q.question;
  choicesEl.innerHTML = "";

  updateProgressBar();
  displayQuestionImage(currentQuestionIndex);

  q.choices.forEach((text, idx) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("choice-button");
    btn.addEventListener("click", () => handleChoiceClick(idx));
    choicesEl.appendChild(btn);
  });
}

function handleChoiceClick(choiceIndex) {
  if (currentQuestionIndex >= questions.length) return; // Prevent double clicks

  const q = questions[currentQuestionIndex];
  const w = q.weights[choiceIndex] || {};

  captainbackup1 += w.captainbackup1 || 0;
  whynotwanderer2 += w.whynotwanderer2 || 0;
  ultimatechillpill3 += w.ultimatechillpill3 || 0;
  thefunnomad4 += w.thefunnomad4 || 0;
  detectivedata5 += w.detectivedata5 || 0;
  lifestrategist6 += w.lifestrategist6 || 0;
  walletwhisperer7 += w.walletwhisperer7 || 0;
  connectioncurator8 += w.connectioncurator8 || 0;

  currentQuestionIndex++;
  displayCurrentQuestion();
}

function showContactPage() {
  console.log("Quiz completed! Showing contact page…");
  showPage("contact-page");
  setupContactForm();
}

function calculateAndDisplayResult() {
  console.log("Calculating result…");

  const scores = {
    captainbackup1,
    whynotwanderer2,
    ultimatechillpill3,
    thefunnomad4,
    detectivedata5,
    lifestrategist6,
    walletwhisperer7,
    connectioncurator8,
  };

  let topPersona = null;
  let topScore = -Infinity;
  for (const k in scores) {
    if (scores[k] > topScore) {
      topScore = scores[k];
      topPersona = k;
    }
  }

  const personaMap = {
    captainbackup1: { image: "R1.png", type: "Captain Backup" },
    whynotwanderer2: { image: "R2.png", type: "The Why-Not Wanderer" },
    ultimatechillpill3: { image: "R3.png", type: "The Chill Pill" },
    thefunnomad4: { image: "R4.png", type: "The Fun Nomad" },
    detectivedata5: { image: "R5.png", type: "Detective Data" },
    lifestrategist6: { image: "R6.png", type: "The Life Strategist" },
    walletwhisperer7: { image: "R7.png", type: "Wallet Whisperer" },
    connectioncurator8: { image: "R8.png", type: "The Connection Curator" },
  };

  const { image, type } = personaMap[topPersona] || {
    image: "R1.png",
    type: "Captain Backup",
  };
  resultType = type;

  if (!quizResultsSent) {
    sendQuizResults();
    quizResultsSent = true;
  }

  const resultImageDiv = document.getElementById("result-image");
  if (resultImageDiv) {
    resultImageDiv.innerHTML = `<img src="./images/${image}" class="result-image" alt="Your Persona Result">`;
  }

  const resultTypeEl = document.getElementById("result-type");
  if (resultTypeEl) resultTypeEl.textContent = resultType;

  showPage("result-page");
}

function sendQuizResults() {
  const form = new FormData();
  form.append("resultType", resultType);
  form.append("captainbackup1", captainbackup1);
  form.append("whynotwanderer2", whynotwanderer2);
  form.append("ultimatechillpill3", ultimatechillpill3);
  form.append("thefunnomad4", thefunnomad4);
  form.append("detectivedata5", detectivedata5);
  form.append("lifestrategist6", lifestrategist6);
  form.append("walletwhisperer7", walletwhisperer7);
  form.append("connectioncurator8", connectioncurator8);
  form.append("submissionType", "quiz_results_only");
  form.append("interestedInInsurance", "false");
  form.append("timestamp", new Date().toISOString());

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: form,
  })
    .then((res) => res.text())
    .then((data) => console.log("Quiz results sent:", data))
    .catch((err) => console.error("Error sending quiz results:", err));
}

/* ---------- Contact Form ---------- */
function setupContactForm() {
  const form = document.getElementById("insurance-form");
  const messageDiv = document.getElementById("form-message");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Prevent double submission
    if (contactFormSent) return;

  const name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const phone = document.getElementById("user-phone").value.trim();
    const petTypeEl = document.querySelector('input[name="pet-type"]:checked');
    const petType = petTypeEl ? petTypeEl.value : "";

  const submittedEmails = JSON.parse(localStorage.getItem("submittedEmails") || "[]");
  const submittedPhones = JSON.parse(localStorage.getItem("submittedPhones") || "[]");


    // Already submitted? Stop here
    if (submittedEmails.includes(email) || submittedPhones.includes(phone)) {
      messageDiv.innerHTML = "You have already submitted your information. ✅";
      messageDiv.className = "success";
      return;
    }

    messageDiv.innerHTML = "Sending your information... 🐾";
    messageDiv.className = "";

    const fields = new URLSearchParams({
      name,
      email,
      phone,
      petType,              // send pet type too
      resultType,
      captainbackup1,
      whynotwanderer2,
      ultimatechillpill3,
      thefunnomad4,
      detectivedata5,
      lifestrategist6,
      walletwhisperer7,
      connectioncurator8,
      submissionType: "contact_form",
      interestedInInsurance: "true",
      contactedYet: "false",
      timestamp: new Date().toISOString(),
    });

    // Disable submit immediately to prevent multiple clicks
    contactFormSent = true;
    const submitBtn = document.getElementById("contact-submit");
    if (submitBtn) submitBtn.disabled = true;

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: fields,
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("Contact form response:", data);
        messageDiv.innerHTML = "Thank you! We'll contact you soon! 🎉";
        messageDiv.className = "success";

        // Save email & phone locally
        submittedEmails.push(email);
        submittedPhones.push(phone);
        localStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));
        localStorage.setItem("submittedPhones", JSON.stringify(submittedPhones));

        // Disable form fields
        Array.from(form.elements).forEach(el => el.disabled = true);
        if (submitBtn) submitBtn.textContent = "Submitted";

        // Show results after a short delay
        setTimeout(() => {
          window.calculateAndDisplayResult();
        }, 500);
      })
      .catch((err) => {
        console.error("Error sending contact form:", err);
        messageDiv.innerHTML = "Something went wrong. Please try again!";
        messageDiv.className = "error";
        contactFormSent = false; // allow retry if failed
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}

/* ---------- Wire up page flow ---------- */
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");

  // Home → Intro
  const btnIntro = document.getElementById("begin-intro");
  if (btnIntro) btnIntro.addEventListener("click", () => showPage("intro-page"));

  // Intro → Quiz
  const btnBegin = document.getElementById("begin-quiz");
  if (btnBegin)
    btnBegin.addEventListener("click", () => {
      showPage("quiz-page");
      startQuiz();
    });

  // Skip → results
  const skip = document.getElementById("skip-to-results");
  if (skip)
    skip.addEventListener("click", () => {
      if (typeof window.calculateAndDisplayResult === "function") {
        window.calculateAndDisplayResult();
      }
    });

  // Share button
  const shareButton = document.querySelector(".share-button");
  if (shareButton) {
    shareButton.addEventListener("click", function () {
      const shareData = {
        title: "AnimePersona",
        text: "I just found out my Persona! 🌟 Try it too!",
        url: window.location.href,
      };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert("Link copied to clipboard! Share it with your friends 🎉");
        });
      }
    });
  }
});

