import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'; // for icons

import { useGlobalContext } from "../context/GlobalProvider";
import { images } from '../constants'
import SearchInput from './SearchInput'

const Header = () => {
    const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
    const url = user && user.profile_image ? `https://api.perksmania.com/api/v1/customers/image/${user.profile_image}`
        : null;

    return (
        <SafeAreaView edges={['top']} className='px-4 bg-primary rounded-b-xl'>
            <View className='flex-row justify-between h-20 items-center'>
                <View className='flex-row space-x-2'>

                    <View>
                        {url ?
                            (<Image
                                source={{ uri: url }}
                                className='h-10 w-10 rounded-full'
                            />) :
                            <FontAwesome name="user-circle-o" size={40} color="#d1d5db" />
                        }
                    </View>

                    <View>
                        <Text className='font-pmedium text-sm text-gray-300'>
                            Welcome Back
                        </Text>
                        <Text className='text-xl font-psemibold text-white'>
                            {user ? user.firstname : 'Guest'}
                        </Text>
                    </View>
                </View>

                <View>
                    <Image
                        source={images.perksLogo}
                        className="w-28 h-8"
                        resizeMode='cover'
                    />
                </View>
            </View>

            < SearchInput />
        </SafeAreaView>
    )
}

export default Header