from pymongo import MongoClient
from config import MONGO_URI, GEMINI_API_KEY
import google.generativeai as genai

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def get_all_betting_history():
    client = MongoClient(MONGO_URI)
    db = client['betsmartdb']
    bets_collection = db['bets']
    
    bets = list(bets_collection.find({}))
    client.close()
    
    return bets

def analyze_betting_patterns(bets):
    total_bets = len(bets)
    wins = 0
    losses = 0
    
    for bet in bets:
        bet_choice = bet['betChoice']
        result = bet['result']
        fixture = bet['fixture']
        
        home_team, away_team = fixture.split(' vs ')
        home_score, away_score = map(int, result.split('-'))
        
        if (bet_choice == home_team and home_score > away_score) or (bet_choice == away_team and away_score > home_score):
            wins += 1
        else:
            losses += 1
    
    return {
        'total_bets': total_bets,
        'wins': wins,
        'losses': losses
    }

def generate_recommendations():
    bets = get_all_betting_history()
    patterns = analyze_betting_patterns(bets)
    
    if patterns['total_bets'] == 0:
        return "It's impossible to determine the best betting strategy with no betting history. Here's why: * **No Data:** You have no information on past bets, odds, or outcomes."

    prompt = f"Based on the following betting history: {patterns['total_bets']} bets with {patterns['wins']} wins and {patterns['losses']} losses, which strategy is the best?"
    
    response = model.generate_content(prompt)
    return response.text