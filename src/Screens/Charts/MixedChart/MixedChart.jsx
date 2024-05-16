import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { COLORS } from '../../../Constants/colors';
import {
    normalizeFont,
    scaleHeight,
    scaleWidth,
} from '../../../Constants/dynamicSize';
import { styles } from '../ChartStyles'
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { APIRequest } from "../../../Utils/ApiRequest";
import Plotly from 'react-native-plotly';
import { FONTS } from "../../../Constants/fonts";

export default function MixedChart(props) {
    const { chartId, chartList, checkTheCond, page,showtitle } = props
    const [title, settitle] = useState('')
    const [layoutdata, setlayoutdata] = useState(false);
    let MixedChartColors = {}

    const [tracesIs, setTraces] = useState([]);

    useEffect(() => {
        fetchDataAndRender();
        const interval = setInterval(() => {
            fetchDataAndRender();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchDataAndRender = async () => {

        let url = ""
        let paramName = []
        let markerColor = {}
        let parametersName = []
        let chartType = []
        if (page === 'analytics') {
            paramName = chartList.parametrList.map(param => param.global);
            url = `http://sustainos.ai:9001/analyticsservice_app/api/chart_data/?id=${chartList.parameters}&time_range=${chartList.timeRange}&aggregation_type=${chartList.aggregates}&chart_type=line&conditions=${chartList.conditions}`
        } else {
            MixedChartColors = checkTheCond[chartId]["mixedChart-colors"]
            settitle(MixedChartColors?.chartTitle)
            setlayoutdata(MixedChartColors)
            const currentTimestamp = Date.now();
            const twoMinutesEarlierTimestamp = currentTimestamp - (2 * 60 * 1000);
            const date = new Date(currentTimestamp);
            const currentDate = new Date(twoMinutesEarlierTimestamp);
            const toDate = date.toISOString().slice(0, 19).replace('T', ' ');
            const fromDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            markerColor = MixedChartColors.parameters.map((ele) => ele.parameterColor)
            parametersName = MixedChartColors.parameters.map((ele) => ele.global)
            const parametersId = MixedChartColors.parameters.map((ele) => ele.parameterId)
            chartType = MixedChartColors.parameters.map((ele) => ele.chartType)
            url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}`;
        }
        let result = await APIRequest.getGetTimebasedService(url);
        let data = result.data
        if (data) {
            const traceData = Object.entries(data.param_mapping).map(([key, value], index) => {
                const dataArray = data.data[key];
                return {
                    x: dataArray.map(item => item.date_time),
                    y: dataArray.map(item => item.value),
                    type: chartType[index],
                    mode: chartType[index],
                    marker: {
                        color: markerColor[parametersName.indexOf(value)]
                    },
                    name: value,
                    fill: chartType[index] === "lines" ? "" : 'tozeroy',
                };
            });
            setTraces(traceData);
        }
    };

    const layout = {
        title: '',
        autosize: true,
        xaxis: {
            title: 'Time',
            showgrid: false,
            autorange: true,
            showgrid: layoutdata.isGridPresent,
            nticks: 6,
            //zeroline: !lineChartStyles.isGridPresent,
            gridcolor: '#C6D0DC',
            gridwidth: 1,
            gridshape: 'linear',
            showline: true,
            tickfont: {
                family: layoutdata.xfFamily,
                size: layoutdata.xFonntSize,
                color: layoutdata.xFontColor,
                weight: layoutdata.xBold ? "bold" : "normal"
            }
        },
        yaxis: {
            title: 'Values',
            showgrid: false,
            gridcolor: '#C6D0DC',
            gridwidth: 1,
            gridshape: 'linear',
            showline: true,
            tickfont: {
                family: layoutdata.yfFamily,
                size: layoutdata.yFonntSize,
                color: layoutdata.yFontColor,
                weight: layoutdata.yBold ? "bold" : "normal"
            }
        },
        showlegend: layoutdata.showLegend,
        legend: {
            orientation: 'h',
            x: 0,
            y: -0.5,
            traceorder: 'reversed',
            itemsizing: 'trace',
            font: {
                size: 14,
                weight: 'lighter',
            }
        },
        barmode: 'group',
        showgrid: false,
        width: scaleWidth(350),
        font: {
            family: FONTS.NUNITOSANSBOLD,
            size: normalizeFont(14)
        },
        paper_bgcolor: layoutdata.areaBackground,
        plot_bgcolor: layoutdata.plotAreaBg,
        margin: {
            l: 60,
            r: 20,
        },
        shapes: [
            {
                type: 'rect',
                x0: 0,
                x1: 1.0,
                y0: 0,
                y1: 1.0,
                xref: 'paper',
                yref: 'paper',
                line: {
                    color: layoutdata.plotAreaOutline,
                    width: 2,
                },
            },
        ],
        chartOutline: `2px solid ${layoutdata.areaOutline}`,
        chartTitleIs: layoutdata.chartTitle,
        fontSize: layoutdata.fSize,
        fontFamily: layoutdata.fFamily,
        isBold: layoutdata.isBold,
        isItalic: layoutdata.isItalic,
        isUnderLine: layoutdata.isUnderLine,
        isCaseChange: layoutdata.isCaseChange,
        fontColor: layoutdata.fontColor,
        fontBgColor: layoutdata.fontBgColor,
        rndproperties: layoutdata.reSizeProperties
    };

    return (
        <View style={[styles.chartContainer]}>
            <View style={[styles.box, { backgroundColor: '#fff' }]}>
            {showtitle && (
                    <View style={styles.titlebox}>
                        <Text style={[styles.charttitle]}>{title}</Text>
                    </View>
                )}
                <View style={{ alignSelf: 'flex-start', justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350) }}>
                    <Plotly
                        data={tracesIs}
                        layout={layout}
                        config={{
                            displayModeBar: false,
                            displayModeBar: false,
                            scrollZoom: false,  // Disable scroll zoom
                            doubleClick: true, // Disable double click to autoscale
                            showTips: true,   // Disable hover tips
                        }}
                        style={{ flex: 1, bottom: scaleHeight(40) }}
                        useContainerStyle={true}
                    />
                </View>
            </View>
        </View>
    )
}

