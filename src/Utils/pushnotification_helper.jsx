import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await GetFCMToken(); // Corrected to await the function call
  }
}

async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem("fcmtoken");
  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken(); // Corrected to await getToken()
      console.log("tokennn", fcmtoken);
      if (fcmtoken) {
        console.log("fwefwefwf", fcmtoken);
        await AsyncStorage.setItem("fcmtoken", JSON.stringify(fcmtoken));
      }
    } catch (error) {
      console.log("error", error); // Log error message
    }
  }
}

export const NotificationListner=()=>{
  messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('Notification caused app to open from background state:', remoteMessage.notification);
 
  });

  messaging().getInitialNotification()
  .then(remoteMessage => {
    if(remoteMessage){
      console.log("notification caused app to open from quit state:",
      remoteMessage.notification)
    };
  })

  messaging().onMessage(async remoteMessage => {
    console.log("notification on foreground state", remoteMessage)
  })
}

