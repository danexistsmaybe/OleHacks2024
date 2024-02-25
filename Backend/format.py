def recapitalize(text):
    return text[0].upper + text[1:len(text)].lower()



def format(data):
    towrite = ["""import { View, Text } from 'react-native';

function NewScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>"""]
    

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
        if data[ingredient].get("saturatedFat") != None: 
            towrite.append("<Text>Sat fat: "+data[ingredient]["saturatedFat"]+"</Text>\n")
            data[ingredient].pop("saturatedFat",None)
        if data[ingredient].get("transFat") != None: 
            towrite.append("<Text>Trans fat: "+data[ingredient]["transFat"]+"</Text>\n")
            data[ingredient].pop("transFat",None)
        if data[ingredient].get("carbohydrates") != None: 
            towrite.append("<Text>Carbohydrates: "+data[ingredient]["carbohydrates"]+"</Text>\n")
            data[ingredient].pop("carbohydrates",None)
        if data[ingredient].get("protein") != None: 
            towrite.append("<Text>Protein: "+data[ingredient]["protein"]+"</Text>\n")
            data[ingredient].pop("protein",None)

        # do other stuff
        for key in data[ingredient]:
            towrite.append("<Text>"+recapitalize(key)+": "+data[ingredient][key]+"</Text>\n")


    towrite.append("</View>\n);\n}\nexport default NewScreen;]")
    file = open("../NewScreen.js",'w')
    file.write("".join(towrite))
    file.close()


