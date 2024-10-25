import { View, Text, TouchableOpacity, Image, LayoutChangeEvent } from "react-native";

import { images, icons } from "../constants";
import TabBarButton from "./TabBarButton";
import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const TabBar = ({ state, descriptors, navigation }) => {
  const [dimensions, setDimensions] = useState({height: 20, width:100});

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    })
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabbarLayout}
    style={{
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5, // Elevation for Android
    }}
    className="
    absolute 
    bottom-5 
    flex-row 
    items-center 
    justify-between 
    bg-primary 
    mx-14 
    py-5 
    rounded-full
    "
    >
      <Animated.View style={[animatedStyle,
        {
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 30,
          marginHorizontal: 10,
          height: dimensions.height - 30,
          width: buttonWidth - 19
        }
      ]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {duration: 1000})
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };


        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            className="flex-1 items-center justify-center"
            routeName={route.name}
            color={isFocused ? "#fefefe" : "#cbd5e1"}
            label={label}
          />
          // <TouchableOpacity
          //   key={route.name}
          //   accessibilityRole="button"
          //   accessibilityState={isFocused ? { selected: true } : {}}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   testID={options.tabBarTestID}
          //   onPress={onPress}
          //   onLongPress={onLongPress}
          //   className="flex-1 items-center justify-center"
          // >
          //   {icon[route.name]}
          //   <Text style={{ color: isFocused ? "#fefefe" : "#cbd5e1" }}>
          //     {label}
          //   </Text>
          // </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
