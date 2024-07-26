from pymongo import MongoClient
from config import MONGO_URI, GEMINI_API_KEY
import google.generativeai as genai

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def get_user_betting_history(user_id):
    client = MongoClient(MONGO_URI)
    db = client['betsmartdb']
    bets_collection = db['bets']
    
    bets = list(bets_collection.find({'user': user_id}))
    client.close()
    
    return bets

def analyze_betting_patterns(bets):
    total_bets = len(bets)
    wins = sum(1 for bet in bets if bet['result'] == 'win')
    losses = sum(1 for bet in bets if bet['result'] == 'loss')
    
    return {
        'total_bets': total_bets,
        'wins': wins,
        'losses': losses
    }

def generate_recommendations(user_id):
    bets = get_user_betting_history(user_id)
    patterns = analyze_betting_patterns(bets)
    
    prompt = f"Based on the following betting history: {patterns['total_bets']} bets with {patterns['wins']} wins and {patterns['losses']} losses, which strategy is the best?"
    
    response = model.generate_content(prompt)
    return response.text
