from bottle import *
import os
from VisionAPI import *
from scraper import scrape
from format import *
from scraper import PromptException


def clear():
    try:
        os.remove("prompt.jpg")
    except FileNotFoundError as e:
        print() # do nothing lol

# three step process
def process_image():
    ingredients = vision("prompt.jpg")
    data = scrape(ingredients.split('\n'))
    format(data)

# server request handling
@route('/upload', method="POST")
def upload():
    #try:
    category   = request.forms.get('category')
    upload     = request.files.get('photo')
    """name, ext = os.path.splitext(upload.filename)
    if ext not in ('.png','.jpg','.jpeg'):
        return 'File extension not allowed.'"""

    save_path = "."
    clear()
    upload.filename = "prompt.jpg"
    upload.save(save_path) # appends upload.filename automatically
    try:
        process_image()
    except PromptException as e:
        return e

    return 'OK'

run(host='0.0.0.0', port=8080, debug=True)