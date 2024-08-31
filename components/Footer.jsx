import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import { icons } from "../constants";

const Footer = ({ url }) => {
  return (
    <View className='p-4 mb-1 absolute bottom-0 left-0 right-0 space-x-4 items-center flex-row'>
      <TouchableOpacity className='w-[55px] h-[55px] border-[1px] items-center justify-center border-black rounded-2xl'>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          className='w-[40%] h-[40%]'
        />
      </TouchableOpacity>

      <TouchableOpacity
        className='flex-1 h-[100%] justify-center items-center border-[1px] bg-black rounded-2xl'
        onPress={() => ('')}
      >
        <Text className='font-semibold text-lg text-black-300'>Claim Perks</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
