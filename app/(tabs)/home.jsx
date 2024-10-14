import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";

import { fetchAllMerchants } from "../../hook/merchants";

import { images } from "../../constants";
import {
  CustomCardRow,
  ScreenHeader,
  FeaturedMerchant,
} from "../../components";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [feturedMerchant, setFeturedMerchant] = useState([]);
  
  const fetchData = async () => {
    try {
      const responseData = await fetchAllMerchants({}); // Use the API call from api.js
      const filtered = responseData.filter(item => item.is_activated == true);

      setFeturedMerchant(filtered.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <ScreenHeader />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}
        className="bg-white ">
        {loading ? (
          <ActivityIndicator size={'large'}/> 
        ) : (
          <FeaturedMerchant
            featuredMerchantList={feturedMerchant}
          />
        )}
        <CustomCardRow />
      </ScrollView>
    </>
  );
};

export default Home;
