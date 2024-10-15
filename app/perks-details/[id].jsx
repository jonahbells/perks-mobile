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
  TouchableOpacity,
} from "react-native";

import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"; // for icons

import { image, icons } from "../../constants";
import { fetchPerkById } from "../../hook/perks";
import { CommonButton, Footer } from "../../components";

const PerksDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [perks, setPerks] = useState({});
  const url =
    perks.perks_image && perks.perks_image[0] && perks.perks_image[0].src
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
    await perksById();
    setRefreshing(false);
  };

  // Function to handle refetch
  // const refetch = () => {
  //   setRefreshing(true);
  //   perksById();
  // };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        <View className="px-4 pt-12 flex-row justify-between items-center absolute z-50 w-full">
        
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray/70">
            <Ionicons name="arrow-back" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray/70">
            <Ionicons name="heart-outline" size={20} />
          </TouchableOpacity>
        </View>

        {perks.perks_image ? (
          <Image className="h-[400]" source={{ uri: url }} resizeMode="cover" />
        ) : (
          <Text>No image available</Text>
        )}

        <View className="mt-4 px-4 h-full pb-12">
          <View className="flex-row min-h-[80] justify-between">
            <View className="w-[220] ">
              <Text className="text-xl font-psemibold" numberOfLines={3}>
                {perks.perks_name}
              </Text>
            </View>
            <View>
              <View className="bg-gray-200 rounded-2xl">
                <Text className="text-xl font-psemibold px-4 py-2">
                  ₱ {perks.original_amount}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-2">
            <Text className="font-pmedium text-lg">Description</Text>
            <Text className="font-pregular text-md text-justify">
              {perks.perks_description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default PerksDetails;
