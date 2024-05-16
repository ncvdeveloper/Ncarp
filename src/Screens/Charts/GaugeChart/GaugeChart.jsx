import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { COLORS } from '../../../Constants/colors';
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../Constants/dynamicSize';
import { styles } from '../ChartStyles';
import Plotly from 'react-native-plotly';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { APIRequest } from "../../../Utils/ApiRequest";
import { FONTS } from "../../../Constants/fonts"

export default function GaugeChart(props) {
  const { chartId, chartList, checkTheCond, paged, showtitle, width, height, xIs, yIs } = props
  const gaugeChartData = useSelector(state => state.detailSlice.chartDataFromserver[chartId]["gaugeChart-colors"])
  const [tracesIs, setTraces] = useState([]);
  useEffect(() => {
    fetchDataAndRender();
    const interval = setInterval(() => {
      fetchDataAndRender();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const fetchDataAndRender = async () => {
    const currentTimestamp = Date.now();
    const twoMinutesEarlierTimestamp = currentTimestamp - (2 * 60 * 1000);
    const date = new Date(currentTimestamp);
    const currentDate = new Date(twoMinutesEarlierTimestamp);
    const toDate = date.toISOString().slice(0, 19).replace('T', ' ');
    const fromDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const markerColor = gaugeChartData.parameters.map((ele) => ele.parameterColor)
    const parametersName = gaugeChartData.parameters.map((ele) => ele.global)
    const parametersId = gaugeChartData.parameters.map((ele) => ele.parameterId)
    const url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}`;
    let result = await APIRequest.getGetTimebasedService(url);
    let data = result.data
    if (data) {
        const traceData = data.map((item, index) => {
          return {
            type: "pie",
            values: Object.values(item).flatMap(dataArray => dataArray.map(item => item.value)),
            hoverinfo:gaugeChartData.toolTip ? 'all' : 'none',
            textinfo: "percent",
            hole: gaugeChartData.donutGap,
            insidetextorientation: "radial",
            textposition: 'inside',
            textfont: {
              size: 20,
            },
            name: parametersName[index],
            marker: {
              color: markerColor[index],
            },
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
    showgrid: false,
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

  useEffect(() => {
    const data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
       
        value: 450,
        type: "indicator",
        mode: "gauge+number+delta",
        delta: { reference: 380 },
        gauge: {
          axis: { range: [null, 500] },
          steps: [
            { range: [0, 250], color: "lightgray" },
            { range: [250, 400], color: "gray" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 490
          },
        }
      }
    ];
      setTraces(data);
}, []);

const data = [
  {
    type: 'indicator',
    mode: 'gauge+number',
    value: 80,
    title: { text: 'Speed', font: { size: 24 } },
    gauge: {
      axis: { range: [null, 100], tickwidth: 1, tickcolor: 'darkblue' },
      bar: { color: 'darkblue' },
      bgcolor: 'white',
      borderwidth: 2,
      bordercolor: 'gray',
      steps: [
        { range: [0, 50], color: 'cyan' },
        { range: [50, 80], color: 'royalblue' },
        { range: [80, 100], color: 'red' },
      ],
    },
  },
];

const layout1 = { width: 320, height: 240, margin: { t: 20, b: 20, l: 20, r: 20 } };

  return (
    <View style={[styles.chartContainer]}>
      <View style={[styles.box, { backgroundColor: '#fff' }]}>
        {showtitle && (
          <View style={styles.titlebox}>
            <Text style={[styles.charttitle]}>{gaugeChartData.chartTitle}</Text>
          </View>
        )}
        <View style={{ justifyContent: 'center',alignContent:'center', height: scaleHeight(400), width: scaleWidth(330) }}>
          {/* <Plotly
            data={tracesIs}
            layout={layout}
            style={{ flex: 1, bottom: scaleHeight(20),height: scaleHeight(200), }}
            useContainerStyle={true}
            config={{ displayModeBar: false }}
          /> */}
           <Plotly data={data} layout={layout1} enableFullPlotly={true} style={{top: 100}}/>
        </View>
      </View>
    </View>
  )
}

