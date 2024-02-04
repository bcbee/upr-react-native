import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Logo from './Icon.png';
import Banner from './Banner.png';

export default class LoginPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Image source={Banner} style={styles.banner} resizeMode="contain" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    flex: 1,
    margin: 10
  },
  banner: {
    height: 50
  }
});
