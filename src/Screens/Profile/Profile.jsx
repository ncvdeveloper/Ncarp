import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../Constants/images';
import { FONTS } from '../../Constants/fonts';
import CustomHeader from '../../Components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';

const Profile = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.HEADER} />
            <View style={styles.insidecontainer}>
                <CustomHeader title={'Profile'} navigation={navigation} icon={'menu'} />
                <View>
                    <FastImage source={IMAGES.profile} style={styles.profile} />
                    <Text style={styles.username}>Super Admin</Text>
                    <Text style={styles.description}>278 days until the end of the professional account Copy</Text>
                </View>
                <View style={styles.gradient}>
                    <LinearGradient
                        colors={['#642C74', '#E49D88']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.linear}
                    >
                        <View style={styles.row}>
                            <FastImage style={styles.diamond} source={IMAGES.diamond} />
                            <Text style={styles.professionaltext}>Professional Account</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.detailcontainer}>
                    <View style={styles.containerEmail}>
                        <Text style={styles.Key}>Email</Text>
                        <Text style={styles.values}>superadmin@netcarbonvision.com</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.containerEmail}>
                        <Text style={styles.Key}>Phone No</Text>
                        <Text style={styles.values}>90123456708</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.containerEmail}>
                        <Text style={styles.Key}>Vertical Type</Text>
                        <Text style={styles.values}>Cement</Text>
                    </View>
                    <Divider style={styles.divider} />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.HEADER
    },
    insidecontainer: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND
    },
    linear: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scaleWidth(34)
    },
    profile: {
        height: scaleHeight(96),
        width: scaleWidth(96),
        borderRadius: scaleHeight(96),
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: '5%'
    },
    gradient: {
        alignSelf: 'center',
        marginVertical: scaleHeight(10),
        marginTop: scaleHeight(20),
    },
    username: {
        fontSize: normalizeFont(22),
        fontWeight: '700',
        fontFamily: FONTS.NUNITOSANSBOLD,
        color: COLORS.BLACK,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: scaleHeight(10)
    },
    description: {
        fontSize: normalizeFont(14),
        fontWeight: '400',
        fontFamily: FONTS.NUNITOSANSREGULAR,
        color: COLORS.ASH,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: scaleHeight(10),
        width: '90%'
    },
    divider: {
        height: scaleHeight(0.3),
        width: '100%',
        backgroundColor: COLORS.DIVIDER,
        alignSelf: 'center'
    },
    detailcontainer: {
        marginVertical: scaleHeight(20)
    },
    values: {
        fontSize: normalizeFont(16),
        fontWeight: '300',
        fontFamily: FONTS.NUNITOSANSLIGHT,
        color: COLORS.HEADER,
        textAlign: 'right',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: scaleWidth(16)
    },
    Key: {
        fontSize: normalizeFont(20),
        fontWeight: '400',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: scaleWidth(16)
    },
    professionaltext: {
        fontSize: normalizeFont(18),
        fontWeight: '400',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.WHITE,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: scaleWidth(10)
    },
    containerEmail: {
        flexDirection: 'row',
        marginVertical: scaleHeight(10),
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: scaleWidth(20),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scaleHeight(10),

    },
    diamond: {
        height: scaleHeight(20),
        width: scaleWidth(20)
    }
})

export default Profile;
