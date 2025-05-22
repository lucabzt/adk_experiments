import asyncio
from google.genai import types
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from google.adk.agents import LlmAgent, LoopAgent
from google.adk.tools import google_search
from dotenv import load_dotenv

load_dotenv()

# Your agents (same as before)
scriptwriter_agent = LlmAgent(
    name="ShortsScriptwriter",
    model="gemini-2.0-flash-001",
    instruction="write a script",
    tools=[google_search],
    output_key="generated_script",
)

visualizer_agent = LlmAgent(
    name="ShortsVisualizer",
    model="gemini-2.0-flash-001",
    instruction="visualize the script",
    description="Generates visual concepts based on a provided script.",
    output_key="visual_concepts",
)

formatter_agent = LlmAgent(
    name="ConceptFormatter",
    model="gemini-2.0-flash-001",
    instruction="""Combine the script from state['generated_script'] and the visual concepts from state['visual_concepts'] into the final Markdown format requested previously (Hook, Script & Visuals table, Visual Notes, CTA).""",
    description="Formats the final Short concept.",
    output_key="final_short_concept",
)

youtube_shorts_agent = LoopAgent(
    name="youtube_shorts_agent",
    sub_agents=[scriptwriter_agent, visualizer_agent, formatter_agent],
)

root_agent = youtube_shorts_agent

# Constants
APP_NAME = "youtube_shorts_app"
USER_ID = "12345"


async def main_async():
    # Create session service
    session_service = InMemorySessionService()

    # Create session (ASYNC!)
    session = await session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        state={}  # Initial state if needed
    )
    SESSION_ID = session.id

    # Create runner
    runner = Runner(
        agent=youtube_shorts_agent,
        app_name=APP_NAME,
        session_service=session_service
    )

    # Agent interaction function
    async def call_agent_async(query):
        content = types.Content(role="user", parts=[types.Part(text=query)])

        async for event in runner.run_async(
                user_id=USER_ID,
                session_id=SESSION_ID,
                new_message=content
        ):
            if event.is_final_response():
                if event.content and event.content.parts:
                    final_response = event.content.parts[0].text
                    print("Agent Response: ", final_response)

    # Call the agent
    await call_agent_async("I want to write a short on how to build AI Agents")


# Run the async function
if __name__ == "__main__":
    asyncio.run(main_async())