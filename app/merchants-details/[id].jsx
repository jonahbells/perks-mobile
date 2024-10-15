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
  TouchableOpacity
} from "react-native";

import { icons, images } from "../../constants"; // Ensure fallback image is in your constants
import { fetchMerchantById } from "../../hook/merchants";
import { CommonButton, Footer } from "../../components";
import Ionicons from '@expo/vector-icons/Ionicons';

const MerchantsDetails = ({ handleNavigate }) => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [merchants, setMerchants] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // State for the bookmark
  const [perks, setPerks] = useState(null);

  // Set the image URL; if merchants.logoimage is not available, fallback to a default image
  const url = merchants.logoimage
    ? `https://api.perksmania.com/api/v1/merchants/image/${merchants.logoimage}`
    : images.perksIcon; // Ensure `images.perksIcon` is your fallback image

  // Modify the perks URL based on your response structure
  const perksUrl = perks?.perks_image?.length > 0
    ? `https://api.perksmania.com/api/v1/perks/image/${perks.perks_image[0].src}`
    : images.perksIcon; // Fallback to a default image if perks_image is unavailable
  // Fallback to a default image if perks_image is unavailable

  const fetchPerksByMerchantId = async (merchant_id) => {
    try {
      const response = await fetch(`https://api.perksmania.com/api/v1/perks/bymerchant/${merchant_id.id}`);
      const data = await response.json();
      console.log('Perks Response:', data); // Log the response to verify the structure
      return data;
    } catch (error) {
      throw new Error('Error fetching perks');
    }
  };

  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  // Toggle the bookmark state
  const savedBookmark = () => {
    setIsSaved(!isSaved); // Correct toggle logic
  };

  const merchantsById = async () => {
    try {
      const response = await fetchMerchantById(params.id, {});
      setMerchants(response);

      const perksResponse = await fetchPerksByMerchantId(params.id);
      console.log("Fetched Perks Data:", perksResponse);  // Log the perks response
      setPerks(perksResponse);
    } catch (error) {
      console.log("Error fetching merchant or perks:", error);
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

  const refetch = () => {
    setLoading(true);
    merchantsById();
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

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
          headerTitle: () => (
            <Text className="font-pmedium text-pretty text-lg" numberOfLines={2}>Merchant Details</Text>
          ),
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={toggleHeart} className="p-2 bg-white rounded-full">
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"} // Toggle between filled and outlined heart
                  size={24}
                  color={isLiked ? "red" : "black"} // Change color on toggle
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        
        <View className="px-4 mt-4">
          <View className="items-center">
            <Image
              className="w-full h-[400] rounded-3xl"
              source={typeof url === 'string' ? { uri: url } : url} // Handle both local and remote images
              resizeMode="cover"
            />
          </View>

          <View className="mt-4">
            <View className="mt-4 flex-row justify-between items-center">
              <Text
                className="font-bold text-balance text-base capitalize text-2xl text-violet-700 flex-1 mr-4"
                numberOfLines={3}
              >
                {merchants.business_name}
              </Text>
              {merchants.is_verified && (
                <Image
                  source={{ uri: 'https://path-to-verified-badge-image.png' }} // URL for the check mark image
                  style={{ width: 24, height: 24 }} // Adjust the size of the badge
                />
              )}
              <TouchableOpacity onPress={savedBookmark} className="p-2 bg-white rounded-full">
                <Ionicons
                  name={isSaved ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={isSaved ? "indigo" : "black"} // Change color on toggle
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mt-2">
              <Ionicons name="location-outline" size={20} color="black" />
              <Text className="font-normal text-balance text-base capitalize ml-2" numberOfLines={5}>
                {merchants.office_address ? merchants.office_address : 'No address available'}
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Ionicons name="call-outline" size={20} color="black" />
              <Text className="font-normal text-balance text-base capitalize ml-2">
              {merchants.office_contact ? merchants.office_contact : 'No phone number available'}
              </Text>
            </View>


            {/* Perks */}
            <View className="mt-4 flex-row justify-between items-center">
              <Text
                className="font-bold text-balance text-base capitalize text-2xl text-violet-700 flex-1 mr-4"
                numberOfLines={3}
              >
                Perks
              </Text>
            </View>
            <View className="p-2 w-[50%] h-[300]">
              <TouchableOpacity
                className="rounded-2xl bg-secondary shadow-sm shadow-slate-300"
                onPress={handleNavigate}
                activeOpacity={1}
              >
                <View className="p-2">
                  <View>
                    {perks ? (
                      <Image
                        className="h-40 rounded-xl"
                        source={{ uri: perksUrl }} // Dynamically load the perks image
                        resizeMode="cover"
                      />
                    ) : (
                      <Text>No Perks Available</Text>
                    )}
                  </View>

                  <View className="h-[100] flex-col justify-between mt-2">
                    <View>
                      <Text className="text-md font-pregular" numberOfLines={2}>
                        {perks?.perks_name || "No Perk Available"} {/* Fallback text */}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <View>
                        <Text className="text-lg font-psemibold text-black">
                          ₱{perks?.discount || "0"} off
                        </Text>
                        <Text className="text-lg font-psemibold text-black">
                          ₱{perks?.original_amount || "0"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

export default MerchantsDetails;
