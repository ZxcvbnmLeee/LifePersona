console.log("Script loaded!");

// Wait for page to load before running
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded, starting quiz...");
})

// Replace with your Google Apps Script Web App URL (from Version 1)
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx7S_mgrfSwg8p9DpTTB-79F0PWGtZMnfjDUbNTirkotqfMNooz6qmTpVnFuyjR-1Am/exec";


function displayQuiz(){
    const questions = [
        // QUESTION 1 //
        {
            question: "If your plans suddenly change, what's your first move?",
            choices: [
                "Make a backup plan on the spot",
                "Call someone I trust",
                "Go with the flow",
                "Panid for 2 mins, then decide"],
            weights: [
                {protectionScore: +2, mindsetScore: +2 }, // Weight for 1st choice
                {protectionScore: +1, experienceScore: +1, mindsetScore: +1 }, // Weight for 2nd choice
                {experienceScore: +2},  // Weight for 3rd choice
                {mindsetScore: +1 },    // Weight for 4th choice
                ]
        },
        // QUESTION 2 //
        {
            question: "Which one feels most like 'security' to you?",
            choices: [
                "A big fat savings account.",
                "Friends who pick me up (and feed me).",
                "A life plan that looks like IKEA instructions.",
                "The ability to eat carbs without guilt."],
            weights: [
                {protectionScore: +2, budgetScore: +2 },    // Weight for 1st choice
                {experienceScore: +1, contactScore: +1 },   // Weight for 2nd choice
                {protectionScore: +2, mindsetScore: +2 },   // Weight for 3rd choice
                {mindsetScore: +1 },                        // Weight for 4th choice
                ]
        },
        // QUESTION 3 //
        {
            question: "Life throws you a plot twist. What's your first reaction?",
            choices: [
                "Open 47 browser tabs (Google is my friend)",
                "Mum... you free?",
                "Eh, I'll freestyle it.",
                "Pretend nothing happened"],
            weights: [
                {protectionScore: +1, budgetScore: +1, experienceScore: +1, mindsetScore:+2 }, // Weight for 1st choice
                {mindsetScore: +1, contactScore: +2 },      // Weight for 2nd choice
                {experienceScore: +1, contactScore: +1 },   // Weight for 3rd choice
                { }, // Weight for 4th choice
                ]
        },
        // QUESTION 4 //
        {
            question: "If you could pick ONE magic life power, what would you pick?",
            choices: [
                "100% healthy forever",
                "Infinite money (bye adulting)",
                "Calm mode unlocked",
                "Extra time to enjoy life"],
            weights: [
                {protectionScore: +2, mindsetScore: +1 }, // Weight for 1st choice
                {budgetScore: +2 }, // Weight for 2nd choice
                {mindsetScore: +2 }, // Weight for 3rd choice
                {experienceScore: +1, mindsetScore: +1 }, // Weight for 4th choice
                ]
        },
        // QUESTION 5 //
        {
            question: "Your monthly spending style looks like...",
            choices: [
                "Only what's necessary",
                "Balanced spender (snacks + savings)",
                "Big spender on experiences",
                "I close my eyes and hope for the best"],
            weights: [
                {budgetScore: +2 }, // Weight for 1st choice
                {budgetScore: +1, experienceScore: +1 }, // Weight for 2nd choice
                {experienceScore: +2 }, // Weight for 3rd choice
                {  },                   // Weight for 4th choice
                ]
        },
        // QUESTION 6 // (show tip bubble)
        {
            question: "Whose advice do you trust most?",
            choices: [
                "A famous person on a TED Talk",
                "Family and friends",
                "Someone who shows clear proof",
                "I trust my own gut"],
            weights: [
                {experienceScore: +1, mindsetScore: +2},    // Weight for 1st choice
                {mindsetScore: +1, contactScore: +2 },      // Weight for 2nd choice
                {protectionScore: +1, mindsetScore: +2 },   // Weight for 3rd choice
                {experienceScore: +2, mindsetScore: +1 },   // Weight for 4th choice
                ]
        },
        // QUESTION 7 //
        {
            question: "If life was a weather forecast, what do you do before the storm?",
            choices: [
                "Stock up & prepare like a survival drama hero",
                "Watch the news and wait",
                "Just stay home and chill",
                "Hope the storm skips my area"],
            weights: [
                {protectionScore: +2, mindsetScore: +2 }, // Weight for 1st choice
                {protectionScore: +1, mindsetScore: +1 }, // Weight for 2nd choice
                {experienceScore: +1, mindsetScore: +2 }, // Weight for 3rd choice
                {mindsetScore: -1 }, // Weight for 4th choice
                ]
        },
        // QUESTION 8 // (show fact bubble)
        {
            question: "You have to grab one thing in an emergency. Which do you choose?",
            choices: [
                "Important documents",
                "My emergency snack bag",
                "My favourite keepsake (My lucky souvenir)",
                "My phone/photos"],
            weights: [
                {protectionScore: +2 }, // Weight for 1st choice
                {experienceScore: +1 }, // Weight for 2nd choice
                {experienceScore: +2 }, // Weight for 3rd choice
                {protectionScore: +1, experienceScore: +1 }, // Weight for 4th choice
                ]
        },
        // QUESTION 9 //
        {
            question: "A wise parrot says: 'I can give you tips for a smoother future!' You... ",
            choices: [
                "Say 'Yes! Tell me more!",
                "Ask 'What's in it for me?'",
                "Smile and say no",
                "Only if it's short and fun"],
            weights: [
                {contactScore: +3, mindsetScore: +2}, // Weight for 1st choice
                {contactScore: +1, mindsetScore: +1}, // Weight for 2nd choice
                {budgetScore: +1}, // Weight for 3rd choice
                {mindsetScore: +1}, // Weight for 4th choice
                ]
        },
        // QUESTION 10 // (tip bubble)
        {
            question: "What makes you feel happiest at the end of the day?",
            choices: [
                "Knowing I’ve planned for chaos",
                "Trying something new",
                "Time with people I care about",
                "Treating myself (Buying dessert with no regrets)"],
            weights: [
                {protectionScore: +2, mindsetScore: +2 },   // Weight for 1st choice
                {experienceScore: +2, mindsetScore: +1 },   // Weight for 2nd choice
                {mindsetScore: +1, mindsetScore: +1 },      // Weight for 3rd choice
                {budgetScore: +1, experienceScore: +1 },    // Weight for 4th choice
                ]
        },  // (show fact bubble)
    ]

    // variables for scores //
    let currentQuestionIndex = 0;
    let protectionScore = 0;    // low, medium, high            | max 14
    let budgetScore = 0;        // low, medium, high            | max 9
    let experienceScore = 0;    // new, moderate, experienced   | max 14
    let mindsetScore = 0;       // reactive to proactive        | max 16
    let contactScore =0;        // friendliness                 | max 9
    let resultType = "";
    let resultImage = "";

    ////////////////////////////
    // display question image //
    ////////////////////////////
    function displayQuestionImage(questionIndex){
        const imageURLs = [
            "./images/1.png",
            "./images/2.png",
            "./images/3.png",
            "./images/4.png",
            "./images/5.png",
            "./images/6.png",
            "./images/7.png",
            "./images/8.png",
            "./images/9.png",
            "./images/10_end.png",];
        const questionImageElement = document.getElementById('question-image');
        if (questionImageElement) {questionImageElement.src = imageURLs[questionIndex];}
    }

    //////////////////////////////////
    // Function to get progress bar //
    //////////////////////////////////
    
    // not used
    function getQuestionProgressImage(questionIndex) {
        const progressImageURLs = [
            "./images/progress_0.png",
            "./images/progress_10.png",
            "./images/progress_20.png",
            "./images/progress_30.png",
            "./images/progress_40.png",
            "./images/progress_50.png",
            "./images/progress_60.png",
            "./images/progress_70.png",
            "./images/progress_80.png",
            "./images/progress_90.png",
            "./images/progress_100.png",
        ];
        return progressImageURLs[questionIndex] || "";
    }
        

    // update progress bar //
    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        const progressBar = document.getElementById("progress-bar");
        const progressText = document.getElementById("progress-text");

        if (progressBar) {progressBar.style.width = progress + "%";}
        if (progressText) {progressText.innerText = Math.round(progress) + "%";}
    }

    ////////////////////////////////
    // Event - begin intro button //
    ////////////////////////////////

    document.getElementById('begin-intro').addEventListener('click', function() {
        console.log("clicked on walkies")
        document.getElementById('home').style.display = 'none';
        document.getElementById('intro-page').style.display = 'block';
    });

    ///////////////////////////////
    // Event - begin quiz button //
    ///////////////////////////////

    document.getElementById('begin-quiz').addEventListener('click', function() {
        console.log("clicked on pawceed")
        document.getElementById('intro-page').style.display = 'none';
        document.getElementById('quiz-page').style.display = 'block';
    });

    ////////////////////////////////////////////////////////
    // Function to display the current question & choices // 
    ////////////////////////////////////////////////////////

    function displayCurrentQuestion() {
        console.log("==== Displaying question:", currentQuestionIndex);

        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        // const progressImageElement = document.getElementById('question-progress-image');
        const choiceContainers = document.getElementById('choices');
        
        if (!questionElement || !choiceContainers) {
            console.error("Could not find question or choices elements!");
            return;}

        // Clear previous choices //
        choiceContainers.innerHTML = '';
        
        // Set qn text
        questionElement.textContent = currentQuestion.question;

        //progressImageElement.src = getQuestionProgressImage(currentQuestionIndex);
        updateProgressBar();

        displayQuestionImage(currentQuestionIndex);

        currentQuestion.choices.forEach((choice, index) => {
            // Buttons for choices //
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choice-button');
            button.addEventListener('click', () => handleChoiceClick(index));
            choiceContainers.appendChild(button);
        });

        console.log("Question displayed, buttons created:",
            choiceContainers.children.length);

    }



    /////////////////////////////////////
    // Function to handle choice click // 
    /////////////////////////////////////
    function handleChoiceClick(choiceIndex) {
        console.log("Choice clicked:", choiceIndex);
        // Update scores based on user response
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];
        console.log("Selected choice weight:", selectedChoiceWeight);

            //Update scores based on weight of selected choice
            if (selectedChoiceWeight.hasOwnProperty('protectionScore')) {
                protectionScore += selectedChoiceWeight.protectionScore;
            }
            if (selectedChoiceWeight.hasOwnProperty('budgetScore')) {
                budgetScore += selectedChoiceWeight.budgetScore;
            }
            if (selectedChoiceWeight.hasOwnProperty('experienceScore')) {
                experienceScore += selectedChoiceWeight.experienceScore;
            }
            if (selectedChoiceWeight.hasOwnProperty('mindsetScore')) {
                mindsetScore += selectedChoiceWeight.mindsetScore;
            }
            if (selectedChoiceWeight.hasOwnProperty('contactScore')) {
                contactScore += selectedChoiceWeight.contactScore;
            }

        //Move to the next question
        currentQuestionIndex++;

        // any tips? 
        if (currentQuestionIndex === 5){
            showTip("Quick tip: <br>People who track their spending even casually end up with more freedom for fun stuff!<br><br>* click anywhere to dismiss *");
        } else if (currentQuestionIndex ===7){
            showTip("Did you know?<br>70% of people admit they're not ready for big surprises... until it's too late.")
        } else if (currentQuestionIndex ===9){
            showTip("Little secret:<br>Most future problems are solved by just being curious enough to ask.")
        } else if (currentQuestionIndex ===10){
            showTip("Life satisfaction studies shows:<br> Happiness = 30% planning ahead + 30% relationships + 30% fun... +10% snacks.")
        } 

        if (currentQuestionIndex < questions.length) {
            displayCurrentQuestion();
        } else {showContactPage();}
    }

    ////////////////////////////////////////////////
    // Function to showTip when after selected Qn //    -- I am here
    ////////////////////////////////////////////////
    function showTip(message) {
        console.log("tip shown:", message)
        const tipBox = document.getElementById("tip-box"); if (!tipBox) {console.error("tip-box not found in DOM");return;}
        tipBox.innerHTML = message;
        tipBox.style.display = "block";

        // Remove any existing click listener, then add a one-time listener to close
        document.body.removeEventListener("click", hideTipOnce);
        // Close on click anywhere, with slight delay to avoid instand dismiss on same click
        setTimeout(() => {
            document.body.addEventListener("click", hideTipOnce, { once: true });
        }, 100);
    }

    function hideTipOnce() {
        console.log("tip hidden")
        const tipBox = document.getElementById("tip-box");
        if (tipBox) {
            tipBox.style.display = "none";
            tipBox.innerHTML = "";
        }
    }
    // Make showTip() globally available for debugging //
    window.showTip = showTip;


    /////////////////////////////////////////////
    // Show contact page after quiz completion //
    /////////////////////////////////////////////

    function showContactPage(){
        console.log("Quiz completed! Showing contact page...");
        // calculate result type & image for later use // --- didnt use

        // Hide quiz page, show contact page
        const quizPage = document.getElementById("quiz-page");
        const contactPage = document.getElementById("contact-page");
        if (quizPage) quizPage.style.display = "none";
        if (contactPage) contactPage.style.display = "block";

        // Set up form submission handler
        setupContactForm();
    }

    ////////////////////////////////////////////
    // Function to calculate & display result // 
    ////////////////////////////////////////////
    function calculateAndDisplayResult(){
        console.log("Quiz completed!");
        console.log("Scores:", {
            protectionScore,
            budgetScore,
            experienceScore,
            mindsetScore,
            contactScore,
        });


        // Scoring system //

        if (protectionScore >= 10 && experienceScore >= 5 && mindsetScore >= 6) {
            resultImage = "R1.png"; // Prepared Pawrent
            resultType = "Prepared Pawrent";
        }
        else if (experienceScore <= 4 && mindsetScore >= 6 && contactScore >= 1) {
            resultImage = "R2.png"; // Curious Newbie
            resultType = "Curious Newbie";
        }
        else if (budgetScore <= 5 && experienceScore >= 5) {
            resultImage = "R3.png"; // Spoil-Me Specialist
            resultType = "Spoil-Me Specialist";
        }
        else if (mindsetScore >= 8 && protectionScore <= 6) {
            resultImage = "R4.png"; // Zen Guardian
            resultType = "Zen Guardian";
        }
        else if (mindsetScore >= 7 && (experienceScore>=6 || protectionScore >=6)) {
            resultImage = "R5.png"; // Analyzer
            resultType = "Analyzer";
        }
        else if (protectionScore >= 6 && experienceScore >= 5 && mindsetScore >= 6) {
            resultImage = "R6.png"; // Legacy Protector
            resultType = "Legacy Protector";
        }
        else if (budgetScore >= 6 && (contactScore <= 1 || protectionScore <= 5) ) {
            resultImage = "R7.png"; // Budget Boss
            resultType = "Budget Boss";
        }
        else if (experienceScore >= 5 && contactScore >= 6) {
            resultImage = "R8.png"; // Memory Maker
            resultType = "Memory Maker";
        }
        else {
            resultImage = "R9.png"; // Bubble Closeter (fallback)
            resultType = "Bubble Closeter";
        }

        // Send quiz results to Google Sheets (for skipped contact form)
        sendQuizResults();

        // Display image & type into result section
        const resultImageDiv = document.getElementById("result-image");
        if (resultImageDiv) {resultImageDiv.innerHTML = `<img src="./images/${resultImage}" class="cover-image" alt="Your Persona Result">`;}
        const resultTypeDiv = document.getElementById("result-type");
        if (resultTypeDiv){resultTypeDiv.textContent = resultType;}

        // Hide the contact page, show the result page
        document.getElementById("contact-page").style.display = "none";
        document.getElementById("result-page").style.display = "block";
    }

    ////////////////////////////////////////
    // Send quiz results to Google Sheets // (for users who skip contact form) 
    ////////////////////////////////////////

    function sendQuizResults(){
        console.log("Sending quiz results to Google Sheets...");

        // Create a hidden form to submit to Google Apps Script
        const hiddenForm = document.createElement("form");
        hiddenForm.method = "POST";
        hiddenForm.action = GOOGLE_SCRIPT_URL;
        hiddenForm.target = "hidden_iframe_results";
        hiddenForm.style.display = "none";

        // Create hidden iframe to receive the response
        const iframe = document.createElement("iframe");
        iframe.name = "hidden_iframe_results";
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        // Add form fields - include a flag to indicate this is quiz results only
        const fields = {
            resultType: resultType,
            protectionScore: protectionScore,
            budgetScore: budgetScore,
            experienceScore: experienceScore,
            mindsetScore: mindsetScore,
            contactScore: contactScore,
            submissionType: "quiz_results_only", // Flag to indicate this goes to results sheet
            timestamp: new Date().toISOString(),
            interestedInInsurance: "false",
        };

        for (const key in fields) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = fields[key];
            hiddenForm.appendChild(input);
        }

        // Submit the form
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        // Clean up after a short delay
        setTimeout(function () {
            document.body.removeChild(hiddenForm);
            document.body.removeChild(iframe);
        }, 1000);

    }

    ///////////////////////////////////
    // Setup contact form submission //
    ///////////////////////////////////

    function setupContactForm(){
        const form = document.getElementById("insurance-form");
        const messageDiv = document.getElementById("form-message");

        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                // Get form data
                const name = document.getElementById("user-name").value;
                const email = document.getElementById("user-email").value;
                const phone = document.getElementById("user-phone").value;
                const petType = document.getElementById("pet-type").value;

                // Show loading message
                messageDiv.innerHTML = "Sending your information... 🐾";
                messageDiv.className = "";

                // Disable submit button
                const submitBtn = document.getElementById("submit-contact");
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";

                // Create a hidden form to submit to Google Apps Script
                const hiddenForm = document.createElement("form");
                hiddenForm.method = "POST";
                hiddenForm.action = GOOGLE_SCRIPT_URL;
                hiddenForm.target = "hidden_iframe";
                hiddenForm.style.display = "none";

                // Create hidden iframe to receive the response
                const iframe = document.createElement("iframe");
                iframe.name = "hidden_iframe";
                iframe.style.display = "none";
                document.body.appendChild(iframe);

                // Add form fields - include a flag to indicate this goes to contact sheet
                const fields = {
                name: name,
                email: email,
                phone: phone,
                petType: petType,
                resultType: resultType,
                protectionScore: protectionScore,
                budgetScore: budgetScore,
                experienceScore: experienceScore,
                mindsetScore: mindsetScore,
                contactScore: contactScore,
                submissionType: "contact_form", // Flag to indicate this goes to contact sheet
                timestamp: new Date().toISOString(),
                interestedInInsurance: "true",
                };

                for (const key in fields) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = fields[key];
                hiddenForm.appendChild(input);
                }

                // Submit the form
                document.body.appendChild(hiddenForm);
                hiddenForm.submit();

                // Clean up after a short delay
                setTimeout(function () {
                document.body.removeChild(hiddenForm);
                document.body.removeChild(iframe);
                }, 1000);

                // Show success message
                messageDiv.innerHTML =
                "Thank you! We'll contact you soon about pet insurance! 🎉";
                messageDiv.className = "success";

                // Wait 2 seconds then show results
                setTimeout(function () {
                    calculateAndDisplayResult();
                }, 2000);
            });
        }
    }

    // Make calculateAndDisplayResult() globally available for the skip button //
    window.calculateAndDisplayResult = calculateAndDisplayResult;

    /////////////////////////////////////////////////////
    // Event - display the 1st qn when the quiz starts //
    /////////////////////////////////////////////////////
    displayCurrentQuestion();
    document.addEventListener('DOMContentLoaded', () => {
        const choiceContainers = document.querySelectorAll('.choice-container');
            choiceContainers.forEach((container) => {
                const choices = container.querySelectorAll('button');
                choices.forEach((choice, choiceIndex) => {
                    choice.addEventListener('click', () => {
                        handleChoiceClick(choiceIndex);
                    });
                });
            });
    });

}

// Start the quiz
displayQuiz();

////////////////////////
// Event - Share Quiz //
////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".share-button");
    console.log("Share button: ",shareButton);

    if (shareButton) {
        shareButton.addEventListener("click", function () {
            const shareData = {
                title: "Pawventure Quiz",
                text: "I just found out what kind of pet guardian I am! 🐾 Try it too!",
                url: window.location.href,
            };

            if (navigator.share) {
                navigator
                .share(shareData)
                .then(() => console.log("Share successful"))
                .catch((error) => console.log("Sharing failed", error));
            } else {
                // Fallback: copy link to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert("Link copied to clipboard! Share it with your friends 🐶🐱");
                }); 
            }
        });
    }
});

// Test the popup
/*
document.addEventListener("DOMContentLoaded", function() {
    showTip("This is a test tip. <br>Click anywhere to dismiss.");
})*/
