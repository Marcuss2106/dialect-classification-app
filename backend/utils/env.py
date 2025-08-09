import os
from dotenv import load_dotenv

load_dotenv()

ENV = os.getenv("ENV", "production")  # default to production


def is_test_env() -> bool:
    return ENV.lower() == "test"


def is_prod_env() -> bool:
    return ENV.lower() == "production"
