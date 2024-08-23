import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import FormField from '../../components/FormField'
import { router, Redirect } from 'expo-router'
import CustomButton from '../../components/CustomButton'

const enterUsername = () => {

    const [username, setUsername] = useState('');

  return (
    <SafeAreaView className=" flex-1 justify-center bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center h-[90vh] px-8 ">
            <Image
                source={require('../../images/logo.png')}
                className="w-full h-[80px]"
                resizeMode='contain'
            />
            <Text className="text-lg font-semibold mt-2 w-full text-center">FarmDirect</Text>
          
            <View className="w-[118px] h-[118px] mt-7 flex justify-center items-center  bg-white rounded-full border border-black">
              <Image
                source={require('../../images/pp.png')}
                className="w-[38px] h-[32px]"
                resizeMode='contain'
             />
            </View>
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