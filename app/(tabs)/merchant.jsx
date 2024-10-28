import { View, Text, Image, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchAllMerchants } from '../../hook/merchants'; // Assuming this is your API call
import { router } from "expo-router"

import { icons, images } from "../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


const Merchants = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch merchants data
  const fetchData = async () => {
    try {
      const responseData = await fetchAllMerchants(); // API call to fetch merchants

      if (responseData && responseData.length > 0) {
        setData(responseData); // Assuming responseData is an array of merchants
      } else {
        console.log('No data received from API.');
      }

    } catch (err) {
      console.error('Error fetching merchants:', err.message); // Capture and log error
      setError(err.message); // Set error message in state
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(); // Re-fetch data on pull-to-refresh
    setRefreshing(false);
  };

  const handlePress = (merchant) => {
    router.push(`/merchants-details/${merchant._id}`);
    console.log(merchant._id)
  }

  // Render individual merchant item
  const RenderMerchants = ({ item }) => {
    return (
      <View className="my-2 w-full rounded-xl bg-white border-1 flex-row items-center">
        <TouchableOpacity className="w-full"
          onPress={() => handlePress(item)} // Trigger when the merchant is tapped

        >
          <View className="p-2 flex-row items-start justify-start">
            {/* Image section */}
            <View>
              <Image
                source={item.logoimage
                  ? { uri: `https://api.perksmania.com/api/v1/merchants/image/${item.logoimage}` }
                  : images.perksIcon} // Use local image with require
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
              />
            </View>

            {/* Merchant details */}
            <View>
              <Text className="font-bold text-wrap text-medium uppercase" numberOfLines={1}>
                {item.business_name ? item.business_name.toString() : 'Unknown Merchant'} {/* Merchant Name */}
              </Text>
              <Text className="font-normal text-pretty text-sm capitalize mt-0.5" numberOfLines={3}>
                <Ionicons name="location-outline" size={12} color="black" />
                {item.office_address ? item.office_address.toString() : 'No address available'} {/* Merchant Address */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text> {/* Display error */}
      </View>
    );
  }

  return (
    <View className='px-4 mb-28'>
      <FlatList
      showsVerticalScrollIndicator="false"
        data={data} // Set the data fetched from the API
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Fallback to index if id is missing
        renderItem={({ item, index }) => (
          <RenderMerchants
            item={item}
          />
        )} // Render each merchant
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Pull to refresh functionality
        }
      />
    </View>
  );
};

export default Merchants;
