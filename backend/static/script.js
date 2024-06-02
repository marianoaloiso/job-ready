document.getElementById('runButton').addEventListener('click', function () {
    const apiKey = document.getElementById('apiKey').value;
    const resume = document.getElementById('resume').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const file = document.getElementById('file').files[0];

    if (apiKey && jobDescription && (resume || file)) {
        const formData = new FormData();
        formData.append('apiKey', apiKey);
        formData.append('jobDescription', jobDescription);

        if (file) {
            formData.append('file', file);
        } else {
            formData.append('resume', resume);
        }

        fetch('http://localhost:5000/process', {
            method: 'POST',
            body: formData
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
