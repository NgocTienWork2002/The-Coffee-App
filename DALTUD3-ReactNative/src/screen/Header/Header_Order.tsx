import {
    faBars,
    faBell,
    faCaretDown,
    faHeart,
    faL,
    faMagnifyingGlass,
    faTicket,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ModelOrder from '../Order/ModelMenu';
import {useNavigation} from '@react-navigation/native';

export default function Header_Order() {
    const navigation = useNavigation();
    const [Search, setSearch] = useState(false);
    const [Modal, setModal] = useState(false);
    const show = () => setModal(!Modal);
    return (
        <>
            <View style={styles.Container}>
                <View style={styles.ItemView}>
                    <FontAwesomeIcon color='#E57905' size={20} icon={faBars} style={{padding: 5, borderRadius: 50}} />
                    <View
                        style={{
                            marginLeft: 5,
                        }}>
                        <TouchableOpacity
                            onPress={show}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 20, fontWeight: '900'}}>Danh mục</Text>
                            <FontAwesomeIcon size={20} icon={faCaretDown} style={{marginLeft: 5}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ItemView}>
                    <TouchableOpacity
                        style={styles.Btn_Menu}
                        onPress={() => {
                            navigation.navigate('Search');
                        }}>
                        <FontAwesomeIcon size={23} color='black' icon={faMagnifyingGlass} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Btn_Menu}>
                        <FontAwesomeIcon size={23} color='red' icon={faHeart} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <ModelOrder value={Modal} Hide={show} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    Statusbar_Style: {
        color: 'white',
    },
    Container: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
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
        padding: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Slider: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
});
