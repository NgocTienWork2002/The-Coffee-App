/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useState} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
    Platform,
    Alert,
} from 'react-native';
import Input from '../../components/Input/Input';
import http from '../../utils/http';
import {AppContext} from '../../contexts/ContextAPI';
import {useNavigation} from '@react-navigation/native';

interface FormDataType {
    email: string;
    password: string;
    confirm_password: string;
}

function Register(): JSX.Element {
    const [formData, setFormData] = useState<FormDataType>({
        email: '',
        password: '',
        confirm_password: '',
    });
    const [error, setError] = useState({
        email: null,
        password: null,
        confirm_password: null,
    });
    const navigation: any = useNavigation();

    const {isAuthenticated, setIsAuthenticated, setProfile} = useContext(AppContext);

    const handleRegister = () => {
        http.post('/user/register', {
            email: formData.email,
            password: formData.password,
        })
            .then((res) => {
                Alert.alert('Thong bao', res.data.message, [
                    {
                        text: 'OK',
                        onPress: () => {
                            setIsAuthenticated(!isAuthenticated);
                            setProfile(res.data.data);
                            navigation.navigate('TabNavigate');
                        },
                    },
                ]);
            })
            .catch((err) => {
                Alert.alert('Thong bao', err.response.data.message);
            });
    };

    const handleValidate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!formData.email) {
            handleError('Email là bắt buộc', 'email');
            valid = false;
        } else if (!formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            handleError('Email không hợp lệ', 'email');
            valid = false;
        }

        if (!formData.password) {
            handleError('Mật khẩu là bắt buộc', 'password');
            valid = false;
        } else if (formData.password.length < 6 || formData.password.length > 100) {
            handleError('Mật khẩu phải từ 6 - 100 ký tự', 'password');
            valid = false;
        }

        if (!formData.confirm_password) {
            handleError('Nhập lại mật khẩu là bắt buộc', 'confirm_password');
            valid = false;
        } else if (formData.confirm_password !== formData.password) {
            handleError('Nhập lại mật khẩu không khớp', 'confirm_password');
            valid = false;
        }

        if (valid) {
            handleRegister();
        }
    };

    const handleOnChangeText = (text: string, name: string) => {
        setFormData((prev) => ({...prev, [name]: text}));
    };

    const handleError = (errorMessage: string | null, name: string) => {
        setError((prev) => ({...prev, [name]: errorMessage}));
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <ImageBackground
                            source={{
                                uri: 'https://file.hstatic.net/1000075078/file/thecofeehouse_nguocgochibiscus_5_d775e20255c744ac9b71cee56cb21536_grande.jpg',
                            }}
                            resizeMode='cover'
                            style={{
                                alignItems: 'center',
                                flexGrow: 1,
                            }}>
                            <Text style={styles.textTitle}>Coffee House</Text>
                        </ImageBackground>
                        <View style={styles.content}>
                            <Input
                                textTitle='Email'
                                placeholder='Email'
                                keyboardType='email-address'
                                onChangeText={(text) => handleOnChangeText(text, 'email')}
                                onFocus={() => handleError(null, 'email')}
                                error={error.email}
                            />
                            <Input
                                textTitle='Mật khẩu'
                                placeholder='Mật khẩu'
                                secureTextEntry
                                onChangeText={(text) => handleOnChangeText(text, 'password')}
                                onFocus={() => handleError(null, 'password')}
                                error={error.password}
                            />
                            <Input
                                textTitle='Nhập lại mật khẩu'
                                placeholder='Nhập lại mật khẩu'
                                secureTextEntry
                                onChangeText={(text) => handleOnChangeText(text, 'confirm_password')}
                                onFocus={() => handleError(null, 'confirm_password')}
                                error={error.confirm_password}
                            />
                            <TouchableOpacity style={styles.button} onPress={() => handleValidate()}>
                                <Text style={styles.buttonTitle}>Đăng ký</Text>
                            </TouchableOpacity>
                            <View style={styles.navigateSignin}>
                                <Text style={{fontSize: 16}}>Đã có tài khoản?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.textRegister}>Đăng nhập</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
    },
    textTitle: {
        color: 'white',
        marginTop: 40,
        fontSize: 50,
        fontWeight: 'bold',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 30,
        paddingVertical: 20,
        marginTop: -20,
        borderRadius: 20,
    },
    groupInput: {
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: 'white',
    },
    titleInput: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#E57905',
        paddingVertical: 10,
        borderRadius: 10,
        width: 200,
        alignSelf: 'center',
    },
    buttonTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    navigateSignin: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    textRegister: {
        marginLeft: 5,
        color: '#E57905',
        fontSize: 16,
    },
});

export default Register;
