import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="mb-6 flex-row items-center w-full h-14 px-4 rounded-2xl bg-slate-100">
      <TouchableOpacity
        className='mr-2'
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
        tintColor='#64748b'
        className="w-6 h-6 " 
        resizeMode="contain" />
      </TouchableOpacity>

      <TextInput
        className="text-lg flex-1 font-pmedium text-black"
        value={query}
        placeholder="Search..."
        placeholderTextColor="#64748b"
        onChangeText={(e) => setQuery(e)}
      />

      
    </View>
  );
};

export default SearchInput;
