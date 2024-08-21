import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import FormField from '../../components/FormField'
import { router, Redirect } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from "expo-image-picker"

const enterUsername = () => {

    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    

    const uploadImage = async () => {
      try {
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
        })

        if(!result.canceled) {
          await saveImage(result.assets[0].uri);
        }
      } catch(err) {
        alert("Error uploading image: "+ error.message);
        
      }
    };

    const saveImage = async (image) => {
      try {
        setImage(image);
        
      } catch(err) {
        throw err;
      }
    }

  return (
    <SafeAreaView className=" flex-1 justify-center bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center h-[80vh] px-8 ">
            <Image
                source={require('../../images/logo.png')}
                className="w-full h-[80px]"
                resizeMode='contain'
            />
            <Text className="text-lg font-semibold mt-2 w-full text-center">FarmDirect</Text>
          
            

            <TouchableOpacity onPress={uploadImage}>

              <View className="w-[100px] h-[100px] mt-10 flex justify-center items-center bg-slate-700 rounded-full border border-black">
                {
                  !image && 
                    <Image
                        source = {require('../../images/camera.png')}
                        className="w-[38px] h-[32px]"
                        resizeMode='contain'
                      />
                }

                {
                  image && 
                    <View className="w-[103px] h-[103px] rounded-full border border-white">
                      <Image
                        source = {{uri: image}}
                        className="w-[100px] h-[100px] rounded-full"
                        resizeMode='contain'
                      />
                    </View>
                }
              </View>

            </TouchableOpacity>

            <Text className="font-semibold mt-2 w-full text-center text-white"> Your Profile picture </Text>

            {/* <View className="h-[31px] w-[31px] flex relative justify-center items-center rounded-full bg-camera border border-white">

              <Image
                source = {require('../../images/camera.png')}
                className="w-[18px] h-[15px]"
                resizeMode='contain'
              />
            </View> */}
            
            {/* <Image
              source = {require('../../images/camerabg.png')}
              className= "h-[31px] w-[31px] relative top-[115px]"
              resizeMethod='contain'
            /> */}

            <FormField
                title="Enter Username"
                value={username}
                handleChangeText = {(e)=> setUsername(e)}
                placeholder="Your Username"
                keyboardType = "numeric"
                
            />
            
            <CustomButton
                title="Continue"
                handlePress={()=> router.push('/roleSelect')}
                containerStyles="w-full mt-7"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default enterUsername