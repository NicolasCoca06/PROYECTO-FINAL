from flask import Flask, jsonify
from flask_cors import CORS
from bet_recommender import generate_recommendations

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        recommendations = generate_recommendations()
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        app.logger.error(f"Error generating recommendations: {e}")
        return jsonify({'error': 'Failed to generate recommendations'}), 500

if __name__ == '__main__':
    app.run(port=5000)
