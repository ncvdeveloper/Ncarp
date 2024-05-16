import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChartScreen from '../Screens/Charts/ChartScreen';
import ChatScreen from '../Screens/Chat/ChatScreen';
import Reports from '../Screens/Reports/Reports';
import Profile from '../Screens/Profile/Profile';
import { scaleHeight, scaleWidth } from '../Constants/dynamicSize';
import { COLORS } from '../Constants/colors';
import { Image, View,Platform } from 'react-native';
import { IMAGES } from '../Constants/images';
import { Divider } from 'react-native-elements';
import DrawerSceneWrapper from '../Components/DrawerSceneWrapper';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <DrawerSceneWrapper>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarBackground: () => {
              return (
                <Image source={IMAGES.bottombg} style={{ width: '110%', height: '100%', alignSelf: 'center' }} resizeMode='cover' />
              )
            },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <>
                  {focused &&
                    <Divider style={{ width: '90%',top: Platform.OS === 'ios' ?  6 : -6, backgroundColor: COLORS.GREY, height: scaleHeight(6), borderRadius: scaleHeight(6), bottom: Platform.OS === 'ios' ? scaleHeight(5) : scaleHeight(10)}} />}
                  <View style={{
                    height: scaleHeight(45),
                    width: scaleWidth(45),
                    backgroundColor: focused ? COLORS.WHITE : 'transparent',
                    alignItems: 'center',
                    borderRadius: scaleHeight(65),
                    justifyContent: 'center',
                    top: Platform.OS === 'ios' ?  10 : 0
                  }}>
                    <Image
                      source={
                        route.name === 'Home' && focused ? IMAGES.blackhome : route.name === 'Home' && !focused ? IMAGES.housesolid
                        : route.name === 'Chat'
                          ? IMAGES.bot
                          : route.name === 'Report' && !focused ? IMAGES.report : route.name === 'Report' && focused ? IMAGES.report_solid 
                          : route.name === 'ProfileNew' && !focused
                            ? IMAGES.user : route.name === 'ProfileNew' && focused ? IMAGES.blackuser : IMAGES.housesolid 
                      }
                      resizeMode='contain'
                      style={{
                        height: route.name === 'Chat' ? scaleHeight(30) : scaleHeight(25),
                        width: route.name === 'Chat' ? scaleWidth(28) : scaleWidth(25),
                      }}
                    />
                  </View>
                </>
              );
            },
            tabBarActiveTintColor: COLORS.BGCOLOR,
            tabBarInactiveTintColor: COLORS.GREY,
            tabBarLabelStyle: {
              fontSize: scaleWidth(18),
              right: scaleWidth(10),
            },
            tabBarStyle: {
              height: scaleHeight(65),
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.HEADER
            },
          })}
        >

          <Tab.Screen
            name="Home"
            component={ChartScreen}
            options={{ title: 'Home', headerShown: false }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: 'Chat', headerShown: false }}
          />
           <Tab.Screen
            name="Report"
            component={Reports}
            options={{ title: 'Report', headerShown: false }}
          />
          <Tab.Screen
            name="ProfileNew"
            component={Profile}
            options={{ title: 'Profile', headerShown: false }}
          />
        </Tab.Navigator>
      </View>
    </DrawerSceneWrapper>
  );
}