import { View, Text, TouchableOpacity, Image } from "react-native";

import { images, icons } from "../constants";
import TabBarButton from "./TabBarButton";

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
    className="
    absolute 
    bottom-6 
    flex-row 
    items-center 
    justify-between 
    bg-primary 
    mx-14 
    py-5 
    rounded-full
    shadow-black
    shadow-2xl
    "
    >
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
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            className="flex-1 items-center justify-center"
            routeName={route.name}
            color={isFocused ? "#fefefe" : "#cbd5e1"}
            label={label}
            icon={icon}
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
