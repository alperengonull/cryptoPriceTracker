import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CryptoDetailScreen = ({ route }) => {
    const { name, price, image } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
            <Image source={{ uri: image }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f2328',
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    price: {
        fontSize: 20,
        color: '#4CAF50',
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default CryptoDetailScreen;
