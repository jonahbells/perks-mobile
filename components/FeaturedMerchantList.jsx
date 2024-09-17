import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'


const FeaturedMerchantList = ({ item, index}) => {
  const url = `https://api.perksmania.com/api/v1/merchants/image/${item.logoimage}`

  return (
    <View className='justify-center gap-x-8 w-[400px]'>
      <Image  
        source={{ uri: url }}
        className='w-[350px] h-40 rounded-xl'
      />
      <Text>{item.business_name}</Text>
    </View>
    
  )
}

export default FeaturedMerchantList