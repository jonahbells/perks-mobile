import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { images, icons } from "../constants";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";



const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
    const top = interpolate(scale.value, [0, 1], [0, 9])

    return {
      transform: [{
        scale: scaleValue
      }],
      top
    }
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity
    }
  });

  const icon = {
    home: (
      <Image
        source={isFocused ? icons.home : icons.homeOutline}
        resizeMode="contain"
        tintColor={isFocused ? "#fff" : "#94a3b8"}
        className="w-6 h-6"
      />
    ),
    merchant: (
      <Image
        source={icons.merchantOutline}
        resizeMode="contain"
        tintColor={isFocused ? "#fff" : "#94a3b8"}
        className="w-6 h-6"
      />
    ),
    scan: (
      <Image
        source={icons.scanner}
        resizeMode="contain"
        tintColor={isFocused ? "#fff" : "#94a3b8"}
        className="w-6 h-6"
      />
    ),
    profile: (
      <Image
        source={isFocused ? icons.user  : icons.userOutline}
        resizeMode="contain"
        tintColor={isFocused ? "#fff" : "#94a3b8"}
        className="w-6 h-6"
      />
    ),
  };
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center"
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]}
      </Animated.View>
      <Animated.Text className="mt-1 font-psemibold" style={[{ color: isFocused ? "#fff" : "#94a3b8" }, animatedTextStyle]}>{label}</Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;
