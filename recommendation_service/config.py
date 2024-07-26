import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/betsmartdb')
GEMINI_API_KEY = 'AIzaSyA5UDIdijW69WijVyPZixAoata7POoN9bk'
