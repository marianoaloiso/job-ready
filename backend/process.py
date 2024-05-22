import openai

def process(
        resume_text: str,
        job_description: str,
        openai_api_key: str,
    ):
    prompt = f"Resume:\n{resume_text}\nJob Description:\n{job_description}\n"
    """
    openai.api_key = openai_api_key
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=150
    )
    """
    response = "response"
    
    #generated_text = response.choices[0].text.strip()

    generated_text = response + "test"

    return generated_text

