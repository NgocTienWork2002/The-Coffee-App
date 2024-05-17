/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {
    faCartShopping,
    faChevronRight,
    faFileLines,
    faGear,
    faRightFromBracket,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../contexts/ContextAPI';
import ButtonCartVoucher from '../../components/ButtonCartVoucher/ButtonCartVoucher';

function ProfileManagement(): JSX.Element {
    const navigation: any = useNavigation();
    const {isAuthenticated, setIsAuthenticated, setProfile} = useContext(AppContext);

    const handleLogout = () => {
        Alert.alert('Thông báo', 'Bạn có muốn đăng xuất?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    setIsAuthenticated(!isAuthenticated);
                    setProfile(null);
                    navigation.navigate('Login');
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.statusBar}>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>Khác</Text>
                <View style={styles.groupVoucher}>
                    <ButtonCartVoucher />
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.titleText}>Tiện ích</Text>
                <TouchableOpacity style={styles.btnUtil} onPress={() => navigation.navigate('OrderHistory')}>
                    <FontAwesomeIcon
                        icon={faFileLines}
                        style={{
                            padding: 12,
                            color: 'orange',
                            marginBottom: 10,
                        }}
                    />
                    <Text style={styles.textSection}>Lịch sử đơn hàng</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 30,
                    }}>
                    <TouchableOpacity
                        style={[styles.btnUtil, {flex: 1, marginRight: 40}]}
                        onPress={() => navigation.navigate('Voucher')}>
                        <FontAwesomeIcon
                            icon={faTicket}
                            style={{
                                padding: 12,
                                color: 'green',
                                marginBottom: 10,
                            }}
                        />
                        <Text style={styles.textSection}>Voucher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnUtil, {flex: 1}]}
                        onPress={() => navigation.navigate('Payment')}>
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{
                                color: 'purple',
                                padding: 12,
                                marginBottom: 10,
                            }}
                        />
                        <Text style={styles.textSection}>Giỏ hàng</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.titleText}>Tài Khoản</Text>
                <View style={styles.contentView}>
                    <TouchableOpacity style={styles.sectionView} onPress={() => navigation.navigate('Profile')}>
                        <FontAwesomeIcon icon={faUser} style={{marginRight: 10}} />
                        <Text style={styles.textSection}>Thông tin cá nhân</Text>
                        <FontAwesomeIcon icon={faChevronRight} style={styles.chevron} size={12} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sectionView}>
                        <FontAwesomeIcon icon={faGear} style={{marginRight: 10}} />
                        <Text style={styles.textSection}>Cài đặt</Text>
                        <FontAwesomeIcon icon={faChevronRight} style={styles.chevron} size={12} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sectionView} onPress={() => handleLogout()}>
                        <FontAwesomeIcon icon={faRightFromBracket} style={{marginRight: 10}} />
                        <Text style={styles.textSection}>Đăng xuất</Text>
                        <FontAwesomeIcon icon={faChevronRight} style={styles.chevron} size={12} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    body: {
        backgroundColor: '#efefef',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    groupVoucher: {
        flexDirection: 'row',
    },
    titleText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    contentView: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1,

        elevation: 1,
    },
    sectionView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 15,
        alignItems: 'center',
    },
    textSection: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    arrowIcon: {
        position: 'absolute',
        right: 0,
    },
    btnUtil: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1,

        elevation: 1,
    },
    chevron: {
        position: 'absolute',
        right: 0,
    },
});

export default ProfileManagement;
