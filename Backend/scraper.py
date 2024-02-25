#from bs4 import BeautifulSoup
import json
import httpreqs

class PromptException(Exception):
    pass

def get_key():
    file = open("key2.txt",'r')
    key = file.read()
    file.close()
    return key

def parse_food_url(url):
    info = {}
    session = httpreqs.Session()
    page = json.loads(session.get(url).text)

    # get nutrition facts
    if page.get("labelNutrients")==None: return None # if bad json
    for key in page["labelNutrients"]:
        info[key] = page["labelNutrients"][key].get("value") # value will be None if value doesn't exist
    
    # get serving info
    info["Serving size"] = str(page["foodUpdateLog"][0]["servingSize"])+str(page["foodUpdateLog"][0]["servingSizeUnit"])

    return info



    return {}

def get_food_url(ingredient):
    key = get_key()
    search_url = "https://api.nal.usda.gov/fdc/v1/foods/search?query="+ingredient+"&api_key="+key

    session = httpreqs.Session()
    page = json.loads(session.get(search_url).text)

    if page["foods"] == []:
        print("Error on prompt: "+ingredient)
        raise PromptException("AI could not interpret prompt")

    id = page["foods"][0]["fdcId"]

    return "https://api.nal.usda.gov/fdc/v1/food/"+str(id)+"?api_key="+key

def scrape(ingredients):
    data = {}
    for ingredient in ingredients:
        url = get_food_url(ingredient)
        d = parse_food_url(url)
        if d!=None: data[ingredient] = d
        else: continue
    return data





    
    #for ingredient in ingredients:
        #data[ingredient] to text file

# main
if __name__ == "__main__":
    print(scrape(["apple","sausage"]))