document.addEventListener('DOMContentLoaded', function() {
  const apiKeyInput = document.getElementById('apiKey');
  const jobDescriptionInput = document.getElementById('jobDescription');
  const fileInput = document.getElementById('file');
  const runButton = document.getElementById('runButton');
  const spinner = document.getElementById('spinner');
  const result = document.getElementById('result');
  const uploadButton = document.querySelector('.upload-button');

  function checkFields() {
    const allFieldsFilled = apiKeyInput.value && jobDescriptionInput.value && fileInput.files.length > 0;
    runButton.disabled = !allFieldsFilled;
    runButton.style.backgroundColor = allFieldsFilled ? '#007bff' : '#ccc';
  }

  apiKeyInput.addEventListener('input', checkFields);
  jobDescriptionInput.addEventListener('input', checkFields);
  fileInput.addEventListener('change', function() {
    checkFields();
    if (fileInput.files && fileInput.files.length > 0) {
      uploadButton.textContent = 'Resume Uploaded';
      uploadButton.classList.add('uploaded');
    } else {
      uploadButton.textContent = 'Upload Resume (PDF)';
      uploadButton.classList.remove('uploaded');
    }
  });

  runButton.addEventListener('click', function(event) {
    const apiKey = apiKeyInput.value;
    const jobDescription = jobDescriptionInput.value;
    const file = fileInput.files[0];

    if (!apiKey || !jobDescription || !file) {
      event.preventDefault();
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('apiKey', apiKey);
    formData.append('jobDescription', jobDescription);
    formData.append('file', file);

    runButton.classList.add('hidden');
    spinner.style.display = 'block';
    result.innerHTML = '';

    fetch('http://localhost:5000/process', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {  
      if (data.result) {
        const jsonString = data.result.match(/\{.*\}/s)[0];
        const jsonData = JSON.parse(jsonString);
        displayParsedJSON(jsonData);
        result.scrollIntoView({ behavior: 'smooth' });
      } else if (data.error) {
        result.innerText = 'Error: ' + data.error;
        result.scrollIntoView({ behavior: 'smooth' }); 
      }
    })
    .catch(error => {
      console.error('Error:', error);
      result.innerText = 'Error: ' + error.message;
      result.scrollIntoView({ behavior: 'smooth' }); 
    })
    .finally(() => {
      spinner.style.display = 'none';
      runButton.classList.remove('hidden');
    });
  });
});

function displayParsedJSON(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  // Summary
  const summary = document.createElement('div');
  summary.innerHTML = `
    <h3>Summary</h3>
    <p><strong>Strengths:</strong> ${data.summary.strengths}</p>
    <p><strong>Gaps:</strong> ${data.summary.gaps}</p>
    <p><strong>Advice:</strong> ${data.summary.advice}</p>
  `;
  resultDiv.appendChild(summary);

  // Skills
  const skills = document.createElement('div');
  skills.innerHTML = `
    <h3>Skills</h3>
    <p><strong>Matching:</strong> ${data.skills.matching.join(', ')}</p>
    <p><strong>Missing:</strong> ${data.skills.missing.join(', ')}</p>
    <p><strong>Suggestions:</strong></p>
    <ul>${data.skills.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
  `;
  resultDiv.appendChild(skills);

  // Experience
  const experience = document.createElement('div');
  experience.innerHTML = '<h3>Experience</h3>';
  data.experience.forEach(exp => {
    const expDiv = document.createElement('div');
    expDiv.innerHTML = `
      <h4>${exp.role}</h4>
      <p><strong>Alignment:</strong> ${exp.alignment}</p>
      <p><strong>Current:</strong> ${exp.current}</p>
      <p><strong>Improved:</strong> ${exp.improved}</p>
      <p><strong>Metrics:</strong> ${exp.metrics}</p><br>
    `;
    experience.appendChild(expDiv);
  });
  resultDiv.appendChild(experience);

  // Projects
  if (data.projects && data.projects.length > 0) {
    const projects = document.createElement('div');
    projects.innerHTML = '<h3>Key Projects</h3>';
    data.projects.forEach(proj => {
      const projDiv = document.createElement('div');
      projDiv.innerHTML = `
        <h4>${proj.title}</h4>
        <p><strong>Relevance:</strong> ${proj.relevance}</p>
        <p><strong>Skills:</strong> ${proj.skills.join(', ')}</p>
        <p><strong>How to Highlight:</strong> ${proj.highlight}</p><br>
      `;
      projects.appendChild(projDiv);
    });
    resultDiv.appendChild(projects);
  }

  // Education
  const education = document.createElement('div');
  education.innerHTML = `
    <h3>Education</h3>
    <p><strong>Relevance:</strong> ${data.education.relevance}</p>
    <p><strong>Highlight Coursework:</strong> ${data.education.coursework.join(', ')}</p>
    <p><strong>Suggestion:</strong> ${data.education.suggestion}</p>
  `;
  resultDiv.appendChild(education);

  // Certifications
  const certifications = document.createElement('div');
  certifications.innerHTML = `
    <h3>Certifications</h3>
    <p><strong>Relevant:</strong> ${data.certifications.relevant.join(', ') || 'None'}</p>
    <p><strong>Recommended:</strong> ${data.certifications.recommended.join(', ') || 'None'}</p>
  `;
  resultDiv.appendChild(certifications);

  // Keywords, Formatting, and Action Verbs
  const optimize = document.createElement('div');
  optimize.innerHTML = `
    <h3>Resume Optimization</h3>
    <p><strong>Keywords:</strong> ${data.keywords.join(', ')}</p>
    <p><strong>Formatting Tips:</strong></p>
    <ul>${data.formatting.map(f => `<li>${f}</li>`).join('')}</ul>
    <p><strong>Action Verbs:</strong> ${data.action_verbs.join(', ')}</p>
  `;
  resultDiv.appendChild(optimize);

  // Additional Sections
  if (data.additional_sections && data.additional_sections.length > 0) {
    const additional = document.createElement('div');
    additional.innerHTML = `
      <h3>Additional Sections to Consider</h3>
      <ul>${data.additional_sections.map(s => `<li>${s}</li>`).join('')}</ul>
    `;
    resultDiv.appendChild(additional);
  }

  const thankYouMessage = document.createElement('p');
  thankYouMessage.innerHTML = `
    <br><strong>Thanks for using Resume Optimizer!</strong><br>
    With these tailored improvements, your resume will be much more compelling.
    Don't forget to proofread and get feedback from industry professionals.
    Good luck with your application!
  `;
  resultDiv.appendChild(thankYouMessage);
}
