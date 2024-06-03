/*
document.getElementById('runButton').addEventListener('click', function () {
    const apiKey = document.getElementById('apiKey').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const file = document.getElementById('file').files[0];
    const spinner = document.getElementById('spinner');

    if (apiKey && jobDescription && file) {
        const formData = new FormData();
        formData.append('apiKey', apiKey);
        formData.append('jobDescription', jobDescription);
        formData.append('file', file);

        // Show the spinner and clear previous results
        spinner.style.display = 'block';
        result.innerHTML = ''; 

        fetch('http://localhost:5000/process', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            console.log(data);
            if (data.result) {
                document.getElementById('result').innerText = data.result;
            } else if (data.error) {
                document.getElementById('result').innerText = 'Error: ' + data.error;
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Error: ' + error.message;
        });
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('runButton').addEventListener('click', function() {
    fetch('../notebooks/sample_output.txt')
        .then(response => response.text())
        .then(data => {
            const jsonString = data.match(/\{.*\}/s)[0];
            const jsonData = JSON.parse(jsonString);
            
            displayParsedJSON(jsonData);
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});
*/
document.getElementById('runButton').addEventListener('click', function () {
    const apiKey = document.getElementById('apiKey').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const file = document.getElementById('file').files[0];
    const spinner = document.getElementById('spinner');

    if (apiKey && jobDescription && file) {
        const formData = new FormData();
        formData.append('apiKey', apiKey);
        formData.append('jobDescription', jobDescription);
        formData.append('file', file);

        // Show the spinner and clear previous results
        spinner.style.display = 'block';
        result.innerHTML = ''; 

        fetch('http://localhost:5000/process', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            
            if (data.result) {
                const jsonString = data.result.match(/\{.*\}/s)[0];
                const jsonData = JSON.parse(jsonString);
                displayParsedJSON(jsonData);
            } else if (data.error) {
                result.innerText = 'Error: ' + data.error;
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Error: ' + error.message;
        });
    } else {
        alert('Please fill in all fields.');
    }
});

function displayParsedJSON(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const summary = document.createElement('p');
    summary.textContent = `Summary: ${data.summary}`;
    resultDiv.appendChild(summary);

    const skills = document.createElement('p');
    skills.textContent = `Skills: ${data.skills.join(', ')}`;
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
    certifications.textContent = `Certifications: ${data.certifications.join(', ') || 'None'}`;
    resultDiv.appendChild(certifications);
}

