import { FlatList, Text, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from "expo-router"

import CustomCard from "./CustomCard"
import { fetchAllPerks } from '../hook/useFetch'

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
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                horizontal={false}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <CustomCard
                        perks={item}
                        handleNavigate={() => router.push(`/perks-details/${item._id}`)}
                    />
                )}

                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                // ListFooterComponent={<View className="h-[170px]" />}
                contentContainerStyle={{ paddingBottom: 60 }}
            />
        </View>

    )
}

export default CustomCardRow