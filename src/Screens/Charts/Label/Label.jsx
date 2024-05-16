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
import { openPanel, panelIdIs } from "../../../Redux/ReduxSlice/detailSlice"

export default function Label(props) {

    const { labelId, labelDataIs } = props;
    const dispatch = useDispatch();
    const labelIS = (labelDataIs[labelId] && labelDataIs[labelId]["label-colors"] !== undefined) && labelDataIs[labelId]["label-colors"]
    useEffect(() => {
        fetchDataAndRender();
    }, []);
    const [labelParmValue, setlabelParmValue] = useState("")
    const fetchDataAndRender = async () => {
        const currentTimestamp = Date.now();
        const twoMinutesEarlierTimestamp = currentTimestamp - (2 * 60 * 1000);
        const date = new Date(currentTimestamp);
        const currentDate = new Date(twoMinutesEarlierTimestamp);
        const toDate = date.toISOString().slice(0, 19).replace('T', ' ');
        const fromDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        const parametersId = labelIS.parameters[0].parameterId
        const url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}&type=realtime`
        let result = await APIRequest.getGetTimebasedService(url);
        let data = result.data
        const parmValue = Object.values(data)[0][parametersId];
        const newValue = parmValue[parmValue.length - 1]
        setlabelParmValue(newValue.value)
        if (labelIS.labelType === "dynamic" && labelIS.parameters.length > 0) {
            const intervalId = setInterval(fetchDataAndRender, 5000);
            return () => clearInterval(intervalId);
        }
    };

    const labelSelectFunc = (labelIS) => {
        const panelId = labelIS?.panelId
        if (panelId !== "") {
            dispatch(openPanel(!isPanelOpen))
            dispatch(panelIdIs(panelId))
        }
    }

    return (
        <View style={[styles.image, { backgroundColor: labelIS?.labelOutline }]}>
            <Text style={{
                fontSize: 18,
                fontFamily: FONTS.NUNITOSANSMEDIUM,
                margin: 4
            }}>{labelIS?.labelTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        marginVertical: scaleHeight(30)
    }
})