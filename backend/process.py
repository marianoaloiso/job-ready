from gemini_client import generate_response
import os
import fitz  # PyMuPDF


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

def process(
        resume_text: str,
        job_description: str,
        gemini_api_key: str
    ) -> str:
    """
    Process the resume and job description to generate a response.
    :param resume_text: str: Resume text
    :param job_description: str: Job description
    :param gemini_api_key: str: Gemini API key
    :return: str: Generated text
    """
    prompt = load_tailor_resume_prompt()
    prompt = prompt.format(
        resume_text=resume_text,
        job_description=job_description)
    response = generate_response(prompt, gemini_api_key)
    return response

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file.
    :param pdf_path: str: Path to the PDF file
    :return: str: Extracted text
    """
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()
    return text
