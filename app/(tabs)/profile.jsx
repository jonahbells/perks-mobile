import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons"; // for icons
import { Redirect, router } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../hook/auth";

// Assuming you use NativeWind's class names in a similar TailwindCSS way
const Profile = () => {
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
  const url =
    user && user.profile_image
      ? `https://api.perksmania.com/api/v1/customers/image/${user.profile_image}`
      : null;
  const [isFaceIDEnabled, setFaceIDEnabled] = useState(false);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/home");
  };

  if (!isLogged) return <Redirect href="/sign-in" />;

  return (
    <SafeAreaView edges={["top, bottom"]} className="bg-gray-100 h-full">
      <ScrollView className="p-4 pt-12">
        {/* Profile Header */}
        <View className="items-center mt-6">
          {url ? (
            <Image
              source={{ uri: url }} // Replace with actual user image
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <View className="w-24 h-24 bg-black rounded-full justify-center items-center">
            <Text className="text-white text-3xl">{user?.firstname?.[0]}{user?.lastname?.[0]}</Text>
          </View>
          )}
          <Text className="text-xl font-semibold mt-4">
            {user?.firstname} {user?.lastname}
          </Text>
          <Text className="text-gray-500">{user?.email}</Text>
          {/* Edit Button */}
          <TouchableOpacity className="flex-row items-center bg-white px-6 py-2 mt-4 rounded-full border border-gray-300">
            <Feather name="edit-2" size={16} color="black" />
            <Text className="ml-2 text-sm font-semibold">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Options Section */}
        <View className="mt-8 bg-white rounded-3xl">
          <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-300">
            <View className="flex-row items-center">
              <Feather name="lock" size={20} color="black" />
              <Text className="ml-4 text-base">Change Password</Text>
            </View>
          </TouchableOpacity>

          {/* Manage Addresses */}
          <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-300">
            <View className="flex-row items-center">
              <Feather name="map-pin" size={20} color="black" />
              <Text className="ml-4 text-base">Manage Addresses</Text>
            </View>
          </TouchableOpacity>

          {/* Notification Setting */}
          <TouchableOpacity className="flex-row items-center justify-between py-4 px-4">
            <View className="flex-row items-center">
              <Feather name="bell" size={20} color="black" />
              <Text className="ml-4 text-base">Notification Setting</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View className="mt-8 bg-white rounded-3xl">
          <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-300">
            <View className="flex-row items-center">
              <Feather name="help-circle" size={20} color="black" />
              <Text className="ml-4 text-base">Help Center</Text>
            </View>
          </TouchableOpacity>

          {/* Notification Setting */}
          <TouchableOpacity onPress={logout} className="flex-row items-center justify-between py-4 px-4">
            <View className="flex-row items-center">
              <Feather name="log-out" size={20} color="black" />
              <Text className="ml-4 text-base">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
