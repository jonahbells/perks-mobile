import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchAllMerchants } from "../../hook/merchants"; // Assuming this is your API call
import { router, Stack } from "expo-router";

import { icons, images } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

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
        console.log("No data received from API.");
      }
    } catch (err) {
      console.error("Error fetching merchants:", err.message); // Capture and log error
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
    console.log(merchant._id);
  };

  // Render individual merchant item
  const RenderMerchants = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(item)} // Trigger when the merchant is tapped
        className="h-20 my-2 rounded-lg bg-white shadow-sm"
      >
        <View className="p-3 flex-row items-center">
          {/* Image section */}
          <View>
            <Image
              source={
                item.logoimage
                  ? {
                      uri: `https://api.perksmania.com/api/v1/merchants/image/${item.logoimage}`,
                    }
                  : images.perksIcon
              } // Use local image if logo is missing
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
          </View>
          <View>
            <Text
              className="font-psemibold text-base uppercase text"
            >
              {item.business_name ? item.business_name : "Unknown Merchant"}
            </Text>
            <View className="flex-row mt-1 items-center">
              <Ionicons name="location-outline" size={12} color="black" />
              <Text className="font-plight text-sm text-gray-600 ml-1 capitalize"
              >
                {item.office_address
                  ? item.office_address
                  : "No address available"}{" "}
                {/* Merchant Address */}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: () => (
            <Text className="font-pmedium text-lg">Merchants</Text>
          ),
        }}
      />
      <FlatList
        className="px-4"
        showsVerticalScrollIndicator="false"
        data={data} // Set the data fetched from the API
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        } // Fallback to index if id is missing
        renderItem={({ item }) => <RenderMerchants item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Pull to refresh functionality
        }
      />
    </View>
  );
};

export default Merchants;
