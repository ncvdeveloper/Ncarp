import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar
} from 'react-native';
import { scaleHeight, normalizeFont, scaleWidth } from '../Constants/dynamicSize';
import { COLORS } from '../Constants/colors';
import { IMAGES } from '../Constants/images';
import { ListItem, Divider, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { APIRequest } from "../Utils/ApiRequest";
import { menuurl } from "../Utils/APIEndPoints";
import { FONTS } from '../Constants/fonts';
import { userDetails } from '../Redux/ReduxSlice/authSlice'
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { useNavigationState } from '@react-navigation/native';

export default function CustomSidebarMenu({ navigation }) {

  const [menuWithGroup, setMenuWithGroup] = useState([])
  const [menuWithoutGroup, setMenuWithoutGroup] = useState([])
  const [openMenuIds, setOpenMenuIds] = useState([]);
  const dispatch = useDispatch();
  const navigationState = useNavigationState(state => state);
  const currentRoute = navigationState.routes[navigationState.index];

  useEffect(() => {
    handleMenu()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      setOpenMenuIds([])
      return () => setOpenMenuIds([]);
    }, [])
  );

  const createMenuObject = (menuItem) => {
    return {
      id: menuItem.id,
      menu_id: menuItem.menu_id,
      parent_id: menuItem.parent_id,
      menu_name: menuItem.menu_name,
      menu_type: menuItem.meny_type,
      group_name: menuItem.group_name,
      icon: menuItem.icon,
      pagelink: menuItem.pagelink,
      sub_menu: menuItem.sub_menu,
    };
  };

  const handleMenu = async () => {
    try {
      let result = await APIRequest.getGetService(menuurl);
      setMenuWithoutGroup(result[0]?.without_group[0])
      setMenuWithGroup(result[0]?.with_group)
      const ele = result[0].without_group[0][0]
      handleMenuToggle(ele.id), 
      handleNavigation(ele)
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const handlelogout = async () => {
    await AsyncStorage.clear()
    navigation.navigate('Login')
  }



  const handleNavigation = async (subSubItem) => {
    let pageLink = subSubItem.pagelink
    await dispatch(userDetails({ key: "pageId", value: pageLink?.id }));
    await dispatch(userDetails({ key: "PageName", value: pageLink?.title }));    // subSubItem?.menu_name === 'Analytics' ? navigation.navigate('Analytics') : navigation.navigate('ChartScreen', { title: subSubItem?.menu_name })
    navigation.navigate('Home', { title: subSubItem?.menu_name, pageId : pageLink?.id })

  }

  const MenuItem = ({ item, onPress, isOpen }) => {
    return (
      <View style={{ marginBottom: scaleHeight(5) }}>
        {item?.group_name && <Text style={styles.group}>{item?.group_name}</Text>}
        <View style={[styles.row, { backgroundColor: isOpen ? COLORS.HEADER : 'transparent' }]}>
          <TouchableOpacity onPress={() => { onPress(item.id), handleNavigation(item) }}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={fas[item?.icon ? item?.icon : "faAngleRight"]} size={scaleWidth(20)} color={isOpen ? COLORS.WHITE : COLORS.BLACK} style={{ marginRight: scaleWidth(10) }} />
              <Text style={[styles.title, { color: isOpen ? COLORS.WHITE : COLORS.BLACK }]}>{item.menu_name}</Text>
            </View>
          </TouchableOpacity>

        </View>
        {isOpen && (
          <FlatList
            data={item.sub_menu}
            keyExtractor={(subItem) => subItem.id.toString()}
            renderItem={({ item: subItem }) => (
              <View>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => onPress(subItem.id)}>
                    <View style={[styles.icon,]}>
                      <FontAwesomeIcon icon={fas[subItem?.icon ? subItem?.icon : "faAngleRight"]} size={scaleWidth(20)} color={COLORS.BLACK} style={{ marginRight: scaleWidth(10) }} />
                      <Text style={styles.subtitle}>{subItem.menu_name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {subItem.sub_sub_menu && subItem.sub_sub_menu.length > 0 && (
                  <FlatList
                    data={subItem.sub_sub_menu}
                    keyExtractor={(subSubItem) => subSubItem.id.toString()}
                    renderItem={({ item: subSubItem }) => (
                      <View>
                        <View style={styles.row}>
                          <TouchableOpacity onPress={() => handleNavigation(subSubItem)}>
                            <View style={[styles.icon, { marginLeft: scaleWidth(60) }]}>
                              <FontAwesomeIcon icon={fas[subSubItem?.icon ? subSubItem?.icon : "faAngleRight"]} size={scaleWidth(20)} color={COLORS.BLACK} style={{ marginRight: scaleWidth(10) }} />
                              <Text style={styles.subsubtitle}>{subSubItem.menu_name}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            )}
          />
        )}
      </View>

    );
  }

  const handleMenuToggle = (menuId) => {
      setOpenMenuIds(menuId);
    
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={COLORS.HEADER} />
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.closeview} onPress={() => navigation?.closeDrawer()}>
              <Image source={IMAGES.close} style={styles.close} />
            </TouchableOpacity>
            <View style={{ marginTop: scaleHeight(30) }}>
              {/*             
            <TouchableOpacity style={styles.closeview} onPress={() => navigation?.navigate('Character3D')}>
            <Text style={styles.subtitle}>{"3D"}</Text>
            </TouchableOpacity> */}

              <FlatList
                data={menuWithGroup}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: scaleHeight(20) }}
                renderItem={({ item }) => (
                  <>
                    <MenuItem
                      item={item[0]}
                      onPress={handleMenuToggle}
                      isOpen={openMenuIds === (item[0].id)}
                    />
                  </>
                )}
              />
              <FlatList
                data={menuWithoutGroup}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: scaleHeight(20) }}
                renderItem={({ item, index }) => (
                  <>

                    <MenuItem
                      item={item}
                      onPress={handleMenuToggle}
                      isOpen={openMenuIds===(item?.id)}
                    />
                  </>
                )}
              />
            </View>
            <TouchableOpacity style={styles.closeview} onPress={() => navigation?.navigate('WindMill')}>
              <Text style={styles.subtitle}>{"WindMill"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutview} onPress={() => handlelogout()}>
              <Icon name="logout" size={scaleWidth(20)} color={COLORS.BLACK} />
              <Text style={styles.logout}>
                Logout
              </Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  logout: {
    textAlign: 'left',
    fontSize: normalizeFont(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    fontFamily: FONTS.NUNITOSANSMEDIUM,
    marginLeft: scaleWidth(10)
  },
  logoutimage: {
    height: scaleHeight(40),
    width: scaleWidth(40),
    tintColor: COLORS.WHITE
  },
  containerfull: {
    backgroundColor: COLORS.HEADER,
    borderBottomColor: COLORS.WHITE,
    height: scaleHeight(80),
  },
  profileimage: {
    height: scaleHeight(50),
    width: scaleWidth(50),
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: scaleWidth(100),
    borderColor: COLORS.WHITE,
    borderWidth: scaleHeight(2),
    alignItems: 'center'
  },
  generalcardtitle: {
    color: COLORS.WHITE,
    fontSize: normalizeFont(18),
    fontWeight: '700',
    fontFamily: FONTS.NUNITOSANSBOLD
  },
  generalcardsubtitle: {
    color: COLORS.WHITE,
    fontSize: normalizeFont(16),
    fontWeight: '500',
    marginLeft: scaleWidth(2),
    marginTop: scaleHeight(5),
    fontFamily: FONTS.NUNITOSANSREGULAR
  },
  positiontitle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: scaleWidth(10)
  },
  divider: {
    height: scaleWidth(2),
  },
  chartdivider: {
    height: scaleWidth(2),
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: normalizeFont(18),
    fontWeight: '600',
    color: COLORS.DARKGREY,
    paddingVertical: scaleHeight(10),
    fontFamily: FONTS.NUNITOSANSMEDIUM
  },
  group: {
    fontSize: normalizeFont(16),
    color: COLORS.HEADER,
    marginLeft: scaleWidth(20),
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    fontFamily: FONTS.NUNITOSANSBOLD,
    fontWeight: 'bold',
    marginVertical: scaleHeight(10)
  },
  subtitle: {
    fontSize: normalizeFont(16),
    color: COLORS.DARKGREY,
    paddingVertical: scaleHeight(10),
    fontFamily: FONTS.NUNITOSANSMEDIUM
  },
  subsubtitle: {
    fontSize: normalizeFont(16),
    color: COLORS.DARKGREY,
    paddingVertical: scaleHeight(10),
    fontFamily: FONTS.NUNITOSANSMEDIUM
  },
  icon: {
    flexDirection: 'row',
    marginLeft: scaleWidth(30),
    alignItems: 'center',
  },
  arrow: {
    height: scaleHeight(30),
    width: scaleWidth(30),
    tintColor: COLORS.HEADER
  },
  logoutview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: scaleHeight(30),
    left: 0,
    right: 0,
    height: scaleHeight(40),
    alignSelf: 'flex-start',
    marginLeft: scaleWidth(20)
  },
  close: {
    height: scaleHeight(20),
    width: scaleWidth(20)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  netCarbo: {
    color: COLORS.GREEN,
    fontSize: normalizeFont(16),
    textAlign: 'center',
    marginLeft: scaleWidth(8),
    fontFamily: FONTS.NUNITOSANSBOLD
  },
  closeview: {
    marginLeft: scaleWidth(25),
    marginTop: scaleHeight(20)
  }

});