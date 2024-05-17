import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import ListItem from '../../components/ListItem/listItem';
import http from '../../utils/http';
import Loader from '../../components/Loader/Loader';

export default function Search({navigation}: any) {
    const [isloading, setloading] = useState(false);
    const [SP, setSP] = useState(null);
    const [valueinput, setValueinput] = useState('');
    const Search = () => {
        setloading(true);
        http.get(`/search?name=${valueinput}`)
            .then((res) => {
                let result = res.data.data;
                result.length == 0 ? setSP(null) : setSP(result);
            })
            .finally(() => setloading(false));
    };
    return (
        <View style={{flex: 1}}>
            <View style={styles.ContentModal}>
                <View style={styles.contanerControll}>
                    <View style={styles.containerInput}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{backgroundColor: '#E2E0E2', marginLeft: 20}}
                        />
                        <TextInput
                            placeholder='Search'
                            onChangeText={(value) => setValueinput(value)}
                            defaultValue=''
                            inputMode='search'
                            onBlur={() => Search()}
                            style={styles.inputSearch}
                        />
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 15}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                            <Text style={{fontSize: 16, color: '#E57905'}}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.resultSearch}>
                    {isloading ? (
                        <Loader />
                    ) : SP ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={SP}
                            keyExtractor={(item) => item._id}
                            renderItem={({item}) => {
                                return (
                                    <ListItem
                                        id={item._id}
                                        name={item.name}
                                        img={item.image}
                                        price={item.option}
                                        description={item.description}
                                        navigation={navigation}
                                    />
                                );
                            }}
                        />
                    ) : (
                        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
                            Không tìm thấy sản phẩm
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    ContentModal: {
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height,
        maxHeight: Dimensions.get('window').height,
        backgroundColor: 'white',
    },
    contanerControll: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E2E0E2',
    },
    containerInput: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#E2E0E2',
        alignItems: 'center',
        borderRadius: 5,
        padding: 3,
    },
    inputSearch: {
        height: 40,
        padding: 5,
        backgroundColor: '#E2E0E2',
        borderRadius: 5,
        paddingLeft: 10,
        width: '90%',
    },
    resultSearch: {
        marginTop: 30,
        paddingHorizontal: 25,
        flex: 1,
    },
});
