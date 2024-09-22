import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const { width } = Dimensions.get("screen");

const Pagination = ({ items, paginationIndex, scrollX }) => {
  return (
    <View className="flex-row h-6 justify-center items-center">
      {items.map((_,index) => {
        const pgAnimationStyle = useAnimatedStyle(() => {
            const dotwidth = interpolate(
                scrollX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [8, 20, 8],
                Extrapolation.CLAMP
            );

            return {
                width: dotwidth,
            }
        })
        return (
            <Animated.View 
            key={index} 
            className={`${paginationIndex === index ? 'bg-black-300': 'bg-black-400' } h-2 w-2 mx-[2] rounded-full`}
            style={[pgAnimationStyle]}
            />
        )
      })}
    </View>
  )
}

export default Pagination