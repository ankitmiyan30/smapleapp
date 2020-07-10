
import React from 'react';
import { StyleSheet, ImageBackground, Platform, PermissionsAndroid } from 'react-native';
import Images from '../helper/images';
import { check, request, PERMISSIONS } from 'react-native-permissions';
const { Background_Image } = Images;

class SplashScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    //Permissions check for app in android
    if (Platform.OS == 'android') {
      Promise.all([
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE),
        // …
      ]).then(([p1]) => {
        //All The permission can be shown here.
      });

      async function requestAll() {
        const p1 = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        const p2 = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        return { p1, p2};
      }

      requestAll().then(statuses => console.log(statuses));
    }
  }

  render() {
    return (
      <ImageBackground source={Background_Image} style={styles.container} />
    );
  }
}

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});