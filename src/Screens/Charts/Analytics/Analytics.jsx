import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Animated,
    Linking,
    Dimensions,
    Modal,
    StatusBar
} from 'react-native';
import { COLORS } from '../../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/dynamicSize';
import { IMAGES } from '../../../Constants/images';
import { SVG_IMAGES } from '../../../Constants/svgimages';
import { FONTS } from '../../../Constants/fonts';
import CustomHeader from '../../../Components/CustomHeader';
import CustomDropDown from '../../../Components/CustomDropDown';
import { Divider } from 'react-native-elements'
import Plotly from 'react-native-plotly';
import { SvgXml } from 'react-native-svg';
import { Table, Row, Cell, TableWrapper } from 'react-native-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { APIRequest } from "../../../Utils/ApiRequest";
import {
    chartDataFromserver,
    shapesStyles,
    ChartsInfo,
} from '../../../Redux/ReduxSlice/detailSlice';

const Analytics = (props) => {

    const { chartNameFunc, chartList, checkTheCond, panelFunc } = props
    const [bookmark, setbookmark] = useState([])
    const dispatch = useDispatch();
    const data1 = [
        {
            x: [3000, 3020, 3050, 3100, 3120, 3150, 3180, 3200, 3300, 3400, 3500, 3600, 3700, 3800],
            y: [870, 860, 825, 860, 850, 810, 801, 830, 835, 840, 845, 850, 825, 810],
            mode: 'lines',
            type: 'scatter',
            name: 'Sp. Energy Consumption (kcal/Kg Clinker)',
            line: {
                color: '#FF0101'
            },
        },
        {
            x: [3100, 3120, 3150, 3180, 3200, 3250, 3300, 3350, 3400, 3450, 3500, 3550, 3600, 3650, 3700, 3750, 3800],
            y: [825, 830, 835, 840, 805, 825, 815, 865, 800, 810, 830, 840, 850, 845, 870, 880, 875, 880, 881, 821, 824],
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
    const svgimage = [
        { id: 1, image: SVG_IMAGES.area },
        { id: 2, image: SVG_IMAGES.bar },
        { id: 3, image: SVG_IMAGES.boxplot },
        { id: 4, image: SVG_IMAGES.donut },
        { id: 5, image: SVG_IMAGES.funnel },
        { id: 6, image: SVG_IMAGES.gantt },
        { id: 7, image: SVG_IMAGES.gauge },
        { id: 8, image: SVG_IMAGES.heatmap },
        { id: 9, image: SVG_IMAGES.line },
        { id: 10, image: SVG_IMAGES.mixedchart },
        { id: 11, image: SVG_IMAGES.polararea },
        { id: 12, image: SVG_IMAGES.radar },
    ]
    const { width } = Dimensions.get('window');
    const [value, setValue] = useState(2)
    const [isFocus, setIsFocus] = useState(false)
    const [sharemodal, setshareModal] = useState(false);
    const [Bookmarkmodal, setBookmarkmodal] = useState(false);
    const [chartmodal, setChartmodal] = useState(false);
    const [filtermodal, setfiltermodal] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [panelData, setpanelData] = useState([{ size: "25", background: "fff" }])
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const data2 = [{ id: 1, name: "2000" }, { id: 2, name: "2000" }, { id: 3, name: "2000" }, { id: 4, name: "2000" }]
    const data = [{ id: 1, name: "Bookmark 1" }, { id: 2, name: "Bookmark 2" }, { id: 3, name: "Bookmark 3" }, { id: 4, name: "Bookmark 4" }]
    const handleEmailCompose = () => {
        const to = 'recipient@example.com';
        const subject = 'Subject';
        const body = 'Message body';
        const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(mailtoUrl)
            .then(() => console.log('Email app opened'))
            .catch((err) => console.error('Failed to open email app:', err));
    };

    const [tableHead] = useState(['Filter', 'Action']);
    const [tableData] = useState([
        ['(0001 <= 2000) AND', '113.2'],
        ['(0001 <= 2000) OR', '3.1',],
    ]);

    const userDetails = useSelector((state) => state.authSlice.userDetails);
    useEffect(() => {
        dispatch(chartDataFromserver({}));
        bookmarkfromserver();
    }, []);

    const bookmarkfromserver = async () => {
        const url = `http://sustainos.ai:9001/ncarp_lens_app/api/bookmark_details/?project_id=1`;
        let response = await APIRequest.getGetTimebasedService(url);
        setbookmark(response.data)

    };



    const renderdropItem = (item) => {
        return (
            <View style={{ backgroundColor: item.id === value ? COLORS.GREY : COLORS.WHITE }}>
                <Divider style={styles.divider} />
                <Text style={[styles.dropdowntextstyle, { color: item.id === value ? COLORS.BLACK : COLORS.ASH }]}>{item.name}</Text>
            </View>
        )
    }

    const renderBookmark = (item) => {
        return (
            <View style={{ backgroundColor: item.id === value ? COLORS.GREY : COLORS.WHITE }}>
                <Divider style={styles.divider} />
                <Text style={[styles.dropdowntextstyle, { color: item.id === value ? COLORS.BLACK : COLORS.ASH }]}>{item.bookmark_name}</Text>
            </View>
        )
    }

    const element = (data, index) => (
        <TouchableOpacity >
            <View style={styles.btn}>
                <Text style={styles.dropdowntextstyle}>{data}</Text>
            </View>
        </TouchableOpacity>
    );


    const [timingsCard, setTimingsCard] = useState({ day: "", time: "" })
    const [timingBtnName, setTimingBtnName] = useState(timingsCard.day)
    const [aggregate, setAggregate] = useState(timingsCard.time)
    const [selectedBook, setSelectedBook] = useState('-Select-');
    const [selectedBookMark, setSelectedBookMark] = useState({})
    const [parametrList, setparameterList] = useState([])
    const [newData, setNewData] = useState([]);
    const [chartNameIs, setChartName] = useState("")
    const [fromDate, setfromDate] = useState(null);
    const [toDate, setToDate] = useState(null)
    const [checkBoXClicked, setCheckBoxClicxked] = useState(false)

    const handleBookChange = (event) => {

        const element = event
        setValue(element.bookmark_name)
        setSelectedBook(element.bookmark_name);
        setSelectedBookMark(element)
        setTimingsCard(element.json_data.timingsCard)
        setTimingBtnName(element.json_data.timingsCard.day)
        setAggregate(element.json_data.timingsCard.time)
        setparameterList(element.json_data.parametrList)
        setNewData(element.json_data.conditionsList)
        setChartName(element.json_data.chartName)
        setfromDate(element.json_data.rawFromDate)
        setToDate(element.json_data.rawTodate)
        setCheckBoxClicxked(element.json_data.checkBoXClicked)
        const dataToPlot = {
            chartName: element.json_data.chartName,
            parameters: element.json_data.parameters,
            timeRange: element.json_data.timeRange,
            aggregates: element.json_data.aggregates,
            conditions: element.json_data.conditions,
            parametrList: element.json_data.parametrList,
            barType: element.json_data.barType
        }
        chartNameFunc(dataToPlot)
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.box} >
                        <View style={styles.innerbox}>
                            <View style={styles.firstView}>
                                <View style={styles.dropview}>
                                    <CustomDropDown
                                        array={bookmark}
                                        renderItem={(item) => renderBookmark(item)}
                                        placeholder={'Select'}
                                        value={"dddd"}
                                        onFocus={() => setIsFocus(true)}
                                        onChange={(item) => {
                                            handleBookChange(item)
                                            setValue(item.id);
                                        }}
                                        search={true}
                                    />

                                </View>

                                <TouchableOpacity >
                                    <View style={styles.sharebox}>
                                        <Image style={styles.share} source={IMAGES.trash} />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setBookmarkmodal(!Bookmarkmodal)}>
                                    <View style={styles.sharebox}>
                                        <Image style={styles.share} source={IMAGES.bookmark} />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setfiltermodal(!filtermodal)}>
                                    <View style={styles.sharebox}>
                                        <Image style={styles.share} source={IMAGES.filter} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setChartmodal(!chartmodal)}>
                                    <View style={styles.sharebox}>
                                        <Image style={styles.share} source={IMAGES.chart} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setshareModal(!sharemodal)}>
                                <View style={styles.sharebox}>
                                    <Image style={styles.share} source={IMAGES.share} />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>


                    {/* <View style={[styles.box, { marginTop: scaleHeight(10), height: 400 }]} >
                        <Plotly data={data1} layout={layout}
                            config={{
                                displayModeBar: false,
                                displayModeBar: false,
                                scrollZoom: false,  // Disable scroll zoom
                                doubleClick: true, // Disable double click to autoscale
                                showTips: true,   // Disable hover tips
                                staticPlot: true,   // Disable interaction
                            }} />
                    </View> */}
                    {
                        sharemodal &&
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => setshareModal(!sharemodal)}>
                                <Text style={styles.dropdowntextstyle}>Direct Share</Text>
                            </TouchableOpacity>
                            <Divider style={styles.divider} />
                            <TouchableOpacity onPress={() => handleEmailCompose()}>
                                <Text style={styles.dropdowntextstyle}>Mail Share</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {Bookmarkmodal &&
                        <View style={styles.bookmodalView}>
                            <View style={[styles.boxView]}>
                                <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>BookMark</Text>
                                <Divider style={styles.divider} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>Name</Text>
                                <View style={styles.textInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter"
                                        placeholderTextColor={COLORS.GREY}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>Description</Text>
                                <View style={styles.textInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter"
                                        placeholderTextColor={COLORS.GREY}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.clearView} onPress={() => setBookmarkmodal(!Bookmarkmodal)}>
                                    <Text style={styles.clearText}>Clear</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveView} onPress={() => setBookmarkmodal(!Bookmarkmodal)}>
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {filtermodal &&
                        <View style={[styles.bookmodalView, {
                            height: scaleHeight(410),
                            width: scaleWidth(220),
                            left: scaleWidth(130),
                        }]}>
                            <View style={[styles.boxView]}>
                                <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>Filter</Text>
                                <Divider style={styles.divider} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>Global Code</Text>
                                    <View style={[styles.textInput, { width: scaleWidth(90) }]}>
                                        <CustomDropDown
                                            array={data2}
                                            renderItem={(item) => renderdropItem(item)}
                                            placeholder={'Select'}
                                            value={value}
                                            onFocus={() => setIsFocus(true)}
                                            onChange={item => {
                                                setValue(item.id);
                                                setIsFocus(false);
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>Condition</Text>
                                    <View style={[styles.textInput, { width: scaleWidth(90) }]}>
                                        <CustomDropDown
                                            array={data2}
                                            renderItem={(item) => renderdropItem(item)}
                                            placeholder={'Select'}
                                            value={value}
                                            onFocus={() => setIsFocus(true)}
                                            onChange={item => {
                                                setValue(item.id);
                                                setIsFocus(false);
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>Constant/Num</Text>
                                    <View style={[styles.textInput, { width: scaleWidth(90) }]}>
                                        <CustomDropDown
                                            array={data2}
                                            renderItem={(item) => renderdropItem(item)}
                                            placeholder={'Select'}
                                            value={value}
                                            onFocus={() => setIsFocus(true)}
                                            onChange={item => {
                                                setValue(item.id);
                                                setIsFocus(false);
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={[styles.dropdowntextstyle, { color: COLORS.BLACK }]}>Operation</Text>
                                    <View style={[styles.textInput, { width: scaleWidth(90) }]}>
                                        <View>
                                            <CustomDropDown
                                                array={data2}
                                                renderItem={(item) => renderdropItem(item)}
                                                placeholder={'Select'}
                                                value={value}
                                                onFocus={() => setIsFocus(true)}
                                                onChange={item => {
                                                    setValue(item.id);
                                                    setIsFocus(false);
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.clearView} onPress={() => setBookmarkmodal(!Bookmarkmodal)}>
                                    <Text style={styles.clearText}>Clear</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveView} onPress={() => setBookmarkmodal(!Bookmarkmodal)}>
                                    <Text style={styles.saveText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginVertical: scaleHeight(10) }}>
                                <Table >
                                    <Row data={tableHead} style={styles.head} textStyle={styles.dropdowntextstyle} />
                                    {tableData.map((rowData, index) => (
                                        <View key={`row-${index}`} style={styles.rowContainer}>
                                            <TableWrapper key={`wrapper-${index}`} style={styles.row}>
                                                {rowData.map((cellData, cellIndex) => (
                                                    <Cell
                                                        key={cellIndex}
                                                        data={cellIndex === 0 ? cellData : element(cellData, index)}
                                                        textStyle={styles.dropdowntextstyle}
                                                    />
                                                ))}
                                            </TableWrapper>
                                        </View>
                                    ))}
                                </Table>

                            </View>
                            <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.clearView} onPress={() => setBookmarkmodal(!Bookmarkmodal)}>
                                    <Text style={styles.clearText}>Clear</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveView} onPress={() => setBookmarkmodal(!Bookmarkmodal)}>
                                    <Text style={styles.saveText}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {chartmodal &&
                        <View style={styles.bookmodalView}>
                            <FlatList data={svgimage}
                                numColumns={4}
                                renderItem={(item, index) => {
                                    return (
                                        <TouchableOpacity style={{ marginTop: scaleHeight(5) }}>
                                            <SvgXml xml={item.item.image} width={scaleWidth(50)} height={scaleHeight(50)} />
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    }
                </ScrollView>
            </View>
        </>
    )
}
export default Analytics;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        height: scaleHeight(1),
        backgroundColor: COLORS.GREY
    },
    box: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        marginTop: scaleHeight(20),
        borderRadius: scaleHeight(2),
    },
    share: {
        width: scaleWidth(20),
        height: scaleHeight(20),
        resizeMode: 'center',
        overflow: 'hidden',
    },
    boxView: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.HEADERBG,
        flexDirection: 'row',
        width: '100%'
    },

    dropdownbox: {
        width: scaleWidth(100),
        height: scaleHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.GREY,
        borderWidth: 0.5,
        marginRight: scaleWidth(5)
    },
    sharebox: {
        width: scaleWidth(30),
        height: scaleHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.GREY,
        borderWidth: 0.5,
        marginRight: scaleWidth(5)
    },
    innerbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropview: {
        backgroundColor: COLORS.WHITE,
        width: '43%',
        margin: scaleHeight(10),

    },
    dropdowntextstyle: {
        color: COLORS.BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '200',
        margin: scaleHeight(10)

    },
    firstView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        height: scaleHeight(30),
        justifyContent: 'center',
        borderColor: COLORS.GREY,
        marginHorizontal: scaleWidth(10)
    },
    modalView: {
        backgroundColor: COLORS.WHITE,
        width: scaleWidth(100),
        height: scaleHeight(70),
        top: scaleHeight(80),
        position: 'absolute',
        right: 20,
        shadowColor: COLORS.ASH,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 2,
    },
    bookmodalView: {
        backgroundColor: COLORS.WHITE,
        width: scaleWidth(200),
        height: scaleHeight(220),
        position: 'absolute',
        top: scaleHeight(80),
        left: scaleWidth(100),
        shadowColor: COLORS.ASH,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 2,
    },
    mapBox: {
        width: scaleWidth(190),
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: scaleHeight(20)
    },
    clearView: {
        height: scaleHeight(30),
        width: scaleWidth(60),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.BGCOLOR,
        borderWidth: 1,
        borderRadius: scaleHeight(5),
        marginRight: scaleWidth(10)
    },
    clearText: {
        color: COLORS.BGCOLOR,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '800',
    },
    saveText: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '800',
    },
    saveView: {

        height: scaleHeight(30),
        width: scaleWidth(60),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.BGCOLOR,
        borderRadius: scaleHeight(5)
    },
    buttonView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: scaleHeight(10),
        marginRight: scaleWidth(10)
    },
    input: {
        height: scaleHeight(40),
        textAlign: 'left',
        fontSize: normalizeFont(12)
    },
    rowContainer: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GREY,
    },
    head: {
        backgroundColor: COLORS.HEADERBG,
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: COLORS.WHITE
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'space-evenly'
    },
    btnText: {
        marginVertical: scaleHeight(6),
        color: COLORS.GOLDEN,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontWeight: '600',
        fontSize: scaleHeight(14),
        textAlign: 'center',
        width: scaleWidth(60)
    },
    text: {
        marginVertical: scaleHeight(10),
        color: COLORS.BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontWeight: '700',
        fontSize: scaleHeight(14),
        textAlign: 'center',
    },
})