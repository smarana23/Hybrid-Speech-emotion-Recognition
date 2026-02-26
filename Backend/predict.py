
# ----------------------------------------------------------------------
# 18/02/2026


import os
import glob
import extract_feats.librosa as lf
import models
import utils
import numpy as np


def predict_emotion(config, audio_path: str):
    test_feature = lf.get_data(config, audio_path, train=False)
    model = models.load(config)

    result = model.predict(test_feature)
    result_prob = model.predict_proba(test_feature)

    emotion = config.class_labels[int(result)]

    print("Prediction:", emotion)
    print("Probability:", result_prob)

    # 🔥 This will show graph
    utils.radar(result_prob, config.class_labels)

    return emotion, result_prob


if __name__ == "__main__":

    config = utils.parse_opt()

    # 🔥 Find latest recorded file automatically
    files = glob.glob("recordings/*.wav")
    if not files:
        print("No recordings found!")
        exit()

    latest_file = max(files, key=os.path.getctime)

    print("Using file:", latest_file)

    predict_emotion(config, latest_file)
