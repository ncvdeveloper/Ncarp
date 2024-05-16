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

export default function ShankeyChart(props) {
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


  const data = [
    ["Emission", "Scope1", 6],
    ["Emission", "Scope2", 6],
    ["Emission", "Scope3", 6],
    ["Scope1", "Plant1", 2],
    ["Scope1", "Plant2", 2],
    ["Scope1", "Plant3", 2],
    ["Scope2", "WHRB", 1.5],
    ["Scope2", "GRID", 1.5],
    ["Scope2", "Captive", 1.5],
    ["Scope2", "Solar", 1.5],
    ["WHRB", "Process4", 1.5],
    ["GRID", "Process5", 1.5],
    ["Captive", "Process6", 1.5],
    ["Solar", "Process7", 1.5],
    ["Scope3", "Categories1", 1.2],
    ["Scope3", "Categories7", 1.2],
    ["Scope3", "Categories9", 1.2],
    ["Scope3", "Categories14", 1.2],
    ["Scope3", "Categories15", 1.2],
    ["Plant1", "Process1", 2],
    ["Plant2", "Process2", 2],
    ["Plant3", "Process3", 2],
    ["Categories1", "Process8", 1.2],
    ["Categories7", "Process9", 1.2],
    ["Categories9", "Process10", 1.2],
    ["Categories14", "Process11", 1.2],
    ["Categories15", "Process12", 1.2],
];

  const html = `<html>
  <head>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    google.charts.load('current', {'packages':['sankey']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'From');
      data.addColumn('string', 'To');
      data.addColumn('number', 'Weight');
      data.addRows(${JSON.stringify(data)});

      // Sets chart options.
      // Sets chart options.
      var options = {
        width: 900,
        height: 700,
        sankey: {
          
          node: { width: 30,
            //colors: [ '#333333' ],
            label: {
            fontSize: 24,
            color: '#555555',
            bold: true,
            } 
          },
          link: { color: { fill: '#E7E7E7',  } },
         },
      };

      // Instantiates and draws our chart, passing in some options.
      var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
      chart.draw(data, options);
    }
  </script>
</head>
<body>
  <div id="sankey_basic" style="width: 900px; height: 300px;"></div>
</body>
</html>
`

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

  






  return (
    <View style={[styles.chartContainer]}>
      <View style={[styles.box, { backgroundColor: '#fff' }]}>
        <View style={{ backgroundColor: COLORS.HEADERBG, width: '100%' }}>
          {/* <Text style={[styles.charttitle]}>{radarChartData?.chartTitle}</Text> */}
          <Divider style={styles.divider} />
        </View>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350) }}>
        <WebView
        source={{ html: html }}
      />
        </View>
      </View>
    </View>
  )
}

