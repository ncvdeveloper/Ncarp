import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import Splash from '../Screens/Auth/Splash';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import DashBoard from '../Screens/DashBoard/DashBoard';
import ChatScreen from '../Screens/Chat/ChatScreen';
import Profile from '../Screens/Profile/Profile';
import Notification from '../Screens/Notification/Notification';
import Message from '../Screens/Notification/Message';
import OnboardingScreen from '../Screens/OnboardingScreen/OnboardingScreen';
import Weather from '../Screens/Chat/Weather';
import WindMill from '../Screens/WindMill/WindMill';
import BottomTab from './BottomTab';
import SideTab from './SideTab';

const Stack = createNativeStackNavigator();
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DashBoard"
        component={DashBoard}
        options={{ headerShown: false }}
      />
     
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Weather"
        component={Weather}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="WindMill"
        component={WindMill}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
     
      
        <Stack.Screen
        name="SideTab"
        component={SideTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;