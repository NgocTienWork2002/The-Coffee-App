import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {productDetail} from '../../types/user.type';
import {formatCurrency} from '../../utils/utils';

interface option {
    price: number;
    size: string;
    _id: string;
}
interface list {
    id: string;
    name: string;
    img: string;
    price: option[];
    description: string;
    navigation: any;
}
function ListItem({id, name, img, price, description, navigation}: list) {
    return (
        <>
            <View style={styles.List}>
                <View style={styles.ListTop}>
                    <View>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 15,
                            }}
                            resizeMode='cover'
                            source={{
                                uri: img,
                            }}
                        />
                    </View>
                    <View style={styles.ListCenter}>
                        <Text style={{fontSize: 18, color: 'black'}}>{name}</Text>
                        <Text style={{fontSize: 15}}>{formatCurrency(price[0].price)}đ</Text>
                    </View>
                </View>
                <View style={styles.ListBottom}>
                    <TouchableOpacity
                        style={styles.BtnAdd}
                        onPress={() =>
                            navigation.navigate('ProductDetail', {
                                iditem: id,
                                nameitem: name,
                                imgitem: img,
                                descriptionitem: description,
                                priceitem: price,
                            })
                        }>
                        <FontAwesomeIcon size={15} color='white' icon={faPlus} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    List: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    ListTop: {
        flexDirection: 'row',
        flex: 1,
    },
    ListCenter: {
        marginLeft: 10,
        flex: 1,
    },
    ListBottom: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    BtnAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        padding: 10,
        backgroundColor: '#E57905',
        borderRadius: 50,
    },
});
export default ListItem;
