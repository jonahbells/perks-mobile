import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { images, icons } from "../constants";



const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}) => {
    const icon = {
        home: (
          <Image
            source={isFocused ? icons.home : icons.homeOutline}
            resizeMode="contain"
            tintColor={isFocused ? "#fefefe" : "#cbd5e1"}
            className="w-6 h-6"
          />
        ),
        merchant: (
          <Image
            source={isFocused ? icons.home : icons.homeOutline}
            resizeMode="contain"
            tintColor={isFocused ? "#fefefe" : "#cbd5e1"}
            className="w-6 h-6"
          />
        ),
        scan: (
          <Image
            source={icons.scanner}
            resizeMode="contain"
            tintColor={isFocused ? "#fefefe" : "#cbd5e1"}
            className="w-6 h-6"
          />
        ),
        profile: (
          <Image
            source={isFocused ? icons.user : icons.userOutline}
            resizeMode="contain"
            tintColor={isFocused ? "#fefefe" : "#cbd5e1"}
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
      {icon[routeName]}
      <Text style={{ color: isFocused ? "#fefefe" : "#cbd5e1" }}>{label}</Text>
    </Pressable>
  );
};

export default TabBarButton;
