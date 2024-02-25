//import * as React from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import NewScreen from './NewScreen';

const backendServerUrl = "http://10.42.25.0:8080/upload";
//      <Image source={require('./assets/icon.png')} />

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4a460', //#483d8b
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    //elevation: 8,
    //position: 'absolute',
    backgroundColor: "FFFFFF", //#009688
    borderRadius: 36,
    paddingVertical: 25,
    paddingHorizontal: 20,
    elevation: 20,
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: .5,
    elevation: 8,
    shadowRadius: 5,
    shadowOffset : { width: 2, height: 13},
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

function HomeScreen({ navigation }) {
  const AppButton = ({onPress, title}) => (
    <TouchableOpacity style={styles.shadow} onPress = {onPress}> 
      <LinearGradient
        colors={["black", "grey", "red"]} //"#009688", "#004d40"
        start= {{x:0, y:0}}
        end={{x:2.5, y:.5}}
        style={styles.button}

      >
        <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>

    </TouchableOpacity>
  )


  return (
    <LinearGradient colors = {['white', 'grey']} start = {{x:0, y:0}} end = {{x:0, y:2}} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./assets/icon.png')} style={{ width: 400, height: 400, top: -120 }}/>
      <AppButton title="Press To Begin" onPress={() => navigation.navigate('Details')} />
      <Text style={{fontStyle: 'italic', top: 100, marginLeft: 20, marginRight: 20, textAlign: 'center'}}>Disclaimer: this app uses artificial intelligence in its calculations. Some data may be misleading.</Text>
    </LinearGradient>
  );
}

function DetailsScreen({ navigation }) {
  const AppButton = ({onPress, title}) => (
    <TouchableOpacity style={styles.shadow} onPress = {onPress}> 
      <LinearGradient
        colors={["black", "grey", "red"]} //"#009688", "#004d40"
        start= {{x:0, y:0}}
        end={{x:2.5, y:.5}}
        style={styles.button}

      >
        <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>

    </TouchableOpacity>
  )


  var image = null; 

  //const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    // get the image
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      cameraType: 'back',
      quality: 1,
    });
    /*let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      cameraType: 'back',
      quality: 1,
    });*/

    // if the user did not cancel the thing, set image
    if (!result.canceled) {
      image = result.assets[0].uri;// setImage(result.assets[0].uri);
    } else {
      console.log("Operation canceled.");
      return;
    }

    // POST the image
    var bodyFormData = new FormData();
    bodyFormData.append('image',image);

    let formData = new FormData();
    console.log("uri: "+image);
    formData.append('photo', { uri: image, name: image.split('/').pop(), type: "image/jpeg" });
    image = null;
    return await fetch(backendServerUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(() => { navigation.navigate('NewScreen'); })
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppButton title="Take Picture" onPress={() => {pickImage();}} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }}
      />}
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="NewScreen" component={NewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
}