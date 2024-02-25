import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';


import { router, Link } from 'expo-router';


import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//import { FileSystem } from 'expo-file-system';
import axios, {isCancel, AxiosError} from 'axios';

const txtDir = FileSystem.cacheDirectory + 'text/';
const txtFileUri = txtDir + `example.txt`;
const txtUrl = 'https://example-files.online-convert.com/document/txt/example.txt';
const backendServerUrl = "http://10.42.25.0:8080/upload";

//const absolutePath = `/storage/emulated/0/MyApp/FoodSnap`

export default function App() {
  // state variables -----------------------
  var pageNum = 0;
  var image = null;//const [image, setImage] = useState(null);


  // functions -----------------------------
  async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(txtDir);
    if (!dirInfo.exists) {
      console.log("TXT directory doesn't exist, creating…");
      await FileSystem.makeDirectoryAsync(txtDir, { intermediates: true });
    }
    else {
      console.log("That directory already exists.")
    }
  }
  
  const getTxt = async () => {
    //if (!txtFileUri.exists) {
      //FileSystem.copyAsync(txtUrl);
      //FileSystem.copyAsync(txtUrl);
    //}
    //let result = await FileSystem.downloadAsync(txtUrl, txtFileUri);
    //const response = await FileSystem.readAsStringAsync(txtUrl);
    //console.log(response)
    console.log(await FileSystem.readAsStringAsync(txtFileUri));
    };


    function nextPage() {
      console.log(pageNum)
      var n = 0;
      if (pageNum === 0) { n = 1; }
      pageNum = n;
      
    }

  async function updateScreen() {
    router.replace("");
  }

  // function that is called when user presses the select photo button
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
    }).then(() => {
      updateScreen();
    });
  };

  // page handling and markup --------------

  
  return (
      <View style={styles.container}>
        

        {/* CAMERA STUFF */}

        
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {pageNum==1 && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {pageNum==1 && <Text>stuff</Text> }


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
