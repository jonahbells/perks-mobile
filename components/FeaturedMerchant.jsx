import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import FeaturedMerchantList from "./FeaturedMerchantList";
import { fetchAllMerchants } from "../hook/merchants";

const FeaturedMerchant = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const responseData = await fetchAllMerchants({}); // Use the API call from api.js
      const filtered = responseData.filter(item => item.is_activated == true);

      setData(filtered.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Function to handle refetch
  const refetch = () => fetchData();

  return (
    <View className='py-4'>
      <Text className='text-base font-pregular mb-4'>Featured Merchant</Text>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <FeaturedMerchantList 
          item={item} 
          index={index} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FeaturedMerchant;
