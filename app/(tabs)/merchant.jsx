import { View, Text, Image, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchAllMerchants } from '../../hook/merchants'; // Assuming this is your API call
import { router, Stack } from "expo-router"

import { icons, images } from "../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';

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
      <TouchableOpacity
        onPress={() => handlePress(item)} // Trigger when the merchant is tapped
        className="my-2 w-full rounded-lg bg-white border border-gray-300 shadow-sm"
      >
        <View className="p-3 flex-row items-center">
          {/* Image section */}
          <Image
            source={item.logoimage
              ? { uri: `https://api.perksmania.com/api/v1/merchants/image/${item.logoimage}` }
              : images.perksIcon} // Use local image if logo is missing
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
          />

          {/* Merchant details */}
          <View className="flex-1">
            <Text className="font-bold text-base uppercase" numberOfLines={2}>
              {item.business_name ? item.business_name.toString() : 'Unknown Merchant'} {/* Merchant Name */}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={12} color="black" />
              <Text className="font-normal text-sm text-gray-600 ml-1 capitalize" numberOfLines={3}>
                {item.office_address ? item.office_address.toString() : 'No address available'} {/* Merchant Address */}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error: {error}</Text> {/* Display error */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: () => (
            <Text className="font-pmedium text-pretty text-lg" numberOfLines={2}>Merchants</Text>
          ),
        }}
      />
      <FlatList
        data={data} // Set the data fetched from the API
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Fallback to index if id is missing
        renderItem={({ item }) => (
          <RenderMerchants item={item} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Pull to refresh functionality
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
};

export default Merchants;
