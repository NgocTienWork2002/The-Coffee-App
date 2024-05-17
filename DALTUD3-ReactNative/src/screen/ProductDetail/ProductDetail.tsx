import {faHeart, faMinus, faPlus, faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image, TextInput, Dimensions, StyleSheet, Alert} from 'react-native';
import {formatCurrency} from '../../utils/utils';
import {AppContext} from '../../contexts/ContextAPI';
import {Item, size} from '../../types/user.type';

export default function ProductDetail({navigation, route}: any) {
    const {cart, setCart} = useContext(AppContext);
    const [Number, setNumber] = useState(1);
    const Plus = () => {
        if (Number < 10) {
            setNumber(Number + 1);
        }
    };
    const Minus = () => {
        if (Number < 2) {
            setNumber(1);
        } else {
            setNumber(Number - 1);
        }
    };
    const [Checkbox, setCheckbox] = useState('S');
    const [PriceSize, setPriceSize] = useState(route.params.priceitem[0].price);
    const textSize = (text: string) => {
        if (text == 'S') {
            return 'Nhỏ';
        } else if (text == 'M') {
            return 'Vừa';
        } else {
            return 'Lớn';
        }
    };
    const Order = async () => {
        let listItem: Item = {
            _id: route.params.iditem,
            name: route.params.nameitem,
            quantity: Number,
            size: Checkbox,
        };
        setCart([...cart, listItem]);
        Alert.alert('Thông báo', 'Đặt hàng thành công', [{text: 'OK', onPress: () => navigation.navigate('Order')}]);
    };
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <View style={styles.containerModel}>
                    <View style={styles.containerTop}>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon color='white' size={20} icon={faX} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.containerMiddle}>
                        <View style={styles.contentTop}>
                            <Image
                                style={{width: '100%', height: 300}}
                                resizeMode='cover'
                                source={{
                                    uri: route.params.imgitem,
                                }}
                            />
                            <View style={styles.informationTop}>
                                <View style={styles.titleTop}>
                                    <View style={styles.titleTopLeft}>
                                        <Text style={{fontSize: 26, color: 'black', fontWeight: '700'}}>
                                            {route.params.nameitem}
                                        </Text>
                                        <Text style={{fontSize: 18, fontWeight: '500'}}>
                                            {formatCurrency(route.params.priceitem[0].price)}đ
                                        </Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <FontAwesomeIcon color='#E57905' size={25} icon={faHeart} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={{marginTop: 6, color: 'black'}} numberOfLines={3}>
                                    {route.params.descriptionitem}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentMiddle}>
                            <View style={styles.titleMiddleTop}>
                                <Text style={{fontSize: 23, color: 'black', fontWeight: '500'}}>Size</Text>
                                <Text style={{fontSize: 15, fontWeight: '400'}}>Chọn 1 loại size</Text>
                            </View>
                            <View style={styles.sizeControll}>
                                {route.params.priceitem.map((item: size, index: number) => {
                                    return (
                                        <View key={index} style={styles.radioView}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setCheckbox(item.size);
                                                        setPriceSize(item.price);
                                                    }}>
                                                    <View style={styles.radioWrapper}>
                                                        <View style={styles.radio} />
                                                        {Checkbox === item.size && <View style={styles.radioBg} />}
                                                    </View>
                                                </TouchableOpacity>
                                                <Text style={{marginLeft: 5, fontWeight: '400', color: 'black'}}>
                                                    {textSize(item.size)}
                                                </Text>
                                            </View>
                                            <Text style={styles.radioText}>{formatCurrency(item.price)}đ</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={styles.contentBottom}>
                            <View style={styles.titleBottom}>
                                <Text style={{fontSize: 23, color: 'black', fontWeight: '500'}}>Yêu cầu khác</Text>
                                <Text style={{fontSize: 15, fontWeight: '400'}}>Những tùy chọn khác</Text>
                            </View>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                style={styles.inputBottom}
                                placeholder='Ghi chú'
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.containerBottom}>
                        <View style={styles.numberForm}>
                            <TouchableOpacity style={styles.number} onPress={Minus}>
                                <FontAwesomeIcon color='#E88C28' icon={faMinus} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 16, color: 'black'}}>{Number}</Text>
                            <TouchableOpacity style={styles.number} onPress={Plus}>
                                <FontAwesomeIcon color='#E88C28' icon={faPlus} />
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={Order}
                                style={{
                                    padding: 10,
                                    backgroundColor: '#E57905',
                                    width: '80%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    marginLeft: 12,
                                }}>
                                <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
                                    Chọn | {formatCurrency(PriceSize * Number)}đ
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containerModel: {
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: '#EEEEEE',
        bottom: 0,
    },
    containerTop: {
        position: 'absolute',
        right: 0,
        marginTop: 20,
        marginRight: 20,
        zIndex: 1,
    },
    btnCancel: {
        padding: 10,
        backgroundColor: '#AAAAAA',
        borderRadius: 50,
    },
    containerMiddle: {
        flex: 1,
    },
    contentTop: {
        backgroundColor: 'white',
        paddingBottom: 15,
    },
    informationTop: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    titleTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleTopLeft: {
        flex: 1,
    },
    contentMiddle: {
        marginTop: 14,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    titleMiddleTop: {
        marginTop: 12,
    },
    sizeControll: {
        marginTop: 12,
        flex: 1,
        flexDirection: 'column',
    },
    sizeform: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
    },
    sizeformLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentBottom: {
        marginTop: 14,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        marginBottom: 25,
    },
    titleBottom: {
        marginTop: 12,
    },
    inputBottom: {
        marginVertical: 15,
        borderWidth: 0.5,
        width: '100%',
        padding: 1,
        paddingLeft: 10,
        borderRadius: 10,
        borderColor: 'gray',
    },
    containerBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    numberForm: {
        flexDirection: 'row',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    number: {
        padding: 2,
        borderRadius: 99,
        backgroundColor: '#FFF2D9',
    },
    radioText: {
        fontSize: 16,
        color: 'black',
    },
    radioView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    radio: {
        height: 20,
        width: 20,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 99,
    },
    radioBg: {
        backgroundColor: '#E57905',
        height: 12,
        width: 12,
        borderRadius: 10,
        borderColor: 'black',
        left: 4,
        position: 'absolute',
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
});
