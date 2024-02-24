import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
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

    var bodyFormData = new FormData();
    bodyFormData.append('image',image);

    //POST
    /*axios({
      method: "post",
      url: "http://10.42.25.0:8080/upload",
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
      });
  */

      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      //console.log(image);
      formData.append('photo', { uri: image, name: image.split('/').pop(), type: "image/jpeg" });

      return await fetch('http://10.42.25.0:8080/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      
      /*var data = new FormData();
      const fileData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64, // Assuming the file is binary
      });

      data.append('file', fileData);
      
      var config = {
        method: 'post',
        url: 'http://10.42.25.0:8080/upload',
        headers: { 
          'Content-Type': 'multipart/form-data', 
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });*/

};

  return (
    <View style={styles.container}>
      <Text>Bingus bongiss</Text>
      
      {/* CAMERA STUFF */}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "lightblue",
    color: "white",

  },
});
