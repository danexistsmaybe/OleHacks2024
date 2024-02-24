import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

const PlaceholderImage = require('MommyMisato.jpeg');

export default function App() {
  function onPressLearnMore() { 
    alert('bitch ass mf');
    
  }

  return (
    <View style={styles.container}>
      <Text style ={{color: '#fff' }}>Open up App.js to start working on your app!</Text>
      <Text>Bitches be btichen</Text>
      <Text>8---------D</Text>
      <StatusBar style="auto" />
    
    <Image source={PlaceholderImage} 
     //style={{width: 400, heigh: 400}}
    />

    <Image style ={{
      width: 0,
      height: 0,
    }}
      source = {require('MommyMisato.jpeg')}/>

    <Button
      onPress = {onPressLearnMore}
      title = "FUCKING HELP"
      color = "#841584"
      accessibiiltyLabel = "i dont know what this does"
    />

      
    
      
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', //was #fff
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    felx: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
