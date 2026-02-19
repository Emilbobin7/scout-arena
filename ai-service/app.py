from flask import Flask, request, jsonify
import random
import math

app = Flask(__name__)

def performance_tier(score):
    if score >= 90: return "Elite"
    if score >= 80: return "Advanced"
    if score >= 70: return "Proficient"
    if score >= 60: return "Developing"
    return "Beginner"

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "scout-arena-ai"})

@app.route("/analyze", methods=["POST"])
def analyze():
    # Simulate AI video analysis
    # In future: use MediaPipe / YOLOv8 / pose detection on video frames
    data = request.get_json(silent=True) or {}

    # Weighted random — centers scores around 75-88 range (more realistic)
    def weighted_score():
        base = random.gauss(80, 8)          # Normal dist centered at 80, std 8
        return max(40, min(99, math.floor(base)))

    speed    = weighted_score()
    agility  = weighted_score()
    accuracy = weighted_score()
    reaction = weighted_score()
    overall  = math.floor((speed + agility + accuracy + reaction) / 4)

    return jsonify({
        "speedScore":    speed,
        "agilityScore":  agility,
        "accuracyScore": accuracy,
        "reactionScore": reaction,
        "overallScore":  overall,
        "tier":          performance_tier(overall),
        "breakdown": {
            "speed":    {"score": speed,    "tier": performance_tier(speed)},
            "agility":  {"score": agility,  "tier": performance_tier(agility)},
            "accuracy": {"score": accuracy, "tier": performance_tier(accuracy)},
            "reaction": {"score": reaction, "tier": performance_tier(reaction)},
        }
    })

if __name__ == "__main__":
    print("Scout Arena AI Service running on port 8000")
    app.run(port=8000, debug=False)
