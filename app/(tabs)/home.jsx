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

import { images } from "../../constants";
import {
  CustomCardRow,
  ScreenHeader,
  FeaturedMerchant,
} from "../../components";

const Home = () => {
  // const { data, isLoading, error, refetch } = fetchAllPerks('api/v1/perks', {});
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <ScreenHeader />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} 
      className="bg-white ">
        <FeaturedMerchant />
        <CustomCardRow />
      </ScrollView>
    </>
  );
};

export default Home;
