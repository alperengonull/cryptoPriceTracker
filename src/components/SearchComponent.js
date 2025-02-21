import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchComponent = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search Crypto"
                placeholderTextColor="#ccc"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#fdd835',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        color: 'white',
    },
});

export default SearchComponent;
