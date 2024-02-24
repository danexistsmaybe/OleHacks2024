from bs4 import BeautifulSoup
import httpreqs

def parse_food_url(url):
    #

def get_food_url(ingredient):
    searchurl = "https://fdc.nal.usda.gov/fdc-app.html#/?query="+ingredient

    session = httpreqs.Session()
    soup = BeautifulSoup(session.get(siteurl).text,"html.parser")
    
    
    # REMEMBER TO THROW ERROR IF NOTHING IS FOUND !

def scrape(ingredients):
    data = {}
    for ingredient in ingredients:
        url = get_food_url(ingredient)
        data[ingredient] = parse_food_url(url)
    return data





    
    #for ingredient in ingredients:
        #data[ingredient] to text file

