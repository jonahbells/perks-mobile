import { View, Text } from 'react-native'
import React from 'react'


const dummyData = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Description for item 1',
    image: require('../../assets/images/blackscoop-banner.jpg'), // Local image
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Description for item 2',
    image: require('../../assets/images/busan-banner.jpg'),
  },
  {
    id: '3',
    title: 'Item 3',
    description: 'Description for item 3',
    image: require('../../assets/images/vine.banner.png'),
  }
];


const Slider = () => {
  return (
    <View className="p-4">
      <Text className="text-xl font-psemibold ">Perks for you</Text>
    </View>
  )
}

export default Slider