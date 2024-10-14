import { View, Dimensions } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

const { width } = Dimensions.get("screen");

const Pagination = ({ items, paginationIndex, scrollX }) => {
  const dotCount = 5; // Define how many dots should be shown (loop over them)

  return (
    <View className="flex-row h-6 justify-center items-center">
      {Array.from({ length: dotCount }).map((_, index) => {
        // Animated style for each dot's width (for smooth resizing effect)
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = interpolate(
            scrollX.value % (dotCount * width), // Keep within dotCount range
            inputRange,
            [8, 20, 8], // Small to large to small for active dot effect
            Extrapolation.CLAMP
          );

          return {
            width: dotWidth,
          };
        });

        // Determine background color based on whether this is the active (current) index
        // const backgroundColor = paginationIndex === index ? 'blue' : 'gray';

        return (
          <Animated.View 
            key={index} 
            className={`${paginationIndex === index ? 'bg-primary': 'bg-black-400' } h-2 w-2 mx-[3] rounded-full`}
            style={[animatedStyle]}
            />
        );
      })}
    </View>
  );
};

export default Pagination;