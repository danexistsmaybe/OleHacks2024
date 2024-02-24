import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//import { FileSystem } from 'expo-file-system';
import axios, {isCancel, AxiosError} from 'axios';

const txtDir = FileSystem.cacheDirectory + 'text/';
const txtFileUri = txtDir + `example.txt`;
const txtUrl = `https://example-files.online-convert.com/document/txt/example.txt`;

//const absolutePath = `/storage/emulated/0/MyApp/FoodSnap`

export default function App() {
  const [image, setImage] = useState(null);
  //var fil = FileSystem.readAsStringAsync(FileSystem.documentDirectory + './Backend/nutrition_output.txt');
  /*fetch(dir)
  .then(row => row.text())
  .then(text => {
    console.log('text:', text);
  });*/

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
    //let result = await FileSystem.downloadAsync(txtUrl, txtFileUri);
    //const response = await FileSystem.readAsStringAsync(txtUrl);
    //console.log(response)
    console.log(await FileSystem.readAsStringAsync(txtFileUri));
    };

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
      <Button title="dirCon" onPress={ensureDirExists} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 300 }} />}

      {/* CAMERA STUFF */}
      <Button title="Pick an image from camera roll" onPress={getTxt} />
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