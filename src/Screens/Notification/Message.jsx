import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { Divider, Icon, Card, ListItem, Avatar } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../Constants/images';
import { FONTS } from '../../Constants/fonts';
import CustomHeader from '../../Components/CustomHeader';
import CustomBottomBar from '../../Components/CustomBottomBar';
import Plotly from 'react-native-plotly';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import LineChart from '../Charts/LineChart/LineChart';
import BarChart from '../Charts/BarChart/BarChart';
import ScatterChart from '../Charts/ScatterChart/ScatterChart';
import AreaChart from '../Charts/AreaChart/AreaChart';
import MixedChart from '../Charts/MixedChart/MixedChart';
import HeatMapChart from '../Charts/HeatMapChart/HeatMapChart';
import DonutChart from '../Charts/DonutChart/DonutChart';
import GaugeChart from '../Charts/GaugeChart/GaugeChart';
import RadarChart from '../Charts/RadarChart/RadarChart';
import WaterFallChart from '../Charts/WaterFallChart/WaterFallChart';
import FunnelChart from '../Charts/FunnelChart/FunnelChart';
import ShankeyChart from '../Charts/ShankeyChart/ShankeyChart';

const Message = ({ navigation, route }) => {

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
        ShankeyChart
    };
    const chartData = useSelector(state => state.detailSlice.notificationDataIs.jsonData);
    const lineChartData = useSelector(state => state.detailSlice.chartDataFromserver);
    const [chartName, setChartName] = useState(chartData.chartName)
    const data1 = [
        {
            x: [3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800],
            y: [825, 830, 835, 840, 845, 850, 825, 810],
            mode: 'lines',
            type: 'scatter',
            name: 'Sp. Energy Consumption (kcal/Kg Clinker)',
            line: {
                color: '#FF0101'
            },
        },
        {
            x: [3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450, 3500, 3550, 3600, 3650, 3700, 3750, 3800],
            y: [825, 835, 840, 805, 815, 865, 800, 810, 830, 840, 850, 845, 870, 880, 875, 880, 881, 821, 824],
            mode: 'markers',
            type: 'scatter',
            name: 'Clinker Production (Tons)',
            marker: {
                color: '#1682BC'
            },
        },
    ];
    const layout = {
        title: 'BookMark 1',
        xaxis: {
            title: 'Clinker Production (Tons)',
        },
        yaxis: {
            title: 'Sp. Energy Consumption (kcal/Kg Clinker)',
        },
        margin: {
            l: 60,
            r: 10,
            b: 80,
            t: 70,
        },
        legend: {
            orientation: 'h',
            x: 0,
            y: -0.5,
        },
    };

    const item = route?.params?.item
    const list = route?.params?.list
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.HEADER} />
            <View style={styles.insidecontainer}>
                <CustomHeader title={'Message'} navigation={navigation} icon={'leftarrow'} />
                
                <Card containerStyle={styles.card}>
                    <>
                        <View style={styles.insidecard}>
                            <Image
                                rounded
                                source={{ uri: list.image }}
                                style={styles.avator}
                            />
                            <View style={styles.timezone}>
                                <View >
                                    <Text style={styles.title}>{list.user_name ? list.user_name : item.item.title}</Text>
                                    <Text style={styles.subtitle}>{item.item.description ? item.item.description : item.item.subtitle}</Text>
                                    <Text style={styles.time}>{item?.item?.notification_created_date ? moment(item?.item?.notification_created_date).format('Do-MMMM-YYYY  h:mm:ss a') : "10-Mar-24 at 09:00AM"}</Text>
                                </View>
                            </View>

                        </View>
                        <Divider style={styles.divider} />
                        {item.item.title === 'Downtime Notification' || item.item.title === 'New Feature Launch' &&
                            <View>
                                <Text style={styles.title1}>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                </Text>
                            </View>
                        }
                        <View style={{alignSelf:'center',right:12}}>
                      
                        {/* <Plotly
                        data={data1}
                        layout={layout}
                       /> */}
                        {(() => {
                            const ChartComponent = chartComponents[chartName]
                            return <ChartComponent paged='analytics' key={chartName.id} chartList={chartData} chartId={chartName.id} checkTheCond={lineChartData} />;
                        })()}
                        </View>
                        {item.item.type === "AI" &&
                            <View style={[styles.box, { marginTop: scaleHeight(10), height: 400 }]} >
                                {/* <Image source={IMAGES.flowchartimage} style={styles.flowchart}
                            /> */}
                            </View>
                        }

                    </>
                </Card>
                
            </View>
            <View style={{ top: Platform.OS === 'ios' ? scaleHeight(35) : 0 }}>
                <CustomBottomBar />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.HEADER
    },
    insidecontainer: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND
    },
    title: {
        fontSize: normalizeFont(18),
        fontWeight: '700',
        fontFamily: FONTS.NUNITOSANSBOLD,
        color: COLORS.DARKBLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    title1: {
        fontSize: normalizeFont(16),
        fontWeight: '600',
        fontFamily: FONTS.NUNITOSANSBOLD,
        color: COLORS.DARKBLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        letterSpacing: 0.1
    },
    divider: {
        height: scaleHeight(0.2),
        backgroundColor: COLORS.ASH,
        marginVertical: scaleHeight(10),
        width: '110%',
        alignSelf: 'center',
        opacity: 0.2
    },
    subtitle: {
        fontSize: normalizeFont(14),
        fontWeight: '400',
        fontFamily: FONTS.NUNITOSANSLIGHT,
        color: COLORS.LIGHT_BLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        width:'70%',
        flex:1
    },
    time: {
        fontSize: normalizeFont(14),
        fontWeight: '600',
        fontFamily: FONTS.NUNITOSANSLIGHT,
        color: COLORS.BLACKK,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    avator: {
        height: scaleHeight(56),
        width: scaleWidth(56),
        resizeMode: 'contain'
    },
    insidecard: {
        flexDirection: 'row'
    },
    box: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        marginTop: scaleHeight(20),
        borderRadius: scaleHeight(2),
    },
    flowchart: {
        height: scaleHeight(200),
        width: '100%',
    },
    timezone: {
        alignSelf: 'center',
        marginLeft: scaleWidth(20)
    },
    card:{
        width:'94%',
        alignSelf:'center'
    }
})

export default Message;