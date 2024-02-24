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

//const absolutePath = `/storage/emulated/0/MyApp/FoodSnap`

export default function App() {
  var pageNum = 0;

  const [image, setImage] = useState(null);

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
  if (pageNum === 0) {
    return (
        <View style={styles.container}>
          <Button title="dirCon" onPress={ensureDirExists} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

          {/* CAMERA STUFF */}
          <Button title="Read txt" onPress={getTxt} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
         
          <Button title="Next page" onPress={nextPage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Text>{pageNum}</Text>

          <StatusBar style="auto" />
        </View>
      );
  }
  else {
    return (
      <View style={styles.container}>
        <Button title="dirfsdCon" onPress={ensureDirExists} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        {/* CAMERA STUFF */}
        <Button title="Redfsad txt" onPress={getTxt} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button title="Pick an sdfsegfijoufsd from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button title="Next page" onPress={nextPage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Text>{pageNum}</Text>

        <StatusBar style="auto" />
      </View>
    );
  }
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
