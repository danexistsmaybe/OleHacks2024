import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//import { FileSystem } from 'expo-file-system';
import axios, {isCancel, AxiosError} from 'axios';

//const PlaceholderImage = require('MommyMisato.jpeg');

//<Image source={PlaceholderImage} 
    // style={{width: 400, heigh: 400}}
     ///>
//<Image style ={{
      //width: 0,
      //height: 0,
    //}}
      //source = {require(splash.png)}/>

const txtDir = FileSystem.cacheDirectory + 'text/';
const txtFileUri = txtDir + `example.txt`;
const txtUrl = `https://example-files.online-convert.com/document/txt/example.txt`;

//const absolutePath = `/storage/emulated/0/MyApp/FoodSnap`

export default function App() {

  const AppButton = ({onPress, title}) => (
    <TouchableOpacity onPress = {onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>

    </TouchableOpacity>
  )

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
      <Button title="dirCon" onPress={ensureDirExists} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 300 }} />}

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
    //elevation: 8,
    position: 'absolute',
    bottom: 80,
    left:20,
    backgroundColor: "#009688",
    borderRadius: 36,
    paddingVertical: 25,
    paddingHorizontal: 20

  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
