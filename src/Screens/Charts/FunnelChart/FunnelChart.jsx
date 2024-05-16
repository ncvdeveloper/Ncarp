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

export default function FunnelChart(props) {
  const { chartId } = props
 // const funnelChartData = useSelector(state => state.detailSlice.chartDataFromserver[chartId]["funnelChart-colors"])
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
  //   const markerColor = funnelChartData.parameters.map((ele) => ele.parameterColor)
  //   const parametersName = funnelChartData.parameters.map((ele) => ele.global)
  //   const parametersId = funnelChartData.parameters.map((ele) => ele.parameterId)
  //   const url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}`;
  //   let result = await APIRequest.getGetTimebasedService(url);
  //   const data = result.data;
  
  //   if (data) {
  //     const textInfoValue = funnelChartData.textPosition ? 'text+value' : 'none';
  //     const traceData = data.map((item, index) => {
  //       return {
  //         x: Object.values(item).flatMap(dataArray => dataArray.map(item => item.value)),
  //         hoverinfo: funnelChartData.toolTip ? 'all' : 'none',
  //         text: Object.values(item).flatMap(dataArray => dataArray.map(item => item.date_time)),
  //         textinfo: textInfoValue,
  //         type: 'funnel',
  //         mode: 'lines',
  //         name: parametersName[index],
  //         textposition: funnelChartData.textInside ? 'inside' : 'outside',
  //         marker: {
  //           color: markerColor[index],
  //         },
  //         textfont: {
  //           color: funnelChartData.xFontColor,
  //           family: funnelChartData.xfFamily,
  //           size: funnelChartData.xFonntSize,
  //           bold:funnelChartData.xBold?"bold":"normal"
  //         },
  //       };
  //     });
  //     setTraces(traceData);
  //   }
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

 
  const htmlContent = `
    <html>
      <head>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      </head>
      <body>
        <div id="myDiv" style="width: 100%; height: 100%;"></div>
        <script>
          var data = [{type: 'funnel', name: 'Montreal', y: ["Website visit", "Downloads", "Potential customers", "Requested price"], x: [120, 60, 30, 20], textinfo: "value+percent initial"}, {type: 'funnel', name: 'Toronto', y: ["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent"], x: [100, 60, 40, 30, 20], textposition: "inside", textinfo: "value+percent previous"}, {type: 'funnel', name: 'Vancouver', y: ["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent", "closed deals"], x: [90, 70, 50, 30, 10, 5], textposition: "outside", textinfo: "value+percent total"}];
          var layout = {margin: {l: 130, r: 0}, width: 600, funnelmode: "stack", showlegend: 'true'};
          Plotly.newPlot('myDiv', data, layout);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.chartContainer]}>
      <View style={[styles.box, { backgroundColor: '#fff' }]}>
        <View style={{ backgroundColor: COLORS.HEADERBG, width: '100%' }}>
          {/* <Text style={[styles.charttitle]}>{funnelChartData.chartTitle}</Text> */}
          <Divider style={styles.divider} />
        </View>
        <View style={{ alignSelf: 'flex-start',justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350) }}>
          {/* <Plotly
            data={tracesIs}
            layout={layout}
            style={{ flex: 1, bottom: scaleHeight(20),height: scaleHeight(200), }}
            useContainerStyle={true}
            config={{ displayModeBar: false }}
          /> */}
          <WebView originWhitelist={['*']} source={{ html: htmlContent }} />
        </View>
      </View>
    </View>
  )
}

