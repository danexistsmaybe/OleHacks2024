def make_tag():
    

def format(data):
    towrite = []

    for ingredient in data:
        towrite.append("<Text>"+data[ingredient]+"</Text>")
        
        # do specific stuff first
        if data[ingredient].get("serving Size") != None: 
            towrite.append("<Text>Serving size: "+data[ingredient]["Serving size"]+"</Text>\n")
            data[ingredient].pop("Serving size",None)
        if data[ingredient].get("calories") != None: 
            towrite.append("<Text>Calories: "+data[ingredient]["calories"]+"</Text>\n")
            data[ingredient].pop("calories",None)
        else: print("CALORIES BAD")
        if data[ingredient].get("fat") != None: 
            towrite.append("<Text>Fat: "+data[ingredient]["fat"]+"</Text>\n")
            data[ingredient].pop("fat",None)
        elif data[ingredient].get("totalFat") != None: 
            towrite.append("<Text>Fat: "+data[ingredient]["totalFat"]+"</Text>\n")
            data[ingredient].pop("totalFat",None)
        if 


