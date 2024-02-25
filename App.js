//import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import NewScreen from './NewScreen';

const backendServerUrl = "http://10.42.25.0:8080/upload";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to NewScreen"
        onPress={() => navigation.navigate('NewScreen')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
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
    })
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />

      <Button title="Select photo" onPress={() => {
        pickImage();
      }} />
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