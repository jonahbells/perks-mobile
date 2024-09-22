import { FlatList, Text, View, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from "expo-router"

import CustomCard from "./CustomCard"
import { fetchAllPerks } from '../hook/perks'

const CustomCardRow = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const responseData = await fetchAllPerks({});  // Use the API call from api.js
            setData(responseData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    // Function to handle refetch
    const refetch = () => fetchData();

    return (
        <View className='px-2 mt-6'>

            <Text className='px-2 mb-2 font-pmedium text-xl'>Discover Perks</Text>

            <View className='flex-row flex-wrap mb-28'>
                {loading ? (
                    <ActivityIndicator size='large' />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    data?.map((item, index) => (
                        <CustomCard
                            perks={item}
                            key={`perks-details-${item._id}`}
                            handleNavigate={() => router.push(`/perks-details/${item._id}`)}
                        />
                    ))
                )}
            </View>
        </View>

    )
}

export default CustomCardRow