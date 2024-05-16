import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';
import { COLORS } from '../../../Constants/colors';
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../Constants/dynamicSize';
import { styles } from '../ChartStyles';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { APIRequest } from "../../../Utils/ApiRequest";
import { WebView } from 'react-native-webview';
import { FONTS } from '../../../Constants/fonts';

export default function HeatMapChart(props) {
  const { chartId, chartList, checkTheCond } = props
  const HeatMapColors = useSelector(state => state.detailSlice.chartDataFromserver[chartId]["heatMapChart-colors"])
  const [tracesIs, setTraces] = useState([]);
  useEffect(() => {
    fetchDataAndRender();
    const interval = setInterval(() => {
      fetchDataAndRender();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function convertData(data) {
    const { x, y, z } = data[0];
    const newX = x.map(timestampArray => timestampArray.map(timestamp => [timestamp]));
    return [{ x: newX, y, z, type: 'heatmap' }];
  }

  const fetchDataAndRender = async () => {
    const currentTimestamp = Date.now();
    const twoMinutesEarlierTimestamp = currentTimestamp - (2 * 60 * 1000);
    const date = new Date(currentTimestamp);
    const currentDate = new Date(twoMinutesEarlierTimestamp);
    const toDate = date.toISOString().slice(0, 19).replace('T', ' ');
    const fromDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const markerColor = HeatMapColors.parameters.map((ele) => ele.parameterColor)
    const parametersName = HeatMapColors.parameters.map((ele) => ele.global)
    const parametersId = HeatMapColors.parameters.map((ele) => ele.parameterId)
    const url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}&chart_type=heatmap`;
    let result = await APIRequest.getGetTimebasedService(url);
    let data = result.data
    if (data) {
      let newdata = convertData(data)

      setTraces(newdata);
    }
  };
  const layout = {
    title: '',
    xaxis: {
      showgrid: HeatMapColors.isGridPresent
    },
    yaxis: {
      showgrid: HeatMapColors.isGridPresent
    },
    showgrid: HeatMapColors.isGridPresent,
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0,
      y: -0.5,
    },
    showgrid: false,
    font: {
      family: FONTS.NUNITOSANSBOLD,
      size: normalizeFont(26)
    },
    margin: {
      b: Platform.OS === 'ios' ? 300 : 250,
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
          color: COLORS.ASH,
          width: 1,
        },
      },
    ],
  };
  const dataStr = JSON.stringify(tracesIs);
  const layoutStr = JSON.stringify(layout);
  const htmlContent = `
  <html>
    <head>
      <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      <style>
      /* Adjust the size of the chart container */
      #heatmap {
        width: 1000;
        height: 900;
      }
    </style>
    </head>
    <body>
      <div id="heatmap"></div>
      <script>
        var data = ${dataStr};
        var layout = ${layoutStr};
        Plotly.newPlot('heatmap', data, layout);
      </script>
    </body>
  </html>
`;


  return (
    <View style={[styles.chartContainer]}>
      <View style={[styles.box, { backgroundColor: '#fff' }]}>
        <View style={styles.titlebox}>
          <Text style={[styles.charttitle]}>{HeatMapColors.chartTitle}</Text>
        </View>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', height: scaleHeight(300), width: scaleWidth(330),alignSelf:'center' }}>
          <WebView originWhitelist={['*']} source={{ html: htmlContent }} />
        </View>
      </View>
    </View>
  )
}

