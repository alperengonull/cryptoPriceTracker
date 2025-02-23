import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../atoms/favoritesAtom';
import { auth } from '../firebase/config';
import CryptoItem from '../components/CryptoItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SwipeListView } from 'react-native-swipe-list-view';


const HomeScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    const user = auth.currentUser;


    const handleRemoveFavorite = (item) => {
        setFavorites(favorites.filter(favorite => favorite.id !== item.id));
    };

    const renderHiddenItem = (data) => (
        <View style={styles.rowBack}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFavorite(data.item)}>
                <Icon name="trash" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.greeting}>
                    <Text style={styles.helloText}>Hello,</Text>
                    <Text style={styles.userName}>{user?.displayName || 'User'} 👋</Text>
                </View>
                <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
                    <Icon name="cog" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.favoritesTitle}>Your Favorites</Text>
                <SwipeListView
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('CryptoDetail', {
                                    coinId: item.id, // coinId parametresini ekleyin
                                })}
                            >
                                <CryptoItem key={item.id.toString()} name={item.name} price={item.current_price} image={item.image} item={item} showFavoriteButton={false} />
                            </TouchableOpacity>
                        </View>
                    )}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2328',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    greeting: {
        flex: 1,
        marginLeft: 10,
    },
    helloText: {
        fontSize: 18,
        color: '#AAA',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    settingsButton: {
        backgroundColor: '#F0B90B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    settingsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        marginTop: 30,
    },
    favoritesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 10,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 10,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '100%',
    },
});

export default HomeScreen;
