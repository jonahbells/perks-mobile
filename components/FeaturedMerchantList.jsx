import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'


const FeaturedMerchantList = ({ item, index}) => {
  const url = `https://api.perksmania.com/api/v1/merchants/image/${item.logoimage}`

  return (
    <View className='pl-4 shadow-sm shadow-slate-300 gap-x-9 w-[400px]'>
      <Image  
        source={{ uri: url }}
        className='w-[350px] h-36 rounded-xl'
      />
      <Text className='pt-2 text-base font-pmedium'>{item.business_name}</Text>
    </View>
    
  )
}

export default FeaturedMerchantList