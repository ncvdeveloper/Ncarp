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
import {
    VictoryChart,
    VictoryBar,
    VictoryTheme,
    VictoryCursorContainer,
    VictoryLine,
    VictoryLabel,
    VictoryArea,
    VictoryScatter,
    VictoryAxis,
    VictoryPie,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryBoxPlot,
    VictoryPolarAxis,
} from 'victory-native';

export default function BoxChart(props) {
    const { chartId } = props
    const boxChartData = useSelector(state => {
        const chartData = state.detailSlice.chartDataFromserver[chartId];
        if (chartData && chartData["boxChart-colors"]) {
            return chartData["boxChart-colors"];
        }
        return null;
    });
    const [tracesIs, setTraces] = useState([]);

    useEffect(() => {
        fetchDataAndRender();
        const interval = setInterval(() => {
            fetchDataAndRender();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const data = [
        { x: 1, min: 5, max: 10, median: 7, q1: 6, q3: 8 },
        { x: 2, min: 4, max: 8, median: 6, q1: 5, q3: 7 },
        { x: 3, min: 6, max: 12, median: 9, q1: 7, q3: 10 },
    ];

    const fetchDataAndRender = async () => {
        const currentTimestamp = Date.now();
        const twoMinutesEarlierTimestamp = currentTimestamp - (2 * 60 * 1000);
        const date = new Date(currentTimestamp);
        const currentDate = new Date(twoMinutesEarlierTimestamp);
        const toDate = boxChartData.toDate;
        const fromDate = boxChartData.fromDate;
        const markerColor = boxChartData.parameters.map((ele) => ele.parameterColor)
        const parametersName = boxChartData.parameters.map((ele) => ele.global)
        const parametersId = boxChartData.parameters.map((ele) => ele.parameterId)
        const chartType = boxChartData.parameters.map((ele) => ele.chartType)
    
        
    
        const url = `http://sustainos.ai:9001/dataservice_app/api/get_parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}&chart_type=boxplot&group_by=${boxChartData.timeRange}`;
        let result = await APIRequest.getGetTimebasedService(url);

        console.log("result",result)
        let data = result.data
        if (data) {
            const traceData = Object.entries(data.param_mapping).map(([key, value]) => {
                const dataArray = data.data[key];
                return {
                    x: dataArray.map(item => item.date_time),
                    y: dataArray.map(item => item.value),
                    type: 'box',
                    mode: 'box',
                    marker: {
                        color: markerColor[parametersName.indexOf(value)]
                    },
                    name: value,
                };
            });
            setTraces(traceData);
        }
    };

    const layout = {
        title: '',
        xaxis: {
            title: 'Time',
            showgrid: false
        },
        yaxis: {
            title: 'Values',
            showgrid: false
        },
        legend: {
            orientation: 'h',
            x: 0,
            y: -0.5,
        },
        barmode: 'group',
        showgrid: false,
        width: scaleWidth(350),
        font: {
            family: FONTS.NUNITOSANSBOLD,
            size: normalizeFont(14)
        },
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
                    color: COLORS.GREY,
                    width: 2,
                },
            },
        ],
    };

    return (
        <View style={[styles.chartContainer]}>
            <View style={[styles.box, { backgroundColor: '#fff' }]}>
                <View style={{ backgroundColor: COLORS.HEADERBG, width: scaleWidth(350) }}>
                    <Text style={[styles.charttitle]}>{boxChartData.chartTitle}</Text>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ alignSelf: 'flex-start', justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350) }}>
                    <Plotly
                        data={tracesIs}
                        layout={layout}
                        config={{ displayModeBar: false }}
                        style={{ flex: 1, bottom: scaleHeight(40) }}
                        useContainerStyle={true}
                    />
                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={scaleWidth(380)} height={scaleHeight(400)}>
                        <VictoryAxis
                            tickFormat={t => new Date(t).toLocaleTimeString()}
                        />
                        <VictoryAxis dependentAxis />
                        <VictoryBoxPlot
                            data={data}
                            boxWidth={20}
                            style={{
                                min: { stroke: '#FFAA1D' },
                                max: { stroke: '#FFAA1D' },
                                median: { stroke: '#FFAA1D' },
                                q1: { fill: '#FFFFE0' },
                                q3: { fill: '#FFFFE0' },
                            }}
                        />
                    </VictoryChart>
                </View>
            </View>
        </View>
    )
}

