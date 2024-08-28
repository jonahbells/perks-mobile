import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";

const CustomCard = ({ perks, handleNavigate }) => {
  const url = "https://api.perksmania.com/api/v1/perks/image/";
  return (
    <TouchableOpacity
      className="mb-3 w-[185px] h-[250px] rounded-2xl border-black bg-white"
      onPress={handleNavigate}
      activeOpacity={1}
    >
      <TouchableOpacity
        className="items-center h-50 w-full"
        onPress={handleNavigate}
        activeOpacity={1}
      >
        <Image
          className="w-full h-40 rounded-t-2xl"
          source={{ uri: url + perks.perks_image[0].src }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View className="m-2">
        <Text>{perks.perks_name}</Text>
      </View>
      <View className="flex-row ml-2">
        <View className="rounded-lg p-1 mr-2 border-slate-300 border-[1px]">
          <Text className="text-xs text-black">P {perks.discount} off</Text>
        </View>
        <View className="rounded-lg p-1 border-slate-300 border-[1px]">
          <Text className="text-xs text-black">P {perks.original_amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;
