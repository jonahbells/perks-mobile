import { View, Text, FlatList, ViewToken } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import FeaturedMerchantList from "./FeaturedMerchantList";
import { fetchAllMerchants } from "../hook/merchants";
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const FeaturedMerchant = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value= e.contentOffset.x;
    }
  });
  const [paginationIndex, setPaginationIndex] = useState(0);

  const onViewableItemsChanged = ({viewableItems}) => {
    if(viewableItems[0].index !== undefined && viewableItems[0].index !==null)
      setPaginationIndex(viewableItems[0].index);
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged}
  ]);

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
    <View className='mt-4'>
      <Text className='text-xl font-pmedium ml-4 mb-2'>Featured Merchants</Text>
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <FeaturedMerchantList 
          item={item} 
          index={index} 
          scrollX={scrollX}/>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setData([...data])}
        onEndReachedThreshold={0.5}
      />
      <Pagination 
        items={data}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
      />
    </View>
  );
};

export default FeaturedMerchant;
