import { Image, TouchableOpacity } from "react-native";


const CommonButton = ({ iconUrl, buttonDimension, imgDimension, color, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${buttonDimension} ${color}`}
      >
      <Image
        source={iconUrl}
        resizeMode='contain'
        className={`${imgDimension}`}
      />
    </TouchableOpacity>
  );
};

export default CommonButton;
