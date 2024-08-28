import { Image, TouchableOpacity } from "react-native";


const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity 
    className=''
    onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        className='h-7 w-7'
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
