import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";
import CommonButton from "./CommonButton";
import { image, icons } from '../constants'

const CustomCard = ({ perks, handleNavigate }) => {
  const url = "https://api.perksmania.com/api/v1/perks/image/";
  return (
    <View className="mb-4 w-[182px] h-[280px] rounded-2xl bg-zinc-100">
      <TouchableOpacity

        onPress={handleNavigate}
        activeOpacity={1}
      >
        <View className='p-2'>
          <View>
            <TouchableOpacity
              className=" w-full"
              onPress={handleNavigate}
              activeOpacity={1}
            >
              <Image
                className="h-40 rounded-xl"
                source={{ uri: url + perks.perks_image[0].src }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View className='h-[100] flex-col justify-between mt-2'>
            <View>
              <Text className='text-md font-pregular' numberOfLines={2}>{perks.perks_name}</Text>
            </View>
            <View className='flex flex-row justify-between'>
              <View>
                <Text className="text-lg font-pbold text-black">₱{perks.discount} off</Text>
                <Text className="text-lg font-pbold text-black">₱{perks.original_amount}</Text>
              </View>
              <View>
        
                  <CommonButton 
                    iconUrl={icons.heartOutline}
                    handlePress={() => ('')}
                    buttonDimension="w-9 h-9 rounded-3xl items-center justify-center"
                    imgDimension="w-4 h-4"
                    color="bg-white"
                  />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>

  );
};

export default CustomCard;
