import {faChessKing, faGifts, faSeedling, faUsers, faUsersRectangle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Voucher} from '../../data/Data';

function HomePromo() {
    return (
        <View style={styles.container}>
            <View style={styles.listBtn}>
                <TouchableOpacity style={styles.Btn}>
                    <FontAwesomeIcon size={25} style={{marginBottom: 10}} color='yellow' icon={faChessKing} />
                    <Text style={styles.fontText}>Hạng thành viên</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Btn, {marginLeft: 2}]}>
                    <FontAwesomeIcon size={25} style={{marginBottom: 10}} color='tomato' icon={faGifts} />
                    <Text style={styles.fontText}>Quà tặng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Btn}>
                    <FontAwesomeIcon size={25} style={{marginBottom: 10}} color='green' icon={faSeedling} />
                    <Text style={styles.fontText}>Lịch sử Coffe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Btn, {marginLeft: 2}]}>
                    <FontAwesomeIcon size={25} style={{marginBottom: 10}} color='blue' icon={faUsers} />
                    <Text style={styles.fontText}>Quyền lợi của bạn</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <View style={styles.titleText}>
                    <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>Phiếu ưu đãi của bạn</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FFF2D9',
                            padding: 5,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color: '#E57905'}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, overflow: 'hidden'}}>
                    <FlatList
                        style={{overflow: 'hidden'}}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={Voucher}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'white',
                                        marginBottom: 10,
                                        padding: 10,
                                        flexDirection: 'row',
                                        borderRadius: 10,
                                    }}>
                                    <Image source={item.Img} style={{width: 100, height: 100}} />
                                    <View style={{marginLeft: 10}}>
                                        <Text style={{fontSize: 16, fontWeight: '600', color: 'black', flex: 1}}>
                                            {item.Name}
                                        </Text>
                                        <Text style={{fontSize: 13, fontWeight: '600', color: '#E57905'}}>
                                            {item.Date}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#E2E0E2',
    },
    listBtn: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    Btn: {
        width: '45%',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 25,
        borderRadius: 10,
    },
    fontText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    titleText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});
export default HomePromo;
