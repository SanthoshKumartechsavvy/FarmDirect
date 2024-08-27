import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'


import React from 'react'

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View>
            <Image
                source={require('../../images/home.png')}
                resizeMode='contain'
                tintColor={color}
            />
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
            name='home'
            options={{
                title: 'home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon="../../images/home"
                        color={color}
                        name="Home"
                        focused = {focused}
                    />
                )
            }}
            />
      </Tabs>
    </>
  )
}

export default TabsLayout