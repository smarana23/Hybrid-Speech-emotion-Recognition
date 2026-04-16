import os

dataset_path = "datasets"

total = 0

for emotion in os.listdir(dataset_path):
    emotion_folder = os.path.join(dataset_path, emotion)

    if os.path.isdir(emotion_folder):
        files = [f for f in os.listdir(emotion_folder) if f.endswith(".wav")]
        print(emotion, ":", len(files))
        total += len(files)

print("\nTotal files:", total)