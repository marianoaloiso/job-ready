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

