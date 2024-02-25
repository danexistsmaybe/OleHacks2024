def recapitalize(text):
    return text[0].upper() + text[1:len(text)].lower()



def format(data):
    towrite = ["""import { View, Text, ScrollView } from 'react-native';

function NewScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left', paddingLeft: 20 }}>
    <ScrollView style={{flex:1}}>"""]
    

    for ingredient in data:
        towrite.append("<Text style={{fontWeight: 'bold',fontSize: 40,marginTop: 10}}>"+recapitalize(ingredient)+"</Text>")
        
        # do specific stuff first
        if data[ingredient].get("serving Size") != None: 
            towrite.append("<Text>Serving size: "+str(data[ingredient]["Serving size"])+"</Text>\n")
            data[ingredient].pop("Serving size",None)
        if data[ingredient].get("calories") != None: 
            towrite.append("<Text>Calories: "+str(data[ingredient]["calories"])+"</Text>\n")
            data[ingredient].pop("calories",None)
        else: print("CALORIES BAD")
        if data[ingredient].get("fat") != None: 
            towrite.append("<Text>Fat: "+str(data[ingredient]["fat"])+"</Text>\n")
            data[ingredient].pop("fat",None)
        elif data[ingredient].get("totalFat") != None: 
            towrite.append("<Text>Fat: "+str(data[ingredient]["totalFat"])+"</Text>\n")
            data[ingredient].pop("totalFat",None)
        if data[ingredient].get("saturatedFat") != None: 
            towrite.append("<Text>Sat fat: "+str(data[ingredient]["saturatedFat"])+"</Text>\n")
            data[ingredient].pop("saturatedFat",None)
        if data[ingredient].get("transFat") != None: 
            towrite.append("<Text>Trans fat: "+str(data[ingredient]["transFat"])+"</Text>\n")
            data[ingredient].pop("transFat",None)
        if data[ingredient].get("carbohydrates") != None: 
            towrite.append("<Text>Carbohydrates: "+str(data[ingredient]["carbohydrates"])+"</Text>\n")
            data[ingredient].pop("carbohydrates",None)
        if data[ingredient].get("protein") != None: 
            towrite.append("<Text>Protein: "+str(data[ingredient]["protein"])+"</Text>\n")
            data[ingredient].pop("protein",None)

        # do other stuff
        for key in data[ingredient]:
            towrite.append("<Text>"+recapitalize(key)+": "+str(data[ingredient][key])+"</Text>\n")


    towrite.append("</ScrollView></View>\n);\n}\nexport default NewScreen;")
    file = open("../NewScreen.js",'w')
    file.write("".join(towrite))
    file.close()


