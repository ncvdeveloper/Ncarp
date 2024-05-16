import React from 'react';
import { View } from 'react-native';
import Plotly from 'react-native-plotly';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { FONTS } from "../../Constants/fonts";

const ChartBar = (props) => {
    const layout = {
        title: '',
        xaxis: {
            showgrid: false
        },
        yaxis: {
            showgrid: true,
        },
        legend: {
            orientation: 'h',
            x: 0,
            y: 1,
        },
        barmode: 'group',
        bargap: 0.4,
        bargroupgap: 0.1,
        showgrid: false,
        width: scaleWidth(300),
        font: {
            family: FONTS.NUNITOSANSBOLD,
            size: normalizeFont(12),
            color: COLORS.TEXTCOLOR
        },
        margin: {
            l: 20,
            r: 20,
            b: 30,
            t: 10,
        },
        shapes: [
            {
                type: 'line',
                x0: 0,
                x1: 1.0,
                y0: 0,
                y1: 0,
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
        <View style={{ height: scaleHeight(180), width: '95%', }}>
            <Plotly
                data={props?.data}
                layout={layout}
                useContainerStyle={true}
                config={{ displayModeBar: false }}
            />
        </View>
    )
}

export default ChartBar;