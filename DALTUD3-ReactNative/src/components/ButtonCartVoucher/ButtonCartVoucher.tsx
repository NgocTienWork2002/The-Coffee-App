/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {faCartShopping, faTicket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../contexts/ContextAPI';

export default function ButtonCartVoucher(): JSX.Element {
    const navigation = useNavigation();
    const {cart} = useContext(AppContext);
    return (
        <>
            <TouchableOpacity
                style={[styles.btnVoucher, {marginRight: 10}]}
                onPress={() => navigation.navigate('Voucher')}>
                <FontAwesomeIcon
                    icon={faTicket}
                    style={{
                        marginRight: 5,
                        padding: 10,
                        color: 'orange',
                    }}
                />
                <Text style={{color: 'black'}}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnNotice} onPress={() => navigation.navigate('Payment')}>
                {cart.length > 0 && <Text style={styles.textCartNumber}>{cart.length}</Text>}
                <FontAwesomeIcon icon={faCartShopping} style={{color: 'orange'}} />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    btnVoucher: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    btnNotice: {
        backgroundColor: '#fff',
        width: 50,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        position: 'relative',
        flexDirection: 'row',
    },

    textCartNumber: {
        fontSize: 16,
        color: 'black',
        paddingRight: 3,
    },
});
