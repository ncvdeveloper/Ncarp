import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { COLORS } from '../../../Constants/colors';
import {
    normalizeFont,
    scaleHeight,
    scaleWidth,
} from '../../../Constants/dynamicSize';
import Plotly from 'react-native-plotly';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { APIRequest } from "../../../Utils/ApiRequest";
import { FONTS } from "../../../Constants/fonts"
import { IMAGES } from "../../../Constants/images"

export default function Images(props) {
    const { imageId, imageDataIs } = props;

    const handleImage = () => {
        if (imageDataIs[imageId] && imageDataIs[imageId]["image-colors"] !== undefined) {
            const imageIS = imageDataIs[imageId]["image-colors"];
            // Now you can safely use imageIS
            return imageIS.SquareBg
        }
    }


    return (
        <View style={styles.image}>
            <Image style={{
                height: scaleHeight(200),
                width: scaleWidth(300)
            }} source={handleImage() !== null ? { uri: handleImage() } : IMAGES.Genie} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        marginVertical: scaleHeight(30)
    }
})