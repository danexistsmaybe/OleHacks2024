import { View, Text } from 'react-native';

function NewScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Anything goes here.</Text>
    </View>
  );
}

export default NewScreen;