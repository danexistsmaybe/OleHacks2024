from bs4 import BeautifulSoup
import httpreqs

def get_key():
    file = open("key2.txt",'r')
    key = file.read()
    file.close()
    return key

def parse_food_url(url):
    print()

def get_food_url(ingredient):
    key = get_key()
    searchurl = "https://api.ers.usda.gov/data/foods/search?api_key="+key+"&q="+ingredient

    session = httpreqs.Session()
    #soup = BeautifulSoup(session.get(searchurl).text,"html.parser")
    #rows = soup.findAll("a")
    print(session.get(searchurl).text)
    

    # REMEMBER TO THROW ERROR IF NOTHING IS FOUND !

def scrape(ingredients):
    data = {}
    for ingredient in ingredients:
        url = get_food_url(ingredient)
        data[ingredient] = parse_food_url(url)
    return data





    
    #for ingredient in ingredients:
        #data[ingredient] to text file

# main
if __name__ == "__main__":
    print(scrape(["apple","sausage"]))