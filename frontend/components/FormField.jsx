import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({title, value, placeholder, handleChangeText, ...props}) => {
  return (
    <View className="space-y-3 mt-5 w-full">
      <Text className="font-semibold text-lg ">{title}</Text>
      <View className="w-full h-14 px-4  bg-white rounded-lg focus: border-black">
        <TextInput
            className="flex-1 w-full text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
        />
        
      </View>
    </View>
  )
}

export default FormField