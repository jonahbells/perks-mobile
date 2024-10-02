import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";

import { image, icons } from "../../constants";
import { fetchMerchantById } from "../../hook/merchants";
import { CommonButton, Footer } from "../../components";

const MerchantsDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [merchants, setMerchants] = useState({});
  const url = merchants.logoimage ? `https://api.perksmania.com/api/v1/merchants/image/${merchants.logoimage}`
    : null;
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const merchantsById = async () => {
    try {
      const response = await fetchMerchantById(params.id, {}); // Use the API call from api.js
      setMerchants(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    merchantsById();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Function to handle refetch
  const refetch = () => {
    setIsLoading(true);
    merchantsById();
  };

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <CommonButton
              iconUrl={icons.left}
              handlePress={() => router.back()}
              buttonDimension="w-11 h-11 rounded-3xl justify-center"
              imgDimension="w-5 h-5 ml-[10px]"
              color="bg-secondary"
            />
          ),
          // headerRight: () => (
          //   <CommonButton
          //     iconUrl={icons.heartOutline}
          //     handlePress={() => router.back()}
          //     buttonDimension="w-11 h-11 rounded-3xl justify-center items-center"
          //     imgDimension="w-5 h-5"
          //     color="bg-secondary"
          //   />
          // ),
          headerTitle: () => (
            <Text className="font-pmedium text-pretty text-lg uppercase" numberOfLines={2}>{merchants.business_name}</Text>
          ),
        }}
      />

      <View className="px-4 mt-4">
        <View className="items-center">
          {merchants.logoimage ? (
            <Image
              className="w-full h-[400] rounded-3xl"
              source={{ uri: url }}
              resizeMode="cover"
            />
          ) : (
            <Text>No image available</Text>
          )}
        </View>

        <View className="mt-4">
          <View className="flex-row min-h-[80] justify-between">
            <View className="w-[220] ">
              <Text className="font-normal text-pretty text-base capitalize" numberOfLines={5}>
                {merchants.office_address}
              </Text>
            </View>
            <View>
              <View className="bg-secondary rounded-2xl">
                <Text className="text-xl font-psemibold px-4 py-2">
                  {merchants.office_contact}
                </Text>
              </View>
            </View>
          </View>
          {/* <View className="mt-2 max-h-[200px]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="font-pmedium text-lg">Description</Text>
              <Text className="font-pregular text-md text-justify">
                {perks.perks_description}
              </Text>
            </ScrollView>
          </View> */}
        </View>
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default MerchantsDetails;
