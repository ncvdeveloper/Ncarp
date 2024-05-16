import * as React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/Navigation/MainStack';
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { PaperProvider } from 'react-native-paper';
import { requestUserPermission, NotificationListner } from './src/Utils/pushnotification_helper';
library.add(fas);

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  
  // React.useEffect(() => {
  //   requestUserPermission();
  //   NotificationListner();
  // }, [])
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer >
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}