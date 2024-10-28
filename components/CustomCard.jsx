import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CommonButton from "./CommonButton";
import { image, icons } from "../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from "../context/GlobalProvider";
import { Redirect, router } from "expo-router";
import { addLikebyCustomer } from "../hook/likes";


const CustomCard = ({ perks, handleNavigate }) => {

  const [isLiked, setIsLiked] = useState(false); // State to track if the heart is liked
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();

  const url =
    perks.perks_image && perks.perks_image[0] && perks.perks_image[0].src
      ? `https://api.perksmania.com/api/v1/perks/image/${perks.perks_image[0].src}`
      : null;

      const toggleHeart = async () => {
        if (isLogged) {
          const newLikedState = !isLiked; // Determine the new state
          setIsLiked(newLikedState); // Update local state
      
          try {
            // Call the addLikeByCustomer hook
            const response = await addLikebyCustomer;
            console.log('Response from adding like:', response); // Debug response
          } catch (error) {
            Alert.alert("Error", error.message); // Handle error gracefully
            setIsLiked(!newLikedState); // Revert state if API call fails
          }
        } else {
          Alert.alert(
            "Sign In Required",
            "You need to be logged in to like this perk. Would you like to sign in now?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Sign In",
                onPress: () => router.push("/sign-in"),
              }
            ],
            { cancelable: false }
          );
        }
      };
      

  const likesByCustomer = async () => {
    try {
      // Construct the API URL with merchant ID and query parameter
      const url = `https://api.perksmania.com/api/v1/likes/customer/${id}`;

      // Make the fetch request
      const response = await fetch(url);
      const data = await response.json();

      // Assuming the API returns a field like 'verification_status' that tells us if the merchant is verified
      if (data.verification_status === "Verified") {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      setError("Failed to fetch merchant data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='p-2 w-[50%] h-[300]'>
      <TouchableOpacity
        className="rounded-2xl bg-white shadow-sm shadow-slate-300"
        onPress={handleNavigate}
        activeOpacity={1}
      >
        <View className="p-2">
          <View>
            <TouchableOpacity
              onPress={handleNavigate}
              activeOpacity={1}
            >
              <Image
                className="h-40 rounded-xl"
                source={{ uri: url }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View className="h-[100] flex-col justify-between mt-2">
            <View>
              <Text className="text-md font-pregular" numberOfLines={2}>
                {perks.perks_name}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-lg font-psemibold text-black">
                  ₱{perks.discount} off
                </Text>
                <Text className="text-lg font-psemibold text-black">
                  ₱{perks.original_amount}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={toggleHeart} className="p-2 bg-gray-100 rounded-full">
                  <Ionicons
                    name={isLiked ? "heart" : "heart-outline"} // Toggle between filled and outlined heart
                    size={24}
                    color={isLiked ? "red" : "black"} // Change color on toggle
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>


    </View>
  );
};

export default CustomCard;

