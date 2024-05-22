from gemini_client import generate_response
import os

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


