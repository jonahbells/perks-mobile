import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image
} from "react-native";

import { image, icons } from '../../constants'
import { fetchPerkById } from "../../hook/useFetch";
import { CommonButton, Footer } from "../../components";

const PerksDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [perks, setPerks] = useState({});
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const perksById = async () => {
    try {
      const response = await fetchPerkById(params.id, {});  // Use the API call from api.js
      setPerks(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    perksById();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }


  // Function to handle refetch
  const refetch = () => {
    setIsLoading(true);
    perksById()
  };


  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='px-6'>
      <View >
        <CommonButton
          iconUrl={icons.left}
          handlePress={() => router.back()}
          buttonDimension="w-10 h-10 rounded-3xl justify-center"
          imgDimension="w-6 h-6 ml-[7px]"
          color="bg-gray"
        />
      </View>
      <View>
        {perks.perks_image ? (
          <Image
            className='h-[430px]'
            source={{ uri: 'https://api.perksmania.com/api/v1/perks/image/' + perks.perks_image[0].src }}
            resizeMode="cover"
          />
        ) : (
          <Text>No image available</Text>
        )}
      </View>

      <View className='px-4 -mt-5 rounded-t-3xl border-#f2f2f2 bg-black-300 z-50'>
        <View className='flex-row justify-between' >
          <View className='w-60'>
            <Text className='pt-5 text-2xl font-psemibold' numberOfLines={3}>{perks.perks_name}</Text>
          </View>
          <View>
            <View className='bg-blue-100 rounded-2xl mt-5'>
              <Text className='text-2xl font-psemibold px-3 py-1'>₱ {perks.original_amount}</Text>
            </View>
          </View>
        </View>
        <View className='mt-8 h-[250px]'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className='font-pmedium text-xl'>Description</Text>
            <Text className='font-pregular text-md text-justify'>{perks.perks_description}</Text>
          </ScrollView>
        </View>
      </View>
      <Footer />
      </View>
    </SafeAreaView>

  );
};

export default PerksDetails;


{/* <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#312651" />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data === 0 ? (
            <Text>No data available</Text>
          ) : (
            
          )}
          
        </ScrollView> */}