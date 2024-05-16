import { COLORS } from '../../Constants/colors';
import {
    normalizeFont,
    scaleHeight,
    scaleWidth,
} from '../../Constants/dynamicSize';
import { FONTS } from "../../Constants/fonts";
import Plotly from 'react-native-plotly';
const ChatLineChart = (props) => {
    const layout = {
        title: '',
        xaxis: {
            showgrid: false,
            tickcolor: '#33A9AC',
            tickvals: [0, 1, 2, 3, 4],
            nticks: 5,
            range: [0, 4],
        },
        yaxis: {
            showgrid: false,
            tickcolor: '#33A9AC',
            tickvals: [200, 400, 600, 800, 1000],
            nticks: 6,
            range: [0, 1100],
        },
        legend: {
            legend: {
                showlegend: false,
            },
            orientation: 'h',
            x: 0.1,
            y: 1.1,
            traceorder: 'normal',
            font: {
                color: COLORS.ASH,
                family: FONTS.NUNITOSANSBOLD,
            },
            legend: {
                showlegend: false,
            },

        },
        showgrid: false,
        font: {
            family: FONTS.NUNITOSANSBOLD,
            size: normalizeFont(14),
            color: COLORS.BGCOLOR
        },
        margin: {
            l: 20,
            r: 20,
            b: 50,
            t: 30,
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
            {
                type: 'line',
                x0: 0,
                x1: 0,
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
        <Plotly
            data={props?.data}
            layout={layout}
            useContainerStyle={false}
            config={{ displayModeBar: false, 
                displayModeBar: false,
                scrollZoom: false,  // Disable scroll zoom
                doubleClick: true, // Disable double click to autoscale
                showTips: true ,   // Disable hover tips
            }}
            style={{ flex: 1, height: scaleHeight(300), width: '95%', alignSelf: 'center' }}

        />
    )
}

export default ChatLineChart;