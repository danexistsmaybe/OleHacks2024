import { View, Text, ScrollView } from 'react-native';

function NewScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left', paddingLeft: 20 }}>
    <ScrollView style={{flex:1}}><Text style={{fontWeight: 'bold',fontSize: 30,marginTop: 10}}>Potatoes</Text><Text>Calories: 110</Text>
<Text>Fat: 0.0</Text>
<Text>Sat fat: 0.0</Text>
<Text>Trans fat: 0.0</Text>
<Text>Carbohydrates: 25.0</Text>
<Text>Protein: 4.0</Text>
<Text>Cholesterol: 0.0</Text>
<Text>Sodium: 0.0</Text>
<Text>Fiber: 2.96</Text>
<Text>Sugars: 1.01</Text>
<Text>Calcium: 0.0</Text>
<Text>Iron: 1.08</Text>
<Text>Potassium: 650</Text>
<Text>Serving size: 148.0g</Text>
<Text style={{fontWeight: 'bold',fontSize: 30,marginTop: 10}}>Eggs</Text><Text>Calories: 90.1</Text>
<Text>Fat: 6.0</Text>
<Text>Sat fat: 2.0</Text>
<Text>Trans fat: 0.0</Text>
<Text>Carbohydrates: 0.0</Text>
<Text>Protein: 8.0</Text>
<Text>Cholesterol: 235</Text>
<Text>Sodium: 90.1</Text>
<Text>Calcium: 39.7</Text>
<Text>Iron: 1.08</Text>
<Text>Potassium: 85.0</Text>
<Text>Serving size: 63.0g</Text>
</ScrollView></View>
);
}
export default NewScreen;