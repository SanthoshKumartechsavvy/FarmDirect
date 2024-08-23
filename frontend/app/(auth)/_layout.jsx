import { View, Text } from 'react-native'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
            name='sign-in'
            options={{ headerShown: false}}
        />
        <Stack.Screen
            name='otpVerify'
            options={{ headerShown: false}}
        />
        <Stack.Screen
            name='enterUsername'
            options={{ headerShown: false}}
        />
        
      </Stack>
    </>
  )
}

export default _layout