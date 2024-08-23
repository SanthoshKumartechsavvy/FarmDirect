import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
            <Image
                source={require('../images/logo.png')}
                className="w-[150px] h-[200px] relative"
                resizeMode='contain'
            />
            <Text className="text-3xl font-semibold mt-2">FarmDirect</Text>
            <Text className="text-center mt-3"> A marketplace where farmers and buyers connect</Text>
            <CustomButton
                title="Continue with mobile number"
                handlePress={()=> router.push('/sign-in')}
                containerStyles="w-full mt-7"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}