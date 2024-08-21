import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, TouchableOpacity } from 'react-native'


const roleSelect = () => {
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
          
            <Text className="text-lg font-medium mt-12 self-start"> Select your profile</Text> 
            
            <TouchableOpacity 
              className={`bg-white round rounded-xl flex-row min-h-[62px] justify-center items-center w-full mt-7 `}
              // onPress={handlePress}
              activeOpacity={0.7}
            >

              <Image
                source={require('../../images/farmer.png')}
                resizeMode='contain'
              />
              <Text className="font-semibold text-lg">Farmer</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className={`bg-white round rounded-xl flex-row  min-h-[62px] justify-center items-center w-full mt-7 `}
              // onPress={handlePress}
              activeOpacity={0.7}
            >

              <Image
                source={require('../../images/buyer.png')}
                resizeMode='contain'
              />
              <Text className="font-semibold ml-2 text-lg">Buyer</Text>
            </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default roleSelect