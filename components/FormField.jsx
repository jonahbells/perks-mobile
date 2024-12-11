import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // for icons

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  errors,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); 

  console.log(errors)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium">{title}</Text>

      <View className={` w-full h-16 px-4 rounded-2xl border-[2px] flex-row items-center ${
          isFocused ? "border-primary" : errors ? "border-red-500 border-2" : "border-gray-300"
        }`}>
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          onChangeText={handleChangeText}
          secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
          {...props}
        />


        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity className='mr-1' onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {errors && (
          <FontAwesome name="exclamation-circle" size={18} color="red" />
        )}

      </View>
      {errors && (<Text className='text-red-700'>{errors}</Text>)}
    </View>
  );
};

export default FormField;
