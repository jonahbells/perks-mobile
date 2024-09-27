import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants'
import SearchInput from './SearchInput'

const Header = () => {
    return (
        <SafeAreaView edges={['top']} className='px-4 bg-primary rounded-b-3xl'>
            <View className='flex-row justify-between h-20 items-center'>
                <View className='flex-row space-x-2'>
                    <View>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/250?u=12' }}
                            className='h-10 w-10 rounded-full'
                        />
                    </View>

                    <View>
                        <Text className='font-pmedium text-sm text-gray'>
                            Welcome Back
                        </Text>
                        <Text className='text-xl font-psemibold text-white'>
                            Jonah
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