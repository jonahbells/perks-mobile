import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons


import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={`${focused? "bg-white": null} rounded-full p-2`}>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor= {color}
        className='w-6 h-6'
      />
      {/* <Text className="text-xs"
        style={{ color: color }}>
        {name}
      </Text> */}
    </View>
  )
}

const IoniconsTabIcon = ({ name, color, focused }) => {
  return (
    <View className={`${focused? "bg-white": "bg-#999"} rounded-full p-2`}>
    <Ionicons
      name={name}
      size={28} // Adjust size as needed
      color={color} // Active/Inactive color
    />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#6132bc",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            backgroundColor: "#6132bc",
            height: 75,
            position: 'absolute',
            bottom: 25,       
            marginHorizontal: 80,
            // paddingVertical: 3,   
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 0,
            paddingHorizontal: 7
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
          name="merchant"
          options={{
            title: 'Merchants',
            tabBarIcon: ({ color, focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', height: 50 }}>
              <IoniconsTabIcon
                name='business-outline' // Ionicons name for Merchants
                color={color}     
                focused={focused}      // Active/Inactive color
              />
              </View>
            ),
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