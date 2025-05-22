from typing import List, Optional

from google.adk.agents import LlmAgent
from backend_mvp.agents.utils import load_instruction_from_file
from pydantic import BaseModel, Field


class Chapter(BaseModel):
    caption: str = Field(description="Short caption of the chapter. Optimally 1-5 words")
    content: List[str] = (
        Field(description="Content of the chapter. "
                          "Each element of the list should be a short description (one bullet point/sentence)"))
    time: int = Field(description="Time of the chapter in minutes.")
    note: Optional[str] = (
        Field(description="If you could not fit some information into caption or content just dump it here"))


class LearningPath(BaseModel):
    chapters: List[Chapter] = Field(description="This is a list of chapters for the learning path")


# Create the planner agent
planner_agent = LlmAgent(
    name="planner_agent",
    model="gemini-2.0-flash",
    description="Agent for planning Learning Paths and Courses",
    output_schema=LearningPath,
    instruction=load_instruction_from_file("planner_agent/instructions.txt"),
    disallow_transfer_to_parent=True,
    disallow_transfer_to_peers=True
)