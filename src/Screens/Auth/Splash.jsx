import React from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Animated
} from 'react-native';
import { COLORS } from "../../Constants/colors";
import { scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../Constants/images'

const Splash = ({ navigation }) => {
    React.useEffect(() => {
        setTimeout(() => {
            goToNextScreen();
        }, 2000);
    }, []);

    const goToNextScreen = async () => {
        let token = await AsyncStorage.getItem("jwttoken")
        if (token !== null) {
            navigation.navigate('DashBoard');
        } else {
            navigation.navigate('OnboardingScreen');
        }
    };

    const imageScale = new Animated.Value(0.1);

    Animated.timing(imageScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'transparent'} />
            <View style={styles.insidecontainer}>
                <View style={styles.centerAlign}>
                    <Animated.Image
                        source={IMAGES.logo}
                        style={[styles.image, { transform: [{ scale: imageScale }] }]}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    insidecontainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        padding: scaleWidth(20),
        alignItems: 'center',
        justifyContent: "center"
    },
    image: {
        width: scaleWidth(350),
        height: scaleHeight(100),
    },
    centerAlign: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});