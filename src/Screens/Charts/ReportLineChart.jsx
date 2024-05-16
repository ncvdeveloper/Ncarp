import { COLORS } from '../../Constants/colors';
import {
    normalizeFont,
    scaleHeight,
    scaleWidth,
} from '../../Constants/dynamicSize';
import { FONTS } from "../../Constants/fonts";
import Plotly from 'react-native-plotly';
const ReportLineChart = (props) => {
    const layout = {
        title: '',
        xaxis: {
            showgrid: false,
            tickcolor: '#33A9AC',
            tickvals: [0, 1, 2, 3, 4, 5, 6],
            nticks: 7,
            range: [0, 6],
        },
        yaxis: {
            showgrid: false,
            tickcolor: '#33A9AC',
            tickvals: [400, 800],
            nticks: 2,
            range: [0,1000],
        },
        legend: {
            legend: {
                showlegend: false,
            },
            orientation: 'h',
            x: 0.35,
            y: -0.3,
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
            l: 40,
            r: 10,
            b: 60,
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
                scrollZoom: false,  // Disable scroll zoom
                doubleClick: false, // Disable double click to autoscale
                showTips: true ,   // Disable hover tips
            }}
            style={{ flex: 1, height: scaleHeight(200), width: '100%', alignSelf: 'center' }}

        />
    )
}

export default ReportLineChart;