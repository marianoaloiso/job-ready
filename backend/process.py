from gemini_client import generate_response
import os
import PyPDF2

def load_tailor_resume_prompt() -> str:
    base_path = os.path.dirname(__file__)
    prompt_path = os.path.join(base_path, "prompts/tailor_resume.txt")
    with open(prompt_path, "r") as file:
        prompt = file.read()
    return prompt

def extract_text_from_pdf(file) -> str:
    reader = PyPDF2.PdfFileReader(file)
    text = ""
    for page_num in range(reader.numPages):
        page = reader.getPage(page_num)
        text += page.extract_text()
    return text

def process(resume_text: str, job_description: str, gemini_api_key: str) -> str:
    prompt = load_tailor_resume_prompt()
    prompt = prompt.format(resume_text=resume_text, job_description=job_description)
    response = generate_response(prompt, gemini_api_key)
    return response
