import { View, Text, useWindowDimensions } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Pagination from "./Pagination";
import FeaturedMerchantList from "./FeaturedMerchantList";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue, scrollTo } from 'react-native-reanimated';

const FeaturedMerchant = ({ featuredMerchantList }) => {
  const [data, setData] = useState(featuredMerchantList); // Start with initial data
  const scrollX = useSharedValue(0); // Shared value for scroll animation
  const [paginationIndex, setPaginationIndex] = useState(0); // State to track the pagination index
  const ref = useAnimatedRef();
  const [ isAutoPlay, setisAutoPlay ] = useState(true);
  const offset = useSharedValue(0);
  const interval = useRef();
  const { width } = useWindowDimensions();

  // Handle scroll events and update scrollX
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    }
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    }
  }, [isAutoPlay, offset, width]);

  useDerivedValue (() => {
    scrollTo(ref, offset.value, 0, true);
  });

  // Update pagination index when viewable items change
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index % 5); // Loop index for pagination
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50 // Trigger when 50% of an item is visible
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged }
  ]);

  // Infinite scroll: append more data when reaching the end
  const fetchMoreData = () => {
    setData(prevData => [...prevData, ...featuredMerchantList]); // Append the same data (loop effect)
  };

  return (
    <View className='mt-8'>
      <Text className='text-xl font-pmedium ml-4 mb-4'>Featured Merchants</Text>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(_, index) => `list_items${index}`}
        renderItem={({ item, index }) => (
          <FeaturedMerchantList item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler} // Track scroll position
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={fetchMoreData} // Fetch more data when reaching 50% of the end
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          setisAutoPlay(false)
        }}
        onScrollEndDrag={() => {
          setisAutoPlay(true)
        }}
      />
      <Pagination
        items={data} // Pass the current data for pagination
        scrollX={scrollX}
        paginationIndex={paginationIndex} // Pass the current index
      />
    </View>
  );
};

export default FeaturedMerchant;
