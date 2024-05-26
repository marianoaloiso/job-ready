from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from process import process, extract_text_from_pdf


app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/process', methods=['POST'])
def process_request():
    data = request.json
    resume_text = data.get('resume')
    job_description = data.get('jobDescription')
    openai_api_key = data.get('apiKey')

    if not resume_text or not job_description or not openai_api_key:
        return jsonify({'error': 'Missing data'}), 400

    try:
        result = process(resume_text, job_description, openai_api_key)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.endswith('.pdf'):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        try:
            text = extract_text_from_pdf(filepath)
            os.remove(filepath)
            return jsonify({'text': text}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)

