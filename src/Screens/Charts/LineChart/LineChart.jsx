import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
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
import { APIRequest } from '../../../Utils/ApiRequest';
import { FONTS } from '../../../Constants/fonts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LineChart(props) {
  const { chartId, chartList, checkTheCond, paged, showtitle, width, height, xIs, yIs } = props;
  const [title, settitle] = useState('');
  const [tracesIs, setTraces] = useState([]);
  const [gridpresent, setgridpresent] = useState(false);
  const [layoutdata, setlayoutdata] = useState([]);
  useEffect(() => {
    fetchDataAndRender();
    const interval = setInterval(() => {
      fetchDataAndRender();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const basicDetails = {
    chartTitle: "Line Chart", plotAreaBg: "#fff", plotAreaOutline: "#b3b0b0ff", areaBackground: "#fff", areaOutline: "#fff",
    isGridPresent: true, toolTip: true, showLegend: true, legend: { x: 0.5, y: 1.1 }, chartType: "horizontal", barGap: 0.3, donutGap: 0.6, scatterType: "bubble",
    fSize: "18px", fFamily: "Nunito", isBold: false, isItalic: false, isUnderLine: false, isCaseChange: false, legendType: "name", isTitleOpen: false,
    fontColor: "#33A9AC", fontBgColor: "#fff", legendTop: false, legendBottom: false, legendLeft: false, legendRight: false,
    xBold: false, xFontColor: "#b3b0b0ff", xFonntSize: "16", xfFamily: "Nunito", yBold: false, yFontColor: "#b3b0b0ff",
    yFonntSize: "16", yfFamily: "Nunito", reSizeProperties: { x: xIs, y: yIs, width: width, height: height }, textPosition: false, textInside: true, textOutSide: false,
    YGap: 0.3, heatColorRange: "none", HeatpaletNo: 0, parameters: [], refreshFreq: "None", timeRange: "5 Minute", subSup: "Enter The Title"
  }
  let lineChartColors = {};
  if (paged === 'analytics') {
    lineChartColors = basicDetails
  } else {
    lineChartColors = checkTheCond[chartId]["lineChart-colors"]
  }

  const fetchDataAndRender = async () => {
    let url = '';
    let paramName = [];
    let markerColor = [];
    let parametersName = [];
    let paramData = {}
    let fromDate, toDate;
    if (paged === 'analytics') {
      paramData = chartList
      fromDate = chartList.fromdateIs
      toDate = chartList.toDateIs
    } else {
      paramData = lineChartColors
      fromDate = lineChartColors.fromDate
      toDate = lineChartColors.toDate
    }
    settitle(lineChartColors.chartTitle);
    setgridpresent(lineChartColors.isGridPresent);
    setlayoutdata(lineChartColors);

    markerColor = lineChartColors.parameters.map(ele => ele.parameterColor);
    parametersName = lineChartColors.parameters.map(ele => ele.global);
    const parametersId = lineChartColors.parameters.map(
      ele => ele.parameterId,
    );
    const RequestBody = {};
    const filter_tags = [];
    paramData.parameters.forEach(item => {
      const conditions = item.fiterConditionsNewFormat.join(' ');
      RequestBody[item.parameterId] = conditions;
      item.fiterConditionsNewFormat.forEach(condition => {
        const paramId = condition.split(' ')[0];
        if (!parametersId.includes(parseInt(paramId)) && !filter_tags.includes(paramId)) {
          filter_tags.push(paramId);
        }
      });
    });
    RequestBody["filter_tags"] = filter_tags.join(',');
    const token = await AsyncStorage.getItem('jwttoken');
    try {
      const response = await axios.post(`http://sustainos.ai:9000/dataservice_app/api/get_parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}&data_type=line`, RequestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = response.data.data;
      if (data) {
        const traces = [];
        parametersId.forEach((key, ind) => {
          const trace = {
            x: [],
            y: [],
            name: paged === 'analytics' ? paramData.parametrList[ind].globalCode : paramData.legendType === "name" ? paramData.parameters[ind].name : paramData.parameters[ind].global,
            mode: 'lines',
            line: {
              dash: 'solid',
              width: 2.5,
              color: paged === 'analytics' ? paramData.parametrList[ind].parameterColor : paramData.parameters[ind].parameterColor
            }
          };
          Object.entries(data).forEach(([timestamp, values]) => {
            const valueObj = values[parametersId[ind]];
            trace.x.push(timestamp);
            trace.y.push(valueObj || null);
          });
          traces.push(trace);
        });
        setTraces(traces);

      } else {
        setTraces([])
      }
    }
    catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const layout = {
    title: '',
    autosize: true,
    xaxis: {
      title: 'Time',
      showgrid: gridpresent,
      gridcolor: '#C6D0DC', // Specify grid color
      gridwidth: 1, // Set grid line width
      gridshape: 'linear',
      tickfont: {
        family: layoutdata.xfFamily,
        size: layoutdata.xFonntSize - 5,
        color: layoutdata.xFontColor,
        weight: layoutdata.xBold ? 'bold' : 'normal',
      },
      tickangle: -0,
      tickFormat: '%H:%M',
    },
    x: 0.5,
    y: 0.3,
    yaxis: {
      title: 'Values',
      showgrid: gridpresent,
      gridcolor: '#C6D0DC',
      gridwidth: 1,
      gridshape: 'linear',
      tickfont: {
        family: layoutdata.yfFamily,
        size: layoutdata.yFonntSize - 5,
        color: layoutdata.yFontColor,
        weight: layoutdata.yBold ? 'bold' : 'normal'
      },
    },
    showgrid: gridpresent,
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0,
      y: Platform.OS === 'ios' ? 1.25 : 1.3,
      traceorder: 'reversed',
      itemsizing: 'trace',
      font: {
        family: FONTS.NUNITOSANSBOLD,
        size: layoutdata.yFonntSize - 3,
        weight: layoutdata.yBold ? 'bold' : 'normal'
      },
    },
    paper_bgcolor: layoutdata.areaBackground,
    plot_bgcolor: layoutdata.plotAreaBg,
    showgrid: false,
    font: {
      family: FONTS.NUNITOSANSBOLD,
      size: normalizeFont(14),
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
          color: layoutdata.plotAreaOutline,
          width: 0.8,
        },
      },
    ],

    chartOutline: `2px solid ${layoutdata.areaOutline}`,
    chartTitleIs: layoutdata.chartTitle,
    fontSize: layoutdata.fSize,
    fontFamily: layoutdata.fFamily,
    isBold: layoutdata.isBold,
    isItalic: layoutdata.isItalic,
    isUnderLine: layoutdata.isUnderLine,
    isCaseChange: layoutdata.isCaseChange,
    fontColor: layoutdata.fontColor,
    fontBgColor: layoutdata.fontBgColor,
    rndproperties: layoutdata.reSizeProperties,
  };

  return (
    <View style={[styles.chartContainer]}>
      <View style={[styles.box, { backgroundColor: '#fff' }]}>
        {showtitle && (
          <View style={styles.titlebox}>
            <Text style={[styles.charttitle]}>{title}</Text>
          </View>
        )}
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'center',
            height: scaleHeight(400),
            width: scaleWidth(350),
            marginTop: scaleHeight(10)
          }}>

          <Plotly
            data={tracesIs}
            layout={layout}
            style={{ flex: 1, bottom: scaleHeight(20), height: scaleHeight(200) }}
            useContainerStyle={true}
            scrollZoom={false}
            config={{
              displayModeBar: false,
              scrollZoom: false, // Disable scroll zoom
              doubleClick: false, // Disable double click to autoscale
              showTips: true, // Disable hover tips
            }}
          />

        </View>
      </View>
    </View>
  );
}
