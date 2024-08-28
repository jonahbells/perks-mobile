import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 mt-2">
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className="text-xs"
        style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#1f2937',
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 90,
          }
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.home : icons.homeOutline}
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
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.bookmark : icons.bookmarkOutline}
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
            headerShown: false,
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
                icon={focused ? icons.user : icons.userOutline}
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