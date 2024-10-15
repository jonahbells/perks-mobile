import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"; // for icons

import { icons } from "../constants";

const Footer = ({ url }) => {
  return (
    <View className='px-4 absolute bottom-2 right-0 left-0 space-x-2 items-center flex-row'>
      <TouchableOpacity className='p-2 h-12 w-12 justify-center items-center rounded-full bg-gray'>
        <Ionicons
          name="bookmark-outline"
          size={25}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className='flex-1 p-2 justify-center items-center bg-primary rounded-full'
        onPress={() => ('')}
      >
        <Text className='font-pregular text-lg text-gray'>Claim perks</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
