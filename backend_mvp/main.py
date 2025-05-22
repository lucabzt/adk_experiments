import asyncio
import uuid

from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from backend_mvp.agents.planner_agent import planner_agent

load_dotenv()

APP_NAME = "TeachAI"
USER_ID = str(uuid.uuid4())


async def main_async():
    # Create session service
    session_service = InMemorySessionService()

    # Create session
    session = await session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        state={}  # Initial state if needed
    )
    SESSION_ID = session.id

    # Create runner
    runner = Runner(
        agent=planner_agent,
        app_name=APP_NAME,
        session_service=session_service
    )

    def call_agent(query):
        content = types.Content(role="user", parts=[types.Part(text=query)])

        for event in runner.run(
                user_id=USER_ID,
                session_id=SESSION_ID,
                new_message=content
        ):
            if event.is_final_response():
                if event.content and event.content.parts:
                    final_response = event.content.parts[0].text
                    print("Agent Response: ", final_response)

    learning_goal = input("What do you want to learn?\n")
    time = int(input("How many hours do you want to invest?\n"))
    call_agent(f"""
        Question (System): What do you want to learn?
        Answer (User): \n{learning_goal}
        Question (System): How many hours do you want to invest?
        Answer (User): {time}
    """)

if __name__ == "__main__":
    asyncio.run(main_async())