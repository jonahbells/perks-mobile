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
      const response = await fetchPerkById(params.id, {}); // Use the API call from api.js
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
  };

  // Function to handle refetch
  const refetch = () => {
    setIsLoading(true);
    perksById();
  };

  return (
    <SafeAreaView edges={[ 'bottom']} className="flex-1 bg-white">
      <Stack.Screen
        options={{
          // headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <CommonButton
              iconUrl={icons.left}
              handlePress={() => router.back()}
              buttonDimension="w-11 h-11 rounded-3xl justify-center"
              imgDimension="w-6 h-6 ml-[8px]"
              color="bg-gray"
            />
          ),
          headerRight: () => (
            <CommonButton
              iconUrl={icons.heartOutline}
              handlePress={() => router.back()}
              buttonDimension="w-11 h-11 rounded-3xl justify-center items-center"
              imgDimension="w-5 h-5"
              color="bg-gray"
            />
          ),
          headerTitle: () => (
            <Text className="font-pmedium text-2xl">Details</Text>
          ),
        }}
      />

      <View className="px-4 mt-4">
        {/* <View>
          <CommonButton
            iconUrl={icons.left}
            handlePress={() => router.back()}
            buttonDimension="w-10 h-10 rounded-3xl justify-center"
            imgDimension="w-6 h-6 ml-[7px]"
            color="bg-gray"
          />
        </View> */}
        <View className="items-center">
          {perks.perks_image ? (
            <Image
              className="w-full h-[400] rounded-[50px]"
              source={{
                uri:
                  "https://api.perksmania.com/api/v1/perks/image/" +
                  perks.perks_image[0].src,
              }}
              resizeMode="cover"
            />
          ) : (
            <Text>No image available</Text>
          )}
        </View>

        <View className="mt-4">
          <View className="flex-row min-h-[80] justify-between">
            <View className="w-[220] ">
              <Text className="text-xl font-psemibold" numberOfLines={3}>
                {perks.perks_name}
              </Text>
            </View>
            <View>
              <View className="bg-gray rounded-xl">
                <Text className="text-xl font-psemibold px-4 py-2">
                  ₱ {perks.original_amount}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-2 max-h-[200px]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="font-pmedium text-lg">Description</Text>
              <Text className="font-pregular text-md text-justify">
                {perks.perks_description}
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
      
        <Footer />
    </SafeAreaView>
  );
};

export default PerksDetails;

{
  /* <ScrollView
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
          
        </ScrollView> */
}
