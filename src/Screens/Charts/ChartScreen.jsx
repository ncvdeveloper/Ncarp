import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Text
} from 'react-native';
import { COLORS } from '../../Constants/colors';
import { FONTS } from '../../Constants/fonts'
import { useDispatch, useSelector } from 'react-redux';
import {
  chartDataFromserver,
  shapesStyles,
  ChartsInfo, imageDataFromserver, imageInfo, labelDataFromserver, labelInfo, isDataFetched
} from '../../Redux/ReduxSlice/detailSlice';
import { Divider, Icon } from 'react-native-elements';
import CustomWorldMap from "../../Components/CustomWorldMap";
import { APIRequest } from "../../Utils/ApiRequest";
import LineChart from './LineChart/LineChart';
import BarChart from './BarChart/BarChart';
import ScatterChart from './ScatterChart/ScatterChart';
import AreaChart from './AreaChart/AreaChart';
import MixedChart from './MixedChart/MixedChart';
import HeatMapChart from './HeatMapChart/HeatMapChart';
import CustomHeader from '../../Components/CustomHeader';
import Analytics from './Analytics/Analytics';
import Images from './Images/Images';
import Label from './Label/Label';
import { scaleHeight, scaleWidth, normalizeFont } from '../../Constants/dynamicSize';
import Shapes from './Shapes/Shapes';
import DonutChart from './DonutChart/DonutChart';
import GaugeChart from './GaugeChart/GaugeChart';
import RadarChart from './RadarChart/RadarChart';
import WaterFallChart from './WaterFallChart/WaterFallChart';
import FunnelChart from './FunnelChart/FunnelChart';
import ShankeyChart from './ShankeyChart/ShankeyChart';
import BoxChart from './BoxChart/BoxChart';
import XYchart from './XYChart/XYchart';
import Events from '../Events/Events';
import Tables from '../../Components/Tables';

const ChartScreen = ({ navigation, route }) => {


  const [tableHead] = useState(['Per Ton', 'Specific Power', 'Specific Heat']);
  const [tableData] = useState([
    ['Cement', '113.2', '4.2',],
    ['Clinker', '172.1', '3.1',],
    ['OPC', '155.4', '1.9',],
    ['Pozzalona', '89.4', '3.9',],
    ['High Slag', '43.2', '2.1',]
  ]);
  const [chartData, setChartData] = useState({})
  const [chartName, setChartName] = useState("")
  const [loading, setLoading] = useState(false)
  const [showEnergyCon, setShowEnergyCon] = useState(false);
  const [showFootPrint, setShowFootPrint] = useState(false);
  const [showRawMat, setShowRawMat] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showOps, setShowOps] = useState(false);
  const [initialEnrLabelValue, setInitialEnrLableValue] = useState({ x: 0, y: 0, width: 350, height: 400 })
  const [initialRawLabelValue, setInitialRawLableValue] = useState({ x: 0, y: 0, width: 350, height: 400 })
  const [initialCarLabelValue, setInitialCarLableValue] = useState({ x: 0, y: 0, width: 350, height: 400 })
  const [initialMapValue, setInitialMapValue] = useState({ x: 0, y: 0, width: 350, height: 400 })
  const [initialOpsValue, setInitialOpsValue] = useState({ x: 0, y: 0, width: 350, height: 400 })
  const [labelData, setLabelData] = useState([]);


  const title = route?.params?.title
  const chartComponents = {
    LineChart,
    BarChart,
    ScatterChart,
    AreaChart,
    MixedChart,
    HeatMapChart,
    DonutChart,
    GaugeChart,
    RadarChart,
    WaterFallChart,
    FunnelChart,
    ShankeyChart,
    BoxChart,
    XYchart
  };

  const dispatch = useDispatch();
  const lineChartData = useSelector(state => state.detailSlice.chartDataFromserver);
  const pageSelected = useSelector(state => state.detailSlice.onPageClick);
  const shapesData = useSelector(state => state.detailSlice.shapesStyles);
  const userDetails = useSelector((state) => state.authSlice.userDetails);
  const chartsData = useSelector(state => state.detailSlice.chartDataFromserver.charsIs);
  const labelCompData = useSelector(state => state.detailSlice.labelInfo);
  const imageCompData = useSelector(state => state.detailSlice.imageInfo);
  const labelDataIs = useSelector((state) => state.detailSlice.labelDataFromserver)
  const imageDataIs = useSelector((state) => state.detailSlice.imageDataFromserver)

  useEffect(() => {
    dispatch(chartDataFromserver({}));
    dispatch(labelDataFromserver({}));
    dispatch(imageDataFromserver({}));
    dispatch(shapesStyles({}));
    ChartDataFromserver();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://54.158.153.190:8003/demo_app/api/data/';
        let response = await APIRequest.getGetTimebasedService(url);
        setLabelData(response.data);
      } catch (error) {
        //console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // const intervalId = setInterval(fetchData, 3000);
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (lineChartData["label-energy"]) {
      setShowEnergyCon(true);
      dispatch(isDataFetched(true));
      if (lineChartData.labelEnrDim) {
        setInitialEnrLableValue(lineChartData.labelEnrDim)
      }
    } else {
      setShowEnergyCon(false);
    }
    if (lineChartData["label-raw"]) {
      setShowRawMat(true);
      dispatch(isDataFetched(true));
      if (lineChartData.labelRawDim) {
        setInitialRawLableValue(lineChartData.labelRawDim)
      }
    } else {
      setShowRawMat(false);
    }
    if (lineChartData["label-carbon"]) {
      setShowFootPrint(true);
      dispatch(isDataFetched(true));
      if (lineChartData.labelCarDim) {
        setInitialCarLableValue(lineChartData.labelCarDim)
      }
    } else {
      setShowFootPrint(false);
    }
    if (lineChartData["label-map"]) {
      setShowMap(true);
      dispatch(isDataFetched(true));
      if (lineChartData.labelMapDim) {
        setInitialMapValue(lineChartData.labelMapDim)
      }
    } else {
      setShowMap(false);
    }
    if (lineChartData["label-ops"]) {
      setShowOps(true);
      dispatch(isDataFetched(true));
      if (lineChartData.labelOpsDim) {
        setInitialOpsValue(lineChartData.labelOpsDim)
      }
    } else {
      setShowOps(false);
    }
  }, [pageSelected, lineChartData]);



  const ChartDataFromserver = async () => {

    setLoading(true)
    const url = `http://sustainos.ai:9000/ncarp_lens_app/api/page_list/?project=Sustainability&id=11`
    let result = await APIRequest.getGetTimebasedService(url);
    setLoading(false)
    let data = result?.data
    const dataFromServer = data?.message[0]?.json?.chartInfo;
    const serverLabelData = data?.message[0]?.json?.labelData;
    const serverImageData = data?.message[0]?.json?.imageData;
    if (data?.message[0]?.json.charsIs !== undefined) {
      const charsIs = data?.message[0]?.json?.charsIs;
      dispatch(ChartsInfo(charsIs))
    }
    if (data?.message[0]?.json?.labelsIs !== undefined) {
      const labelsIs = data?.message[0]?.json?.labelsIs;
      dispatch(labelInfo(labelsIs))
    }
    if (data?.message[0]?.json?.imagesIs !== undefined) {
      const imagesIs = data?.message[0]?.json?.imagesIs;
      dispatch(imageInfo(imagesIs))
    }
    const shapesDataFromServer = data?.message[0]?.json?.shapesData
    dispatch(chartDataFromserver({ value: dataFromServer }));
    dispatch(labelDataFromserver({ value: serverLabelData }))
    dispatch(imageDataFromserver({ value: serverImageData }))
    dispatch(shapesStyles({ value: shapesDataFromServer }))

  };

  const chartNameFunc = (chartType) => {
    setChartData(chartType)
    setChartName(chartType.chartName)
  }
  const handleback = () => {
    navigation.navigate('SideTab')
  }

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(chartDataFromserver({}));
    ChartDataFromserver();
    setRefreshing(false);
  };

  const hellowdata = {"lineShape":{"0e15fb3b-79e4-435d-a709-2b86be46bc11":{"id":"0e15fb3b-79e4-435d-a709-2b86be46bc11","dataIs":{"angle":"0","width":904,"height":4,"SquareBg":"rgba(133, 174, 251, 1)","position":{"x":410,"y":304},"rotation":0,"borderRadius":"0","SquareOutlineBg":"#E01212"}},"2f0576aa-9d1b-4cae-afff-ac34c8f8700e":{"id":"2f0576aa-9d1b-4cae-afff-ac34c8f8700e","dataIs":{"angle":"0","width":948,"height":5,"SquareBg":"rgba(133, 174, 251, 1)","position":{"x":362,"y":146},"rotation":0,"borderRadius":"0","SquareOutlineBg":"#E01212"}},"c279f415-1d36-412b-9e39-fa5c8762362c":{"id":"c279f415-1d36-412b-9e39-fa5c8762362c","dataIs":{"angle":"0","width":43,"height":8,"SquareBg":"rgba(133, 174, 251, 1)","position":{"x":812,"y":119},"rotation":89.9778,"borderRadius":"0","SquareOutlineBg":"#E01212"}},"d605af92-f08d-4d34-b622-cfb311db7d16":{"id":"d605af92-f08d-4d34-b622-cfb311db7d16","dataIs":{"angle":"0","width":33,"height":6,"SquareBg":"rgba(133, 174, 251, 1)","position":{"x":1295,"y":286},"rotation":89.6577,"borderRadius":"0","SquareOutlineBg":"#E01212"}},"e2772ba8-4d47-4478-956a-21252c17c137":{"id":"e2772ba8-4d47-4478-956a-21252c17c137","dataIs":{"angle":"0","width":843,"height":5,"SquareBg":"rgba(133, 174, 251, 1)","position":{"x":361,"y":461},"rotation":0,"borderRadius":"0","SquareOutlineBg":"#E01212"}}},"arrowShape":{"0e9fb87c-4b24-4a0b-ae2a-2536695ae762":{"id":"0e9fb87c-4b24-4a0b-ae2a-2536695ae762","dataIs":{"angle":"0","width":53,"border":"2","height":6,"SquareBg":"rgba(59, 181, 220, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","position":{"x":-478,"y":-81},"rotation":90.7483,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"rgba(59, 181, 220, 1)","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"23c5edb9-8beb-45ce-bb2b-7f02a191c6ed":{"id":"23c5edb9-8beb-45ce-bb2b-7f02a191c6ed","dataIs":{"angle":"0","width":50,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":343,"y":162},"rotation":88.7096,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"3388931e-b6f5-4598-a284-df48755f9954":{"id":"3388931e-b6f5-4598-a284-df48755f9954","dataIs":{"angle":"0","width":41,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":625,"y":474},"rotation":91.08,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"3b33d55c-43bb-4d30-904a-29fc45d081d2":{"id":"3b33d55c-43bb-4d30-904a-29fc45d081d2","dataIs":{"angle":"0","width":53,"border":"2","height":6,"SquareBg":"rgba(59, 180, 219, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","position":{"x":-796,"y":-81},"rotation":90,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"rgba(59, 180, 219, 1)","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"3d6668b0-c2bb-4e0a-abdf-dee67cb7b4b6":{"id":"3d6668b0-c2bb-4e0a-abdf-dee67cb7b4b6","dataIs":{"angle":"0","width":33,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":934,"y":471},"rotation":89.0047,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"4c72d67a-17d2-461a-ab38-23705763442a":{"id":"4c72d67a-17d2-461a-ab38-23705763442a","dataIs":{"angle":"0","width":40,"border":"2","height":17,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":1288,"y":158},"rotation":90.6039,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"7cee9c8b-59bd-4efa-86a3-c09527234afc":{"id":"7cee9c8b-59bd-4efa-86a3-c09527234afc","dataIs":{"angle":"0","width":45,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":922,"y":317},"rotation":89.6645,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"8fbec75e-b22e-47c0-8888-62213a4afc5e":{"id":"8fbec75e-b22e-47c0-8888-62213a4afc5e","dataIs":{"angle":"0","width":48,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":338,"y":474},"rotation":89.636,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"a918d88b-6328-492d-ab90-4ffc7de2c5c1":{"id":"a918d88b-6328-492d-ab90-4ffc7de2c5c1","dataIs":{"angle":"0","width":43,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":1000,"y":162},"rotation":89.6033,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"b7c235b6-2896-4c5e-aec8-4e3cb9acaf2c":{"id":"b7c235b6-2896-4c5e-aec8-4e3cb9acaf2c","dataIs":{"angle":"0","width":41,"border":"2","height":6,"SquareBg":"rgba(59, 180, 219, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","position":{"x":-693,"y":103},"rotation":90.8419,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"rgba(59, 180, 219, 1)","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"bcd6339d-7c75-4556-9153-0397b1d22a11":{"id":"bcd6339d-7c75-4556-9153-0397b1d22a11","dataIs":{"angle":"0","width":65,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":1170,"y":455},"rotation":89.7514,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"d382cd34-07ed-4e77-ab13-1bf515b1a181":{"id":"d382cd34-07ed-4e77-ab13-1bf515b1a181","dataIs":{"angle":"0","width":44,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":1177,"y":317},"rotation":89.8548,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"d7131acf-86f4-4c10-8756-a6e34171b86b":{"id":"d7131acf-86f4-4c10-8756-a6e34171b86b","dataIs":{"angle":"0","width":52,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":386,"y":321},"rotation":90.6066,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"ef948efd-fd73-40a0-8c59-c6375316d1c5":{"id":"ef948efd-fd73-40a0-8c59-c6375316d1c5","dataIs":{"angle":"0","width":43,"border":"2","height":4,"SquareBg":"rgba(59, 181, 220, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","position":{"x":-443,"y":104},"rotation":90.8025,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"rgba(59, 181, 220, 1)","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"fcd13137-6648-41bf-bbac-31104784ba11":{"id":"fcd13137-6648-41bf-bbac-31104784ba11","dataIs":{"angle":"0","width":46,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":625,"y":319},"rotation":89.5881,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}},"fcd7409b-48bc-49e5-b47b-a641b82de728":{"id":"fcd7409b-48bc-49e5-b47b-a641b82de728","dataIs":{"angle":"0","width":43,"border":"2","height":20,"SquareBg":"rgba(133, 174, 251, 1)","clipPath":"polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)","position":{"x":665,"y":162},"rotation":89.0814,"borderStyle":"solid","borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"0","borderTopRightRadius":"0"}}},"circleShape":{},"squareShape":{"034b2bd0-1add-414c-81b5-5115ecb67a0a":{"id":"034b2bd0-1add-414c-81b5-5115ecb67a0a","dataIs":{"bold":true,"angle":"0","width":212,"border":"2px solid","height":87,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":544,"y":352},"rotation":0,"fontColor":"rgba(35, 32, 32, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"WET POZZOLANA","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"0e973e01-f3f2-47fd-a411-8db70fdc32e2":{"id":"0e973e01-f3f2-47fd-a411-8db70fdc32e2","dataIs":{"bold":true,"angle":"0","width":229,"border":"2px solid","height":91,"isBold":false,"SquareBg":"rgba(254, 51, 0, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":1083,"y":498},"rotation":0,"textAlign":"center","fontFamily":"Open Sans","squareText":"INSUFFICEINT MILL GRINDING","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"332d24da-e037-4e16-9d98-bbd3b27dbc37":{"id":"332d24da-e037-4e16-9d98-bbd3b27dbc37","dataIs":{"bold":true,"angle":"0","width":216,"border":"2px solid","height":83,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":537,"y":505},"rotation":0,"fontColor":"rgba(31, 28, 28, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"MILL AIRFLOW INSUFFICIENT","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"3ad8533e-0632-487a-ac63-11928f413c2f":{"id":"3ad8533e-0632-487a-ac63-11928f413c2f","dataIs":{"bold":true,"angle":"0","width":253,"border":"2px solid","height":87,"isBold":false,"SquareBg":"rgba(254, 51, 0, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":1178,"y":185},"rotation":0,"textAlign":"center","fontFamily":"Open Sans","squareText":"LOW CONSUMPTION OF POZZOLANA","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"400482a3-f0bf-4b15-8b19-d8f2b21c1d03":{"id":"400482a3-f0bf-4b15-8b19-d8f2b21c1d03","dataIs":{"bold":true,"angle":"0","width":237,"border":"2px solid","height":86,"isBold":false,"SquareBg":"rgba(254, 51, 0, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":1078,"y":347},"rotation":0,"textAlign":"center","fontFamily":"Open Sans","squareText":"INSUFFICIENT CEMENT FINENESS","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"42b79394-27be-4721-80ad-4ad22aac015e":{"id":"42b79394-27be-4721-80ad-4ad22aac015e","dataIs":{"bold":true,"angle":"0","width":200,"border":"2px solid","height":79,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":262,"y":509},"rotation":0,"fontColor":"rgba(49, 47, 47, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"MILL WEAR","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"492f33ab-b086-47dd-8619-964db9fda085":{"id":"492f33ab-b086-47dd-8619-964db9fda085","dataIs":{"bold":true,"angle":"0","width":245,"border":"2px solid","height":76,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":566,"y":194},"rotation":0,"fontColor":"rgba(7, 7, 7, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"HIGH CARBON FUEL","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"5efb8efd-6f52-4459-b25a-aae1828e2032":{"id":"5efb8efd-6f52-4459-b25a-aae1828e2032","dataIs":{"bold":true,"angle":"0","width":221,"border":"2px solid","height":94,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":840,"y":496},"rotation":0,"fontColor":"rgba(39, 36, 36, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"SEPERATOR MALFUNCTION","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"6292ab60-7210-4965-b915-163c06d9fb7d":{"id":"6292ab60-7210-4965-b915-163c06d9fb7d","dataIs":{"bold":true,"angle":"0","width":193,"border":"2px solid","height":82,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":317,"y":358},"rotation":0,"fontColor":"rgba(32, 30, 30, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"LOW REACTIVE POZZOLANA","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"871e6ae0-b1f9-4e33-8775-4b58682714e8":{"id":"871e6ae0-b1f9-4e33-8775-4b58682714e8","dataIs":{"bold":true,"angle":"0","width":273,"border":"2px solid","height":82,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":889,"y":191},"rotation":0,"fontColor":"rgba(25, 21, 21, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"HIGH SPECIFIC POWER CONSUMPTION","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"9d92824f-6124-4470-813c-d4efce05ab07":{"id":"9d92824f-6124-4470-813c-d4efce05ab07","dataIs":{"bold":true,"angle":"0","width":200,"border":"2px solid","height":72,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":267,"y":194},"rotation":0,"fontColor":"rgba(7, 7, 7, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"HIGH LSF / CAO","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(247, 246, 245, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"b58d4df9-6145-4ca8-9510-9c405d0f4d7f":{"id":"b58d4df9-6145-4ca8-9510-9c405d0f4d7f","dataIs":{"bold":true,"angle":"0","width":225,"border":"2px solid","height":87,"isBold":false,"SquareBg":"rgba(29, 255, 51, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":835,"y":348},"rotation":0,"fontColor":"rgba(32, 28, 28, 1)","textAlign":"center","fontFamily":"Open Sans","squareText":"HIGH QUALITY CEMENT DEMAND","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"rgba(255, 255, 255, 1)","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}},"bcb48b04-c9e3-4f27-86ca-1c3e9949404d":{"id":"bcb48b04-c9e3-4f27-86ca-1c3e9949404d","dataIs":{"bold":true,"angle":"0","width":698,"border":"2px solid","height":69,"isBold":false,"SquareBg":"rgba(254, 51, 0, 1)","clipPath":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","fontSize":"20","isItalic":false,"position":{"x":513,"y":29},"rotation":0,"textAlign":"center","fontFamily":"Open Sans","squareText":"CARBON FOOTPRINT ON HIGHER SIDE - CEMENT SCOPE 1","borderStyle":"solid","isUnderLine":false,"borderRadius":"0","SquareOutlineBg":"#E01212","borderTopLeftRadius":"15px","borderTopRightRadius":"15px"}}},"triangleShape":{}}
  const [refreshing, setRefreshing] = useState(false);
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.HEADER} />
      <View style={{ flex: 1,backgroundColor: COLORS.BACKGROUND }}>
        <CustomHeader title={title} navigation={navigation} icon={'menu'}/>
        {loading ?
          <View style={styles.loading}>
            <ActivityIndicator size={scaleHeight(30)} color={COLORS.HEADER} />
          </View> :

          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {
              showMap &&
              <View style={styles.mapBox}>
                <Text style={styles.boxtitle}>Location-Wise Emissions (Kg/T of Clinker)</Text>
                <Divider style={styles.divider} />
                <View style={styles.mapcontainer}>
                  <CustomWorldMap />
                </View>
              </View>
            }
            {
              showEnergyCon &&
              <View style={styles.box}>
                <Text style={styles.boxtitle}>Energy Consumption (for the day)</Text>
                <Tables tableData={tableData} tableHead={tableHead} />
              </View>
            }
            {title === 'Events' &&
              <Events />
            }
            {title === 'Analytics' &&
              <Analytics checkTheCond={lineChartData} chartNameFunc={chartNameFunc} page='analytics' />
            }

            {(chartName !== "" && title === 'Analytics') && (
              (() => {
                const ChartComponent = chartComponents[chartName];
                return <ChartComponent chartList={chartData} checkTheCond={lineChartData} page='analytics' />;
              })()
            )}

            {chartsData !== undefined &&
              chartsData.map((chartName) => {
                const ChartComponent = chartComponents[chartName.type];
                if (!ChartComponent) {
                  return null;
                }
                return <ChartComponent key={chartName.id} chartList={chartData} chartId={chartName.id} checkTheCond={lineChartData} page='' showtitle={true}/>;
              })}
            {imageCompData !== undefined && imageCompData.map((imageName) => {
              return <Images key={imageName.id} imageId={imageName.id} imageDataIs={imageDataIs} />;
            })}

            {labelCompData !== undefined && labelCompData.map((labelName) => {
              return <Label key={labelName.id} labelId={labelName.id} labelDataIs={labelDataIs} />;
            })}
            
            
            {/* <Shapes data={hellowdata} /> */}



          </ScrollView>

        }
      </View>
    </SafeAreaView>
  )
};
export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: COLORS.HEADER
  },
  loading: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '50%'
  },
  box: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    marginTop: scaleHeight(20),
    borderRadius: scaleHeight(2)
  },
  boxtitle: {
    textAlign: 'left',
    width: '100%',
    fontSize: normalizeFont(18),
    fontWeight: '600',
    color: COLORS.BGCOLOR,
    marginLeft: scaleWidth(15),
    fontFamily: FONTS.NUNITOSANSMEDIUM,
    marginVertical: scaleHeight(10),
  },
  mapBox: {
    width: scaleWidth(340),
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: scaleHeight(20),
    borderRadius: scaleWidth(5),
    flex: 1
  },
  mapcontainer: {
    alignItems: 'center',
    height: scaleHeight(200),
    marginVertical: scaleHeight(20),
    justifyContent: 'center',
  },
  divider: {
    height: scaleHeight(0.4),
    backgroundColor: COLORS.ASH,
    width: '100%'
  },
})