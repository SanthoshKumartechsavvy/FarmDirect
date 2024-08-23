import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles}) => {
  return (
    <TouchableOpacity 
        className={`bg-white round rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
        onPress={handlePress}
        activeOpacity={0.7}
    >
        
        <Text className="font-semibold text-lg">{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton