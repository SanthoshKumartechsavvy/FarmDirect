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

const SignIn = () => {

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    // const [userId, setUserId] = useState(null);

    useEffect(()=> {
      registrationForm.phone_number = mobileNumber;
    },[mobileNumber]);

    const [registrationForm, setRegistrationForm] = useState({
      "phone_number": mobileNumber,
      "profile": {
          "username": null,
          "role": null
      }
    });


    console.log(registrationForm);
    console.log(mobileNumber);


    const handleRegister = async () => {
      try {
        const response = await auth.post('/register/', registrationForm);
        const userId = response.data.id;
        navigation.navigate('otpVerify', { userId });
        // router.push('/otpVerify');
        // console.log(userId);
        
      } catch (error) {
        console.error('Registration failed:', error);
      } 
    }

  return (
    <SafeAreaView className=" flex-1 justify-center bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-start h-full px-8 ">
            <Image
                source={require('../../images/logo.png')}
                className="w-full h-[80px]"
                resizeMode='contain'
            />
            <Text className="text-lg font-semibold mt-2 w-full text-center">FarmDirect</Text>
            <Text className="text-2xl self-start w-full text-white font-semibold mt-[20%] ">SIGN UP</Text>
            <FormField
                title="Mobile Number"
                value={mobileNumber}
                handleChangeText = {(e)=> setMobileNumber(e)}
                placeholder="Your mobile number"
                keyboardType = "numeric"
            />
            <FormField
                title="Set Password"
                value={password}
                handleChangeText = {(e)=> setPassword(e)}
                placeholder="Enter password"
                keyboardType = "numeric"
            />
            <CustomButton
                title="Get OTP"
                handlePress={handleRegister}
                containerStyles="w-full mt-7"
            />
            <View className="flex justify-center items-center w-full">

              <Text className="text-lg font-semibold mt-5 w-full text-center">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/log-in')}><Text className="text-lg font-semibold mt-2 w-full text-center text-white" >LogIn</Text></TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn


