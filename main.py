import os

from dotenv import load_dotenv
from openai import OpenAI
from adk_test.visualizer_test.system_prompt import vis_prompt
from pydantic import BaseModel

### CONFIGURE ENVIRONMENT

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

### DEFINE OUTPUT SCHEMA (Add Form(description) here) TODO

class Visualization(BaseModel):
    caption: str
    code: str
    description: str

response = client.responses.parse(
            model="gpt-4o",
            text_format=Visualization,
            input=[
                {"role": "system", "content": vis_prompt},
                {"role": "user", "content": """
                    Please visualize the profit graph of a call option
                """},
            ]
)

print(response.output_parsed.model_dump())