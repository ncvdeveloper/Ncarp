import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import CustomSidebarMenu from './CustomSidebarMenu';
import { scaleWidth } from '../Constants/dynamicSize';
import { COLORS } from '../Constants/colors';
import HomeScreen from '../Screens/Landing/HomeScreen';
import ChatScreen from '../Screens/Chat/ChatScreen';
import Profile from '../Screens/Profile/Profile';

const Drawer = createDrawerNavigator();
const SideTab = ({ route }) => {
  const fromOTP = route?.params?.fromOTP;
  return (
    <Drawer.Navigator
      // initialRouteName="Bottomtab"
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: COLORS.WHITE,
          width: scaleWidth(180),
        },
        sceneContainerStyle: {
          backgroundColor: COLORS.WHITE,
        }
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Bottomtab"
        component={BottomTab}
        options={{ headerShown: false }}
        initialParams={{ reloadFromOTP: fromOTP }}
      />
      {/* <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ reloadFromOTP: fromOTP }}
      />
      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
        initialParams={{ reloadFromOTP: fromOTP }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
        initialParams={{ reloadFromOTP: fromOTP }}
      /> */}
    </Drawer.Navigator>
  );
};
export default SideTab;