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
      setData(responseData.slice(0, 5));
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
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <FeaturedMerchantList 
          item={item} 
          index={index} />
        )}
      />
    </View>
  );
};

export default FeaturedMerchant;
