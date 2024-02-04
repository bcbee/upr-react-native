import firebase from 'react-native-firebase';
import * as DeviceActions from '../../actions/DeviceActions';
import { store } from '../../../App';

let onTokenRefreshListener;
let messageListener;
let notificationDisplayedListener;
let notificationListener;

async function AppDidStart() {
  if (!store) throw 'No store found';
  console.log('UPRKit - App Started');

  await SetUpAuth();
  await SetUpMessaging();

  console.log('UPRKit - Setup Complete');
}

async function SetUpAuth() {
  const credential = await firebase.auth().signInAnonymously();
  if (credential) {
    console.log('default app user ->', credential.user.toJSON());
    store.dispatch(DeviceActions.SetCredential(credential));
  } else {
    console.error('no credential');
  }
}

async function SetUpMessaging() {
  onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
    console.log('token generated ->', fcmToken);
    store.dispatch(DeviceActions.SetFCMToken(fcmToken));
  });

  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    // user has a device token
    console.log('has token ->', fcmToken);
    store.dispatch(DeviceActions.SetFCMToken(fcmToken));
  } else {
    // user doesn't have a device token yet
    console.error('no messaging token');
  }

  const messagingEnabled = await firebase.messaging().hasPermission();
  if (messagingEnabled) {
    // user has permissions
    console.log('User has FCM permissions');
  } else {
    // user doesn't have permission
    console.log('User does not have FCM permissions');
    await RequestMessagePermissions();
  }

  messageListener = firebase.messaging().onMessage(message => {
    console.log(`Recieved message - ${JSON.stringify(message)}`);
  });

  notificationDisplayedListener = firebase
    .notifications()
    .onNotificationDisplayed(notification => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log(`Recieved notification 1`);
    });
  notificationListener = firebase
    .notifications()
    .onNotification(notification => {
      // Process your notification as required
      console.log(`Recieved notification 2`);
    });
}

async function RequestMessagePermissions() {
  console.log('Requesting FCM permission');
  await firebase
    .messaging()
    .requestPermission()
    .catch(err => console.err(err));
}

export default { AppDidStart };
