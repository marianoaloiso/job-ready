import google.generativeai as genai
import config

def generate_response(
        prompt: str,
        gemini_api_key: str=None
        ) -> str:
    """
    Generate a response from the Gemini model.
    :param prompt: str: The prompt to send to the model
    :return: str: The generated response
    """

    if config.GEMINI_API_KEY is None and gemini_api_key is None:
        raise ValueError("API key must be provided or set as an environment variable.")
    if gemini_api_key is None:
            gemini_api_key = config.GEMINI_API_KEY

    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel(
            model_name="gemini-1.5-flash-latest",
            safety_settings=config.SAFETY_SETTINGS,
            generation_config=config.GENERATION_CONFIG,
        )

    response = model.generate_content(prompt)
    return response.text

