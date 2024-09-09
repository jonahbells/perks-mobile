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
import { fetchPerkById } from "../../hook/perks";
import { CommonButton, Footer } from "../../components";

const PerksDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [perks, setPerks] = useState({});
  const url = perks.perks_image && perks.perks_image[0] && perks.perks_image[0].src
    ? `https://api.perksmania.com/api/v1/perks/image/${perks.perks_image[0].src}`
    : null;
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
          headerRight: () => (
            <CommonButton
              iconUrl={icons.heartOutline}
              handlePress={() => router.back()}
              buttonDimension="w-11 h-11 rounded-3xl justify-center items-center"
              imgDimension="w-5 h-5"
              color="bg-secondary"
            />
          ),
          headerTitle: () => (
            <Text className="font-pmedium text-2xl">Details</Text>
          ),
        }}
      />

      <View className="px-4 mt-4">
        <View className="items-center">
          {perks.perks_image ? (
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
              <Text className="text-xl font-psemibold" numberOfLines={3}>
                {perks.perks_name}
              </Text>
            </View>
            <View>
              <View className="bg-secondary rounded-2xl">
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
