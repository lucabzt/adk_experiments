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


prompt = input("What do you want to visualize?\n")
print("Okay, cooking this up for you...")

# PROMPT OPENAI
response = client.responses.parse(
            model="o4-mini",
            text_format=Visualization,
            input=[
                {"role": "system", "content": vis_prompt},
                {"role": "user", "content": prompt},
            ]
)

print(response.output_parsed.model_dump()['code'])

exec(response.output_parsed.model_dump()['code'])

print(response.output_parsed.model_dump()['description'])