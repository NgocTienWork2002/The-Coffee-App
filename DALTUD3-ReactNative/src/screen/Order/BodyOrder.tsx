/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {Image, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ListItem from '../../components/ListItem/listItem';
import {useNavigation} from '@react-navigation/native';
import ModelMenu from './ModelMenu';
import http from '../../utils/http';
import Loader from '../../components/Loader/Loader';

function ListIcon({Show}: {Show: () => void}) {
    return (
        <>
            <TouchableOpacity style={styles.Contentcontainer}>
                <View>
                    <Image style={styles.ImgList} source={require('../../../assets/Images/icon01.png')} />
                </View>
                <Text style={styles.ContentText}>Cà phê</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Contentcontainer}>
                <View>
                    <Image style={styles.ImgList} source={require('../../../assets/Images/icon02.png')} />
                </View>
                <Text style={styles.ContentText}>Đá xay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Contentcontainer}>
                <View>
                    <Image style={styles.ImgList} source={require('../../../assets/Images/icon04.png')} />
                </View>
                <Text style={styles.ContentText}>Trà</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Contentcontainer} onPress={Show}>
                <View>
                    <Image style={styles.ImgList} source={require('../../../assets/Images/icon03.png')} />
                </View>
                <Text style={styles.ContentText}>Xem thêm</Text>
            </TouchableOpacity>
        </>
    );
}

function BodyOrder() {
    const navigation = useNavigation();
    const [isloading, setloading] = useState(false);
    const [Data, setData] = useState([]);
    const [Menu, setMenu] = useState(false);
    const show = () => setMenu(!Menu);
    let sectionListRef = useRef<SectionList>(null);
    const getApi = () => {
        setloading(true);
        http.get('/product/category')
            .then((res) => {
                var result = res.data;
                setData(result);
            })
            .then((err) => {
                console.log(err);
            })
            .finally(() => {
                setloading(false);
            });
    };
    useEffect(() => {
        getApi();
    }, []);
    // const Scroll = () => {
    //     // sectionListRef.current?.getScrollResponder()?.scrollTo({
    //     //     index: 0,
    //     //     animated: true,
    //     // });
    //     // sectionListRef.current?.scrollToLocation({
    //     //     itemIndex: 0,
    //     //     sectionIndex: 3,
    //     //     viewOffset: -sectionListRef.current?.props.sections[3],
    //     // });
    //     sectionListRef.current?.scrollToLocation({
    //         animated: true,
    //         sectionIndex: sectionListRef.current?.props.sections.length - 1,
    //         itemIndex:
    //             sectionListRef.current?.props.sections[sectionListRef.current?.props.sections.length - 1].data.length -
    //             1,
    //     });

    // };
    return (
        <>
            <View style={{flex: 1, paddingHorizontal: 15}}>
                <View style={styles.ContentBottom}>
                    <ListIcon Show={show} />
                </View>
                <View style={styles.ListContainer}>
                    {isloading ? (
                        <Loader />
                    ) : (
                        <SectionList
                            style={{flex: 1, overflow: 'hidden'}}
                            sections={Data}
                            ref={sectionListRef}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item._id}
                            renderItem={({item}) => (
                                <ListItem
                                    id={item._id}
                                    name={item.name}
                                    img={item.image}
                                    price={item.option}
                                    description={item.description}
                                    navigation={navigation}
                                />
                            )}
                            renderSectionHeader={({section: {title}}) => (
                                <Text
                                    style={{
                                        fontSize: 22,
                                        marginBottom: 15,
                                        fontWeight: 'bold',
                                        color: 'black',
                                    }}>
                                    {title}
                                </Text>
                            )}
                        />
                    )}
                </View>
                <ModelMenu Hide={show} value={Menu} />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    ContentBottom: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 5,
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    Contentcontainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContentText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    ImgList: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    ListContainer: {
        flex: 1,
    },
});
export default BodyOrder;
