import os
from dotenv import load_dotenv
load_dotenv()

from serverless_wsgi import handle_request
from config.wsgi import application

def handler(event, context):
    return handle_request(application, event, context)
