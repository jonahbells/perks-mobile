import { useState } from 'react';
import { View, Text, ScrollView, Switch, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; // for icons
import { Redirect, router } from 'expo-router';

import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../hook/auth";

// Assuming you use NativeWind's class names in a similar TailwindCSS way
const Profile = () => {
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
  const [isFaceIDEnabled, setFaceIDEnabled] = useState(false);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/home");
  };
  
  if (!isLogged) return <Redirect href="/sign-in" />;

  return (
    <SafeAreaView edges={['top']} className="bg-gray-100 h-full">
      <ScrollView className="p-4">
        {/* Profile Header */}
        <View className="bg-primary rounded-xl p-4 items-center">
          <Image
            source={{ uri: 'https://placekitten.com/200/200' }} // Replace with actual user image
            className="w-20 h-20 rounded-full"
          />
          <Text className="text-white text-xl font-semibold mt-2">Duygu Çağlayan</Text>
          <Text className="text-white text-sm mt-1">Gold Member</Text>
        </View>

        {/* General Section */}
        <View className="mt-6">
          <Text className="text-gray-600 text-lg font-semibold mb-4">General</Text>

          {/* Personal Information */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="user" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Personal information</Text>
            </View>
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="cog" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Settings</Text>
            </View>
          </TouchableOpacity>

          {/* Enable Face ID */}
          <View className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="lock" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Enable face ID</Text>
            </View>
            <Switch
              value={isFaceIDEnabled}
              onValueChange={(value) => setFaceIDEnabled(value)}
              thumbColor={isFaceIDEnabled ? '#D1D5DB' : '#D1D5DB'} // Change thumb color
              trackColor={{ false: '#D1D5DB', true: '#6132bc' }}     // Background (track) color changes
            />
          </View>
        </View>

        {/* Sessions & Notifications Section */}
        <View className="mt-6">
          <Text className="text-gray-600 text-lg font-semibold mb-4">Sessions & Notifications</Text>

          {/* Upcoming Sessions */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="calendar" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Upcoming sessions</Text>
            </View>
          </TouchableOpacity>

          {/* Previous Sessions */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="bookmark" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Previous sessions</Text>
            </View>
          </TouchableOpacity>

          {/* Reminders */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="bell" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Reminders</Text>
            </View>
          </TouchableOpacity>

          {/* Ask your therapist */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="comments" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Ask your therapist</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View className="mt-6 pb-32">
          <Text className="text-gray-600 text-lg font-semibold mb-4">Account</Text>

          {/* Help Center */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <FontAwesome name="question-circle" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Help center</Text>
            </View>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3"
          onPress={logout}
          >
            <View className="flex-row items-center">
              <FontAwesome name="sign-out" size={24} color="gray" />
              <Text className="ml-3 text-gray-800">Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
