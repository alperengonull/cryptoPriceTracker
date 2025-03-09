import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CryptoListScreen from './src/screens/CryptoListScreen';
import CryptoDetailScreen from './src/screens/CryptoDetailScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#1f2328',
    },
};

const CryptoStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="CryptoList" component={CryptoListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const MainTabNavigator = () => (
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Crypto') {
                    iconName = 'coins';
                }

                return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { backgroundColor: '#1f2328' },
            tabBarActiveTintColor: '#fdd835',
            tabBarInactiveTintColor: '#FFF',
            headerShown: false,
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Crypto" component={CryptoStack} />
    </Tab.Navigator>
);

const MainStack = () => (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const App = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <MainStack />
        </NavigationContainer>
    );
};

export default App;
