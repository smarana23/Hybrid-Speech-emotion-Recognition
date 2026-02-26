import os
import shutil

# Path where your 44 audio files are currently stored
source_folder = "raw_data"   # change this if needed

# Destination dataset folder
destination_folder = "datasets"

# Emotion mapping
emotion_map = {
    "01": "neutral",
    "02": "calm",
    "03": "happy",
    "04": "sad",
    "05": "angry",
    "06": "fearful",
    "07": "disgust",
    "08": "surprised"
}

# Create emotion folders if they don't exist
for emotion in emotion_map.values():
    os.makedirs(os.path.join(destination_folder, emotion), exist_ok=True)

# Move files
for file in os.listdir(source_folder):
    if file.endswith(".wav"):
        emotion_code = file.split("-")[2]  # 3rd number
        emotion = emotion_map.get(emotion_code)

        if emotion:
            src_path = os.path.join(source_folder, file)
            dst_path = os.path.join(destination_folder, emotion, file)
            shutil.move(src_path, dst_path)
            print(f"Moved {file} → {emotion}")

print("Done sorting files!")
