import openai

openai.api_key = ""

def process(resume_text, job_description):
    prompt = f"Resume:\n{resume_text}\nJob Description:\n{job_description}\n"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=150
    )
    
    generated_text = response.choices[0].text.strip()

    return generated_text

