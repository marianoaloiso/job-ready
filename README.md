## Job Ready - Tailored Resumes for Every Job

This project implements a web application that helps users tailor their resumes for specific job applications. 

### Features

* Upload resumes and job descriptions.
* Analyze both texts to identify relevant skills and experiences mentioned in the job description.
* Suggest improvements to the user's resume, highlighting the skills and experiences most relevant to the specific job.

### Technologies

* **Backend:** Flask, Python
* **Frontend:** HTML, CSS, JavaScript
* **Deployment:** Docker

### Getting Started

It is recommended to create a virtual environment to install the project dependencies. You can do this by running the following commands:

```bash
python3 -m venv venv
source venv/bin/activate
```

Next, install the dependencies using pip:

```bash
pip install -r requirements.txt
```

**Running the Application:**

1. Ensure you have Python and dependencies installed.
2. Run the following command in your terminal:

```bash
python backend/app.py
```

This will start the Flask development server, typically accessible at `http://127.0.0.1:5000/` by default.

**Project Structure:**

The project follows a common structure for Flask applications:

* **backend/**: This folder contains the core application logic.
    * **app.py**: The main Flask application script. It handles routing, instantiates extensions, and defines views for the application. 
    * **process.py**: Functions to process the resume and job description texts.
    * **suggest.py**: Functions to suggest improvements to the resume based on the job description.
* **frontend/**: This folder contains the core application logic.
    * **index.html**: The main HTML template for the application.
    * **style.css**: CSS styles for the application.
    * **script.js**: JavaScript code for the application. 
* **notebooks/**: Jupyter notebooks used for experimentation.
* **tests/**: Unit tests for the application.
* **.gitignore**: Files or folders that should be excluded from version control using Git.
* **Dockerfile**: Instructions for building a Docker image.
* **requirements.txt**: Lists dependencies needed to run the application.

### Future Development

* TBD

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
