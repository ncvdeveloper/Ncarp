import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    BackHandler,
    Alert,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Animated,
} from 'react-native';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { IMAGES } from '../../Constants/images';
import { Divider, Icon } from 'react-native-elements';
import { FONTS } from '../../Constants/fonts';
import HomeLineChart from '../Charts/HomeLineChart';
import Tables from '../../Components/Tables';
import HeatmapChart from '../../Components/HeatmapChart';
import HomeBarChart from '../Charts/HomeBarChart';
import SanKeyChart from '../../Components/SankeyChart';
import WorldMap from "../../Components/WorldMap";
import CustomWorldMap from "../../Components/CustomWorldMap";
import CustomHeader from '../../Components/CustomHeader';

const HomeScreen = ({ navigation, route }) => {


    const [tableHead] = useState(['Per Ton', 'Specific Power', 'Specific Heat']);
    const [tableData] = useState([
        ['Cement', '113.2', '4.2',],
        ['Clinker', '172.1', '3.1',],
        ['OPC', '155.4', '1.9',],
        ['Pozzalona', '89.4', '3.9',],
        ['High Slag', '43.2', '2.1',]
    ]);
    const data = [
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs'],
            y: [200, 360, 380, 410, 380],
            type: 'lines',
            mode: 'lines',
            name: 'Scope 1',
            marker: {
                color: COLORS.BLUE,
            },
        },
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs'],
            y: [990, 830, 810, 900, 820],
            type: 'lines',
            mode: 'lines',
            name: 'Predicted',
            marker: {
                color: COLORS.PINK,
            },
        },
    ];
    const data1 = [
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs'],
            y: [220, 340, 360, 400, 360],
            type: 'lines',
            mode: 'lines',
            name: 'Scope 1',
            marker: {
                color: COLORS.BLUE,
            },
        },
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs'],
            y: [980, 820, 820, 920, 840],
            type: 'lines',
            mode: 'lines',
            name: 'Predicted',
            marker: {
                color: COLORS.PINK,
            },
        },
    ];
    const Bardata = [
        {
            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            y: [50, 10, 30, 40, 20, 10, 5],
            type: 'bar',
            mode: 'bar',
            name: 'bar',
        },
    ];
    const Bardata1 = [
        {
            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            y: [50, 15, 30, 40, 25, 10, 5],
            type: 'bar',
            mode: 'bar',
            name: 'bar',
        },
    ];
    const Bardata2 = [
        {
            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            y: [55, 10, 30, 40, 30, 10, 5],
            type: 'bar',
            mode: 'bar',
            name: 'bar',
        },
    ];
    const coloredData = Bardata.map(trace => ({
        ...trace,
        marker: {
            color: '#9747FF',
        },
    }));
    const coloredData1 = Bardata1.map(trace => ({
        ...trace,
        marker: {
            color: '#6E5C58',
        },
    }));
    const coloredData2 = Bardata2.map(trace => ({
        ...trace,
        marker: {
            color: '#0019FF',
        },
    }));
    const Bar = [
        { name: 'Scope 1 Emission (for the week)', data: coloredData, co2: '3,675', image: IMAGES.Emission1 },
        { name: 'Scope 2 Emission (for the week)', data: coloredData1, co2: '23,465', image: IMAGES.Emission2 },
        { name: 'Scope 3 Emission (for the week)', data: coloredData2, co2: '10,675', image: IMAGES.Emission3 }
    ]
    const HeatMap = [
        { id: 1, data: [{ "value": 0.30515289575252624, "x": 0, "y": 0 }, { "value": 0.8659308006834725, "x": 0, "y": 1 }, { "value": 0.41624768133190343, "x": 0, "y": 2 }, { "value": 0.37051489596854, "x": 1, "y": 0 }, { "value": 0.7618612230980136, "x": 1, "y": 1 }, { "value": 0.5712833543986405, "x": 1, "y": 2 }, { "value": 0.49711218309263516, "x": 2, "y": 0 }, { "value": 0.9078549169552986, "x": 2, "y": 1 }, { "value": 0.9465720616084711, "x": 2, "y": 2 }, { "value": 0.8872736197684579, "x": 3, "y": 0 }, { "value": 0.7593281716590453, "x": 3, "y": 1 }, { "value": 0.6630993605853828, "x": 3, "y": 2 }, { "value": 0.2241522571619297, "x": 4, "y": 0 }, { "value": 0.9220187826536828, "x": 4, "y": 1 }, { "value": 0.8914613242035642, "x": 4, "y": 2 }, { "value": 0.870351687758355, "x": 5, "y": 0 }, { "value": 0.9513420451660596, "x": 5, "y": 1 }, { "value": 0.4638094236885502, "x": 5, "y": 2 }, { "value": 0.10320923558953972, "x": 6, "y": 0 }, { "value": 0.4429002925282436, "x": 6, "y": 1 }, { "value": 0.6262166944763, "x": 6, "y": 2 }, { "value": 0.7222733099714893, "x": 7, "y": 0 }, { "value": 0.2669489902392251, "x": 7, "y": 1 }, { "value": 0.30976661970570607, "x": 7, "y": 2 }, { "value": 0.52866977071475, "x": 8, "y": 0 }, { "value": 0.22193697135074528, "x": 8, "y": 1 }, { "value": 0.9020329578423957, "x": 8, "y": 2 }, { "value": 0.4791437536437041, "x": 9, "y": 0 }, { "value": 0.6157404603341706, "x": 9, "y": 1 }, { "value": 0.6263048209531057, "x": 9, "y": 2 }, { "value": 0.11327371494218656, "x": 10, "y": 0 }, { "value": 0.7011354915973623, "x": 10, "y": 1 }, { "value": 0.09908473431573822, "x": 10, "y": 2 }, { "value": 0.6161341244128938, "x": 11, "y": 0 }, { "value": 0.9533888871395426, "x": 11, "y": 1 }, { "value": 0.6959665745621995, "x": 11, "y": 2 }], item: 'Plant 1' },
        { id: 2, data: [{ "value": 0.9682703562728443, "x": 0, "y": 0 }, { "value": 0.2163488160870345, "x": 0, "y": 1 }, { "value": 0.37699510395885477, "x": 0, "y": 2 }, { "value": 0.3137173338598122, "x": 1, "y": 0 }, { "value": 0.8202533438289185, "x": 1, "y": 1 }, { "value": 0.1081038902818047, "x": 1, "y": 2 }, { "value": 0.7570452833534164, "x": 2, "y": 0 }, { "value": 0.057309129483760386, "x": 2, "y": 1 }, { "value": 0.1446852798845496, "x": 2, "y": 2 }, { "value": 0.4547826815455787, "x": 3, "y": 0 }, { "value": 0.6986690802556318, "x": 3, "y": 1 }, { "value": 0.09966521600936162, "x": 3, "y": 2 }, { "value": 0.9414251683384656, "x": 4, "y": 0 }, { "value": 0.28110903319739694, "x": 4, "y": 1 }, { "value": 0.2232808628402219, "x": 4, "y": 2 }, { "value": 0.2747743276600199, "x": 5, "y": 0 }, { "value": 0.2506139232464099, "x": 5, "y": 1 }, { "value": 0.4518843955772279, "x": 5, "y": 2 }, { "value": 0.8644861288557923, "x": 6, "y": 0 }, { "value": 0.8957004325470466, "x": 6, "y": 1 }, { "value": 0.6284037039672842, "x": 6, "y": 2 }, { "value": 0.3168497948483071, "x": 7, "y": 0 }, { "value": 0.36768871657169644, "x": 7, "y": 1 }, { "value": 0.03236324236111882, "x": 7, "y": 2 }, { "value": 0.5903511268025172, "x": 8, "y": 0 }, { "value": 0.2658784679933467, "x": 8, "y": 1 }, { "value": 0.7464896294812232, "x": 8, "y": 2 }, { "value": 0.5070743206027215, "x": 9, "y": 0 }, { "value": 0.9044822583876025, "x": 9, "y": 1 }, { "value": 0.8761870456000085, "x": 9, "y": 2 }, { "value": 0.14246200710060028, "x": 10, "y": 0 }, { "value": 0.9582291481550842, "x": 10, "y": 1 }, { "value": 0.3697271144104414, "x": 10, "y": 2 }, { "value": 0.2860876250405395, "x": 11, "y": 0 }, { "value": 0.976513764210413, "x": 11, "y": 1 }, { "value": 0.20500469426899476, "x": 11, "y": 2 }], item: 'Plant 2' },
        { id: 3, data: [{ "value": 0.013156659346037356, "x": 0, "y": 0 }, { "value": 0.24372231195333996, "x": 0, "y": 1 }, { "value": 0.34682654701796756, "x": 0, "y": 2 }, { "value": 0.9928343732142441, "x": 1, "y": 0 }, { "value": 0.9754059114767362, "x": 1, "y": 1 }, { "value": 0.9304096678642418, "x": 1, "y": 2 }, { "value": 0.08192319048983371, "x": 2, "y": 0 }, { "value": 0.25601937669625946, "x": 2, "y": 1 }, { "value": 0.5805332509206628, "x": 2, "y": 2 }, { "value": 0.23696333048608353, "x": 3, "y": 0 }, { "value": 0.09890129727065793, "x": 3, "y": 1 }, { "value": 0.9535079281644645, "x": 3, "y": 2 }, { "value": 0.30623316690030805, "x": 4, "y": 0 }, { "value": 0.5835306096581084, "x": 4, "y": 1 }, { "value": 0.31992870301283965, "x": 4, "y": 2 }, { "value": 0.8433427917608574, "x": 5, "y": 0 }, { "value": 0.09331382633490767, "x": 5, "y": 1 }, { "value": 0.34113786603975327, "x": 5, "y": 2 }, { "value": 0.9177727703477647, "x": 6, "y": 0 }, { "value": 0.4423183061620381, "x": 6, "y": 1 }, { "value": 0.4760500188446842, "x": 6, "y": 2 }, { "value": 0.706905656412374, "x": 7, "y": 0 }, { "value": 0.6622921593336027, "x": 7, "y": 1 }, { "value": 0.6401520286617493, "x": 7, "y": 2 }, { "value": 0.4621613210546295, "x": 8, "y": 0 }, { "value": 0.9667993662519018, "x": 8, "y": 1 }, { "value": 0.8318408755752578, "x": 8, "y": 2 }, { "value": 0.5487261702717993, "x": 9, "y": 0 }, { "value": 0.9821818305763049, "x": 9, "y": 1 }, { "value": 0.9785751643852713, "x": 9, "y": 2 }, { "value": 0.8066194185125544, "x": 10, "y": 0 }, { "value": 0.3215729850200393, "x": 10, "y": 1 }, { "value": 0.28850743930162054, "x": 10, "y": 2 }, { "value": 0.03384484053137414, "x": 11, "y": 0 }, { "value": 0.014050556231480056, "x": 11, "y": 1 }, { "value": 0.9990391774254311, "x": 11, "y": 2 }], item: 'Plant 3' },
        { id: 4, data: [{ "value": 0.2110273344638678, "x": 0, "y": 0 }, { "value": 0.9798353959154973, "x": 0, "y": 1 }, { "value": 0.4196125671610285, "x": 0, "y": 2 }, { "value": 0.9942263598119285, "x": 1, "y": 0 }, { "value": 0.8396246172393957, "x": 1, "y": 1 }, { "value": 0.8810212827669168, "x": 1, "y": 2 }, { "value": 0.8364604271255677, "x": 2, "y": 0 }, { "value": 0.3925661708071811, "x": 2, "y": 1 }, { "value": 0.30300371775759133, "x": 2, "y": 2 }, { "value": 0.47758763108758173, "x": 3, "y": 0 }, { "value": 0.5988801069698788, "x": 3, "y": 1 }, { "value": 0.4243609799958581, "x": 3, "y": 2 }, { "value": 0.6976529395785984, "x": 4, "y": 0 }, { "value": 0.9659289993983246, "x": 4, "y": 1 }, { "value": 0.8512116801278409, "x": 4, "y": 2 }, { "value": 0.6939672749615001, "x": 5, "y": 0 }, { "value": 0.2090409588592125, "x": 5, "y": 1 }, { "value": 0.2962319758760723, "x": 5, "y": 2 }, { "value": 0.17049095162874617, "x": 6, "y": 0 }, { "value": 0.6273392448310805, "x": 6, "y": 1 }, { "value": 0.8760606530331074, "x": 6, "y": 2 }, { "value": 0.12492078662552887, "x": 7, "y": 0 }, { "value": 0.4757377062937147, "x": 7, "y": 1 }, { "value": 0.6337194068367918, "x": 7, "y": 2 }, { "value": 0.4613156324215789, "x": 8, "y": 0 }, { "value": 0.36584497843803304, "x": 8, "y": 1 }, { "value": 0.8083218630960249, "x": 8, "y": 2 }, { "value": 0.5747330019502472, "x": 9, "y": 0 }, { "value": 0.15237899042735498, "x": 9, "y": 1 }, { "value": 0.5283279430786617, "x": 9, "y": 2 }, { "value": 0.5370266605132228, "x": 10, "y": 0 }, { "value": 0.7034815671950962, "x": 10, "y": 1 }, { "value": 0.09802904164175341, "x": 10, "y": 2 }, { "value": 0.9962325580196164, "x": 11, "y": 0 }, { "value": 0.18452317663972873, "x": 11, "y": 1 }, { "value": 0.23898543910879902, "x": 11, "y": 2 }], item: 'Plant 4' },
        { id: 5, data: [{ "value": 0.9175546410965058, "x": 0, "y": 0 }, { "value": 0.7771984710518632, "x": 0, "y": 1 }, { "value": 0.8971409117531388, "x": 0, "y": 2 }, { "value": 0.5167788653273638, "x": 1, "y": 0 }, { "value": 0.991022200982386, "x": 1, "y": 1 }, { "value": 0.8459946216664479, "x": 1, "y": 2 }, { "value": 0.5684306459237044, "x": 2, "y": 0 }, { "value": 0.4689864980306905, "x": 2, "y": 1 }, { "value": 0.8324677097202176, "x": 2, "y": 2 }, { "value": 0.08903740543261376, "x": 3, "y": 0 }, { "value": 0.1880333294629509, "x": 3, "y": 1 }, { "value": 0.4154668074975617, "x": 3, "y": 2 }, { "value": 0.26609189274276096, "x": 4, "y": 0 }, { "value": 0.32877576778610246, "x": 4, "y": 1 }, { "value": 0.13725113571136838, "x": 4, "y": 2 }, { "value": 0.6588442887027154, "x": 5, "y": 0 }, { "value": 0.46871115267746355, "x": 5, "y": 1 }, { "value": 0.2303216138932409, "x": 5, "y": 2 }, { "value": 0.23251405606030773, "x": 6, "y": 0 }, { "value": 0.8156422489868862, "x": 6, "y": 1 }, { "value": 0.45354033576979774, "x": 6, "y": 2 }, { "value": 0.09701508332023905, "x": 7, "y": 0 }, { "value": 0.32455302666136726, "x": 7, "y": 1 }, { "value": 0.18475406377980155, "x": 7, "y": 2 }, { "value": 0.5381144584806864, "x": 8, "y": 0 }, { "value": 0.9706217806154271, "x": 8, "y": 1 }, { "value": 0.8980039859562989, "x": 8, "y": 2 }, { "value": 0.8042220245855081, "x": 9, "y": 0 }, { "value": 0.321570819823296, "x": 9, "y": 1 }, { "value": 0.8876189223119445, "x": 9, "y": 2 }, { "value": 0.04140644023930751, "x": 10, "y": 0 }, { "value": 0.9566115646825711, "x": 10, "y": 1 }, { "value": 0.2600341085888872, "x": 10, "y": 2 }, { "value": 0.8781277234026763, "x": 11, "y": 0 }, { "value": 0.16666873052561385, "x": 11, "y": 1 }, { "value": 0.934674978319396, "x": 11, "y": 2 }], item: 'Plant 5' },
        { id: 6, data: [{ "value": 0.530856062079587, "x": 0, "y": 0 }, { "value": 0.6964768773624307, "x": 0, "y": 1 }, { "value": 0.1381834339870603, "x": 0, "y": 2 }, { "value": 0.7001122206695245, "x": 1, "y": 0 }, { "value": 0.9484872324457296, "x": 1, "y": 1 }, { "value": 0.17404605903443324, "x": 1, "y": 2 }, { "value": 0.8364609251964122, "x": 2, "y": 0 }, { "value": 0.3772867543436069, "x": 2, "y": 1 }, { "value": 0.32707018808603994, "x": 2, "y": 2 }, { "value": 0.4456434850098337, "x": 3, "y": 0 }, { "value": 0.4678554668055792, "x": 3, "y": 1 }, { "value": 0.9826841167251597, "x": 3, "y": 2 }, { "value": 0.31487623638228146, "x": 4, "y": 0 }, { "value": 0.20224797110786405, "x": 4, "y": 1 }, { "value": 0.3836431249413214, "x": 4, "y": 2 }, { "value": 0.4344335290166311, "x": 5, "y": 0 }, { "value": 0.48319934564981226, "x": 5, "y": 1 }, { "value": 0.17061747697035237, "x": 5, "y": 2 }, { "value": 0.8791284713123435, "x": 6, "y": 0 }, { "value": 0.4677660606549838, "x": 6, "y": 1 }, { "value": 0.9225134651086031, "x": 6, "y": 2 }, { "value": 0.7329003327122259, "x": 7, "y": 0 }, { "value": 0.14543687790763823, "x": 7, "y": 1 }, { "value": 0.5691280339480331, "x": 7, "y": 2 }, { "value": 0.530764810946238, "x": 8, "y": 0 }, { "value": 0.7377427192515119, "x": 8, "y": 1 }, { "value": 0.9923277579077753, "x": 8, "y": 2 }, { "value": 0.09242515165267486, "x": 9, "y": 0 }, { "value": 0.2247381452023878, "x": 9, "y": 1 }, { "value": 0.4740443822383429, "x": 9, "y": 2 }, { "value": 0.8261083146783504, "x": 10, "y": 0 }, { "value": 0.695916878276636, "x": 10, "y": 1 }, { "value": 0.13523286482044597, "x": 10, "y": 2 }, { "value": 0.6776367859825945, "x": 11, "y": 0 }, { "value": 0.3051662644444115, "x": 11, "y": 1 }, { "value": 0.06251326101170318, "x": 11, "y": 2 }], item: 'Plant 6' },
    ]
    const LineChart = [
        { id: 1, item: 'Scope 1 Actual Vs Predicted' },
        { id: 2, item: 'Scope 2 Actual Vs Predicted' },
        { id: 3, item: 'Scope 3 Actual Vs Predicted' },
    ]
    const sankeyChart = [
        { from: "Emission", to: "Scope1", value: 6 },
        { from: "Emission", to: "Scope2", value: 16 },
        { from: "Emission", to: "Scope3", value: 15 },
        { from: "Scope1", to: "Plants", value: 2 },
        { from: "Scope1", to: "Plants", value: 2 },
        { from: "Scope1", to: "Plants", value: 2 },
        { from: "Scope2", to: "WHRB", value: 4 },
        { from: "Scope2", to: "WHRB", value: 4 },
        { from: "Scope2", to: "WHRB", value: 4 },
        { from: "Scope2", to: "WHRB", value: 4 },
        { from: "WHRB", to: "Process4", value: 4 },
        { from: "WHRB", to: "Process5", value: 4 },
        { from: "WHRB", to: "Process6", value: 4 },
        { from: "WHRB", to: "Process7", value: 4 },
        { from: "Scope3", to: "Categories", value: 3 },
        { from: "Scope3", to: "Categories", value: 3 },
        { from: "Scope3", to: "Categories", value: 3 },
        { from: "Scope3", to: "Categories", value: 3 },
        { from: "Scope3", to: "Categories", value: 3 },
        { from: "Plants", to: "Process1", value: 2 },
        { from: "Plants", to: "Process2", value: 2 },
        { from: "Plants", to: "Process3", value: 2 },
        { from: "Categories", to: "Process8", value: 3 },
        { from: "Categories", to: "Process9", value: 3 },
        { from: "Categories", to: "Process10", value: 3 },
        { from: "Categories", to: "Process11", value: 3 },
        { from: "Categories", to: "Process12", value: 3 },
    ];
    const sankey = [
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

    return (
        <>
            <StatusBar backgroundColor={COLORS.HEADER} />
            <View style={styles.container}>
               
                <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                    {/* Map */}
                    <View style={styles.mapBox}>
                        <Text style={styles.boxtitle}>Location-Wise Emissions (Kg/T of Clinker)</Text>
                        <Divider style={styles.divider} />
                        <View style={styles.mapcontainer}>
                            <CustomWorldMap />
                        </View>
                    </View>
                    {/* Line graph */}
                    {LineChart.map((item) => {
                        return (
                            <View style={styles.box}>
                                <Text style={styles.boxtitle}>{item.item}</Text>
                                <Divider style={styles.divider} />
                                <View style={styles.line}>
                                    <HomeLineChart data={data} />
                                </View>
                            </View>)
                    })}
                    {/* Bar graph */}
                    {Bar.map((item) => {
                        return (
                            <View style={styles.heatmapbox}>
                                <Text style={styles.boxtitle}>{item.name}</Text>
                                <Divider style={styles.divider} />
                                <View style={styles.row}>
                                    <Text style={styles.co2text}>{item.co2}</Text>
                                    <View style={styles.co2image}>
                                        <Image source={item.image} style={styles.icon} resizeMode='contain' />
                                    </View>
                                </View>
                                <View style={styles.homebar}>
                                    <HomeBarChart data={item.data} />
                                </View>
                            </View>)
                    })}
                    {/* Tables */}
                    <View style={styles.box}>
                        <Text style={styles.boxtitle}>Energy Consumption (for the day)</Text>
                        <Tables tableData={tableData} tableHead={tableHead} />
                    </View>
                    {/* HeatMap */}
                    <View style={styles.heatmapbox}>
                        <Text style={styles.boxtitle}>Section Wise Emission</Text>
                        {HeatMap.map((item) => {
                            return (
                                <View key={item.id}>
                                    <Divider style={styles.divider1} />
                                    <Text style={styles.boxtitle1}>{item.item}</Text>
                                    <View style={styles.height}>
                                        <HeatmapChart data={item.data} />
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {/* Sankey */}
                    <View style={[styles.heatmapbox, { marginBottom: scaleHeight(50) }]}>
                        <Text style={styles.boxtitle}>Emission Distributions</Text>
                        <Divider style={styles.divider1} />
                        <View style={{ height: scaleHeight(300), marginLeft: scaleHeight(15), marginTop: scaleHeight(40) }}>
                            <SanKeyChart data={sankey} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: scaleHeight(10)
    },
    boxtitle: {
        fontSize: normalizeFont(16),
        fontWeight: '700',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BGCOLOR,
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: scaleHeight(10),
    },
    boxtitle1: {
        fontSize: normalizeFont(16),
        fontWeight: '600',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: scaleHeight(10),
    },
    vIconStyle: {
        height: scaleHeight(300),
        width: scaleWidth(300),
    },
    divider: {
        height: scaleHeight(0.4),
        backgroundColor: COLORS.ASH,
        width: '100%'
    },
    divider1: {
        height: scaleHeight(0.4),
        backgroundColor: COLORS.GREY,
        width: '100%'
    },
    box: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        marginTop: scaleHeight(20),
        borderRadius: scaleHeight(2)
    },
    heatmapbox: {
        backgroundColor: COLORS.WHITE,
        marginTop: scaleHeight(20),
        borderRadius: scaleHeight(2),
        width: '90%',
        alignSelf: 'center',
        borderRadius: scaleHeight(2)
    },
    height: {
        height: scaleHeight(90),
        marginLeft: scaleWidth(5)
    },
    homebar: {
    },
    icon: {
        height: scaleHeight(30),
        width: scaleWidth(80),
    },
    co2text: {
        fontSize: normalizeFont(20),
        fontWeight: '700',
        fontFamily: FONTS.NUNITOSANSBOLD,
        color: COLORS.BLACKK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: scaleHeight(10),
    },
    co2image: {
        height: scaleHeight(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        marginLeft: scaleWidth(10)
    },
    mapcontainer: {
        alignItems: 'center',
        height: scaleHeight(200),
        marginVertical: scaleHeight(20),
        justifyContent: 'center',
    }
})

export default HomeScreen;