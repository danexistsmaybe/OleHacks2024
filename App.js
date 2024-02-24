import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Button, Image, TouchableOpacity } from 'react-native';

const PlaceholderImage = require('MommyMisato.jpeg');
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { FileSystem } from 'expo-file-system';
import axios, {isCancel, AxiosError} from 'axios';


export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    /*var bodyFormData = new FormData();
    bodyFormData.append('image',image);

    //POST
    // Passing configuration object to axios
    axios({
      method: 'get',
      url: "http://192.168.56.1:8080/upload",
    }).then((response) => {
      console.log(response.data);
    });

    // Invoking the get method to perform a GET request
    console.log("doing");
    axios("http://192.168.56.1:8080/upload").then((response) => {
      console.log("ddddoing");
      console.log(response.data);
    });
    console.log("passed");
    /*axios({
      method: "post",
      url: "http://localhost:8080/upload",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });*/
  };

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
});
