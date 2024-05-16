import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    BackHandler,
    ActivityIndicator,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { Divider, Icon, Card, ListItem, Avatar } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import { IMAGES } from '../../Constants/images';
import { FONTS } from '../../Constants/fonts';
import CustomHeader from '../../Components/CustomHeader';
import { Calendar } from 'react-native-calendars';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { APIRequest } from "../../Utils/ApiRequest";
import { useDispatch, useSelector } from 'react-redux';
import { selection } from 'd3';
import CustomBottomBar from '../../Components/CustomBottomBar';
import { notificationDataIs } from '../../Redux/ReduxSlice/detailSlice';
const { width } = Dimensions.get('window');

const Notification = ({ navigation }) => {

    const swiper = useRef();
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [notificationlist, setNotificationlist] = useState([])
    const [userList, setuserList] = useState([])
    const [valuetime, setValuetime] = useState(new Date());
    const [week, setWeek] = useState(0);
    const [isSelected, setSelection] = useState('All Notification');
    const [selectedtime, setSelectedtime] = useState('Yesterday')
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        NotificationCount();
        NotificationList()

        
    }, []);

    const getUserDetails = (item) => {
        const user_details = {}; // or const user_details = [];
        const sender_user_id = item.sender_user_id;
        const user = userList.find(user => user.id === sender_user_id);
        if (user) {
            Object.assign(user_details, user);
        }

        return user_details;
    };

    const NotificationCount = async () => {
        const url = `http://sustainos.ai:9001/dataservice_app/api/notification_details/?notification_retrieval_type=count&sorting_order=oldest&project_id=1`;
        let result = await APIRequest.getGetTimebasedService(url);
    }

    const NotificationList = async () => {
        setList()
        setNotificationlist()
        setLoading(true)
        const url = `http://sustainos.ai:9001/dataservice_app/api/notification_details/?project_id=1&notification_retrieval_type=data`;
        let result = await APIRequest.getGetTimebasedService(url);
        setLoading(false)
        let data = result.data
        setList(data)
        setNotificationlist(data?.data)
        console.log("333111", JSON.stringify(data?.data))
        setuserList(data?.user_info)
    }

    const weeks = React.useMemo(() => {
        const start = moment().add(week, 'weeks').startOf('week');

        return [-1, 0, 1].map(adj => {
            return Array.from({ length: 7 }).map((_, index) => {
                const date = moment(start).add(adj, 'week').add(index, 'day');

                return {
                    weekday: date.format('ddd'),
                    date: date.toDate(),
                };
            });
        });
    }, [week]);

    const CustomCalendar = (props) => {
        return (
            <View style={{ marginHorizontal: scaleWidth(16) }}>
                <Calendar
                    initialDate="2024-03-01"
                    minDate="2024-03-01"
                    maxDate="2024-03-31"
                    hideExtraDays={true}
                    disableAllTouchEventsForDisabledDays={true}
                    {...props}
                />
            </View>
        );
    }
    const arraydata = [
        { id: 1, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 2, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 3, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 4, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 5, title: 'New Feature Launch', subtitle: 'New Feature Launch', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 6, title: 'Downtime Notification', subtitle: 'Downtime Notification Message', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 7, title: 'Downtime Notification', subtitle: 'Downtime Notification Message', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 8, title: 'Downtime Notification', subtitle: 'Downtime Notification Message', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 9, title: 'Carbon Footprint', subtitle: 'Carbon Footprint High', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },
        { id: 10, title: 'System Usuage', subtitle: 'Scope 3 Emission Inbound High', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },
        { id: 11, title: 'Scope 2 Above Threshold', subtitle: 'Scope 2 Above Threshold Emission', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },
        { id: 12, title: 'Carbon Footprint High', subtitle: 'Carbon Footprint High', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },

    ]

    const filterarray = [
        { id: 1, name: 'All', title: 'All Notification', type: "All", },
        { id: 2, name: 'User', title: 'User Notification', type: "User", },
        { id: 3, name: 'Admin', title: 'Admin Notification', type: "Admin", },
        { id: 4, name: 'AI', title: 'AI Notification', type: "AI", },
    ]

    const filtertime = [
        { id: 1, name: 'Yesterday' },
        { id: 2, name: 'Last 24 Hours' },
        { id: 3, name: 'Today' },
        { id: 4, name: 'Month to Date' },
        { id: 5, name: 'Year to Date' },
        { id: 6, name: 'Week to Date' },
        { id: 7, name: 'Custom Duration' },
    ]

    const [array, setArray] = useState([
        { id: 1, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 2, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 3, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 4, title: 'Screen Shared', subtitle: 'Screen Shared', time: '10-Mar-24 at 09:00AM', type: "User", image: IMAGES.profile },
        { id: 5, title: 'New Feature Launch', subtitle: 'New Feature Launch', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 6, title: 'Downtime Notification', subtitle: 'Downtime Notification Message', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 7, title: 'Downtime Notification', subtitle: 'Downtime Notification Message', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 8, title: 'Downtime Notification', subtitle: 'Downtime Notification Message', time: '10-Mar-24 at 09:00AM', type: "Admin", image: IMAGES.downtime },
        { id: 9, title: 'Carbon Footprint', subtitle: 'Carbon Footprint High', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },
        { id: 10, title: 'System Usuage', subtitle: 'Scope 3 Emission Inbound High', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },
        { id: 11, title: 'Scope 2 Above Threshold', subtitle: 'Scope 2 Above Threshold Emission', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },
        { id: 12, title: 'Carbon Footprint High', subtitle: 'Carbon Footprint High', time: '10-Mar-24 at 09:00AM', type: "AI", image: IMAGES.carbon },
    ])


    const [calendermodal, setcalendermodal] = useState(false);
    const [filtermodal, setfiltermodal] = useState(false);
    const [recent, setRecent] = useState(true);
    const [oldest, setOldest] = useState(true)
    const [value, setValue] = useState(2)
    const [isFocus, setIsFocus] = useState(false)
    const dispatch = useDispatch();
    const navigationMessage = (item) => {

        let data = getUserDetails(item.item)
        console.log("dddeee", item.item)
        dispatch(notificationDataIs({
            name: data?.user_name,
            description: item?.item?.description,
            image: data?.image,
            date: new Date(item?.item?.notification_created_date).toLocaleString(),
            jsonData: item?.item?.json_data
        }))

        navigation.navigate('Message', { item: item, list: getUserDetails(item.item) })
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        NotificationList()
      };

    const renderNotificationItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => navigationMessage(item)} activeOpacity={0.8}>
                <Card containerStyle={styles.card}>
                    <>
                        <View style={styles.insidecard}>

                            <Image
                                rounded
                                source={{ uri: getUserDetails(item.item)?.image }}
                                style={styles.avator}
                            />

                            <View style={{ alignSelf: 'center', marginLeft: scaleWidth(20) }}>
                                <View >
                                    <Text style={styles.title}>{getUserDetails(item.item).user_name}</Text>
                                    <Text style={styles.subtitle}>{item.item.description}</Text>
                                    <Text style={styles.time}>{moment(item?.item?.notification_created_date).format('Do-MMMM-YYYY  h:mm:ss a')}</Text>
                                </View>
                            </View>
                        </View>
                    </>
                </Card>
            </TouchableOpacity>
        )
    }

    const renderFilterItem = (item, index) => {
        return (
            <View>
                <TouchableOpacity onPress={() => handleChange(item.item.type, item.item.title)}>
                    <View >
                        <Text style={styles.notificationtitle}>{item.item.name}</Text>
                    </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
            </View>
        )
    }


    const handleChange = (data, title) => {
        setSelection(title)
        if (data === 'All') {
            setArray(arraydata)
            return
        }
        let array1 = arraydata.filter(item => item.type === data);
        setArray(array1)
    }


    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
            <StatusBar backgroundColor={COLORS.HEADER} />
            <View style={styles.insidecontainer}>
                <CustomHeader title={isSelected} navigation={navigation} icon={'leftarrow'}
                    right={
                        <View style={styles.filterview}>
                            <TouchableOpacity style={styles.menuview} onPress={() => { setcalendermodal(!calendermodal), setfiltermodal(false) }}>
                                <View>
                                    <Image
                                        style={styles.menuIcon}
                                        resizeMode="contain"
                                        source={IMAGES.whitecalender}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuview} onPress={() => { setfiltermodal(!filtermodal), setcalendermodal(false) }}>
                                <View>
                                    <Image
                                        style={styles.menuIcon}
                                        resizeMode="contain"
                                        source={IMAGES.filter}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    } />

                {loading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size={scaleHeight(30)} color={COLORS.HEADER} />
                    </View>
                    : (
                        <>
                            {isSelected === 'Admin Notification' &&
                                <View style={styles.picker}>
                                    <Swiper
                                        index={1}
                                        ref={swiper}
                                        loop={false}
                                        showsPagination={false}
                                        onIndexChanged={ind => {
                                            if (ind === 1) {
                                                return;
                                            }
                                            setTimeout(() => {
                                                const newIndex = ind - 1;
                                                const newWeek = week + newIndex;
                                                setWeek(newWeek);
                                                setValuetime(moment(valuetime).add(newIndex, 'week').toDate());
                                                swiper.current.scrollTo(1, false);
                                            }, 100);
                                        }}>
                                        {weeks.map((dates, index) => (
                                            <View
                                                style={[styles.itemRow, {}]}
                                                key={index}>
                                                {dates.map((item, dateIndex) => {
                                                    const isActive =
                                                        valuetime.toDateString() === item.date.toDateString();
                                                    return (
                                                        <TouchableWithoutFeedback
                                                            key={dateIndex}
                                                            onPress={() => setValue(item.date)}>
                                                            <View style={styles.item}>
                                                                <Text style={styles.itemWeekday}>
                                                                    {item.weekday}
                                                                </Text>
                                                                <View style={styles.number}>
                                                                    <View style={[styles.round, isActive && { backgroundColor: COLORS.HEADER },]}>
                                                                        <Text style={[styles.itemDate, isActive && { color: '#fff' }]}>
                                                                            {item.date.getDate()}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    );
                                                })}
                                            </View>
                                        ))}
                                    </Swiper>
                                </View>}
                            {notificationlist &&
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={notificationlist}
                                        renderItem={(item, index) => renderNotificationItem(item, index)}
                                        style={{ flex: 1, }}
                                        contentContainerStyle={{ paddingBottom: scaleHeight(100) }}
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                                    />
                                </View>
                               }
                            {filtermodal &&
                                <View style={styles.bookmodalView}>
                                    <FlatList
                                        data={filterarray}
                                        renderItem={(item, index) => renderFilterItem(item, index)}
                                        style={{ flex: 1, marginTop: 4 }}
                                        showsVerticalScrollIndicator={false}
                                    />
                                    <Text style={styles.ordertitle}>View</Text>
                                    <View style={styles.checkboxview}>
                                        <CheckBox
                                            disabled={false}
                                            value={recent}
                                            onValueChange={() => setRecent(!recent)}
                                            style={styles.checkbox}
                                        />
                                        <Text style={styles.notificationtitle}>Order by Recent</Text>
                                    </View>
                                    <View style={styles.checkboxview}>
                                        <CheckBox
                                            disabled={false}
                                            value={oldest}
                                            onValueChange={() => setOldest(!oldest)}
                                            style={styles.checkbox}
                                        />
                                        <Text style={styles.notificationtitle}>Order by Oldest</Text>
                                    </View>
                                </View>
                            }
                            {calendermodal &&
                                <View style={[styles.bookmodalView, {
                                    height: scaleHeight(320),
                                    width: scaleWidth(160),
                                    left: '50%',
                                }]}>
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
                        </>
                    )}
                <View style={{ top: Platform.OS === 'ios' ? scaleHeight(35) : 0 }}>
                    <CustomBottomBar />
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.HEADER,
    },
    insidecontainer: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND
    },
    card: {
        borderRadius: scaleWidth(5),
        shadowColor: COLORS.GREY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 2,
        justifyContent: 'space-around',
        marginBottom: scaleHeight(-12)
    },
    avator: {
        height: scaleHeight(56),
        width: scaleWidth(56),
        resizeMode: 'contain'
    },
    insidecard: {
        flexDirection: 'row'
    },
    title: {
        fontSize: normalizeFont(16),
        fontWeight: '700',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.DARKBLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: scaleHeight(3),
    },
    notificationtitle: {
        fontSize: normalizeFont(16),
        fontWeight: '400',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.DARKBLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginVertical: scaleHeight(8),
        marginLeft: scaleWidth(10),
    },
    buttonView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: scaleHeight(10),
    },
    ordertitle: {
        fontSize: normalizeFont(16),
        fontWeight: '600',
        fontFamily: FONTS.NUNITOSANSBOLD,
        color: COLORS.BGCOLOR,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: scaleWidth(10),
        textDecorationLine: 'underline',
        textDecorationColor: 'red'
    },
    subtitle: {
        fontSize: normalizeFont(14),
        fontWeight: '600',
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        color: COLORS.BLACK,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: scaleHeight(3),
        width:'70%'
    },
    time: {
        fontSize: normalizeFont(12),
        fontWeight: '600',
        fontFamily: FONTS.NUNITOSANSBOLD,
        color: COLORS.GREY,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    filterview: {
        flexDirection: 'row',
        right: scaleWidth(5),
        position: 'absolute',
    },
    menuview: {
        marginRight: scaleWidth(15),
    },
    menuIcon: {
        height: scaleHeight(20),
        width: scaleWidth(20),
        tintColor: COLORS.WHITE,
    },
    divider: {
        height: scaleHeight(1),
        backgroundColor: COLORS.GREY,
        opacity: 0.3
    },
    dropdowntextstyle: {
        color: COLORS.BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '200',
        margin: scaleHeight(10)
    },
    bookmodalView: {
        backgroundColor: COLORS.WHITE,
        height: scaleHeight(240),
        width: scaleWidth(160),
        left: scaleWidth(200),
        position: 'absolute',
        top: scaleHeight(100),
        shadowColor: COLORS.ASH,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 2,
        borderColor: COLORS.GREY,
        borderWidth: 0.1
    },
    checkboxview: {
        flexDirection: 'row'
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
        borderRadius: scaleHeight(5),
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
        fontWeight: '600',
    },
    saveText: {
        color: COLORS.WHITE,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(14),
        fontWeight: '600',
    },
    round: {
        width: scaleWidth(30),
        height: scaleHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: scaleWidth(60),
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
    picker: {
        flex: 1,
        maxHeight: scaleHeight(75),
        paddingTop: scaleHeight(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemRow: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: '#737373',
        marginBottom: 4,
    },
    itemDate: {
        fontSize: normalizeFont(16),
        fontWeight: '600',
        color: COLORS.HEADER,
        alignSelf: 'center',
        marginVertical: scaleHeight(2)
    },
    item: {
        flex: 1,
        height: 50,
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderRadius: 8,
        borderColor: '#e3e3e3',
        flexDirection: 'column',
        alignItems: 'center',
    },
    checkbox: {
        width: scaleWidth(30),
        height: scaleHeight(30),
        marginLeft: scaleWidth(5)
    },
    number: {
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        width: scaleWidth(60),
        height: scaleHeight(80)
    },
    loading: {
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

export default Notification;
