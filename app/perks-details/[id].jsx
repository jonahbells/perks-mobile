import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { image, icons } from '../../constants'
import { fetchPerkById } from "../../hook/useFetch";
import { ScreenHeaderBtn, Footer } from "../../components";

const PerksDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = fetchPerkById(`api/v1/perks/${params.id}`, {});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#312651" />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View className='p-16'>
              <Text>{data.perks_name}</Text>

            </View>
          )}
        </ScrollView>
        <Footer />
      </>
    </SafeAreaView>
  );
};

export default PerksDetails;
