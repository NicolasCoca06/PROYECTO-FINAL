from flask import Flask, request, jsonify
from flask_cors import CORS
from bet_recommender import generate_recommendations

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})   

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    try:
        recommendations = generate_recommendations(user_id)
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        app.logger.error(f"Error generating recommendations: {e}")
        return jsonify({'error': 'Failed to generate recommendations'}), 500

if __name__ == '__main__':
    app.run(port=5000)
