import base64
import requests

def vision(imagepath):
  # OpenAI API Key
  file = open("key.txt","r")
  api_key = file.read()
  file.close()

  # Function to encode the image
  def encode_image(image_path):
    with open(image_path, "rb") as image_file:
      return base64.b64encode(image_file.read()).decode('utf-8')

  # Path to your image
  image_path = imagepath

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
            "text": "GPT Prompt: Please make a list, separated by line breaks, of basic ingredients that are in the image of food that is provided; do not introduce the list with any text, and make sure each ingredient is not elaborated on. If it is not food please send only the word error. Thank you!!"
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
  #print(response.json()['choices'][0]['message'])
  return(response.json()['choices'][0]['message']['content'])


def main():
  vision()

if __name__ == "__main__":
  main()