from bottle import *
import os
from VisionAPI import *
from scraper import scrape

def clear():
    try:
        os.remove("prompt.jpg")
    except FileNotFoundError as e:
        print()

def process_image():
    ingredients = vision("prompt.jpg")
    scrape(ingredients.split('\n'))



@route('/upload', method="POST")
def upload():
    category   = request.forms.get('category')
    upload     = request.files.get('photo')
    """name, ext = os.path.splitext(upload.filename)
    if ext not in ('.png','.jpg','.jpeg'):
        return 'File extension not allowed.'"""

    save_path = "."
    clear()
    upload.filename = "prompt.jpg"
    upload.save(save_path) # appends upload.filename automatically

    # call main processing algorithm
    process_image()

    return 'OK'

run(host='0.0.0.0', port=8080, debug=True)