import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../atoms/favoritesAtom';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CryptoItem = ({ name, price, image, item, showFavoriteButton = true }) => {
    const [favorites, setFavorites] = useAtom(favoritesAtom);

    const isFavorite = favorites.some(favorite => favorite.id === item.id);

    const handleAddToFavorites = () => {
        if (!isFavorite) {
            setFavorites([...favorites, item]);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            {showFavoriteButton && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddToFavorites}
                >
                    <AntDesign
                        style={styles.heartIcon}
                        name={isFavorite ? 'heart' : 'hearto'}
                        size={20}
                        color={isFavorite ? '#F0B90B' : '#000'}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a3037',
        padding: 20,
        borderRadius: 8,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 36,
        height: 36,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#4CAF50', // Yeşil ton
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    // heartIcon: {
    //     color: 'white',
    // },

});

export default CryptoItem;
