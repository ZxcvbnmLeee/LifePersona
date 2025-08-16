function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // Get the spreadsheet (replace with your actual spreadsheet ID)
    const SPREADSHEET_ID = '1Q-81fuONi8pL7Zdnna5Kimg8WDKINmdWWjyvX7HSbAw';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Parse the incoming data - handle both JSON, form data, and URL parameters
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (error) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }
    
    // Log the received data for debugging
    console.log('Received data:', data);
    
    // Check submission type to determine which sheet to use
    const submissionType = data.submissionType || "contact_form";
    console.log('Submission type:', submissionType);
    
    if (submissionType === "contact_form") {
      // Handle contact form submissions (original behavior)
      handleContactFormSubmission(spreadsheet, data);
    } else if (submissionType === "quiz_results_only") {
      // Handle quiz results only (when user skips contact form)
      handleQuizResultsSubmission(spreadsheet, data);
    } else {
      // Fallback to original behavior
      handleContactFormSubmission(spreadsheet, data);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true, 
      message: 'Data saved successfully',
      submissionType: submissionType
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error in handleRequest:', error);
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false, 
      message: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleContactFormSubmission(spreadsheet, data) {
  try {
    console.log('Handling contact form submission');
    
    // Get or create "Contact Leads" sheet
    let sheet = spreadsheet.getSheetByName("Contact Leads");
    if (!sheet) {
      console.log('Creating Contact Leads sheet');
      sheet = spreadsheet.insertSheet("Contact Leads");
    }
    
    // Prepare the row data (same as your original structure)
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.petType || '',
      data.resultType || '',
      parseInt(data.protectionScore) || 0,
      parseInt(data.budgetScore) || 0,
      parseInt(data.experienceScore) || 0,
      parseInt(data.mindsetScore) || 0,
      parseInt(data.contactScore) || 0,
      data.interestedInInsurance === 'true' || data.interestedInInsurance === true,
      data.contactedYet === 'true' || data.contactedYet === false
    ];
    
    console.log('Contact form row data:', rowData);
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Name',
        'Email', 
        'Phone',
        'Pet Type',
        'Result Type',
        'Protection Score',
        'Budget Score',
        'Experience Score',
        'Mindset Score',
        'Contact Score',
        'Interested in Insurance',
        'Contacted yet?'
      ];
      sheet.appendRow(headers);
      console.log('Added headers to Contact Leads sheet');
    }
    
    // Add the data
    sheet.appendRow(rowData);
    console.log('Data added to Contact Leads sheet');
    
  } catch (error) {
    console.error('Error in handleContactFormSubmission:', error);
    throw error;
  }
}

function handleQuizResultsSubmission(spreadsheet, data) {
  try {
    console.log('Handling quiz results submission');
    
    // Get or create "Quiz Results" sheet
    let sheet = spreadsheet.getSheetByName("Quiz Results");
    if (!sheet) {
      console.log('Creating Quiz Results sheet');
      sheet = spreadsheet.insertSheet("Quiz Results");
    }
    
    // Prepare the row data for quiz results only
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.resultType || '',
      parseInt(data.protectionScore) || 0,
      parseInt(data.budgetScore) || 0,
      parseInt(data.experienceScore) || 0,
      parseInt(data.mindsetScore) || 0,
      parseInt(data.contactScore) || 0
    ];
    
    console.log('Quiz results row data:', rowData);
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Result Type',
        'Protection Score',
        'Budget Score',
        'Experience Score',
        'Mindset Score',
        'Contact Score'
      ];
      sheet.appendRow(headers);
      console.log('Added headers to Quiz Results sheet');
    }
    
    // Add the data
    sheet.appendRow(rowData);
    console.log('Data added to Quiz Results sheet');
    
  } catch (error) {
    console.error('Error in handleQuizResultsSubmission:', error);
    throw error;
  }
}

// Simple test function to check basic functionality
function simpleTest() {
  try {
    console.log('Starting simple test...');
    
    // Test with minimal data
    const testData = {
      parameter: {
        resultType: 'Test Result',
        protectionScore: '5',
        submissionType: 'quiz_results_only'
      }
    };
    
    const result = handleRequest(testData);
    console.log('Test result:', result.getContent());
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Full test function
function testFunction() {
  try {
    console.log('Starting full test...');
    
    // Test contact form submission
    const testContactData = {
      parameter: {
        name: 'Website Test',
        email: 'website@example.com',
        phone: '91234567',
        petType: 'Dog',
        resultType: 'Practical Protector',
        protectionScore: '4',
        budgetScore: '3',
        experienceScore: '2',
        mindsetScore: '4',
        contactScore: '1',
        submissionType: 'contact_form',
        interestedInInsurance: 'true',
        contactedYet:'false',
      }
    };
    
    // Test quiz results only submission
    const testQuizData = {
      parameter: {
        resultType: 'Zen Guardian',
        protectionScore: '2',
        budgetScore: '1',
        experienceScore: '3',
        mindsetScore: '8',
        contactScore: '2',
        submissionType: 'quiz_results_only',
        interestedInInsurance: 'false',
        contactedYet:'false'
      }
    };
    
    console.log('Testing contact form...');
    const contactResult = handleRequest(testContactData);
    console.log('Contact result:', contactResult.getContent());
    
    console.log('Testing quiz results...');
    const quizResult = handleRequest(testQuizData);
    console.log('Quiz result:', quizResult.getContent());
    
  } catch (error) {
    console.error('Full test failed:', error);
  }
}
