import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { IMAGES } from '../Constants/images';
import { FONTS } from '../Constants/fonts';
import { COLORS } from '../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../Constants/dynamicSize';
import { Divider, Icon, Card, ListItem, Avatar } from 'react-native-elements';
import { useNavigationState, useNavigation } from '@react-navigation/native';

export default function CustomBottomBar() {
    const navigation = useNavigation()
    const [focused, setfocused] = useState(false)
    const navigationState = useNavigationState(state => state);

    return (
        <View style={styles.smallCard2}>
            <ImageBackground source={IMAGES.bottombg} style={styles.imgbg} resizeMode='cover'>
                <TouchableOpacity style={styles.imagebg} onPress={() => navigation.navigate("Home")}>
                    <View style={[styles.round, { backgroundColor: focused ? COLORS.WHITE : 'transparent', }]}>
                        <Image
                            source={focused ? IMAGES.blackhome : IMAGES.housesolid}
                            resizeMode='contain'
                            style={{
                                height: scaleHeight(25),
                                width: scaleWidth(25),
                            }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imagebg} onPress={() => navigation.navigate("Chat")}>
                    <View style={[styles.round, { backgroundColor: focused ? COLORS.WHITE : 'transparent', }]}>
                        <Image
                            source={IMAGES.bot}
                            resizeMode='contain'
                            style={{
                                height: scaleHeight(30),
                                width: scaleWidth(28),
                            }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imagebg} onPress={() => navigation.navigate("Report")}>
                    <View style={[styles.round, { backgroundColor: focused ? COLORS.WHITE : 'transparent', }]}>
                        <Image
                            source={focused ? IMAGES.report_solid : IMAGES.report}
                            resizeMode='contain'
                            style={{
                                height: scaleHeight(25),
                                width: scaleWidth(25),

                            }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imagebg} onPress={() => navigation.navigate("ProfileNew")}>
                    <View style={[styles.round, { backgroundColor: focused ? COLORS.WHITE : 'transparent', }]}>
                        <Image
                            source={focused ? IMAGES.blackuser : IMAGES.user}
                            resizeMode='contain'
                            style={{
                                height: scaleHeight(25),
                                width: scaleWidth(25),
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    smallCard2: {
        elevation: 5,
        flexDirection: 'row',
        width: '100%',
        height: scaleHeight(70),
        justifyContent: 'space-between',
        paddingBottom: scaleHeight(15),
        backgroundColor: COLORS.HEADER,
        borderColor: COLORS.HEADER,
    },
    box: {
        width: "100%",
        paddingHorizontal: scaleHeight(25),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    round: {
        height: scaleHeight(45),
        width: scaleWidth(45),
        alignItems: 'center',
        borderRadius: scaleHeight(65),
        justifyContent: 'center'
    },
    imgbg: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    imagebg: {
        marginHorizontal: scaleWidth(20),
        marginTop: scaleHeight(2)
    }
})