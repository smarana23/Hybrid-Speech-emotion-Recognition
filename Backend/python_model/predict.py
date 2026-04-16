
# # ----------------------------------------------------------------------
# # 18/02/2026


import os
import glob
import extract_feats.librosa as lf
import models
import utils
import numpy as np
import scipy.special


# def predict_emotion(config, audio_path: str):
#     test_feature = lf.get_data(config, audio_path, train=False)
#     model = models.load(config)

#     result = model.predict(test_feature)
    

#     raw_prob = model.predict_proba(test_feature)


#     temperature = 2.5
#     result_prob = scipy.special.softmax(raw_prob / temperature)
#     result_prob = scipy.special.softmax(raw_prob)

#     emotion = config.class_labels[int(result)]

#     print("Prediction:", emotion)
#     print("Probability:", result_prob)

#     # 🔥 This will show graph
#     utils.radar(result_prob, config.class_labels)

#     return emotion, result_prob


# if __name__ == "__main__":

#     config = utils.parse_opt()

#     # 🔥 Find latest recorded file automatically
#     files = glob.glob("recordings/*.wav")
#     if not files:
#         print("No recordings found!")
#         exit()

#     latest_file = max(files, key=os.path.getctime)

#     print("Using file:", latest_file)

#     predict_emotion(config, latest_file)

def predict_emotion(config, audio_path: str):

    test_feature = lf.get_data(config, audio_path, train=False)

    model = models.load(config)

    probs = model.predict_proba(test_feature)

    probs = np.array(probs).flatten()


    total = np.sum(probs)

    if total == 0:
        probs = np.ones(len(probs)) / len(probs)
    else:
        probs = probs / total


    sorted_indices = np.argsort(probs)[::-1]

    top1 = sorted_indices[0]
    top2 = sorted_indices[1]

    emotion1 = config.class_labels[top1]
    emotion2 = config.class_labels[top2]


    angry_index = config.class_labels.index("angry")

    if emotion1 == "angry" and probs[angry_index] < 0.7:
        emotion = "neutral"


    elif probs[top2] > 0.15:
        emotion = f"{emotion1} + {emotion2}"


    else:
        emotion = emotion1

    print("Prediction:", emotion)
    print("Probabilities:", probs)

    return emotion, probs
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