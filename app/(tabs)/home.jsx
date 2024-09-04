import { View, Text, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router } from 'expo-router'

import { images } from '../../constants'
import { fetchAllPerks } from '../../hook/useFetch'
import { CustomCardRow, Header } from '../../components'
import { icons } from '../../constants'


const Home = () => {
  // const { data, isLoading, error, refetch } = fetchAllPerks('api/v1/perks', {});
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  return (
    <>
      <Stack.Screen options={{
        header: () => <Header />
      }} />
      <View className='px-4 bg-white'>
      <CustomCardRow />
      </View>
    </>
  )
}

export default Home