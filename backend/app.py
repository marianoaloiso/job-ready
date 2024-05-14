from flask import Flask, request, jsonify
from process import process

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    resume = data.get('resume')
    job_description = data.get('job_description')

    result = process(resume, job_description)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

