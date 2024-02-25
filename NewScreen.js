import { View, Text, ScrollView } from 'react-native';

function NewScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left', paddingLeft: 20 }}>
    <ScrollView style={{flex:1}}><Text style={{fontWeight: 'bold',fontSize: 40,marginTop: 10}}>Chocolate</Text><Text>Calories: 140</Text>
<Text>Fat: 5.0</Text>
<Text>Sat fat: 3.0</Text>
<Text>Trans fat: 0.0</Text>
<Text>Carbohydrates: 25.0</Text>
<Text>Protein: 1.0</Text>
<Text>Cholesterol: 0.0</Text>
<Text>Sodium: 20.1</Text>
<Text>Fiber: 0.986</Text>
<Text>Sugars: 22.0</Text>
<Text>Calcium: 0.0</Text>
<Text>Iron: 0.0</Text>
<Text>Serving size: 34.0g</Text>
<Text style={{fontWeight: 'bold',fontSize: 40,marginTop: 10}}>Nuts</Text><Text>Calories: 120</Text>
<Text>Fat: 8.0</Text>
<Text>Sat fat: 3.0</Text>
<Text>Trans fat: 0.0</Text>
<Text>Carbohydrates: 9.0</Text>
<Text>Protein: 6.0</Text>
<Text>Cholesterol: 0.0</Text>
<Text>Sodium: 5.1</Text>
<Text>Fiber: 2.01</Text>
<Text>Sugars: 5.0</Text>
<Text>Vitamind: 0.0</Text>
<Text>Calcium: 9.9</Text>
<Text>Iron: 5.04</Text>
<Text>Potassium: 175</Text>
<Text>Addedsugar: 0.0</Text>
<Text>Serving size: 30.0GRM</Text>
</ScrollView></View>
);
}
export default NewScreen;