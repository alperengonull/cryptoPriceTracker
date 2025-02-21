import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CryptoItem from '../components/CryptoItem';
import SearchComponent from '../components/SearchComponent';

const CryptoListScreen = ({ navigation }) => {
    const [cryptoData, setCryptoData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                    },
                });
                console.log('API RESPONSE: ', response.data)
                setCryptoData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoData();
    }, []);

    const filteredData = cryptoData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#F0B90B" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CryptoDetail', {
                                name: item.name,
                                price: item.current_price,
                                image: item.image,
                                id: item.id,
                            })}
                        >
                            <CryptoItem name={item.name} price={item.current_price} image={item.image} item={item} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        padding: 16,
        backgroundColor: '#1f2328',
    },
    itemContainer: {
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f2328',
    },
});

export default CryptoListScreen;
