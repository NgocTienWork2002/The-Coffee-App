/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {New_Special, TitleNew, Home} from '../../data/Data';
import {faCalendarDays, faWandMagicSparkles} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import http from '../../utils/http';
import {useNavigation} from '@react-navigation/native';
import {formatCurrency} from '../../utils/utils';
import Loader from '../../components/Loader/Loader';
import {AppContext} from '../../contexts/ContextAPI';

interface NewItem {
    id: number;
    Img: string;
    Name: string;
    Date: string;
}
export default function HomeBody() {
    const navigation = useNavigation();
    const [SP, setSP] = useState(null);
    const {profile} = useContext(AppContext);
    const [isloading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        http.get(`/product/home`)
            .then((res) => {
                let result = res.data.data;
                setSP(result);
            })
            .finally(() => {
                setloading(false);
            });
    }, []);
    const [Active, setActive] = useState(1);
    const [SaveView, SetSaveView] = useState<NewItem[]>(New_Special);
    const New_Titel = (item: number) => {
        setActive(item);
        item == 1 ? SetSaveView(New_Special) : SetSaveView(Home);
    };
    return (
        <ScrollView>
            <View
                style={{
                    paddingHorizontal: 15,
                    marginTop: 10,
                    height: 200,
                }}>
                <Swiper
                    loop
                    autoplay
                    dot={
                        <View
                            style={{
                                width: 15,
                                height: 1,
                                backgroundColor: 'gray',
                                marginLeft: 5,
                            }}
                        />
                    }
                    activeDot={
                        <View
                            style={{
                                width: 15,
                                height: 1,
                                backgroundColor: 'black',
                                marginLeft: 5,
                            }}
                        />
                    }>
                    <Image style={[style.Slider]} source={require('../../assets/Images/Slider1.jpg')} />
                    <Image style={[style.Slider]} source={require('../../assets/Images/Slider2.jpg')} />
                    <Image style={[style.Slider]} source={require('../../assets/Images/Slider3.jpg')} />
                </Swiper>
            </View>
            <View style={{paddingHorizontal: 15, marginBottom: 15}}>
                <Text style={style.Text}>Gợi ý riêng cho {profile?.firstName + ' ' + profile?.lastName} : </Text>
                {isloading ? (
                    <Loader />
                ) : (
                    <FlatList
                        style={{overflow: 'hidden'}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={SP}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) => {
                            return (
                                <View
                                    style={{
                                        marginTop: 10,
                                        marginRight: 10,
                                        width: 150,
                                    }}>
                                    <Image
                                        style={{
                                            width: '100%',
                                            height: 150,
                                            borderRadius: 10,
                                            flexShrink: 0,
                                        }}
                                        source={{uri: item.image}}
                                    />
                                    <View style={{padding: 2, flex: 1}}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '900',
                                                flex: 1,
                                            }}>
                                            {item.name}
                                        </Text>
                                        <Text>{formatCurrency(item.option[0].price)}đ</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            backgroundColor: '#FFF2D9',
                                            padding: 5,
                                            borderRadius: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() =>
                                            navigation.navigate('ProductDetail', {
                                                iditem: item._id,
                                                nameitem: item.name,
                                                imgitem: item.image,
                                                descriptionitem: item.description,
                                                priceitem: item.option,
                                            })
                                        }>
                                        <Text
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#E57905',
                                                fontWeight: '900',
                                            }}>
                                            Chọn
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                )}
            </View>
            <View style={{paddingHorizontal: 15, marginTop: 15}}>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                    <Text style={[style.Text]}>Khám phá thêm</Text>
                    <FontAwesomeIcon
                        icon={faWandMagicSparkles}
                        color='#F5E03B'
                        size={23}
                        style={{marginLeft: 5, alignItems: 'center'}}
                    />
                </View>
                <View>
                    <FlatList
                        style={{overflow: 'hidden', marginBottom: 10}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={TitleNew}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => {
                            const ActiveColor = item.id == Active;
                            return (
                                <TouchableOpacity
                                    onPress={() => New_Titel(item.id)}
                                    style={[
                                        style.Btn_TitleNew,
                                        {
                                            backgroundColor: ActiveColor ? '#FFF2D9' : 'white',
                                        },
                                    ]}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: ActiveColor ? '#E57905' : 'black',
                                            fontWeight: 'bold',
                                        }}>
                                        {item.Title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}>
                    {SaveView.map((name, index) => {
                        return (
                            <View key={index} style={style.New}>
                                <Image
                                    style={{
                                        width: '100%',
                                        height: 150,
                                        marginBottom: 10,
                                        borderRadius: 20,
                                    }}
                                    source={{uri: name.Img}}
                                    resizeMode='cover'
                                />
                                <View>
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: 'black',
                                            textTransform: 'uppercase',
                                        }}>
                                        {name.Name}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <FontAwesomeIcon icon={faCalendarDays} />
                                        <Text style={{marginLeft: 5}}>{name.Date}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}
const style = StyleSheet.create({
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
        fontSize: 18,
        fontWeight: '900',
        color: 'black',
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
    Btn_TitleNew: {
        marginHorizontal: 2,
        padding: 10,
        borderRadius: 30,
    },
    New: {
        width: 170,
        borderRadius: 20,
        marginHorizontal: 2,
        marginBottom: 10,
    },
});
