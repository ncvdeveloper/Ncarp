import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image,Platform, ImageBackground, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import { APIRequest } from "../../Utils/ApiRequest";
import CustomDropDown from '../../Components/CustomDropDown';
import { IMAGES } from '../../Constants/images';
import { FONTS } from '../../Constants/fonts';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { Divider, Icon, Card, ListItem, Avatar } from 'react-native-elements';
import CustomHeader from '../../Components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import ReportLineChart from "../Charts/ReportLineChart";

const Reports = (props) => {

    const [alertTypes, setAlertTypes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userNames, setUserNames] = useState([]);
    const [value, setValue] = useState(2)
    const [isFocus, setIsFocus] = useState(false)
    const navigation = useNavigation();
    //Endpoint for Alert Types
    useEffect(() => {
        const fetchAlertTypes = async () => {
            let url = 'http://sustainos.ai:9001/dataservice_app/api/notification_type_master/'
            try {
                let result = await APIRequest.getGetTimebasedService(url);
                setAlertTypes(result?.data);
            } catch (error) {
                console.error('Error fetching alert types:', error);
            }
        };
        fetchAlertTypes();
    }, []);

    //Endpoint for UserList
    useEffect(() => {
        const fetchUserTypes = async () => {
            let url = 'http://sustainos.ai:9001/ncarp_lens_app/api/user_list/'
            let result = await APIRequest.getGetTimebasedService(url);
            let data = result?.data
            const usernames = data.map(user => user.user_name);
            setUserNames(data);
            setSelectedUsers(usernames);
        }
        fetchUserTypes();
    }, []);

    const renderBookmark = (item) => {
        return (
            <View style={{ backgroundColor: item.id === value ? COLORS.GREY : COLORS.WHITE }}>
                <Divider style={styles.divider} />
                <Text style={[styles.dropdowntextstyle, { color: item.id === value ? COLORS.BLACK : COLORS.ASH }]}>{item?.name}</Text>
            </View>
        )
    }

    const renderUser = (item, index) => {
        return (
            <View style={{ backgroundColor: item.id === value ? COLORS.GREY : COLORS.WHITE }}>
                <Divider style={styles.divider} />
                <Text style={[styles.dropdowntextstyle, { color: item.id === value ? COLORS.BLACK : COLORS.ASH }]}>{item}</Text>
            </View>
        )
    }

    const [calendermodal, setcalendermodal] = useState(false);
    const [selectedtime, setSelectedtime] = useState('Yesterday')
    const filtertime = [
        { id: 1, name: 'Yesterday' },
        { id: 2, name: 'Last 24 Hours' },
        { id: 3, name: 'Today' },
        { id: 4, name: 'Month to Date' },
        { id: 5, name: 'Year to Date' },
        { id: 6, name: 'Week to Date' },
        { id: 7, name: 'Custom Duration' },
    ]

    const LineChart = [
        { id: 1,chart: [
            {
                x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
                y: [200, 360, 380, 410, 380, 360, 350],
                type: 'lines',
                mode: 'lines',
                name: 'Achieved',
                marker: {
                    color: COLORS.BLUE,
                },
            },
            {
                x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
                y: [710, 750, 780, 750, 700, 790, 600],
                type: 'lines',
                mode: 'lines',
                name: 'Predicted',
                marker: {
                    color: COLORS.PINK,
                },
            },
        ], item: 'Scope 1', prod: '3,675', },
        { id: 2,chart: [
            {
                x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
                y: [240, 350, 390, 490, 340, 310, 300],
                type: 'lines',
                mode: 'lines',
                name: 'Achieved',
                marker: {
                    color: COLORS.BROWN,
                },
            },
            {
                x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
                y: [790, 730, 730, 700, 720, 690, 660],
                type: 'lines',
                mode: 'lines',
                name: 'Predicted',
                marker: {
                    color: COLORS.GREEN,
                },
            },
        ], item: 'Scope 2', prod: '1,324', },
        { id: 3,chart: [
            {
                x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
                y: [200, 360, 380, 410, 380, 360, 350],
                type: 'lines',
                mode: 'lines',
                name: 'Achieved',
                marker: {
                    color: COLORS.MENUHEADER,
                },
            },
            {
                x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
                y: [790, 730, 730, 700, 720, 690, 660],
                type: 'lines',
                mode: 'lines',
                name: 'Predicted',
                marker: {
                    color: COLORS.BGCOLOR,
                },
            },
        ], item: 'Scope 3', prod: '243', },
    ]

    const data = [
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [200, 360, 380, 410, 380, 360, 350],
            type: 'lines',
            mode: 'lines',
            name: 'Achieved',
            marker: {
                color: COLORS.BLUE,
            },
        },
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [710, 750, 780, 750, 700, 790, 600],
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
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [240, 350, 390, 490, 340, 310, 300],
            type: 'lines',
            mode: 'lines',
            name: 'Achieved',
            marker: {
                color: COLORS.BROWN,
            },
        },
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [790, 730, 730, 700, 720, 690, 660],
            type: 'lines',
            mode: 'lines',
            name: 'Predicted',
            marker: {
                color: COLORS.GREEN,
            },
        },
    ];

    const data2 = [
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [200, 360, 380, 410, 380, 360, 350],
            type: 'lines',
            mode: 'lines',
            name: 'Achieved',
            marker: {
                color: COLORS.BLUE,
            },
        },
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [790, 730, 730, 700, 720, 690, 660],
            type: 'lines',
            mode: 'lines',
            name: 'Predicted',
            marker: {
                color: COLORS.PINK,
            },
        },
    ];
    const CategoryChart = [
        { id: 1, item: 'Category 1', prod: '10' },
        { id: 2, item: 'Category 2', prod: '20' },
        { id: 3, item: 'Category 3', prod: '35' },
        { id: 4, item: 'Category 4', prod: '100' },
        { id: 5, item: 'Category 5', prod: '60' },
        { id: 6, item: 'Category 6', prod: '12' },
        { id: 7, item: 'Category 7', prod: '53' },
        { id: 8, item: 'Category 8', prod: '15' },
        { id: 9, item: 'Category 9', prod: '160' },
        { id: 10, item: 'Category 10', prod: '12' },
        { id: 11, item: 'Category 11', prod: '53' },
        { id: 12, item: 'Category 12', prod: '15' },
        { id: 13, item: 'Category 13', prod: '160' },
    ]

   

    const data3 = [
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [200, 360, 380, 410, 380, 360, 350],
            type: 'lines',
            mode: 'lines',
            name: 'Achieved',
            marker: {
                color: COLORS.BLUE,
            },
        },
        {
            x: ['01 hrs', '02 hrs', '03 hrs', '04 hrs', '05 hrs', '06 hrs', '07 hrs'],
            y: [790, 730, 730, 700, 720, 690, 660],
            type: 'lines',
            mode: 'lines',
            name: 'Predicted',
            marker: {
                color: COLORS.PINK,
            },
        },
    ];
    return (
        <View style={styles.container}>
            <CustomHeader title={"Reports"} navigation={navigation} 
                right={
                    <TouchableOpacity style={{position:'absolute',right: scaleHeight(20) }} onPress={() => setcalendermodal(!calendermodal)}>
                        <View>
                            <Image
                                style={styles.menuIcon}
                                resizeMode="contain"
                                source={IMAGES.calender}
                            />
                        </View>
                    </TouchableOpacity>
                } />
            <Text style={styles.dropdowntextstyle}>Hierarchy</Text>
                <View style={styles.row}>
                    <View style={styles.dropdown}>
                        <View style={styles.customdropdown}>
                            <CustomDropDown
                                array={alertTypes}
                                renderItem={(item) => renderBookmark(item)}
                                placeholder={'Select'}
                                onFocus={() => setIsFocus(true)}
                                onChange={(item) => {
                                    setValue(item.id);
                                }}
                                search={true}
                            />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.searchbox}>
                            <Image source={IMAGES.search} style={styles.search} resizeMode='contain' />
                        </View>
                    </TouchableOpacity>
                </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                

                {LineChart.map((item) => {
                    return (
                        <View style={styles.box}>
                            <View style={styles.row}>
                                <Text style={styles.boxtitle}>{item.item}</Text>
                                <Text style={styles.number}>{item.prod}  <Text style={[styles.boxtitle, { color: COLORS.BLACK, }]}>{'Kg/T'}</Text></Text>
                            </View>
                            <View style={styles.line}>
                                <ReportLineChart data={item.chart} />
                            </View>
                        </View>)
                })}
                <FlatList
                data={CategoryChart}
                renderItem={(item)=>{
                    return (
                        <View style={styles.box1}>
                            <View style={styles.row}>
                                <Text style={styles.boxtitle}>{item.item.item}</Text>
                                <Text style={styles.number}>{item.item.prod}  <Text style={[styles.boxtitle, { color: COLORS.BLACK, }]}>{'Kg/T'}</Text></Text>
                            </View>
                            <View style={styles.line}>
                                <ReportLineChart data={data} />
                            </View>
                        </View>)
                }}
                contentContainerStyle={{marginBottom: scaleHeight(100)}}
                />
            </ScrollView>
            {calendermodal &&
                <View style={[styles.bookmodalView]}>
                    <FlatList
                        data={filtertime}
                        renderItem={(item, index) => {
                            return (
                                <TouchableOpacity style={[styles.timeView, {
                                    backgroundColor: selectedtime === item.item.name ? COLORS.HEADER : COLORS.WHITE,
                                    borderColor: selectedtime === item.item.name ? COLORS.HEADER : COLORS.GREY,
                                }]} onPress={() => setSelectedtime(item.item.name)}>
                                    <Text style={[styles.timeText, { color: selectedtime === item.item.name ? COLORS.WHITE : COLORS.DATETEXT, }]}>{item.item.name}</Text>
                                </TouchableOpacity>
                            )
                        }} />

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.clearView} onPress={() => setcalendermodal(!calendermodal)}>
                            <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveView} onPress={() => setcalendermodal(!calendermodal)}>
                            <Text style={styles.saveText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )

}
export default Reports

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    whiteBox: {
        backgroundColor: COLORS.WHITE,
        width: '94%',
        alignSelf: 'center',
        marginVertical: scaleHeight(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    customdropdown: {
        width: '93%'
    },
    divider: {
        height: scaleHeight(1),
        backgroundColor: COLORS.GREY
    },
    dropdowntextstyle: {
        color: COLORS.BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(16),
        fontWeight: '200',
        marginHorizontal: scaleHeight(20),
        margin: scaleHeight(10),

    },
    bookmodalView: {
        backgroundColor: COLORS.WHITE,
        width: scaleWidth(160),
        left: scaleWidth(200),
        shadowColor: COLORS.ASH,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 2,
        borderColor: COLORS.GREY,
        borderWidth: 0.1,
        position: 'absolute',
        top: Platform.OS === 'ios' ? scaleHeight(150) :  scaleHeight(100)
    },
    timeView: {
        width: '90%',
        height: scaleHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.GREY,
        borderWidth: 1,
        borderRadius: scaleHeight(2),
        marginTop: scaleHeight(8),
    },
    clearText: {
        color: COLORS.HEADER,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(14),
        fontWeight: '600',
    },
    timeText: {
        color: COLORS.DATETEXT,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(14),
        fontWeight: '700',
    },
    buttonView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: scaleHeight(10),
    },
    clearView: {
        height: scaleHeight(30),
        width: scaleWidth(60),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.HEADER,
        borderWidth: 1,
        borderRadius: scaleHeight(5),
        marginRight: scaleWidth(10)
    },
    saveText: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(14),
        fontWeight: '600',
    },
    saveView: {
        height: scaleHeight(30),
        width: scaleWidth(60),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.HEADER,
        borderRadius: scaleHeight(5)
    },
    menuIcon: {
        height: scaleHeight(20),
        width: scaleWidth(20),
        tintColor: COLORS.WHITE,

    },
    box: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        marginTop: scaleHeight(20),
        borderRadius: scaleHeight(2)
    },
    box1: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.WHITE,
        marginTop: scaleHeight(20),
        borderRadius: scaleHeight(2)
    },
    boxtitle: {
        fontSize: normalizeFont(16),
        fontWeight: '500',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BGCOLOR,
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: scaleHeight(10),

    },
    number: {
        fontSize: normalizeFont(20),
        fontWeight: '800',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginVertical: scaleHeight(10),
    },
    line: {
        marginLeft: scaleWidth(10)
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: scaleWidth(20),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchbox: {
        height: scaleHeight(35),
        width: scaleWidth(35),
        backgroundColor: COLORS.BGCOLOR,
        right: scaleWidth(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        height: scaleHeight(20),
        width: scaleWidth(20),
    }
})