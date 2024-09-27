import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={`${focused? "bg-secondary": "bg-#999"} rounded-full p-2`}>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor= {color}
        className='w-7 h-7'
      />
      {/* <Text className="text-xs"
        style={{ color: color }}>
        {name}
      </Text> */}
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          // tabBarActiveTintColor: "#fefefe",
          // tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: "#6132bc",
            height: 75,
            position: 'absolute',
            bottom: 25,       
            marginHorizontal: 40,
            paddingVertical: 28,   
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 0,
            paddingHorizontal: 10
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            // headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.homeOutline}
                color={color}
                name='Home'
                focused={focused}
              />
            )

          }}
        />

        <Tabs.Screen
          name='bookmark'
          options={{
            title: 'Bookmark',
            // headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmarkOutline}
                color={color}
                name='Bookmark'
                focused={focused}
              />
            )

          }}
        />

        <Tabs.Screen
          name='scan'
          options={{
            title: 'Scan',
            // headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.scanner}
                color={color}
                name='Scan'
                focused={focused}
              />
            )

          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.userOutline}
                color={color}
                name='Profile'
                focused={focused}
              />
            )

          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout