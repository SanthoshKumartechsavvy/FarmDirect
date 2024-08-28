import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import FormField from '../../components/FormField'
import { router, Redirect } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import auth from '../api/auth'

const logIn = () => {

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');



  return (
    <SafeAreaView className=" flex-1 justify-center bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-start h-[80vh] px-8 ">
            <Image
                source={require('../../images/logo.png')}
                className="w-full h-[80px]"
                resizeMode='contain'
            />
            <Text className="text-lg font-semibold mt-2 w-full text-center">FarmDirect</Text>
            <Text className="text-2xl self-start w-full text-white font-semibold mt-[20%] ">LOG IN</Text>
            <FormField
                title="Mobile Number"
                value={mobileNumber}
                handleChangeText = {(e)=> setMobileNumber(e)}
                placeholder="Your mobile number"
                keyboardType = "numeric"
            />
            <FormField
                title="Password"
                value={password}
                handleChangeText = {(e)=> setPassword(e)}
                placeholder="Your password"
                keyboardType = "numeric"
            />
            <CustomButton
                title="Log In"
                containerStyles="w-full mt-7"
            />
            
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default logIn