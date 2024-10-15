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
  console.log(rnAnimatedStyle)

  return (
    <Animated.View
      key={item._id}
      className={`relative w-[414] justify-center items-center`}
      style={rnAnimatedStyle}>
      <Image
        source={{ uri: url }}
        className={`w-[350] h-52 rounded-xl`}
      />
      <LinearGradient
        colors={["transparent", 'rgba(0, 0, 0, 0.6)']}
        className={`absolute left-8 right-0 top-0 w-[350] h-52 rounded-xl p-8`}
      >
        <View className="absolute top-40 px-4">
          <Text className="text-white font-pmedium text-lg">{item.business_name}</Text>
        </View>
      </LinearGradient>
    </Animated.View>

  )
}

export default FeaturedMerchantList