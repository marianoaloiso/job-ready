document.getElementById('runButton').addEventListener('click', function () {
    const apiKey = document.getElementById('apiKey').value;
    const resume = document.getElementById('resume').value;
    const jobDescription = document.getElementById('jobDescription').value;

    if (apiKey && resume && jobDescription) {
        const requestData = {
            apiKey: apiKey,
            resume: resume,
            jobDescription: jobDescription
        };

        fetch('http://localhost:5000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = data.result;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please fill in all fields.');
    }
});

