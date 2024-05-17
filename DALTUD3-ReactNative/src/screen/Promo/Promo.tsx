import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import Header from '../Header/Header';
import HomePromo from './HomePromo';

function Promo() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <SafeAreaView style={{flex: 1}}>
                <Header />
                <HomePromo/>
            </SafeAreaView>
        </View>
    );
}

export default Promo;
