import os

from dotenv import load_dotenv
from openai import OpenAI
from system_prompt import vis_prompt
from pydantic import BaseModel


# CONFIGURE ENVIRONMENT
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)


# DEFINE OUTPUT SCHEMA (Add Form(description) here) TODO
class Visualization(BaseModel):
    caption: str
    code: str
    description: str


# PROMPT OPENAI
response = client.responses.parse(
            model="gpt-4o-mini",
            text_format=Visualization,
            input=[
                {"role": "system", "content": vis_prompt},
                {"role": "user", "content": """
                    Please visualize the profit graph of a call option
                """},
            ]
)

print(response.output_parsed.model_dump())