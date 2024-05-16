import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import {
    normalizeFont,
    scaleHeight,
    scaleWidth,
} from '../../../Constants/dynamicSize';
import { styles } from '../ChartStyles'
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { APIRequest } from "../../../Utils/ApiRequest";
import Plotly from 'react-native-plotly';
import { FONTS } from "../../../Constants/fonts";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function BarChart(props) {
    const { chartId,chartList,checkTheCond,paged, showtitle,width,height,xIs,yIs} = props
    const [title, settitle] = useState('')
    const [tracesIs, setTraces] = useState([]);
    const [layoutdata, setlayoutdata] = useState(false);
    useEffect(() => {
        fetchDataAndRender();
        const interval = setInterval(() => {
            fetchDataAndRender();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const basicDetails = {chartTitle:"Bar Chart",plotAreaBg: "#fff",plotAreaOutline:"#b3b0b0ff",areaBackground:"#fff",areaOutline:"#fff",
  isGridPresent:true,toolTip:true,showLegend:true,legend:{x:0.5,y:1.1},chartType:"H",barGap:0.3,donutGap:0.6,scatterType:"bubble",
  fSize:"18px",fFamily:"Nunito",isBold:false,isItalic:false,isUnderLine:false,isCaseChange:false,isTitleOpen:false,
  fontColor:"#33A9AC",fontBgColor:"#fff",legendTop:true,legendBottom:false,legendLeft:false,legendRight:false,
  xBold:false,xFontColor:"#b3b0b0ff",xFonntSize:"16",xfFamily:"Nunito",yBold:false,yFontColor:"#b3b0b0ff",
  yFonntSize:"16",yfFamily:"Nunito",reSizeProperties:{x:xIs,y:yIs,width: width,height:height},textPosition:false,textInside:true,textOutSide:false,
  YGap:0.3,heatColorRange:"none",HeatpaletNo:0,parameters:[],refreshFreq:"None",timeRange:"5 Minute",subSup:"Enter The Title"}

  let barChartColors = basicDetails
  let dataUrl = ""
  if(paged === 'analytics'){
    barChartColors = basicDetails
  }else{
    barChartColors = checkTheCond[chartId]["barChart-colors"]
  }

    const fetchDataAndRender = async () => {

        let url = ""
        let paramName = []
        let markerColor = []
        let parametersName = []
        let paramData = {}
        let fromDate, toDate;
        if (paged === 'analytics') {
            paramData = chartList
            fromDate = chartList.fromdateIs
            toDate = chartList.toDateIs
          } else {
            paramData = barChartColors
            fromDate = barChartColors.fromDate
            toDate = barChartColors.toDate
          }
      
        settitle(barChartColors.chartTitle)
        setlayoutdata(barChartColors)
        markerColor = barChartColors.parameters.map((ele) => ele.parameterColor)
        parametersName = barChartColors.parameters.map((ele) => ele.global)
        const parametersId = barChartColors.parameters.map((ele) => ele.parameterId)
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
            const response = await axios.post(`http://sustainos.ai:9000/dataservice_app/api/get_parameter_values/?id=${parametersId}&from_date=${fromDate}&to_date=${toDate}&data_type=bar`,RequestBody,{
              headers: {
              Authorization: `Bearer ${token}`,      
            },
          });
            const data = response.data.data;
                  if (data) {
                  const traces = [];
                  parametersId.forEach((key,ind) => {
                      const trace = {
                          x: [],
                          y: [],
                          name: paged === 'analytics'?chartList.parametrList[ind].globalCode:paramData.legendType === "name"?paramData.parameters[ind].name:paramData.parameters[ind].global,
                          type: 'bar',
                          orientation: paged === 'analytics'?chartList.barType === 'V' ? 'v' : 'h' : paramData.barType === 'V' ? 'v' : 'h',
                          marker: {
                            color: paged === 'analytics'?chartList.parametrList[ind].parameterColor:paramData.parameters[ind].parameterColor  // Generate color dynamically or customize as needed
                        },
                      };
                          Object.entries(data).forEach(([timestamp, values]) => {
                              const valueObj = values[parametersId[ind]];
                              trace.x.push((paged === 'analytics'?chartList.barType === 'V': paramData.barType === "V")?timestamp:valueObj || null);
                              trace.y.push((paged === 'analytics'?chartList.barType === 'V': paramData.barType === "V")?valueObj || null:timestamp);
                          });
                     
                      traces.push(trace);
                  });
                  setTraces(traces);
     
                }else{
                  setTraces([])
                }
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    const layout = {
        title: '',
        xaxis: {
            title: 'Time',
            showgrid: layoutdata.isGridPresent,       // Display grid lines
            gridcolor: '#C6D0DC',    // Specify grid color
            gridwidth: 1,        // Set grid line width
            gridshape: 'linear',
            tickfont: {
                family: layoutdata.xfFamily,
                size: layoutdata.xFonntSize - 5,
                color: layoutdata.xFontColor,
                weight: layoutdata.xBold ? "bold" : "normal"
            },
            tickangle: -0,
            tickFormat: '%H:%M',
        },
        yaxis: {
            title: 'Values',
            showgrid: false,
            gridcolor: '#C6D0DC',
            gridwidth: 1,
            gridshape: 'linear',
            tickfont: {
                family: layoutdata.yfFamily,
                size: layoutdata.yFonntSize - 5,
                color: layoutdata.yFontColor,
                weight: layoutdata.yBold ? "bold" : "normal"
            }
        },
        showlegend: true,
        legend: {
            orientation: 'h',
            x: 0,
            y: Platform.OS === 'ios' ? 1.25 : 1.3,
            traceorder: 'reversed',
            itemsizing: 'trace',
            font: {
              family: FONTS.NUNITOSANSBOLD,
              size: layoutdata.yFonntSize -3,
              weight: layoutdata.yBold ? 'bold' : 'normal'
            },
        },
        
        showgrid: false,
        width: scaleWidth(350),
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
                x1: 1,
                y0: 0,
                y1: 1.0,
                xref: 'paper',
                yref: 'paper',
                line: {
                    color: layoutdata.plotAreaOutline,
                    width: 1,
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
        rndproperties: layoutdata.reSizeProperties
    };

    return (
        <View style={[styles.chartContainer]}>
            <View style={[styles.box, { backgroundColor: '#fff' }]}>
            {showtitle &&
                <View style={styles.titlebox}>
                    <Text style={[styles.charttitle]}>{title}</Text>
                </View>}
                <View style={{ alignSelf: 'flex-start', justifyContent: 'center', height: scaleHeight(400), width: scaleWidth(350),marginTop: scaleHeight(10) }}>
                    <Plotly
                        data={tracesIs}
                        layout={layout}
                        config={{
                            displayModeBar: false,
                            scrollZoom: false,  // Disable scroll zoom
                            doubleClick: true, // Disable double click to autoscale
                            showTips: true,   // Disable hover tips
                        }}
                        style={{ flex: 1, }}
                        useContainerStyle={true}
                    />
                </View>
            </View>
        </View>
    )
}

