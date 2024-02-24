"""#Upload image from rep
#Have image read and put down values into txt file

#import bs4
import os
import requests
from openai import OpenAI

headers = { 
    "Authorization": "Bearer ", 
    "Content-Type": "application/json" 
} 
#Authorization: "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"
#from config import OPENAI_API_KEY
#from dotenv import load_dotenv

OPEN_API_KEY = os.getenv("OPEN_API_KEY")
#load_dotenv()
#print(os.environ.get(OPEN_API_KEY))

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            "detail": "high"
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0].message.content)"""


import base64
import requests

# OpenAI API Key
api_key = "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"

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "C:\\Users\\taaro\\OneDrive\\Desktop\\download.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

payload = {
  "model": "gpt-4-vision-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Please make a text file-based table of individual ingredients that are in the food that is provided with no further information added, thank you!"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          }
        }
      ]
    }
  ],
  "max_tokens": 3000
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

print(response.json())