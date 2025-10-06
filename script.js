console.log("Script loaded!");

// Your Apps Script Web App URL 
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzCxd_mZfg7Xzqj01RBaz5IpVFx9F_lNn0CP1ZyymDqNcZgBIcaAmchiTFGHIyytFBz/exec";

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
let thekiasuhero1 = 0, theyoloexplorer2 = 0, theshiokrelaxer3 = 0;
let steadylahseeker4 = 0, chopchopanalyst5 = 0, thebigbrainboss6 = 0;
let thehuatahsaver7 = 0, lobangking8 = 0;

const questions = [
    // STORY 1 - currentQuestionIndex = 0
    {
      question:
        "It’s a regular day in Singapore. The sun is blazing, and you’re craving your favourite hawker food.",
      choices: ["→"],
      weights: [{}],
    },
    // QUESTION 1
    {
      question:
        "You’re at a hawker centre, and your favourite stall has a super long queue. What do you do?",
      choices: [
        "Queue patiently, worth it.",
        "Skip the queue, try something else new!",
        "Grab whatever’s fastest; no time to waste.",
        "Ask your friend what they feel like eating, then go along with that.",
      ],
      weights: [
        { thekiasuhero1: +1 },
        { theyoloexplorer2: +1 },
        { chopchopanalyst5: +1 },
        { steadylahseeker4: +1 },
      ],
    },
    // STORY 2 - currentQuestionIndex = 2
    {
      question: "A few days later, everyone’s buzzing — a long weekend is coming up. You start thinking of how to spend it.",
      choices: ["→"],
      weights: [{}],
    },
    // QUESTION 2
    {
      question: "Long weekend is coming. What’s your plan?",
      choices: [
        "Restock, clean, get organised",
        "Book last-minute trip, why not",
        "Chill at home, binge shows, nap",
        "Gather friends/family for makan",
      ],
      weights: [
        { thebigbrainboss6: +1 },
        { theyoloexplorer2: +1 },
        { theshiokrelaxer3: +1 },
        { lobangking8: +1 },
      ],
    },
    // STORY 3 - currentQuestionIndex = 4
    {
      question: "Then, life throws you a little twist. You’ve been planning a big outing, but suddenly a curveball changes your plans. ",
      choices: ["Do you stick to the plan, or adapt quickly? That’s your money personality too."],
      weights: [{}],
    },
    // QUESTION 3
    {
      question: "You’ve been planning a big outing, but a surprise curveball changes your plans. What’s your move?",
      choices: [
        "Double down and prepare harder",
        "Take it as an adventure and adapt",
        "Stay calm — don’t overcomplicate things",
        "Trust that I’ll land on my feet, one way or another",
      ],
      weights: [
        { thekiasuhero1: +1 },
        { theyoloexplorer2: +1 },
        { steadylahseeker4: +1 },
        { theshiokrelaxer3: +1 },
      ],
    },
    // STORY 4 - currentQuestionIndex = 6
    {
      question:
        "Later that night, you finally get a breather. You look back and think about the little things that make you smile.",
      choices: ["“Enjoy the little things in life, for one day you may look back and realize they were the big things.” – Robert Brault"],
      weights: [{}],
    },
    // QUESTION 4
    {
      question: "Which of these moments feels most shiok to you?",
      choices: [
        "Finding a discount or freebie",
        "Seeing my investments or savings grow",
        "Finishing a to-do list efficiently",
        "Having nothing planned, just chill time",
      ],
      weights: [
        { lobangking8: +1 },
        { thebigbrainboss6: +0.5, thehuatahsaver7: +0.5 },
        { chopchopanalyst5: +1 },
        { theshiokrelaxer3: +1 },
      ],
    },
    // STORY 5 - currentQuestionIndex = 8
    {
      question:
        "Fast forward — it’s payday! The notification comes in, and your account balance looks fresh. ",
      choices: ["“A budget is telling your money where to go instead of wondering where it went.” – Dave Ramsey"],
      weights: [{}],
    },
    // QUESTION 5 (show tip bubble after this)
    {
      question: "It's payday! How do you usually spend?",
      choices: [
        "Save aggressively and don’t spend unless necessary",
        "Look for deals, hacks, and discounts everywhere",
        "Make calculated choices and optimise every dollar",
        "Invest, grow, and aim for the big picture",
      ],
      weights: [
        { thehuatahsaver7: +1 },
        { thebigbrainboss6: +1 },
        { steadylahseeker4: +1 },
        { lobangking8: +1 },
      ],
    },
    // STORY 6 - currentQuestionIndex = 10
    {
      question:
        "But just as quickly, life reminds you to expect the unexpected. There’s an emergency, and you only have time to grab one thing. ",
      choices: ["Emergencies don’t send invites — same with surprise expenses. Are you prepared?"],
      weights: [{}],
    },
    // QUESTION 6
    {
      question: "You have to grab one thing in an emergency. What do you choose?",
      choices: [
        "Important documents (passport, IC, certs)",
        "Snacks / water (cannot survive hungry)",
        "Family photos / mementos.",
        "Phone — lifeline for everything",
      ],
      weights: [
        { thekiasuhero1: +1 },
        { thehuatahsaver7: +1 },
        { lobangking8: +1 },
        { steadylahseeker4: +1 },
      ],
    },
    // STORY 7 - currentQuestionIndex = 12
    {
      question:
        "Life isn’t always smooth sailing. When stress hits, everyone has their own way of coping.",
      choices: ["The way you handle stress is often the way you handle money — calm, impulsive, or strategic."],
      weights: [{}],
    },
    // QUESTION 7 (show fact bubble after Qn)
    {
      question: "When life gets stressful, what do you do?",
      choices: [
        "Make a detailed plan and tackle things systematically",
        "Find a way to relax and recharge first",
        "Push harder, I can’t afford to lose out!",
        "Remind myself not everything needs to be perfect",
      ],
      weights: [
        { chopchopanalyst5: +1 },
        { theshiokrelaxer3: +1 },
        { thekiasuhero1: +1 },
        { steadylahseeker4: +1 },
      ],
    },
    // STORY 8 - currentQuestionIndex = 14
    {
      question:
        "Still, there’s always something that keeps you moving forward — that “why” behind your late nights, early mornings, and tough calls.",
      choices: ["Everyone has a “why” — and that “why” is usually what you’re really saving for"],
      weights: [{}],
    },
    // QUESTION 8 
    {
      question: "What keeps you going in life?",
      choices: [
        "Knowing I’m secure and stable",
        "Being the best or ahead of the curve",
        "Having fun and new experiences",
        "Enjoying the little comforts daily",
      ],
      weights: [
        { thehuatahsaver7: +1 },
        { thekiasuhero1: +1 },
        { theyoloexplorer2: +1 },
        { theshiokrelaxer3: +1 },
      ],
    },
    // STORY 9 - currentQuestionIndex = 16
    {
      question:
        "One evening, you find yourself staring out the window, wondering about the years ahead.",
      choices: ["Big goals take time — just like compounding savings, every step adds up."],
      weights: [{}],
    },
    // QUESTION 9 (secret bubble after Qn)
    {
      question: "When thinking about the next 5 years, what’s your approach?",
      choices: [
        "I want to be prepared for every possibility",
        "I’ll go with the flow and see where life takes me",
        "As long as I’m comfortable and happy, that’s enough",
        "I’ll stick to steady goals and keep it simple",
      ],
      weights: [
        { thekiasuhero1: +1 },
        { theyoloexplorer2: +1 },
        { theshiokrelaxer3: +1 },
        { steadylahseeker4: +1 },
      ],
    },
    // STORY 10 - currentQuestionIndex = 18
    {
      question:
        "Of course, big decisions will come (from career moves to buying your dream home to retirement.)",
      choices: ["The way you decide today shapes the freedom you'll have tomorrow."],
      weights: [{}],
    },
    // QUESTION 10
    {
      question: "How do you usually make life-changing choices?",
      choices: [
        "Research, compare, and calculate carefully",
        "Follow gut feeling or intuition",
        "Talk it through with trusted people",
        "Think long-term strategy and impact",
      ],
      weights: [
        { chopchopanalyst5: +1 },
        { theyoloexplorer2: +1 },
        { steadylahseeker4: +1 },
        { thebigbrainboss6: +1 },
      ],
    },
    // STORY 11 - currentQuestionIndex = 20
    {
      question:
        "If only you had a little extra help, things might be easier. Imagine having a superpower just for daily life.",
      choices: ["Would your power save time, money... or yourself?"],
      weights: [{}],
    },
    // QUESTION 11
    {
      question: "If you had one “magic power” for daily life, what would it be?",
      choices: [
        "See the future.",
        "Unlimited $$$ (bye-bye adulting stress)",
        "Pause/slow time to rest",
        "Teleport anywhere instantly.",
      ],
      weights: [
        { thebigbrainboss6: +1 },
        { thehuatahsaver7: +1 },
        { theshiokrelaxer3: +1 },
        { chopchopanalyst5: +1 },
      ],
    },
    // STORY 12 - currentQuestionIndex = 22
    {
      question:
        "Finally, you think about your future self — wiser, older, and looking back at where you are today.",
      choices: ["Future-you is basically your life advisor — reminding you that today’s small moves build tomorrow’s freedom."],
      weights: [{}],
    },
    // QUESTION 12 (tip bubble)
    {
      question: "If future-you could send a message back, what would you want to hear?",
      choices: [
        "“All that planning paid off — you don’t have to stress because things are falling into place.”",
        "“You chased curiosity and new experiences — no regrets, lots of stories.”",
        "“The people you care about stayed close — you built strong relationships.”",
        "“You’re financially secure — treat yourself guilt-free.”",
      ],
      weights: [
        { thebigbrainboss6: +1 },
        { theyoloexplorer2: +1 },
        { lobangking8: +1 },
        { thehuatahsaver7: +1 },
      ],
    },
  ];

function startQuiz() {
  console.log("Starting quiz…");

  // Reset scores & state
  currentQuestionIndex = 0;
  thekiasuhero1 = theyoloexplorer2 = theshiokrelaxer3 = 0;
  steadylahseeker4 = chopchopanalyst5 = thebigbrainboss6 = 0;
  thehuatahsaver7 = lobangking8 = 0;
  quizResultsSent = false;
  resultType = "";

  displayCurrentQuestion();
}

function displayQuestionImage(questionIndex) {
  const imageURLs = [
    "",
    "./images/1_hawker.png","",
    "./images/2_home.png","",
    "./images/3_curveball.png","",
    "./images/4_shiok.png","",
    "./images/5_payday.png","",
    "./images/6_emergency.png","",
    "./images/7_stress.png","",
    "./images/8_motivation.png","",
    "./images/9_approach.png","",
    "./images/10_choice.png","",
    "./images/11_magic.png","",
    "./images/12_futureme.png",
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
  // console.log("Selected choice weight:", w); 

  thekiasuhero1 += w.thekiasuhero1 || 0;
  theyoloexplorer2 += w.theyoloexplorer2 || 0;
  theshiokrelaxer3 += w.theshiokrelaxer3 || 0;
  steadylahseeker4 += w.steadylahseeker4 || 0;
  chopchopanalyst5 += w.chopchopanalyst5 || 0;
  thebigbrainboss6 += w.thebigbrainboss6 || 0;
  thehuatahsaver7 += w.thehuatahsaver7 || 0;
  lobangking8 += w.lobangking8 || 0;

  currentQuestionIndex++;
  addTipsHereIfAny(currentQuestionIndex);
  displayCurrentQuestion();
}

/* ---------- Tips Popup ---------- */
function addTipsHereIfAny(currentQuestionIndex){
    const currentQnNumber = ( (currentQuestionIndex / 2) +1 ) ;
    if (![6, 8, 10, 13].includes(currentQnNumber)){return;}
    if (currentQnNumber === 5+1){
        showTip("Quick tip: <br>People who track their spending even casually end up with more freedom for fun stuff!<br><br>* click anywhere to dismiss *");
    } else if (currentQnNumber === 7+1){
        showTip("Did you know?<br>Nearly 50% of Singaporeans lack sufficient emergency savings...<br>Are you one of them?")
    } else if (currentQnNumber === 9+1){
        showTip("Little secret:<br>Most future problems are solved by just being curious enough to ask.")
    } else if (currentQnNumber === 12+1){
        showTip("Did you know?<br>Happiness is 50% genes, 40% what you do, and 10% life circumstances.<br>So, how are you spending your 40%?")
    } 
}

function showTip(message) {
    //console.log("tip shown:", message)
    const tipBox = document.getElementById("tip-box"); if (!tipBox) {console.error("tip-box not found in DOM");return;}
    tipBox.innerHTML = message;
    tipBox.style.display = "block";
    function hideTipOnce() {
        //console.log("tip hidden");
        if (tipBox) {
            tipBox.style.display = "none";
            tipBox.innerHTML = "";
        }
    }
    // Remove any existing click listener, then add a one-time listener to close
    document.body.removeEventListener("click", hideTipOnce);
    // Close on click anywhere, with slight delay to avoid instand dismiss on same click
    setTimeout(() => {
        document.body.addEventListener("click", hideTipOnce, { once: true });
    }, 100);
}

function showContactPage() {
  console.log("Quiz completed! Showing contact page…");
  showPage("contact-page");
  setupContactForm();
}

function calculateAndDisplayResult() {
  console.log("Calculating result…");

  const scores = {
    thekiasuhero1,
    theyoloexplorer2,
    theshiokrelaxer3,
    steadylahseeker4,
    chopchopanalyst5,
    thebigbrainboss6,
    thehuatahsaver7,
    lobangking8,
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
    thekiasuhero1: { image: "R1.png", type: "The Kiasu Hero" },
    theyoloexplorer2: { image: "R2.png", type: "The YOLO Explorer Wanderer" },
    theshiokrelaxer3: { image: "R3.png", type: "The Shiok Relaxer" },
    steadylahseeker4: { image: "R4.png", type: "Steady Lah Seeker" },
    chopchopanalyst5: { image: "R5.png", type: "Chop Chop Analyst" },
    thebigbrainboss6: { image: "R6.png", type: "The Big Brain Boss" },
    thehuatahsaver7: { image: "R7.png", type: "The Huat Ah Saver" },
    lobangking8: { image: "R8.png", type: "Lobang King" },
  };

  const { image, type } = personaMap[topPersona] || {
    image: "R1.png",
    type: "The Kiasu Hero",
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
  form.append("thekiasuhero1", thekiasuhero1);
  form.append("theyoloexplorer2", theyoloexplorer2);
  form.append("theshiokrelaxer3", theshiokrelaxer3);
  form.append("steadylahseeker4", steadylahseeker4);
  form.append("chopchopanalyst5", chopchopanalyst5);
  form.append("thebigbrainboss6", thebigbrainboss6);
  form.append("thehuatahsaver7", thehuatahsaver7);
  form.append("lobangking8", lobangking8);
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

  form.addEventListener("DOMContentLoaded", () => {phoneInputChoice(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Prevent double submission
    if (contactFormSent) return;

  const name = document.getElementById("user-name").value.trim();
const email = document.getElementById("user-email").value.trim();
const phone = document.getElementById("user-phone").value.trim();
const petType = document.getElementById("pet-type").value;  
console.log("Collected form values:", { name, email, phone, petType, resultType });
console.log("Sending contact data:", {
  name, email, phone, petType, resultType,
  submissionType: "contact_form"});

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
      thekiasuhero1,
      theyoloexplorer2,
      theshiokrelaxer3,
      steadylahseeker4,
      chopchopanalyst5,
      thebigbrainboss6,
      thehuatahsaver7,
      lobangking8,
      submissionType: "contact_form",
      interestedInInsurance: "true",
      contactedYet: "false",
      timestamp: new Date().toISOString(),
    });

    // Disable submit immediately to prevent multiple clicks
    contactFormSent = true;
    const submitBtn = document.getElementById("submit-contact");
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

/* ---- Set up phone tele linkedin feature on contact page ---- */
function phoneInputChoice(){
  const selectedIcon = document.getElementById("selected-icon");
  const iconOptions = document.getElementById("icon-options");
  const inputField = document.getElementById("user-phone");

  let currentType = "call"; // default

  // Toggle dropdown
  selectedIcon.addEventListener("click", () => {
    iconOptions.style.display = iconOptions.style.display === "flex" ? "none" : "flex";
  });

  // Handle selection
  iconOptions.addEventListener("click", (e) => {
    const option = e.target.closest("span"); // ensure we catch <i> clicks too
    if (option && option.dataset.type) {
      currentType = option.dataset.type;
      selectedIcon.innerHTML = option.innerHTML; // preserve icons
      iconOptions.style.display = "none";

      if (currentType === "telegram") {
        inputField.type = "text";
        inputField.placeholder = "What's your Tele @?";
        inputField.setAttribute("pattern", "^@[A-Za-z0-9_]{3,}$"); 
        inputField.removeAttribute("maxlength");
        inputField.oninput = null;
      } else if (currentType === "linkedin") {
        inputField.type = "url";
        inputField.placeholder = "Paste your LinkedIn profile link";
        inputField.setAttribute("pattern", "^https:\\/\\/(www\\.)?linkedin\\.com\\/in\\/[A-Za-z0-9_-]+\\/?$");
        inputField.removeAttribute("maxlength");
        inputField.oninput = null;
      } else {
        inputField.type = "tel";
        inputField.placeholder = "What's your phone number?";
        inputField.setAttribute("pattern", "[89][0-9]{7}");
        inputField.setAttribute("maxlength", "8");
        inputField.oninput = function() {
          this.value = this.value.replace(/[^0-9]/g, '');
        };
      }
    }
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



