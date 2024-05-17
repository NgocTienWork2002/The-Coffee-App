/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {faCircleMinus, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OptionDataType} from '../../screen/Payment/Payment';

type PropsType = {
    handleModal: () => void;
    isModal: boolean;
    optionData: OptionDataType;
    handleUpdate: (id: string, chooseSize: string, quantity: number) => void;
};

function EditCartModal({handleModal, isModal, optionData, handleUpdate}: PropsType): JSX.Element {
    const [formData, setFormData] = useState({
        chooseSize: optionData.chooseSize,
        quantity: optionData.quantity,
    });
    console.log('editcart');
    return (
        <Modal animationType='fade' transparent={true} visible={isModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.titleModal}>
                        <Text style={{fontSize: 16, color: 'black'}}>Chỉnh sửa</Text>
                    </View>
                    <View style={styles.modalContent}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                            }}>
                            <Text style={styles.textSection}>Size*</Text>
                            {optionData?.option.map((item) => {
                                return (
                                    <View style={styles.sizeView} key={item._id}>
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity
                                                onPress={() => setFormData({...formData, chooseSize: item.size})}>
                                                <View style={styles.radioWrapper}>
                                                    <View style={styles.radio} />
                                                    {formData.chooseSize === item.size && (
                                                        <View style={styles.radioBg} />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={[styles.radioText, {marginLeft: 10}]}>{item.size}</Text>
                                        </View>
                                        <Text style={styles.textPrice}>{item.price}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={styles.updateView}>
                            <View style={styles.updateViewLeft}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (formData.quantity > 1) {
                                            setFormData({...formData, quantity: formData.quantity - 1});
                                        }
                                    }}>
                                    <FontAwesomeIcon icon={faCircleMinus} color='#E57905' size={30} />
                                </TouchableOpacity>
                                <Text style={styles.textCount}>{formData.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (formData.quantity < 10) {
                                            setFormData({...formData, quantity: formData.quantity + 1});
                                        }
                                    }}>
                                    <FontAwesomeIcon icon={faCirclePlus} color='#E57905' size={30} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={styles.btnUpdate}
                                    onPress={() => {
                                        handleUpdate(optionData.id, formData.chooseSize, formData.quantity);
                                        handleModal();
                                    }}>
                                    <Text style={{color: 'white', fontSize: 16}}>Cập nhật giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    textCount: {
        fontSize: 16,
        marginHorizontal: 20,
    },
    btnUpdate: {
        backgroundColor: '#E57905',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    },
    updateViewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateView: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textSection: {
        color: 'black',
        fontSize: 16,
    },
    textPrice: {
        fontSize: 16,
        color: '#6C7A89',
        alignSelf: 'center',
    },
    sizeView: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleModal: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10,
        borderColor: 'lightgray',
        borderWidth: 2,
    },
    modalContent: {
        backgroundColor: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {flex: 1},
    radioText: {
        fontSize: 16,
        color: 'black',
    },
    radioView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    radio: {
        height: 22,
        width: 22,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 12,
    },
    radioBg: {
        backgroundColor: '#E57905',
        height: 14,
        width: 14,
        borderRadius: 10,
        left: 4,
        position: 'absolute',
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
});
export default EditCartModal;
