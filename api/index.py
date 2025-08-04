import os
from dotenv import load_dotenv

# 1) Set your settings module before loading Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# 2) Load any local .env for dev
load_dotenv()  # (Vercel will use real env-vars you configure in the Dashboard)

# 3) Get the WSGI application
from django.core.wsgi import get_wsgi_application
app = get_wsgi_application()
