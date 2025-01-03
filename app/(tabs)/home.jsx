import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { StatusBar } from 'expo-status-bar';

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

import Slider from "../../components/Home/Slider";

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
    <StatusBar style="light" backgroundColor={"transparent"} translucent />
    {/* Header */}

      <Stack.Screen
        options={{
          header: () => <ScreenHeader />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Slider />
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
