import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="mb-6 flex-row items-center w-full h-14 px-4 rounded-2xl bg-white">
      <TextInput
        className="text-base flex-1 font-pregular"
        value={query}
        placeholder="Search..."
        placeholderTextColor="#94a3b8"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image 
        source={icons.search} 
        tintColor='#94a3b8'
        className="w-5 h-5 " 
        resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
