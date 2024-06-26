from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from process import process, extract_text_from_pdf
import os

app = Flask(__name__, static_folder='static')
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/process', methods=['POST'])
def process_request():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    resume_text = ""
    if file and file.filename.endswith('.pdf'):
        resume_text = extract_text_from_pdf(file)
    else:
        return jsonify({'error': 'Unsupported file type'}), 400

    job_description = request.form.get('jobDescription')
    api_key = request.form.get('apiKey')

    if not resume_text or not job_description or not api_key:
        return jsonify({'error': 'Missing data'}), 400

    try:
        result = process(resume_text, job_description, api_key)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
