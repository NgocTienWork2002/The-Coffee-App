import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import Header from '../Header/Header';
import HomeBody from './HomeBody';

export default function Home() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <SafeAreaView style={{flex: 1}}>
                <Header />
                <HomeBody />
            </SafeAreaView>
        </View>
    );
}
