import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { normalizeFont, scaleHeight, scaleWidth } from '../Constants/dynamicSize';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../Constants/colors';
import { FONTS } from '../Constants/fonts';
import { IMAGES } from '../Constants/images'

const CustomDropDown = (props) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(props.array);
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = props.array.filter(item =>
            item.name?.toLowerCase().includes(query?.toLowerCase())
        );
        setFilteredOptions(filtered);
    };
    return (
        <View>
            <Dropdown
                style={styles.inputcontainerdropdown}
                placeholderStyle={styles.dropinputSearchStyle}
                selectedTextStyle={styles.inputSearchStyle}
                containerStyle={styles.dropdownctainer}
                itemTextStyle={styles.dropdowntextstyle}
                iconStyle={styles.Avatar1}
                data={props?.array}
                maxHeight={300}
                labelField="name"
                valueField="id"
                renderItem={(item) => props?.renderItem(item)}
                placeholder={props?.placeholder}
                value={props?.value}
                onFocus={props?.onFocus}
                onChange={props?.onChange}
                search={props?.search}
                searchPlaceholder="Search"
                inputSearchStyle={styles.search}
                renderRightIcon={()=>
                <Image
                source={IMAGES.down} style={{height: scaleHeight(18), width: scaleWidth(18),right: scaleWidth(10)}} resizeMode='contain'/>
                }

            />
        </View>
    )
}

export default CustomDropDown;

const styles = StyleSheet.create({
    inputcontainerdropdown: {
        height: scaleHeight(35),
        opacity: 1,
        borderColor: COLORS.BORDERCOLOR,
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: scaleHeight(2)
    },
    dropdowntextstyle: {
        color: COLORS.GREY,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: '200',
        marginLeft: scaleWidth(15),
    },
    dropinputSearchStyle: {
        color: COLORS.ASH,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(12),
        fontWeight: 'normal',
        marginLeft: scaleWidth(15),
    },
    dropdownctainer: {
        padding: scaleWidth(5),
        opacity: 1,
    },
    inputSearchStyle: {
        color: COLORS.LIGHT_BLACK,
        fontFamily: FONTS.NUNITOSANSMEDIUM,
        fontSize: normalizeFont(14),
        fontWeight: 'normal',
        marginLeft: scaleWidth(15),
    },

    Avatar1: {
        height: scaleHeight(30),
        width: scaleWidth(30),
        color: COLORS.BLACK,
    },
    search: {
        height: scaleHeight(35),
        alignItems: 'center',
        fontSize: normalizeFont(12)
    }
});