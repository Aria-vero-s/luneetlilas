import os, traceback, json
from dotenv import load_dotenv

# Load .env locally; in prod this is a no-op
load_dotenv()

from serverless_wsgi import handle_request
from config.wsgi import application

def handler(event, context):
    try:
        # Normal request flow
        return handle_request(application, event, context)
    except Exception as e:
        # On error, return the full traceback in the response body
        tb = traceback.format_exc()
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "text/plain"},
            "body": tb
        }
