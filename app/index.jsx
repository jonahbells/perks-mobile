import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text, View, Image } from 'react-native'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react';

import { CustomButton, Loader } from '../components'
import { images } from '../constants'
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  useEffect(() => {
    if (!loading && isLogged) {
      router.replace('home');
    }
  })

  return (
    <SafeAreaView className="h-full">
      
      <ScrollView
        contentContainerStyle={{
          height: '100%'
        }}
      >
        <View className="w-full flex justify-center items-center min-h-[85vh] px-4">

          <View className="relative mt-5 p-5">
            <Text className='text-3xl text-black font-bold text-center'>
              Discover Lots of Perks
            </Text>

          </View>

          <Text className="text-sm font-pregular text-black mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Perks
          </Text>
          <View className='w-[200px]'>
            <CustomButton
              title="Get Started"
              handlePress={() => router.replace('/home')}
              containerStyles="w-full mt-7"
            />
          </View>


        </View>
      </ScrollView>

      <StatusBar backgroundColor={"transparent"} translucent />
    </SafeAreaView>
  )
}

export default Welcome;