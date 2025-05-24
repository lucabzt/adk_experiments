import asyncio
import json
import uuid
from dotenv import load_dotenv
from google.adk.sessions import InMemorySessionService

from backend_mvp.agents.explainer_agent.agent import ExplainerAgent
from backend_mvp.agents.planner_agent import PlannerAgent
from backend_mvp.agents.utils import create_text_query


load_dotenv()

APP_NAME = "TeachAI"
session_service = InMemorySessionService()

# We will get this from the frontend over the rest endpoint
USER_ID = str(uuid.uuid4())


def frontend():
    """ Mock frontend functionality """
    learning_goal = input("What do you want to learn?\n")
    time = int(input("How many hours do you want to invest?\n"))
    query = create_text_query(f"""
            Question (System): What do you want to learn?
            Answer (User): \n{learning_goal}
            Question (System): How many hours do you want to invest?
            Answer (User): {time}
        """)
    return query


async def get_new_session_id(user_id):
    """ Get a new memory session for the given user id """
    session = await session_service.create_session(
        app_name=APP_NAME,
        user_id=user_id,
        state={}  # Initial state if needed
    )
    return session.id


async def main_async():

    # Get sessions
    planner_session = await get_new_session_id(USER_ID)
    explainer_session = await get_new_session_id(USER_ID)

    # Create agents
    planner_agent = PlannerAgent(APP_NAME, session_service)
    explainer_agent = ExplainerAgent(APP_NAME, session_service)

    # Query the planner agent (returns a dict)
    response = await planner_agent.run(
        user_id=USER_ID,
        session_id=planner_session,
        content=frontend(),
        debug=False
    )
    #print(f"Response from planner Agent: \n{json.dumps(response, indent=2)}")

    # TODO add error handling for status error

    for idx, topic in enumerate(response["chapters"]):
        pretty_topic = f"""
            Chapter {idx + 1}:
            Caption: {topic['caption']}
            Content: \n{json.dumps(topic['content'], indent=2)}
        """

        print(pretty_topic)

        response_explainer = await explainer_agent.run(
            user_id=USER_ID,
            session_id=explainer_session,
            content=create_text_query(pretty_topic),
        )

        print("---------- EXPLANATION ----------")
        print(response_explainer['explanation'])
        with open(f"markdown_test/{idx}_{topic['caption']}.md", "w", encoding="utf-8") as file:
            file.write(response_explainer['explanation'])

if __name__ == "__main__":
    asyncio.run(main_async())