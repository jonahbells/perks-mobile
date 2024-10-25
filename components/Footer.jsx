import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons, Feather } from "@expo/vector-icons"; // for icons

import { icons } from "../constants";

const Footer = ({ url }) => {
  return (
    <View className='px-4 absolute bottom-5 right-0 left-0 space-x-2 items-center flex-row'>
      <TouchableOpacity
        className='flex-1 p-2 h-14 flex-row w-14 justify-center items-center bg-primary rounded-2xl'
        onPress={() => ('')}
      >
        <Feather name="shopping-bag" size={20} color={"white"}/>
        <Text className='ml-2 font-pmedium text-xl text-white'>Get now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
