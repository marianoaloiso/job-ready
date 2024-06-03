document.addEventListener('DOMContentLoaded', function() {
  const apiKeyInput = document.getElementById('apiKey');
  const jobDescriptionInput = document.getElementById('jobDescription');
  const fileInput = document.getElementById('file');
  const runButton = document.getElementById('runButton');
  const spinner = document.getElementById('spinner');
  const result = document.getElementById('result');

  function checkFields() {
    const allFieldsFilled = apiKeyInput.value && jobDescriptionInput.value && fileInput.files.length > 0;
    runButton.disabled = !allFieldsFilled;
    runButton.style.backgroundColor = allFieldsFilled ? '#007bff' : '#ccc';
  }

  apiKeyInput.addEventListener('input', checkFields);
  jobDescriptionInput.addEventListener('input', checkFields);
  fileInput.addEventListener('change', checkFields);

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
      } else if (data.error) {
        result.innerText = 'Error: ' + data.error;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      result.innerText = 'Error: ' + error.message;
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

    const summary = document.createElement('p');

    summary.innerHTML = `<strong>Summary:</strong> ${data.summary}`;
    summary.style.color = "#333";
    resultDiv.appendChild(summary);

    const skills = document.createElement('p');
    skills.innerHTML = `<strong>Skills:</strong> ${data.skills.join(', ')}`;
    skills.style.color = "#333";

    resultDiv.appendChild(skills);

    const experience = document.createElement('div');
    experience.innerHTML = '<h3>Experience:</h3>';
    data.experience.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.innerHTML = `
            <strong>Role:</strong> ${exp.role}<br>
            <strong>Company:</strong> ${exp.company}<br>
            <strong>Duration:</strong> ${exp.duration}<br>
            <strong>Description:</strong> ${exp.description}<br><br>
        `;
        experience.appendChild(expDiv);
    });
    resultDiv.appendChild(experience);

    const education = document.createElement('div');
    education.innerHTML = '<h3>Education:</h3>';
    data.education.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.innerHTML = `
            <strong>Degree:</strong> ${edu.degree}<br>
            <strong>Institution:</strong> ${edu.institution}<br>
            <strong>Duration:</strong> ${edu.duration}<br><br>
        `;
        education.appendChild(eduDiv);
    });
    resultDiv.appendChild(education);

    const certifications = document.createElement('p');

    certifications.innerHTML = `<strong>Certifications:</strong> ${data.certifications.join(', ') || 'None'}`;
    certifications.style.color = "#333";
    resultDiv.appendChild(certifications);

    const thankYouMessage = document.createElement('p');
    thankYouMessage.textContent = "Thanks for using Resume Optimizer! Tell your friends!";
    resultDiv.appendChild(thankYouMessage);
}

