/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useEffect, useState} from 'react';
import {faArrowLeft, faChevronRight, faMugHot, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatCurrency} from '../../utils/utils';
import {AppContext} from '../../contexts/ContextAPI';
import EditCartModal from '../../components/EditCartModal/EditCartModal';
import {ProductCart} from '../../types/user.type';
import http from '../../utils/http';

type ItemProps = {
    item: ProductCart;
    handleRemoveProduct: (id: string) => void;
    handleEdit: (
        is: string,
        option: {
            size: string;
            price: number;
            _id: string;
        }[],
        quantity: number,
        chooseSize: string,
    ) => void;
};
interface FormDataCartType {
    productListCart: ProductCart[];
    totalAmount: number;
}

export interface OptionDataType {
    id: string;
    option: {
        size: string;
        price: number;
        _id: string;
    }[];
    quantity: number;
    chooseSize: string;
}

const ItemView = ({item, handleRemoveProduct, handleEdit}: ItemProps) => {
    const {name, _id, amount, chooseSize, quantity, option} = item;
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.btnEdit} onPress={() => handleEdit(_id, option, quantity, chooseSize)}>
                    <FontAwesomeIcon icon={faPenToSquare} size={18} style={{color: '#E57905'}} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.itemName} numberOfLines={1}>
                        {quantity}x {name}
                    </Text>
                    <Text>Size: {chooseSize}</Text>
                </View>
            </View>
            <Text style={styles.textPrice}>{formatCurrency(amount)}</Text>
            <TouchableOpacity style={styles.btnRemove} onPress={() => handleRemoveProduct(_id)}>
                <FontAwesomeIcon icon={faTrash} size={15} style={{color: '#E57905'}} />
            </TouchableOpacity>
        </View>
    );
};

function Payment({navigation}: {navigation: any}): JSX.Element {
    const {cart, setCart, profile} = useContext(AppContext);
    const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
    const [formData, setFormData] = useState<FormDataCartType | null>(null);
    const [isModal, setIsModal] = useState(false);
    const [optionData, setOptionData] = useState<OptionDataType>({
        id: '',
        option: [
            {
                size: 'S',
                price: 0,
                _id: '',
            },
        ],
        quantity: 1,
        chooseSize: 'S',
    });

    const handleModal = () => {
        setIsModal(!isModal);
    };

    useEffect(() => {
        http.post('/search/cart', {cart: cart})
            .then((res) => {
                setFormData({
                    productListCart: res.data.data.productListCart,
                    totalAmount: res.data.data.totalAmount,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [cart]);

    const handleRemoveProduct = (id: string) => {
        const productIndex = cart.findIndex((product) => product._id === id);
        if (productIndex > -1) {
            let newState = [...cart];
            newState.splice(productIndex, 1);
            console.log(newState);
            setCart(newState);
        }
    };

    const handleEdit = (
        id: string,
        option: {
            size: string;
            price: number;
            _id: string;
        }[],
        quantity: number,
        chooseSize: string,
    ) => {
        setOptionData({
            quantity,
            option,
            id,
            chooseSize,
        });
        handleModal();
    };

    const handleUpdate = (id: string, chooseSize: string, quantity: number) => {
        const newCart = cart.map((item) => {
            if (item._id === id) {
                return {
                    ...item,
                    quantity: quantity,
                    size: chooseSize,
                };
            }
            return item;
        });
        setCart(newCart);
    };

    const handleOrder = () => {
        const newBill = {
            ...formData,
            paymentMethod,
            userId: profile?._id,
        };
        http.post('/order', newBill)
            .then((res) => {
                Alert.alert('Thông báo', res.data.message, [
                    {
                        text: 'OK',
                        onPress: () => {
                            setCart([]);
                            navigation.navigate('OrderHistory');
                        },
                    },
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </TouchableOpacity>
                <Text style={styles.title}>Xác nhận đơn hàng</Text>
            </View>
            {cart.length === 0 ? (
                <View style={styles.emptyView}>
                    <FontAwesomeIcon icon={faMugHot} style={{color: 'gray'}} size={40} />
                    <Text style={{marginTop: 10}}>Không có sản phẩm trong giỏ hàng</Text>
                </View>
            ) : (
                <>
                    <ScrollView>
                        <View style={[styles.group, {marginTop: 20}]}>
                            <Text style={styles.titleGroup}>Địa điểm lấy hàng</Text>
                            <TouchableOpacity style={styles.itemView}>
                                <View>
                                    <Text style={styles.textItem}>HCM Cao Thang</Text>
                                    <Text style={styles.subTextItem} numberOfLines={1}>
                                        86 Cao Thắng, Quận 3, Hồ Chí Minh, Việt Nam
                                    </Text>
                                </View>
                                <FontAwesomeIcon icon={faChevronRight} style={styles.chevron} size={12} />
                            </TouchableOpacity>
                            <View style={styles.itemView}>
                                <View>
                                    <Text style={styles.textItem}>Thời gian nhận hàng</Text>
                                    <Text style={styles.subTextItem} numberOfLines={1}>
                                        15 - 30 phút
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.group}>
                            <Text style={styles.titleGroup}>Sản phẩm đã chọn</Text>
                            {formData?.productListCart && (
                                <FlatList
                                    data={formData.productListCart}
                                    scrollEnabled={false}
                                    renderItem={({item}) => (
                                        <ItemView
                                            item={item}
                                            handleEdit={handleEdit}
                                            handleRemoveProduct={handleRemoveProduct}
                                        />
                                    )}
                                    keyExtractor={(item) => item._id}
                                />
                            )}
                        </View>
                        <View style={styles.group}>
                            <Text style={styles.titleGroup}>Tổng cộng</Text>
                            <View style={styles.totalView}>
                                <Text style={styles.textCategory}>Thành tiền</Text>
                                <Text style={styles.textPrice}>{formatCurrency(formData?.totalAmount || 0)}</Text>
                            </View>
                            <View style={styles.totalView}>
                                <Text style={styles.textCategory}>Phí giao hàng</Text>
                                <Text style={styles.textPrice}>0đ</Text>
                            </View>
                            <View style={styles.totalView}>
                                <Text style={[styles.textCategory, {fontWeight: 'bold'}]}>Số tiền thanh toán</Text>
                                <Text style={[styles.textPrice, {fontWeight: 'bold'}]}>
                                    {formatCurrency(formData?.totalAmount || 0)}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.group, {marginBottom: 0}]}>
                            <Text style={styles.titleGroup}>Thanh toán</Text>
                            <View>
                                <View style={styles.radioView}>
                                    <Text style={styles.radioText}>Tiền mặt</Text>
                                    <TouchableOpacity onPress={() => setPaymentMethod('Tiền mặt')}>
                                        <View style={styles.radioWrapper}>
                                            <View style={styles.radio} />
                                            {paymentMethod === 'Tiền mặt' && <View style={styles.radioBg} />}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioView}>
                                    <Text style={styles.radioText}>Momo</Text>
                                    <TouchableOpacity onPress={() => setPaymentMethod('Momo')}>
                                        <View style={styles.radioWrapper}>
                                            <View style={styles.radio} />
                                            {paymentMethod === 'Momo' && <View style={styles.radioBg} />}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioView}>
                                    <Text style={styles.radioText}>Shoppe Pay</Text>
                                    <TouchableOpacity onPress={() => setPaymentMethod('Shoppe Pay')}>
                                        <View style={styles.radioWrapper}>
                                            <View style={styles.radio} />
                                            {paymentMethod === 'Shoppe Pay' && <View style={styles.radioBg} />}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.radioView}>
                                    <Text style={styles.radioText}>Ngân hàng</Text>
                                    <TouchableOpacity onPress={() => setPaymentMethod('Ngân hàng')}>
                                        <View style={styles.radioWrapper}>
                                            <View style={styles.radio} />
                                            {paymentMethod === 'Ngân hàng' && <View style={styles.radioBg} />}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {isModal && (
                            <EditCartModal
                                optionData={optionData}
                                handleModal={handleModal}
                                isModal={isModal}
                                handleUpdate={handleUpdate}
                            />
                        )}
                    </ScrollView>
                    <View style={styles.paymentBar}>
                        <Text style={styles.textTotalPrice}>Tổng: {formatCurrency(formData?.totalAmount || 0)}đ</Text>
                        <TouchableOpacity style={styles.btnCheckout} onPress={() => handleOrder()}>
                            <Text style={styles.textBtnCheckout}>Đặt hàng</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sizeView: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    titleModal: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    modalContent: {
        backgroundColor: 'lightgray',
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        height: 300,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F1EF',
    },
    title: {
        fontSize: 18,
        color: '#E57905',
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
    group: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 15,
    },
    titleGroup: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
    },
    btnEdit: {
        marginRight: 10,
    },
    btnRemove: {
        marginLeft: 10,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textPrice: {
        fontSize: 16,
        color: '#6C7A89',
        alignSelf: 'center',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    totalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    textCategory: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
    },
    // Radio
    radioText: {
        fontSize: 16,
        color: 'black',
    },
    radioView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    radio: {
        height: 22,
        width: 22,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 12,
    },
    radioBg: {
        backgroundColor: '#E57905',
        height: 14,
        width: 14,
        borderRadius: 10,
        left: 4,
        position: 'absolute',
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    // Payment
    paymentBar: {
        backgroundColor: '#E57905',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    btnCheckout: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
    },
    textTotalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    textBtnCheckout: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E57905',
    },

    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    chevron: {
        position: 'absolute',
        right: 0,
    },
    textItem: {
        fontSize: 14,
        color: 'black',
    },
    subTextItem: {
        color: 'gray',
    },
    emptyView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
});
export default Payment;
