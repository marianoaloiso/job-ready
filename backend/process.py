from gemini_client import generate_response
import os
import PyPDF2

def load_tailor_resume_prompt() -> str:
    """
    Load the prompt to tailor a resume.
    :return: str: The prompt
    """
    base_path = os.path.dirname(__file__)
    prompt_path = os.path.join(
        base_path,
        "prompts/tailor_resume.txt"
        )
    with open(prompt_path, "r") as file:
        prompt = file.read()
    return prompt

def extract_text_from_pdf(file) -> str:
    """
    Extract text from a PDF file.
    :param file: str: Path to the PDF file
    :return: str: Extracted text
    """
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text

def process(
        resume_text: str,
        job_description: str,
        api_key: str
    ) -> str:
    """
    Process the resume and job description to generate a response.
    :param resume_text: str: Resume text
    :param job_description: str: Job description
    :param api_key: str: API key
    :return: str: Generated text
    """
    prompt = load_tailor_resume_prompt()
    prompt = prompt.format(
        resume_text=resume_text,
        job_description=job_description)
    response = generate_response(prompt, api_key)
    return response

