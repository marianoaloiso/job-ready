from flask import Flask, request, jsonify
from flask_cors import CORS
from process import process

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)

