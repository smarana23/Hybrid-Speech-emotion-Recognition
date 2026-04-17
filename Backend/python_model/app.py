from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
import utils
import predict
import sys
import matplotlib.pyplot as plt
import numpy as np
import warnings
warnings.filterwarnings("ignore")
from pydub import AudioSegment 

app = Flask(__name__)
CORS(app, origins="*")
sys.argv = ["app.py", "--config", "configs/lstm.yaml"]
config = utils.parse_opt()
@app.route('/predict', methods=['POST'])
def predict_route():

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    os.makedirs("recordings", exist_ok=True)

    timestamp = int(time.time())
    # ✅ Step 1: Save as webm
    webm_path = f"recordings/audio_{timestamp}.webm"
    file.save(webm_path)

# ✅ Step 2: Convert to wav
    wav_path = f"recordings/audio_{timestamp}.wav"

    audio = AudioSegment.from_file(webm_path, format="webm")
    audio.export(wav_path, format="wav")

# ✅ Step 3: Use wav for prediction
    emotion, prob = predict.predict_emotion(config, wav_path)

    return jsonify({
        "emotion": emotion,
        "probability": prob.tolist()
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
# if __name__ == "__main__":
#     app.run(port="0.0.0.0",port = 5000)




# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import time
# import utils
# import predict
# import sys
# import matplotlib.pyplot as plt
# import numpy as np


# app = Flask(__name__)
# CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict_route():

#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']

#     os.makedirs("recordings", exist_ok=True)

#     timestamp = int(time.time())
#     audio_path = f"recordings/audio_{timestamp}.wav"

#     file.save(audio_path)

    
#     if not os.path.exists("current_model.txt"):
#         return jsonify({"error": "No trained model found"}), 400

#     with open("current_model.txt", "r") as f:
#         config_path = f.read().strip()

#     sys.argv = ["app.py", "--config", config_path]
#     config = utils.parse_opt()

#     emotion, prob = predict.predict_emotion(config, audio_path)

#     return jsonify({
#         "emotion": emotion,
#         "probability": prob.tolist()
#     })
# if __name__ == "__main__":
#     app.run(port=5000, debug=True)
