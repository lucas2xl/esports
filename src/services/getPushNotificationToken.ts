import * as Notification from "expo-notifications";

export const getPushNotificationToken = async () => {
  const { granted } = await Notification.requestPermissionsAsync();

  if (!granted) {
    await Notification.requestPermissionsAsync();
  }

  if (granted) {
    const { data } = await Notification.getExpoPushTokenAsync();
    console.log({ data });
    return data;
  }
};
