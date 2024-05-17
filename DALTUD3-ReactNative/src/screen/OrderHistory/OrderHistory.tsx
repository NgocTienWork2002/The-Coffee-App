/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {faArrowLeft, faMartiniGlass, faMugHot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../contexts/ContextAPI';
import http from '../../utils/http';
import {OrderType} from '../../types/user.type';
import {formatCurrency} from '../../utils/utils';

const categoryList = ['Đang thực hiện', 'Đã hoàn tất', 'Đã hủy'];
// const noticeList = ['Chưa có đơn hàng đang thực hiện', 'Chưa có đơn hàng đã hoàn tất', 'Chưa có đơn hàng đã hủy'];

const EmptyComponent = () => {
    return (
        <View style={styles.emptyView}>
            <FontAwesomeIcon icon={faMugHot} style={{color: 'gray'}} size={40} />
            <Text style={{marginTop: 10}}>Bạn chưa có hóa đơn nào</Text>
        </View>
    );
};

function OrderHistory({navigation}: {navigation: any}): JSX.Element {
    const [tab, setTab] = useState('Đang thực hiện');
    const {profile} = useContext(AppContext);
    const [orderList, setOrderList] = useState<OrderType[] | []>([]);

    useEffect(() => {
        http.get(`/order/${profile?._id}`)
            .then((res) => {
                setOrderList(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [profile]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('TabNavigate')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </TouchableOpacity>
                <Text style={styles.title}>Lịch sử đơn hàng</Text>
            </View>
            <View style={styles.lineView} />
            <View style={styles.mainView}>
                <View style={styles.groupNavigate}>
                    {categoryList.map((item) => {
                        return (
                            <TouchableOpacity
                                style={[styles.btnNavigate, tab === item && styles.btnActive]}
                                key={item}
                                onPress={() => setTab(item)}>
                                <Text style={styles.textBtnNavigate}>{item}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <ScrollView>
                    {orderList.length === 0 ? (
                        <EmptyComponent />
                    ) : (
                        orderList.map((item) => {
                            return (
                                <View style={styles.billView} key={item._id}>
                                    <View style={styles.iconBill}>
                                        <FontAwesomeIcon icon={faMartiniGlass} color='white' />
                                    </View>
                                    <View style={{flex: 1, marginLeft: 10}}>
                                        <Text style={[styles.textItem, {fontWeight: 'bold', fontSize: 16}]}>
                                            #{item._id}
                                        </Text>
                                        <Text style={styles.textItem}>{item.createdAt}</Text>
                                        <Text style={styles.textItem}>{item.paymentMethod}</Text>
                                    </View>
                                    <Text style={styles.textItem}>{formatCurrency(item.totalAmount)}</Text>
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    iconBill: {
        backgroundColor: '#E57905',
        padding: 8,
        borderRadius: 20,
    },
    textItem: {
        color: 'black',
        fontSize: 14,
    },
    billView: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    titleBar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        position: 'relative',
    },
    btnBack: {
        position: 'absolute',
        left: 0,
        paddingHorizontal: 15,
    },
    mainView: {
        padding: 15,
    },
    groupNavigate: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    btnNavigate: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10,
    },
    textBtnNavigate: {
        color: '#E57905',
    },
    lineView: {
        backgroundColor: 'black',
        height: 0.5,
    },
    emptyView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    btnActive: {
        backgroundColor: 'rgba(229, 121, 5, 0.16)',
    },
});
export default OrderHistory;
