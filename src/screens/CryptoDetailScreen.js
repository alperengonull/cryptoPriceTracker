import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { fetchCoinData, fetchCoinMarketChart } from '../utils/api'; // API fonksiyonlarını içe aktar
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-gifted-charts';

const CryptoDetailScreen = ({ route, navigation }) => {
    const { coinId } = route.params;
    const [coinData, setCoinData] = useState(null);
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCoinData(coinId);
                setCoinData(data);
                const marketChartData = await fetchCoinMarketChart(coinId);

                setMarketData(marketChartData);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    setError('Too many requests. Please try again later.');
                } else {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [coinId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#F0B90B" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Üst menü */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>{coinData?.name}</Text>
            </View>

            {/* Kripto Bilgileri */}
            <Image source={{ uri: coinData?.image?.large }} style={styles.image} />
            <Text style={styles.name}>{coinData?.name}</Text>
            <Text style={styles.price}>${coinData?.market_data?.current_price?.usd}</Text>

            {/* Fiyat Grafiği */}
            <LineChart
                areaChart
                data={marketData}
                rotateLabel
                width={Dimensions.get('window').width - 100}
                hideDataPoints
                spacing={10}
                color="#00ff83"
                thickness={2}
                startFillColor="rgba(20,105,81,0.3)"
                endFillColor="rgba(20,85,81,0.01)"
                startOpacity={0.9}
                endOpacity={0.2}
                initialSpacing={0}
                noOfSections={6}
                yAxisColor="white"
                yAxisThickness={0}
                rulesType="solid"
                rulesThickness={0}
                rulesColor="gray"
                yAxisTextStyle={{ color: 'gray' }}
                yAxisSide="right"
                xAxisColor="lightgray"
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View
                                style={{
                                    height: 90,
                                    width: 100,
                                    justifyContent: 'center',
                                    marginTop: -30,
                                    marginLeft: -40,
                                }}>
                                <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
                                    {items[0].date}
                                </Text>

                                <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                        {'$' + items[0].value.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1f2328'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginVertical: 20
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },
    price: {
        fontSize: 20,
        color: '#4CAF50',
        textAlign: 'center',
        marginVertical: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f2328',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
    },
});

export default CryptoDetailScreen;
