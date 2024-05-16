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
import { useSelector } from 'react-redux';
import { APIRequest } from "../../../Utils/ApiRequest";
import { FONTS } from "../../../Constants/fonts"

export default function DonutChart(props) {
  const { chartId, chartList, checkTheCond } = props
  const [title, settitle] = useState('')
  const [tracesIs, setTraces] = useState([]);
  useEffect(() => {
    fetchDataAndRender();
    const interval = setInterval(() => {
      fetchDataAndRender();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let donutChartData = {}

  const fetchDataAndRender = async () => {

    let url = ""
    let paramName = []
    let markerColor = {}
    let parametersName = []
    let chartType = []
    if (page === 'analytics') {
      paramName = chartList.parametrList.map(param => param.global);
      url = `http://sustainos.ai:9001/analyticsservice_app/api/chart_data/?id=${chartList.parameters}&time_range=${chartList.timeRange}&aggregation_type=${chartList.aggregates}&chart_type=line&conditions=${chartList.conditions}`
    }
    else {
      donutChartData = checkTheCond[chartId]["donutChart-colors"]
      settitle(HeatMapColors?.chartTitle)
      const currentTimestamp = Date.now();
      const twoMinutesEarlierTimestamp = currentTimestamp - (2 * 60 * 1000);
      const date = new Date(currentTimestamp);
      const currentDate = new Date(twoMinutesEarlierTimestamp);
      const toDate = date.toISOString().slice(0, 19).replace('T', ' ');
      const fromDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
      markerColor = donutChartData.parameters.map((ele) => ele.parameterColor)
      parametersName = donutChartData.parameters.map((ele) => ele.global)
      const parametersId = donutChartData.parameters.map((ele) => ele.parameterId)
      url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}`;
    }
    let result = await APIRequest.getGetTimebasedService(url);
    let data = result.data
    if (data) {
      const traceData = Object.entries(data.param_mapping).map(([key, value]) => {
        const dataArray = data.data[key];
        return {
          values: dataArray.map(item => item.value),
          type: "pie",
          mode: 'lines+points',
          marker: {
            color: markerColor[parametersName.indexOf(value)]
          },
          hole: 0.4,
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
    showlegend: false,
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
          <Text style={[styles.charttitle]}>{title}</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350) }}>
          <Plotly
            data={tracesIs}
            layout={layout}
            style={{ flex: 1, height: scaleHeight(300), }}
            useContainerStyle={true}
            config={{ displayModeBar: false }}
          />
        </View>
      </View>
    </View>
  )
}

