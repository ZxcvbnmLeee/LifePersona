console.log("Script loaded!");

// Wait for page to load before running
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded, starting quiz...");
})

// Replace with your Google Apps Script Web App URL (from Version 1)
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyCu7P_RDUrwtMSX6CbbXBOkDuBnnKUFxIkJ7Ez7is-kEocfMVgG3XxegOrwGVuwdUx/exec";


function displayQuiz(){
    const questions = [
        // QUESTION 1 //
        {
            question: "You've been planning a project for months, but an unexpected change forces you to alter your plan. What will you do next?",
            choices: [
                "Make a backup plan on the spot",
                "Call someone I trust",
                "Go with the flow",
                "Panic for 2 mins, then decide"],
            weights: [
                {captainbackup1: +1, detectivedata5: +1 }, // Weight for 1st choice
                {connectioncurator8: +1, whynotwanderer2: +1 }, // Weight for 2nd choice
                {whynotwanderer2: +1, ultimatechillpill3: +1},  // Weight for 3rd choice
                {thefunnomad4: +1, lifestrategist6: +1},    // Weight for 4th choice
                ]
        },
        // QUESTION 2 //
        {
            question: "Which one feels most like 'security' to you?",
            choices: [
                "A big fat savings account",
                "Friends who pick me up (and feed me)",
                "A life plan that looks like IKEA instructions",
                "The ability to eat carbs without guilt"],
            weights: [
                {captainbackup1: +1, walletwhisperer7: +1},    // Weight for 1st choice
                {connectioncurator8: +1, ultimatechillpill3: +1 },   // Weight for 2nd choice
                {lifestrategist6: +1, detectivedata5: +1 },   // Weight for 3rd choice
                {thefunnomad4: +1, whynotwanderer2: +1},  // Weight for 4th choice
                ]
        },
        // QUESTION 3 //
        {
            question: "Life throws you a plot twist. What's your first reaction?",
            choices: [
                "Open 47 browser tabs (Google is my friend)",
                "Mum... you free?",
                "Eh, I'll freestyle it",
                "Pretend nothing happened"],
            weights: [
                { captainbackup1: +1, detectivedata5: +1 }, // Weight for 1st choice
                { connectioncurator8: +1, ultimatechillpill3: +1 }, // Weight for 2nd choice
                { whynotwanderer2: +1, thefunnomad4: +1}, // Weight for 3rd choice
                { ultimatechillpill3: +1, walletwhisperer7: +1 }, // Weight for 4th choice
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
                { captainbackup1: +1, lifestrategist6: +1 }, // Weight for 1st choice
                { thefunnomad4: +1, walletwhisperer7: +1 }, // Weight for 2nd choice
                { ultimatechillpill3: +1, connectioncurator8: +1 }, // Weight for 3rd choice
                { thefunnomad4: +1, whynotwanderer2: +1}, // Weight for 4th choice
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
                { captainbackup1: +1, walletwhisperer7: +1 }, // Weight for 1st choice
                { lifestrategist6: +1, ultimatechillpill3: +1 }, // Weight for 2nd choice
                { whynotwanderer2: +1, thefunnomad4: +1 }, // Weight for 3rd choice
                { thefunnomad4: +1, connectioncurator8: +1 }, // Weight for 4th choice
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
                {detectivedata5: +1, whynotwanderer2: +1 }, // Weight for 1st choice
                {connectioncurator8: +1, ultimatechillpill3: +1 }, // Weight for 2nd choice
                {lifestrategist6: +1, captainbackup1: +1 }, // Weight for 3rd choice
                {thefunnomad4: +1, walletwhisperer7: +1 }, // Weight for 4th choice
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
                { captainbackup1: +1, walletwhisperer7: +1 }, // Weight for 1st choice
                { detectivedata5: +1, lifestrategist6: +1 }, // Weight for 2nd choice
                { ultimatechillpill3: +1, connectioncurator8: +1 }, // Weight for 3rd choice
                { thefunnomad4: +1, whynotwanderer2: +1 }, // Weight for 4th choice
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
                { captainbackup1: +1, detectivedata5: +1 }, // Weight for 1st choice
                { walletwhisperer7: +1, ultimatechillpill3: +1 }, // Weight for 2nd choice
                { connectioncurator8: +1, thefunnomad4: +1 }, // Weight for 3rd choice
                { thefunnomad4: +1, whynotwanderer2: +1 }, // Weight for 4th choice
                ]
        },
        // QUESTION 9 //
        {
            question: "A wise merlion says: 'I can give you tips for a smoother future!' You... ",
            choices: [
                "Say 'Yes! Tell me more!'",
                "Ask 'What's the catch?'",
                "Smile and say no",
                "Only if it's short and fun"],
            weights: [
                { captainbackup1: +1, detectivedata5: +1 }, // Weight for 1st choice
                { lifestrategist6: +1, walletwhisperer7: +1 }, // Weight for 2nd choice
                { ultimatechillpill3: +1, whynotwanderer2: +1 }, // Weight for 3rd choice
                { thefunnomad4: +1, connectioncurator8: +1 }, // Weight for 4th choice
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
                { captainbackup1: +1, lifestrategist6: +1 }, // Weight for 1st choice
                { whynotwanderer2: +1, thefunnomad4: +1 }, // Weight for 2nd choice
                { connectioncurator8: +1, ultimatechillpill3: +1 }, // Weight for 3rd choice
                { thefunnomad4: +1, walletwhisperer7: +1 }, // Weight for 4th choice
                ]
        },  // (show fact bubble)
    ]

    // variables for scores //
    let currentQuestionIndex = 0;
    let captainbackup1 = 0; let whynotwanderer2 = 0; let ultimatechillpill3 = 0;
    let thefunnomad4 = 0; let detectivedata5 =0; let lifestrategist6 =0; 
    let walletwhisperer7 =0; let connectioncurator8 =0;

    let resultType = "";
    let resultImage = "";

    ////////////////////////////
    // display question image //
    ////////////////////////////
    function displayQuestionImage(questionIndex){
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
            "./images/10_happiness.png",];
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
        console.log("clicked on start")
        document.getElementById('home').style.display = 'none';
        document.getElementById('intro-page').style.display = 'block';
    });

    ///////////////////////////////
    // Event - begin quiz button //
    ///////////////////////////////

    document.getElementById('begin-quiz').addEventListener('click', function() {
        console.log("clicked on steady")
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
            if (selectedChoiceWeight.hasOwnProperty('captainbackup1')) {    captainbackup1 += selectedChoiceWeight.captainbackup1;}
            if (selectedChoiceWeight.hasOwnProperty('whynotwanderer2')) {   whynotwanderer2 += selectedChoiceWeight.whynotwanderer2;}
            if (selectedChoiceWeight.hasOwnProperty('ultimatechillpill3')) {   ultimatechillpill3 += selectedChoiceWeight.ultimatechillpill3;}
            if (selectedChoiceWeight.hasOwnProperty('thefunnomad4')) {  thefunnomad4 += selectedChoiceWeight.thefunnomad4;}
            if (selectedChoiceWeight.hasOwnProperty('detectivedata5')) {  detectivedata5 += selectedChoiceWeight.detectivedata5;}
            if (selectedChoiceWeight.hasOwnProperty('lifestrategist6')) {  lifestrategist6 += selectedChoiceWeight.lifestrategist6;}
            if (selectedChoiceWeight.hasOwnProperty('walletwhisperer7')) {  walletwhisperer7 += selectedChoiceWeight.walletwhisperer7;}
            if (selectedChoiceWeight.hasOwnProperty('connectioncurator8')) {  connectioncurator8 += selectedChoiceWeight.connectioncurator8;}

        //Move to the next question
        currentQuestionIndex++;

        // any tips? 
        if (currentQuestionIndex === 5){
            showTip("Quick tip: <br>People who track their spending even casually end up with more freedom for fun stuff!<br><br>* click anywhere to dismiss *");
        } else if (currentQuestionIndex ===7){
            showTip("Did you know?<br>70% of people admit they're not ready for big surprises...<br>until it's too late.")
        } else if (currentQuestionIndex ===9){
            showTip("Little secret:<br>Most future problems are solved by just being curious enough to ask.")
        } else if (currentQuestionIndex ===10){
            showTip("Life satisfaction studies shows:<br>Happiness = 30% planning ahead + 30% relationships + 30% fun... + 10% snacks.")
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

        // Hide quiz page, show contact page & hide result page
        const quizPage = document.getElementById("quiz-page");
        const contactPage = document.getElementById("contact-page");
        const resultPage = document.getElementById("result-page");
        if (resultPage) resultPage.style.display = "none";
        if (quizPage) quizPage.style.display = "none";
        if (contactPage) contactPage.style.display = "block";

        // Set up form submission handler
        setupContactForm();
    }
    // Make showContactPage() globally available for return to contact page //
    window.showContactPage = showContactPage;

    ////////////////////////////////////////////
    // Function to calculate & display result // 
    ////////////////////////////////////////////
    function calculateAndDisplayResult(){
        console.log("Quiz completed!");
        const scores = {captainbackup1, whynotwanderer2, ultimatechillpill3, thefunnomad4,
            detectivedata5, lifestrategist6, walletwhisperer7, connectioncurator8,
        };
        console.log("Scores:", scores);


        // Find top persona //
        let topPersona = null; let topScore = -Infinity;
        for (const persona in scores){
            if (scores[persona] > topScore){
                topPersona = persona;
                topScore = scores[persona];
            }
        }

        // Persona mapping (ResultImage and resultType) // 
        const personaMap = {
            captainbackup1: { image: "R1.png", resultType: "Captain Backup" },
            whynotwanderer2: { image: "R2.png", resultType: "The Why-Not Wanderer" },
            ultimatechillpill3: { image: "R3.png", resultType: "The Chill Pill" },
            thefunnomad4: { image: "R4.png", resultType: "The Fun Nomad" },
            detectivedata5: { image: "R5.png", resultType: "Detective Data" },
            lifestrategist6: { image: "R6.png", resultType: "The Life Strategist" },
            walletwhisperer7: { image: "R7.png", resultType: "Wallet Whisperer" },
            connectioncurator8: { image: "R8.png", resultType: "The Connection Curator" }
        };
        const { image: resultImage, resultType: resultType } = personaMap[topPersona];

        // Send quiz results to Google Sheets (for skipped contact form)
        sendQuizResults();

        // Display image & type into result section
        const resultImageDiv = document.getElementById("result-image");
        if (resultImageDiv) {resultImageDiv.innerHTML = `<img src="./images/${resultImage}" class="result-image" alt="Your Persona Result">`;}
        const resultType = document.getElementById("resultType");
        if (resultType){resultType.textContent = resultType;}

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
            captainbackup1:     captainbackup1,
            whynotwanderer2:    whynotwanderer2,
            ultimatechillpill3: ultimatechillpill3,
            thefunnomad4:       thefunnomad4,
            detectivedata5:     detectivedata5,
            lifestrategist6:    lifestrategist6,
            walletwhisperer7:   walletwhisperer7,
            connectioncurator8: connectioncurator8,
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
                const interestType = document.getElementById("interest-type").value;

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
                interestType: interestType,
                resultType: resultType,
                captainbackup1:     captainbackup1,
                whynotwanderer2:    whynotwanderer2,
                ultimatechillpill3: ultimatechillpill3,
                thefunnomad4:       thefunnomad4,
                detectivedata5:     detectivedata5,
                lifestrategist6:    lifestrategist6,
                walletwhisperer7:   walletwhisperer7,
                connectioncurator8: connectioncurator8,
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
                "Thank you! We'll contact you soon! 🎉";
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
                title: "AnimePersona",
                text: "I just found out my Persona! 🌟 Try it too!",
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
                    alert("Link copied to clipboard! Share it with your friends 🎉");
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












