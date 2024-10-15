import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const FeaturedMerchantList = ({ item, index, scrollX }) => {
  const url = `https://api.perksmania.com/api/v1/merchants/image/${item.logoimage}`;

  const { width } = Dimensions.get("screen");

  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),

        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        }
      ]
    }
  })

  return (
    <Animated.View
      key={item._id}
      className={`relative justify-center items-center`}
      style={[rnAnimatedStyle, {width:width}]}>
      <Image
        source={{ uri: url }}
        className={`h-52 rounded-xl`}
        style={{width:width-57}}
      />
      <LinearGradient
        colors={["transparent", 'rgba(0, 0, 0, 0.6)']}
        className={`absolute left-7 right-0 top-0 h-52 rounded-xl`}
        style={[{width:width-57}]}
      >
        <View className="absolute top-40 px-4">
          <Text className="text-gray font-pregular text-sm">{item.business_name}</Text>
        </View>
      </LinearGradient>
    </Animated.View>

  )
}

export default FeaturedMerchantList