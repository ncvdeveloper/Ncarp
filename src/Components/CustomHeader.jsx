import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity,SafeAreaView } from 'react-native';
import { FONTS } from '../Constants/fonts';
import { scaleWidth, scaleHeight, normalizeFont } from '../Constants/dynamicSize';
import { IMAGES } from '../Constants/images';
import { COLORS } from '../Constants/colors';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { APIRequest } from "../Utils/ApiRequest";

const CustomHeader = (props) => {
    const navigation = props?.navigation
    const icon = props?.icon
    const [count, setCount] = useState(0)

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(() => {
                handleNotificationCount();
            }, 2000);
            return () => clearInterval(intervalId);
        }, [])
    );

    const handleNotificationCount = async () => {
        const url = `http://sustainos.ai:9001/dataservice_app/api/notification_details/?notification_retrieval_type=count&project_id=1`;
        let result = await APIRequest.getGetTimebasedService(url);
        let data = result.data;
        setCount(data.count)
    }
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.HEADER }}>
            <View style={styles.rowheader}>
                <View style={styles.headerimage}>
                    <ImageBackground style={styles.headerimage} source={IMAGES.header} resizeMode='cover'>
                        <View>
                            <Image
                                style={styles.logoIcon}
                                resizeMode='center'
                                source={IMAGES.whitelogo}
                            />
                        </View>
                        <Text style={styles.headertitle}>Cement</Text>
                        <TouchableOpacity style={styles.notificationicon} onPress={() => navigation.navigate('Notification')}>
                            <Image
                                style={styles.notificationIcon}
                                resizeMode="contain"
                                source={IMAGES.notification}
                            />
                            <View style={styles.roundIcon}>
                                <Text style={styles.notificationCount}>{count}</Text>
                            </View>
                        </TouchableOpacity>

                    </ImageBackground>
                </View>
            </View>
            <View style={styles.header}>
                {icon === 'leftarrow' &&
                    <TouchableOpacity style={styles.menuview} onPress={() => navigation.goBack()}>
                        <View>
                            <Image
                                style={styles.menuIcon}
                                resizeMode="contain"
                                source={IMAGES.leftarrow}
                            />
                        </View>
                    </TouchableOpacity>}
                    {icon === 'menu' &&
                    <TouchableOpacity style={styles.menuview} onPress={() => navigation.openDrawer()}>
                        <View>
                            <Image
                                style={styles.menuIcon}
                                resizeMode="contain"
                                source={IMAGES.menu}
                            />
                        </View>
                    </TouchableOpacity>}
                <View style={{ alignSelf: 'center', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.title, { right: (icon === 'leftarrow' ||  icon === 'menu') && scaleWidth(30) }]}>{props?.title}</Text>
                    {props?.right}
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    rowheader: {
        height: scaleHeight(38),
        alignItems: 'flex-start',
        bottom: scaleHeight(10)
    },
    headerimage: {
        width: '100%',
        height: scaleHeight(80),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor: COLORS.HEADER
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    logoIcon: {
        width: scaleWidth(100),
        height: scaleHeight(37),
        marginLeft: scaleWidth(16),
        bottom: scaleHeight(8)
    },

    menuview: {
        height: scaleHeight(80),
        width: scaleWidth(70),
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: normalizeFont(17),
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSBOLD,
    },
    notificationCount: {
        fontSize: normalizeFont(12),
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    notificationIcon: {
        height: scaleHeight(28),
        width: scaleWidth(28),
        marginRight: scaleWidth(16),
        bottom: scaleHeight(8)
    },
    header: {
        flexDirection: 'row',
        height: scaleHeight(40),
        backgroundColor: COLORS.HEADER,
        alignItems: 'center',
        marginTop: scaleHeight(11),
        justifyContent: 'center'
    },
    menuIcon: {
        height: scaleHeight(25),
        width: scaleWidth(25),
        tintColor: COLORS.WHITE,
    },
    headertitle: {
        textAlign: 'center',
        fontSize: normalizeFont(18),
        fontWeight: '600',
        color: COLORS.WHITE,
        flex: 1,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        right: scaleWidth(40),
        bottom: scaleHeight(8)
    },
    roundIcon: {
        height: scaleHeight(16),
        width: scaleWidth(16),
        borderRadius: scaleWidth(16),
        backgroundColor: COLORS.RED,
        alignItems: 'center',
        position: 'absolute',
        left: scaleWidth(15),
        bottom: scaleHeight(20),
    },
    notificationicon: {
        flexDirection: 'row'
    },
    right: {
        alignSelf: 'flex-end',

    }
})
export default CustomHeader;