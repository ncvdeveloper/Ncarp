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
import { WebView } from 'react-native-webview';

export default function RadarChart(props) {
  const { chartId } = props
  // const radarChartData = useSelector(state => state.detailSlice.chartDataFromserver[chartId]["radarChart-colors"])
  const [tracesIs, setTraces] = useState([]);
  // useEffect(() => {
  //   fetchDataAndRender();
  //   const interval = setInterval(() => {
  //     fetchDataAndRender();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // const fetchDataAndRender = async () => {
  //   const currentTimestamp = Date.now();
  //   const twoMinutesEarlierTimestamp = currentTimestamp - (2 * 60 * 1000);
  //   const date = new Date(currentTimestamp);
  //   const currentDate = new Date(twoMinutesEarlierTimestamp);
  //   const toDate = date.toISOString().slice(0, 19).replace('T', ' ');
  //   const fromDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  //   const markerColor = radarChartData.parameters.map((ele) => ele.parameterColor)
  //   const parametersName = radarChartData.parameters.map((ele) => ele.global)
  //   const parametersId = radarChartData.parameters.map((ele) => ele.parameterId)
  //   const url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}`;
  //   let result = await APIRequest.getGetTimebasedService(url);
  //   let data = result.data
  //   if (data) {
  //       const traceData = data.map((item, index) => {
  //         return {
  //           //theta: ['A', 'B', 'C', 'D', 'E', 'A'],
  //           r: Object.values(item).flatMap(dataArray => dataArray.map(item => item.value)).slice(5,10),
  //           hoverinfo: radarChartData.toolTip ? 'all' : 'none',
  //           type: 'scatterpolar',
  //           fill: 'toself',
  //           name: parametersName[index],
  //           marker: {
  //             color: markerColor[index],
  //           },
  //         };
  //       });
  //       setTraces(traceData);
  //     }

  // };
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
  };

  const data = [
    {
      type: 'scatterpolar',
      r: [39, 28, 8, 7, 28, 39],
      theta: ['A', 'B', 'C', 'D', 'E', 'A'],
      fill: 'toself',
      name: 'Group A',
    },
    {
      type: 'scatterpolar',
      r: [1.5, 10, 39, 31, 15, 1.5],
      theta: ['A', 'B', 'C', 'D', 'E', 'A'],
      fill: 'toself',
      name: 'Group B',
    },
  ];

  // const layout = {
  //   polar: {
  //     radialaxis: {
  //       visible: true,
  //       range: [0, 50],
  //     },
  //   },
  // };


  // Convert data and layout objects to JSON strings
  const dataStr = JSON.stringify(data);
  const layoutStr = JSON.stringify(layout);

  // Construct the HTML content with Plotly.js and the provided data and layout
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    </head>
    <body>
      <div id="myDiv" style="height: ${1200}px;"></div>
      <script>
        // Parse the JSON strings back to JavaScript objects
        var data = ${dataStr};
        var layout = ${layoutStr};

        // Plot the chart using Plotly.js
        Plotly.newPlot("myDiv", data, layout);
      </script>
    </body>
    </html>
  `;



  return (
    <View style={[styles.chartContainer]}>
      <View style={[styles.box, { backgroundColor: '#fff' }]}>
        <View style={{ backgroundColor: COLORS.HEADERBG, width: '100%' }}>
          {/* <Text style={[styles.charttitle]}>{radarChartData?.chartTitle}</Text> */}
          <Divider style={styles.divider} />
        </View>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350) }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </View>
  )
}

