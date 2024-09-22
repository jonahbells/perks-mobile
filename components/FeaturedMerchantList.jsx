import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';


const FeaturedMerchantList = ({ item, index, scrollX }) => {
  const url = `https://api.perksmania.com/api/v1/merchants/image/${item.logoimage}`;

  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * 414, index * 414, (index + 1) * 414],
            [-414 * 0, 0, 414 * 0],
            Extrapolation.CLAMP
          ),

        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * 414, index * 414, (index + 1) * 414],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        }
      ]
    }
  })
  console.log(rnAnimatedStyle)

  return (
    <Animated.View className='py-2 pl-4 shadow-md shadow-slate-300 w-[100vw]' style={rnAnimatedStyle}>
      <View>
        <Image
          source={{ uri: url }}
          className='w-[380] h-36 rounded-xl'
        />
        <Text className='pt-2 text-base font-plight'>{item.business_name}</Text>
      </View>
    </Animated.View>

  )
}

export default FeaturedMerchantList