import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import FormField from '../../components/FormField'
import { router, Redirect } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import { useRoute } from '@react-navigation/native';
import auth from '../api/auth'




const otpVerify = () => {

    const route = useRoute();
    const {userId} = route.params;
    const [otp,setOtp] = useState('');

    useEffect(()=> {
      otpForm.otp = otp;
    },[otp]);

    const [otpForm, setOtpForm] = useState({
      "otp": otp,
    });


    const handleVerifyOtp = async () => {
      try {
        const response = await auth.patch(`/user/${userId}/verify_otp/`, otpForm);
        router.push('/enterUsername');
      } catch (error) {
        console.error('Otp verification failed:', error);
      } 
    };

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
            <Text className="text-2xl self-start w-full text-white font-semibold mt-[20%] ">SIGN UP / LOGIN</Text>
            <FormField
                title="Verify OTP"
                value={otp}
                handleChangeText = {(e)=> setOtp(e)}
                placeholder="Enter the OTP received"
                keyboardType = "numeric"
            />
            
            <CustomButton
                title="Continue"
                handlePress={handleVerifyOtp}
                containerStyles="w-full mt-7"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default otpVerify