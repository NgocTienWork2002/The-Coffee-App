import React, {useContext, useEffect, useState} from 'react';
import {faArrowLeft, faChevronDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    Modal,
    Dimensions,
    Alert,
} from 'react-native';
import http from '../../utils/http';
import {AppContext} from '../../contexts/ContextAPI';
import {User} from '../../types/user.type';

const windowWidth = Dimensions.get('window').width;

export default function Profile({navigation}: {navigation: any}): JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState<User>();
    const {profile, setProfile} = useContext(AppContext);

    useEffect(() => {
        if (profile) {
            http.get(`user/${profile._id}`)
                .then((res) => {
                    setUserInfo(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [profile]);

    const handleOnchange = (text: string, name: keyof User) => {
        setUserInfo((prevState) => {
            if (prevState) {
                return {...prevState, [name]: text};
            }
        });
    };

    const hanldeSubmit = () => {
        http.put(`/user/${userInfo?._id}`, userInfo)
            .then((res) => {
                Alert.alert('Thông báo', res.data.message, [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]);
                setProfile(res.data.data);
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
                <Text style={styles.title}>Thông tin cá nhân</Text>
            </View>
            <View style={styles.lineView} />
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.mainView}>
                        <View style={styles.imageView}>
                            <View style={styles.image}>
                                <FontAwesomeIcon icon={faUser} size={40} style={{color: 'white'}} />
                            </View>
                        </View>
                        <TextInput
                            placeholder='Nhập tên của bạn*'
                            value={userInfo?.lastName}
                            style={styles.textInput}
                            onChangeText={(text) => handleOnchange(text, 'lastName')}
                        />
                        <TextInput
                            placeholder='Nhập họ của bạn*'
                            value={userInfo?.firstName}
                            style={styles.textInput}
                            onChangeText={(text) => handleOnchange(text, 'firstName')}
                        />
                        <TextInput
                            value={userInfo?.email}
                            editable={false}
                            style={[styles.textInput, styles.textInputDisable]}
                        />
                        <TextInput
                            placeholder='Nhập số điện thoại của bạn*'
                            style={styles.textInput}
                            value={userInfo?.phone}
                            keyboardType='numeric'
                            onChangeText={(text) => handleOnchange(text, 'phone')}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnGender}>
                            <Text style={styles.textGender}>{userInfo?.gender ? 'Nam' : 'Nữ'}</Text>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnUpdate} onPress={() => hanldeSubmit()}>
                            <Text style={styles.textButton}>Cập nhật tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <Modal animationType='none' transparent={true} visible={modalVisible}>
                <TouchableOpacity style={styles.modalView} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.contentModal}>
                        <Text style={styles.titleModal}>Giới tính của bạn?</Text>
                        <TouchableOpacity
                            style={styles.btnSelectGender}
                            onPress={() => {
                                setUserInfo((prevState) => {
                                    if (prevState) {
                                        return {...prevState, gender: true};
                                    }
                                });
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textBtnSelectGender}>Nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnSelectGender}
                            onPress={() => {
                                setUserInfo((prevState) => {
                                    if (prevState) {
                                        return {...prevState, gender: false};
                                    }
                                });
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textBtnSelectGender}>Nữ</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    lineView: {
        backgroundColor: 'black',
        height: 0.5,
    },
    mainView: {
        flex: 1,
        padding: 15,
    },
    imageView: {
        alignItems: 'center',
        marginVertical: 30,
    },
    image: {
        backgroundColor: 'lightgray',
        padding: 40,
        borderRadius: 90,
    },
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        color: 'black',
    },
    textInputDisable: {
        backgroundColor: 'lightgray',
        textTransform: 'none',
    },
    btnUpdate: {
        backgroundColor: '#E57905',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    textButton: {
        color: 'white',
        fontSize: 14,
    },
    btnGender: {
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'gray',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textGender: {
        fontSize: 14,
        color: 'black',
    },
    btnSelectGender: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
    },
    textBtnSelectGender: {
        fontSize: 16,
        color: 'black',
    },
    titleModal: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        paddingVertical: 10,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentModal: {
        backgroundColor: '#fff',
        width: windowWidth - 80,
        borderRadius: 10,
    },
});
