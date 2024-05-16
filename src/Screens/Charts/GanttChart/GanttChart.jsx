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

export default function GanttChart(props) {
  const { chartId } = props
  const ganttChartData = useSelector(state => state.detailSlice.chartDataFromserver[chartId]["ganttChart-colors"])
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
    const markerColor = ganttChartData.parameters.map((ele) => ele.parameterColor)
    const parametersName = ganttChartData.parameters.map((ele) => ele.global)
    const parametersId = ganttChartData.parameters.map((ele) => ele.parameterId)
    const url = `http://sustainos.ai:9001/dataservice_app/api/parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}`;
    let result = await APIRequest.getGetTimebasedService(url);
    let data = result.data
    if (data) {
        const traceData = data.map((item, index) => {
          return {
            x: Object.values(item).flatMap(dataArray => dataArray.map(item => item.date_time)).slice(7,9),
            y: Object.values(item).flatMap(dataArray => dataArray.map(item => item.value)).slice(7,9),
            hoverinfo: ganttChartData.toolTip ? 'all' : 'none',
            type: 'scatter',
            showlegend: true,
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

  return (
    <View style={[styles.chartContainer]}>
      <View style={[styles.box, { backgroundColor: '#fff' }]}>
        <View style={{ backgroundColor: COLORS.HEADERBG, width: '100%' }}>
          <Text style={[styles.charttitle]}>{ganttChartData.chartTitle}</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={{ alignSelf: 'flex-start',justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350) }}>
          <Plotly
            data={tracesIs}
            layout={layout}
            style={{ flex: 1, bottom: scaleHeight(20),height: scaleHeight(200), }}
            useContainerStyle={true}
            config={{ displayModeBar: false }}
          />
        </View>
      </View>
    </View>
  )
}

