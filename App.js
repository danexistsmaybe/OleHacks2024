import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const PlaceholderImage = require('./assets/splash.png');
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import axios, {isCancel, AxiosError} from 'axios';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    
    <Image source={PlaceholderImage} 
     //style={{width: 400, heigh: 400}}
    />

    <Image style ={{
      width: 0,
      height: 0,
    }}
      source = {require('./assets/splash.png')}/>

    <Button
      onPress = {pickImage}
      title = "FUCKING HELP"
      color = "#841584"
      accessibilityLabel = "i dont know what this does"
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
});
