/* eslint-disable prettier/prettier */
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
}
const image = {
    uri: 'https://file.hstatic.net/1000075078/file/thecofeehouse_nguocgochibiscus_5_d775e20255c744ac9b71cee56cb21536_grande.jpg',
};

function Login(): JSX.Element {
    const [formData, setFormData] = useState<FormDataType>({
        email: '',
        password: '',
    });
    const [error, setError] = useState({
        email: null,
        password: null,
    });
    const navigation: any = useNavigation();
    const {isAuthenticated, setIsAuthenticated, setProfile} = useContext(AppContext);

    const handleLogin = () => {
        http.post('/user/login', {email: formData.email, password: formData.password})
            .then((res) => {
                Alert.alert('Thong bao', res.data.message, [
                    {
                        text: 'OK',
                        onPress: () => {
                            setProfile(res.data.data);
                            setIsAuthenticated(!isAuthenticated);
                        },
                    },
                ]);
            })
            .catch((error) => {
                Alert.alert('Thong bao', error.response.data.message);
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
        }

        if (valid) {
            handleLogin();
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
                        <ImageBackground source={image} resizeMode='cover' style={{alignItems: 'center', flex: 1}}>
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

                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabNavigate')}>
                                <Text style={styles.buttonTitle}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <View style={styles.navigateSignin}>
                                <Text style={{fontSize: 16}}>Chưa có tài khoản?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.textRegister}>Đăng ký</Text>
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
        marginTop: 50,
        fontSize: 50,
        fontWeight: 'bold',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginTop: -20,
        borderRadius: 20,
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

export default Login;
