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
import { fetchMerchantById, checkMerchantVerification } from "../../hook/merchants";
import { fetchPerksByMerchantId } from "../../hook/perks";
import { CommonButton, CustomCardRow, Footer, CustomCard } from "../../components";
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
  const [data, setData] = useState({});

  // Set the image URL; if merchants.logoimage is not available, fallback to a default image
  const url = merchants.logoimage
    ? `https://api.perksmania.com/api/v1/merchants/image/${merchants.logoimage}`
    : images.perksIcon;

  const perksUrl = perks?.perks_image?.length > 0
    ? `https://api.perksmania.com/api/v1/perks/${perks.perks_image[0].src}`
    : images.perksIcon;


  const checkMerchantVerification = async () => {
    try {
      // Construct the API URL with merchant ID and query parameter
      const url = `https://api.perksmania.com/api/v1/merchants/${merchantId}?verification_status=Unverified`;

      // Make the fetch request
      const response = await fetch(url);
      const data = await response.json();

      // Assuming the API returns a field like 'verification_status' that tells us if the merchant is verified
      if (data.verification_status === "Verified") {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      setError("Failed to fetch merchant data");
    } finally {
      setLoading(false);
    }
  };

  const fetchPerksByMerchantId = async () => {
    try {
      const response = await fetch(`https://api.perksmania.com/api/v1/perks/bymerchant/${params.id}`);
      const json = await response.json();
        setData(json.rows); // Save data to state
      console.log('Perks Response:', data);
    } catch (error) {
      throw new Error('Error fetching perks');
    }
  };
  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  const verificationBadge = {
    icon: merchants.verification_status === "Verified" ? "checkmark-circle" : "checkmark-circle-outline",
    color: merchants.verification_status === "Verified" ? "#0000ff" : "black",
  };

  // Toggle the bookmark state
  // const savedBookmark = () => {
  //   setIsSaved(!isSaved); // Correct toggle logic
  // };

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
    fetchPerksByMerchantId();
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
            <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray/70">
            <Ionicons name="arrow-back" size={20} />
          </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text className="font-pmedium text-pretty text-lg" numberOfLines={2}>Merchant Details</Text>
          ),
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={toggleHeart} className="p-2 bg-gray rounded-full">
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

        {/* {error && (
          <View className="p-4">
            <Text className="text-center text-red-500">Failed to load merchant details. Please try again later.</Text>
          </View>
        )} */}

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
                className="text-base font-psemibold capitalize text-2xl flex-1 mr-4"
                numberOfLines={3}
              >
                {merchants.business_name}

                <View>
                  <Ionicons
                    name={verificationBadge.icon}
                    size={24}
                    color={verificationBadge.color}
                    style={{ marginLeft: 8, marginTop: 4 }}
                  />
                </View>
              </Text>


              {/* <TouchableOpacity onPress={savedBookmark} className="p-2 bg-white rounded-full">
                <Ionicons
                  name={isSaved ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={isSaved ? "indigo" : "black"} // Change color on toggle
                />
              </TouchableOpacity> */}
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
            <View className='mt-6'>

              <Text className='font-bold text-balance text-base text-primary capitalize text-2xl flex-1 mr-4'>Discover Perks</Text>

              <View className='flex-row flex-wrap mb-28'>
                {isLoading ? (
                  <ActivityIndicator size='large' />
                ) : error ? (
                  <Text>Something went wrong</Text>
                ) : (
                  data?.map((item, index) => (
                    <CustomCard
                      perks={item}
                      key={`perks-details-${item._id}`}
                      handleNavigate={() => router.push(`/perks-details/${item._id}`)}
                    />
                  ))
                )}
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

    </SafeAreaView >
  );
};

export default MerchantsDetails;
