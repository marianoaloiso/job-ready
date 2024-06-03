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
