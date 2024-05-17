/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screen/Login/Login';
import Register from './src/screen/Register/Register';
import TabNavigate from './src/screen/TabNavigate/TabNavigate';
import OrderHistory from './src/screen/OrderHistory/OrderHistory';
import Payment from './src/screen/Payment/Payment';
import Profile from './src/screen/Profile/Profile';
import {AppProvider} from './src/contexts/ContextAPI';
import ProductDetail from './src/screen/ProductDetail/ProductDetail';
import Search from './src/screen/Search/Search';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
                    <Stack.Screen name='TabNavigate' component={TabNavigate} />
                    <Stack.Screen name='ProductDetail' component={ProductDetail} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='OrderHistory' component={OrderHistory} />
                    <Stack.Screen name='Payment' component={Payment} />
                    <Stack.Screen name='Profile' component={Profile} />
                    <Stack.Screen name='Search' component={Search} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}

export default App;
