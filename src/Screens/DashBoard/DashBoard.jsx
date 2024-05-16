import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  BackHandler,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../Constants/colors';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/dynamicSize';
import { IMAGES } from '../../Constants/images';
import { Divider, Icon } from 'react-native-elements';
import { FONTS } from '../../Constants/fonts';
import { APIRequest } from "../../Utils/ApiRequest";
import { projectlist } from "../../Utils/APIEndPoints";
import { userDetails } from '../../Redux/ReduxSlice/authSlice'
import { useDispatch, useSelector } from "react-redux";

const DashBoard = ({ navigation }) => {

  const [projectdata, setprojectData] = useState([])
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    handleDashboard()
  }, []);


  const handleDashboard = async () => {
    setLoading(true)
    try {
      let url = `http://sustainos.ai:10000/global_master_app/api/project_list/`
      let result = await APIRequest.getGetService(url);
      const updatedProjects = result.map((item) => formatDatesInProject(item));
      setprojectData(updatedProjects)
      setLoading(false)
    }
    catch (error) {
      console.error("An error occurred:");
    }
  }

  function formatDatesInProject(project) {
    function formatDate(dateString) {
      if (dateString) {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          const options = { day: '2-digit', month: 'short', year: 'numeric' };
          return date.toLocaleDateString('en-US', options);
        } else {
          console.error(`Invalid date: ${dateString}`);
        }
      }
      return dateString;
    }

    return {
      ...project,
      created_on: formatDate(project.created_on),
      modified_on: formatDate(project.modified_on),
    };
  }

  const [searchshow, setsearchshow] = useState(false)

  const handlenavigation = async (item) => {
    await dispatch(userDetails({ key: "projectName", value: item.name }));
    navigation.navigate("SideTab")
  }


  return (
    <SafeAreaView style={styles.container1}>
      <StatusBar backgroundColor={COLORS.HEADER} />
      <View style={styles.container}>
        {!searchshow ?
          <View style={styles.headerbox}>

            <Text style={styles.title}>sustainability - Events</Text>
            <TouchableOpacity style={styles.icon} onPress={() => setsearchshow(!searchshow)}>
              <View>
                <Icon name={"search"} type='feather' size={scaleWidth(30)} color={COLORS.WHITE} style={styles.iconAlign} />
              </View>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.bgsearch}>
            <View style={styles.searchboxcontainer}>
              <View style={styles.searchbox}>
                <TextInput style={styles.searchboxinput} placeholder='eg: sustainability' />
              </View>
              <View style={{ flex: 0.18 }}>
                <TouchableOpacity onPress={() => setsearchshow(!searchshow)}>
                  <Icon name={"cancel"} type='materialicon' size={scaleWidth(35)} color={COLORS.WHITE} style={styles.iconAlign} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        {loading ?
          <View style={styles.loading}>
            <ActivityIndicator size={scaleHeight(30)} color={COLORS.HEADER} />
          </View> :
          <View style={styles.flatlistview}>
            <FlatList
              data={projectdata}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => {
                return (
                  <View style={styles.itembox}>
                    <View style={styles.header}>
                      <Image source={IMAGES.logo12} style={styles.logo} />
                      <Text style={styles.itemtitle}>
                        {item.item.name}
                      </Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.details}>
                      <View style={styles.created}>
                        <Text style={styles.createdText}>Created on: </Text>
                        <Text style={styles.values}>{item.item.created_on}</Text>
                      </View>
                      <Divider style={styles.divider} />
                      <View style={styles.created}>
                        <Text style={styles.createdText}>Modified on: </Text>
                        <Text style={styles.values}>{item.item.modified_on}</Text>
                      </View>
                      <Divider style={styles.divider} />
                      <View style={[styles.created]}>
                        <Text style={styles.createdText}>Description: </Text>
                        <Text style={styles.values}>{item.item.name}</Text>
                      </View>

                    </View>
                    <TouchableOpacity onPress={() => handlenavigation(item.item)} activeOpacity={0.9}>
                      <View style={styles.viewbox}>
                        <Text style={styles.view}>
                          View Page
                        </Text>

                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }}
              contentContainerStyle={styles.flatlistcontainer} />
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  },
  container1: {
    flex: 1,
    backgroundColor: COLORS.HEADER,
    paddingbottom: 0
  },
  title: {
    textAlign: 'center',
    fontSize: normalizeFont(24),
    fontWeight: '700',
    color: COLORS.WHITE,
    flex: 1,
    fontFamily: FONTS.NUNITOSANSMEDIUM
  },
  flatlistview:
  {
    margin: scaleWidth(10),
    borderRadius: scaleHeight(5)
  },
  chartdivider: {
    height: scaleWidth(2),
    backgroundColor: COLORS.BGCOLOR
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scaleHeight(10)
  },
  box: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BGCOLOR,
    borderWidth: scaleWidth(2),
  },
  menuIcon: {
    height: scaleHeight(40),
    width: scaleWidth(40),
    tintColor: COLORS.WHITE
  },
  itemtitle: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
    color: COLORS.BGCOLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  view: {
    fontSize: normalizeFont(16),
    fontWeight: 'bold',
    fontFamily: FONTS.NUNITOSANSBOLD,
    color: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    // marginLeft: scaleWidth(10)
  },
  titlebox: {
    backgroundColor: COLORS.BGCOLOR,
    height: scaleHeight(40)
  },
  itembox: {
    height: scaleHeight(200),
    borderColor: COLORS.GREY,
    marginHorizontal: scaleWidth(3),
    marginVertical: scaleHeight(10),
    marginBottom: scaleHeight(20),
    backgroundColor: COLORS.WHITE,
  },
  details: {
    width: '100%',
    height: scaleHeight(120),
  },
  logo: {
    height: scaleHeight(50),
    width: scaleWidth(80)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewbox: {
    backgroundColor: COLORS.HEADER,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: scaleHeight(40),
    flexDirection: 'row',
    alignSelf: 'center'
  },
  divider: {
    height: scaleHeight(0.5),
    backgroundColor: COLORS.GREY,
    width: '100%'
  },
  created: {
    flexDirection: 'row',
    margin: scaleHeight(7),
    alignContent: 'center',
    alignItems: 'center',
  },
  createdText: {
    fontSize: normalizeFont(16),
    fontWeight: 'bold',
    fontFamily: FONTS.NUNITOSANSBOLD,
    color: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  values: {
    fontSize: normalizeFont(14),
    fontFamily: FONTS.NUNITOSANSREGULAR,
    color: COLORS.DARKGREY
  },
  searchboxcontainer: {
    flex: 1,
    flexDirection: 'row'
  },
  searchbox: {
    height: scaleHeight(40),
    borderWidth: scaleHeight(1),
    borderColor: COLORS.WHITE,
    borderRadius: scaleHeight(2),
    flex: 0.95,
    backgroundColor: COLORS.WHITE,
    marginLeft: scaleWidth(25),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchboxinput: {
    height: '120%',
    borderRadius: scaleHeight(2),
    width: '100%',
    marginLeft: scaleWidth(15),
    fontFamily: FONTS.NUNITOSANSREGULAR,
    textAlign: 'left',
  },
  bgsearch: {
    flexDirection: 'row',
    height: scaleHeight(50),
    backgroundColor: COLORS.HEADER,
    alignItems: 'center',
    alignContent: 'center'
  },
  headerbox: {
    flexDirection: 'row',
    height: scaleHeight(50),
    backgroundColor: COLORS.HEADER,
    alignItems: 'center'
  },
  iconAlign: {
    marginRight: scaleWidth(15)
  },
  icon: {
  },
  flatlistcontainer: {
    paddingBottom: scaleHeight(100)
  },
  loading: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '50%'
  },
});

export default DashBoard;