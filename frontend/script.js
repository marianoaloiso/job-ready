document.getElementById('runButton').addEventListener('click', function () {
    const apiKey = document.getElementById('apiKey').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const file = document.getElementById('file').files[0];

    if (apiKey && jobDescription && file) {
        const formData = new FormData();
        formData.append('apiKey', apiKey);
        formData.append('jobDescription', jobDescription);
        formData.append('file', file);

        fetch('http://localhost:5000/process', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.result) {
                document.getElementById('result').innerText = data.result;
            } else if (data.error) {
                document.getElementById('result').innerText = 'Error: ' + data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Error: ' + error.message;
        });
    } else {
        alert('Please fill in all fields.');
    }
});

