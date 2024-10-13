import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"; // for icons

import { icons } from "../constants";

const Footer = ({ url }) => {
  return (
    <View className='px-4 h-[90] absolute bottom-0 right-0 left-0 space-x-2 items-center flex-row'>
      <TouchableOpacity className='w-[55] h-[55] justify-center items-center rounded-full bg-gray'>
        <Ionicons
          name="bookmark-outline"
          size={28}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className='flex-1 h-[55] justify-center items-center bg-primary rounded-full'
        onPress={() => ('')}
      >
        <Text className='font-psemibold text-lg text-white'>Claim perks</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
