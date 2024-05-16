import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../Constants/images'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FONTS } from '../../Constants/fonts';
import OtpInputs from 'react-native-otp-inputs';

const ForgotPassword = ({ navigation }) => {

    const [showotp, setShowotp] = useState(false)
    const [shownewpass, setShownewpass] = useState(false)
    const [secure, setSecure] = useState(true)
    const [securenewpassword, setSecurenewpassword] = useState(true)
    const [secureconfirmpassword, setSecureconfirmpassword] = useState(true)
    const handleLogin = async (values) => {
        const userCredentials = {
            username: values.username,
            password: values.password
        };
        setShowotp(true)
    };

    const handleEnterOtp = () => {
        setShownewpass(!shownewpass)
    }
    return (
        <SafeAreaView style={styles.container}>
           <StatusBar backgroundColor={'transparent'} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                <Icon name='arrowleft' size={scaleHeight(35)} type='antdesign' color={COLORS.HEADER} style={{ top: scaleHeight(5), marginLeft: scaleWidth(10) }} />
            </TouchableOpacity>
            <View style={styles.insidecontainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage source={IMAGES.logo} style={styles.image} resizeMode='contain' />
                </View>
                {shownewpass ?
                    (<View style={styles.containView}>
                        <Text style={styles.title}>Create new password. Please check your new password
                            must be different from previously used password
                        </Text>
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>

                            <Formik
                                initialValues={{ password: '', confirmpassword: '' }}
                                validationSchema={Yup.object({
                                    password: Yup.string()
                                        .min(8, 'Password must be at least 8 characters')
                                        .required('Password is required'),
                                    confirmpassword: Yup.string()
                                        .min(8, 'confirmPassword must be at least 8 characters')
                                        .required('confirmPassword is required')
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    handleLogin(values)
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.subtitle}>Password</Text>
                                            <View style={styles.textInput}>
                                                <TextInput
                                                    style={styles.input}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    value={values.password}
                                                    placeholder="Password"
                                                    placeholderTextColor={COLORS.GREY}
                                                    secureTextEntry={securenewpassword}
                                                />
                                                <TouchableOpacity onPress={() => setSecurenewpassword(!securenewpassword)}>
                                                    <Icon name={securenewpassword ? "eye" : "eye-with-line"} type='entypo' size={scaleWidth(20)} color={COLORS.GREY} style={{ marginRight: scaleWidth(20) }} />
                                                </TouchableOpacity>
                                            </View>
                                            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <Text style={styles.subtitle}>Confirm Password</Text>
                                            <View style={styles.textInput}>
                                                <TextInput
                                                    placeholderTextColor={COLORS.GREY}
                                                    style={styles.input}
                                                    onChangeText={handleChange('confirmpassword')}
                                                    onBlur={handleBlur('confirmpassword')}
                                                    value={values.confirmpassword}
                                                    placeholder="Confirm Password"
                                                    secureTextEntry={secureconfirmpassword}
                                                />
                                                <TouchableOpacity onPress={() => setSecureconfirmpassword(!secureconfirmpassword)}>
                                                    <Icon name={secureconfirmpassword ? "eye" : "eye-with-line"} type='entypo' size={scaleWidth(20)} color={COLORS.GREY} style={{ marginRight: scaleWidth(20) }} />
                                                </TouchableOpacity>
                                            </View>
                                            {errors.confirmpassword && <Text style={styles.error}>{errors.confirmpassword}</Text>}
                                        </View>

                                        <TouchableOpacity style={[styles.buttonContainer]} onPress={() => handleSubmit()}>
                                            <Text style={styles.logintext}>Reset Password</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                        </KeyboardAwareScrollView>

                    </View>)
                    :
                    (<View style={styles.containView}>
                        <Text style={styles.title}>{showotp ? "Enter the otp code we send it on your email address!" : "Enter your registered e-mail below, and we will send you reset instructions!"}</Text>
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
                            {showotp ?
                                (
                                    <>
                                        <OtpInputs
                                            handleChange={code => console.log(code)}
                                            numberOfInputs={4}
                                            style={styles.OtpInputs}
                                            inputContainerStyles={styles.underlineStyleBase}
                                            inputStyles={styles.inputtextstyle}
                                            keyboardType={'phone-pad'}
                                            autofillFromClipboard={false}
                                            placeholderTextColor={COLORS.GREY}
                                        />
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleEnterOtp()}>
                                            <Text style={styles.logintext}>Verify</Text>
                                        </TouchableOpacity>
                                    </>)
                                :

                                <Formik
                                    initialValues={{ username: '', }}
                                    validationSchema={Yup.object({
                                        username: Yup.string()
                                            .min(10, 'Email must be at least 10 characters')
                                            .required('Email is required'),

                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                        handleLogin(values)
                                    }}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                        <View style={{ flex: 1 }}>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.subtitle}>Email</Text>
                                                <View style={styles.textInput}>
                                                    <TextInput
                                                        style={styles.input}
                                                        onChangeText={handleChange('username')}
                                                        onBlur={handleBlur('username')}
                                                        value={values.username}
                                                        placeholder="Enter your Email"
                                                        placeholderTextColor={COLORS.GREY}
                                                    />
                                                    <Icon name="email" size={scaleWidth(20)} color={COLORS.GREY} style={{ marginRight: scaleWidth(20) }} />
                                                </View>
                                                {errors.username && <Text style={styles.error}>{errors.username}</Text>}
                                            </View>
                                            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmit()}>
                                                <Text style={styles.logintext}>Send</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </Formik>}
                        </KeyboardAwareScrollView>
                    </View>)}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,

    },
    insidecontainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        padding: scaleWidth(20)
    },
    image: {
        width: scaleWidth(350),
        height: scaleHeight(100),
    },
    containView: {
        flex: 1,
        paddingVertical: scaleWidth(20)
    },
    title: {
        color: COLORS.BLACK,
        fontSize: normalizeFont(18),
        fontWeight: 'bold',
        paddingVertical: scaleHeight(20),
        textAlign: 'center',
        lineHeight: scaleHeight(30)
    },
    subtitle: {
        color: COLORS.BLACK,
        fontSize: normalizeFont(18),
        fontWeight: 'bold',
        fontFamily: FONTS.NUNITOSANSBOLD,

    },
    error: {
        color: COLORS.RED,
        fontSize: normalizeFont(18),
    },
    inputContainer: {
        marginVertical: scaleHeight(10)
    },
    input: {
        height: '100%',
        paddingHorizontal: scaleWidth(10),
        width: '90%',
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
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.HEADER,
        borderRadius: scaleWidth(6),
        width: '100%'
    },
    netCarbo: {
        color: COLORS.GREEN,
        fontSize: normalizeFont(18),
        textAlign: 'center',
        marginLeft: scaleWidth(8),
        fontFamily: FONTS.NUNITOSANSBOLD,
        fontWeight: 'bold',
    },
    centeralign: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    underlineStyleBase: {
        borderWidth: 1,
        borderRadius: scaleWidth(12),
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: scaleWidth(54),
        height: scaleWidth(54),
        borderColor: COLORS.GREY
    },
    OtpInputs: {
        flexDirection: 'row',
        marginVertical: scaleHeight(15),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        right: scaleWidth(5),
    },
    inputtextstyle: {
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BLACK,
        fontSize: normalizeFont(26),
        marginLeft: scaleHeight(5),
        fontWeight: '500'
    },

});

export default ForgotPassword;