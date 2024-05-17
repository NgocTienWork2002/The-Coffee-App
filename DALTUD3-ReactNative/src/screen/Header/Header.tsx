/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {faBell, faTicket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {AppContext} from '../../contexts/ContextAPI';
import ButtonCartVoucher from '../../components/ButtonCartVoucher/ButtonCartVoucher';

export default function Header() {
    const {profile} = useContext(AppContext);
    return (
        <View style={style.Container}>
            <View style={style.ItemView}>
                <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/Images/Logo-removebg-preview.png')}
                />
                <Text style={style.Text}>{profile?.lastName}, Hi-Tea đi!</Text>
            </View>
            <View style={style.ItemView}>
                <ButtonCartVoucher />
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    Statusbar_Style: {
        color: 'white',
    },
    Container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 5,
    },
    ItemView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Text: {
        fontSize: 15,
        fontWeight: '900',
    },
    Btn_Menu: {
        padding: 10,
        borderRadius: 50,
        paddingHorizontal: 15,
        elevation: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    Slider: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
});
