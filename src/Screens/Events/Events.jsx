import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import { APIRequest } from "../../Utils/ApiRequest";
import CustomDropDown from '../../Components/CustomDropDown';
import { IMAGES } from '../../Constants/images';
import { FONTS } from '../../Constants/fonts';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { Divider, Icon, Card, ListItem, Avatar } from 'react-native-elements';

const Events = (props) => {

    const [alertTypes, setAlertTypes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userNames, setUserNames] = useState([]);
    const [value, setValue] = useState(2)
    const [isFocus, setIsFocus] = useState(false)
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

    return (
        <View style={styles.container}>
            <View style={styles.whiteBox}>
                <View style={styles.dropdown}>
                    <Text style={styles.dropdowntextstyle}>Type of Alerts</Text>
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
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setcalendermodal(!calendermodal)}>
                    <View >
                        <Image source={IMAGES.calender} resizeMode='contain' style={{
                            height: scaleHeight(20),
                            width: scaleWidth(20),
                        }} />
                    </View>
                </TouchableOpacity>
                <View style={styles.customdropdown}>
                    <CustomDropDown
                        array={selectedUsers}
                        renderItem={(item, index) => renderUser(item, index)}
                        placeholder={'Select'}
                        onFocus={() => setIsFocus(true)}
                        onChange={(item) => {
                            setValue(item.id);
                        }}
                        search={true}
                    />
                </View>
            </View>
            {calendermodal &&
                <View style={[styles.bookmodalView, {
                    height: scaleHeight(320),
                    width: scaleWidth(160),
                    left: '54%',
                }]}>
                    <FlatList
                        data={filtertime}
                        renderItem={(item, index) => {
                            return (
                                <TouchableOpacity style={[styles.timeView, {
                                    backgroundColor: selectedtime === item.item.name ? COLORS.HEADER : COLORS.WHITE,
                                    borderColor: selectedtime === item.item.name ? COLORS.HEADER : COLORS.GREY,
                                }]} onPress={() => setSelectedtime(item.item.name)}>
                                    <Text style={[styles.timeText, { color: selectedtime === item.item.name ? COLORS.WHITE : COLORS.ASH, }]}>{item.item.name}</Text>
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
export default Events

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
        marginLeft: scaleWidth(10)
    },
    customdropdown: {
        width: scaleWidth(100)
    },
    divider: {
        height: scaleHeight(1),
        backgroundColor: COLORS.GREY
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
        shadowColor: COLORS.ASH,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 2,
        borderColor: COLORS.GREY,
        borderWidth: 0.1
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
        fontSize: normalizeFont(12),
        fontWeight: '800',
    },
    timeText: {
        color: COLORS.ASH,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '800',
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
        backgroundColor: COLORS.HEADER,
        borderRadius: scaleHeight(5)
    },
})