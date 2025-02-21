import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

const SettingsScreen = ({ navigation }) => {
    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    };

    const user = auth.currentUser;

    return (
        <View style={styles.container}>
            <Text style={styles.userEmail}>Logged in as: {user?.email}</Text>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
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
    userEmail: {
        fontSize: 16,
        color: '#AAA',
        marginBottom: 20,
    },
    signOutButton: {
        backgroundColor: '#F0B90B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    signOutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default SettingsScreen;
