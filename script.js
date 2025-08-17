function handleRequest(e) {
  try {
    // Spreadsheet ID
    const SPREADSHEET_ID = '1Q-81fuONi8pL7Zdnna5Kimg8WDKINmdWWjyvX7HSbAw';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Parse the incoming data - handle both JSON, form data, and URL parameters
    let data ={};
    if (e) {
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (error) {
        data = e.parameter || {};
      }
    } else if (e.parameter){
      data = e.parameter || {};
    }
    }

    console.log('Received data:', data);

    // Submission type
    const submissionType = data.submissionType || "contact_form";
    console.log('Submission type:', submissionType);

    if (submissionType === "contact_form") {
      handleContactFormSubmission(spreadsheet, data);
    } else if (submissionType === "quiz_results_only") {
      handleQuizResultsSubmission(spreadsheet, data);
    } else {
      handleContactFormSubmission(spreadsheet, data);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully',
      submissionType: submissionType
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error in handleRequest:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
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

    // Send quiz-only results (if they skipped contact)
    sendQuizResults();

    // Render
    const resultImageDiv = document.getElementById("result-image");
    if (resultImageDiv) {
      resultImageDiv.innerHTML = `<img src="./images/${image}" class="result-image" alt="Your Persona Result">`;
    }
    const resultTypeEl = document.getElementById("result-type"); // <-- fixed id
    if (resultTypeEl) resultTypeEl.textContent = resultType;

    showPage("result-page");
  }
 
