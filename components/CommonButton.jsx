import { Image, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"; // for icons


const CommonButton = ({ name, size, color, buttonDimension, buttonColor, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${buttonDimension} ${buttonColor}`}
      >
      <Ionicons
        name={name}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default CommonButton;
