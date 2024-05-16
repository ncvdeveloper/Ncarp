import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    BackHandler,
    Alert
} from 'react-native';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../Constants/images';
import { FONTS } from '../../Constants/fonts';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { APIRequest } from "../../Utils/ApiRequest";
import { login } from "../../Utils/APIEndPoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({ navigation }) => {

    const [secure, setSecure] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                BackHandler.exitApp()
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );

    const handleLogin = async (values) => {
        const userCredentials = {
            username: values.username,
            password: values.password
        };
        url = `http://sustainos.ai:10000/global_master_app/api/login_user/`
        try {
            let result = await APIRequest.getPostService(url, userCredentials, "");
            Toast.show('Logged in successfully', Toast.SHORT);
            await AsyncStorage.setItem('jwttoken', result.access_token);
            navigation.navigate("DashBoard");
        } catch (error) {
            if (error?.data === "Unauthorized") {
                alert("Please check the credentials")
            }
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'transparent'} />
            <View style={styles.insidecontainer}>
                <View style={styles.centeralign}>
                    <FastImage source={IMAGES.logo} style={styles.image} resizeMode='contain' />
                </View>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.containView}>
                        <Text style={styles.title}>Login</Text>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validationSchema={Yup.object({
                                username: Yup.string()
                                    .min(10, 'Username must be at least 10 characters')
                                    .required('Username is required'),
                                password: Yup.string()
                                    .min(8, 'Password must be at least 6 characters')
                                    .required('Password is required')

                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                handleLogin(values)
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.subtitle}>Username</Text>
                                        <View style={styles.textInput}>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={handleChange('username')}
                                                onBlur={handleBlur('username')}
                                                value={values.username}
                                                placeholder="Username"
                                                keyboardType='email-address'
                                                placeholderTextColor={COLORS.GREY}
                                            />

                                            <Icon name="person" size={scaleWidth(20)} color={COLORS.GREY} style={{ marginRight: scaleWidth(20) }} />
                                        </View>
                                        {errors.username && <Text style={styles.error}>{errors.username}</Text>}
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.subtitle}>Password</Text>
                                        <View style={styles.textInput}>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                placeholder="Password"
                                                secureTextEntry={secure}
                                                placeholderTextColor={COLORS.GREY}
                                            />
                                            <TouchableOpacity onPress={() => setSecure(!secure)}>
                                                <Icon name={secure ? "eye" : "eye-with-line"} type='entypo' size={scaleWidth(20)} color={COLORS.GREY} style={{ marginRight: scaleWidth(20) }} />
                                            </TouchableOpacity>
                                        </View>
                                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                            <Text style={styles.forgot}>Forgot Password ?</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmit()}>
                                        <Text style={styles.logintext}>Login</Text>
                                    </TouchableOpacity>
                                    {/* <View style={{ marginTop: errors.password && errors.username ? '10%' : '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.copyrightText}>Copyright©2024</Text>
                                        <Text style={styles.netCarbo}>Net Carbon Vision.</Text>
                                    </View> */}
                                </View>
                            )}
                        </Formik>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE

    },
    insidecontainer: {
        flex: 1,
        padding: scaleWidth(20),
        marginTop: '10%'
    },
    image: {
        width: scaleWidth(400),
        height: scaleHeight(120),
    },
    containView: {
        paddingVertical: scaleWidth(20),
    },
    title: {
        color: COLORS.LIGHT_BLACK,
        fontSize: normalizeFont(30),
        paddingVertical: scaleHeight(20),
        fontFamily: FONTS.NUNITOSANSEXTRABOLD,
        fontWeight: '700'
    },
    subtitle: {
        color: COLORS.BLACK,
        fontSize: normalizeFont(18),
        fontWeight: 'bold',
        fontFamily: FONTS.NUNITOSANSMEDIUM
    },
    error: {
        color: COLORS.RED,
        fontSize: normalizeFont(18),
    },
    inputContainer: {
        marginVertical: scaleHeight(10),
    },
    input: {
        height: '100%',
        paddingHorizontal: scaleWidth(10),
        flex: 0.8,
        fontFamily: FONTS.NUNITOSANSREGULAR,
        color: COLORS.BLACK
    },
    textInput: {
        height: scaleHeight(50),
        borderWidth: 1.5,
        borderColor: COLORS.GREY,
        borderRadius: scaleHeight(3),
        marginTop: scaleHeight(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    forgot: {
        color: COLORS.HEADER,
        fontSize: normalizeFont(18),
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: scaleHeight(20)
    },
    logintext: {
        color: COLORS.WHITE,
        fontSize: normalizeFont(20),
        fontWeight: 'bold',
        paddingVertical: scaleHeight(15),
        textAlign: 'center',
        fontFamily: FONTS.NUNITOSANSBOLD
    },
    buttonContainer: {
        marginTop: scaleHeight(50),
        backgroundColor: COLORS.HEADER,
        borderRadius: scaleWidth(6)
    },
    netCarbo: {
        color: COLORS.GREEN,
        fontSize: normalizeFont(18),
        textAlign: 'center',
        marginLeft: scaleWidth(8),
        fontWeight: 'bold',
        fontFamily: FONTS.NUNITOSANSBOLD
    },
    copyrightText: {
        color: COLORS.BLACK,
        fontSize: normalizeFont(14),
        fontFamily: FONTS.NUNITOSANSREGULAR
    },
    centeralign: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Login;