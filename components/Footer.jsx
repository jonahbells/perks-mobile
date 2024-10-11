import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import { icons } from "../constants";

const Footer = ({ url }) => {
  return (
    <View className='px-4 h-[90] absolute bottom-0 right-0 left-0 space-x-2 items-center flex-row'>
      <TouchableOpacity className='p-4 w-[55] h-[55] justify-center items-center rounded-full bg-secondary'>
        <Image
          source={icons.cart}
          resizeMode='contain'
          className='w-6 h-6'
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
