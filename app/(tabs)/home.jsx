import { View, Text, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { images } from '../../constants'
import { fetchAllPerks } from '../../hook/useFetch'
import { SearchInput, CustomCardRow } from '../../components'


const Home = () => {
  // const { data, isLoading, error, refetch } = fetchAllPerks('api/v1/perks', {});
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  return (
    <SafeAreaView  className='flex-1 bg-white'>
      <View className='px-4 my-4'>
        <View className='justify-between items-start flex-row mb-6'>
          <View>
            <Text className='font-pmedium text-sm'>
              Welcome Back
            </Text>
            <Text className='text-2xl font-psemibold'>
              Jonah
            </Text>
          </View>
          <View>
            <Image
              source={images.perksLogo}
              className="w-11 h-12"
              resizeMode="contain"
            />
          </View>
        </View>
        <SearchInput />
      </View>
      <CustomCardRow />
    </SafeAreaView>
  )
}

export default Home