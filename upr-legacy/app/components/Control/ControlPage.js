import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Button from '../General/Button';
import UPRKit from '../../libraries/UPRKit';

export default class ControlPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Control',
      headerLeft: (
        <Button
          onPress={() => navigation.goBack(null)}
          icon="chevron-left"
          isHeaderBack={true}
        />
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#330033" />
        <Button title="Media" style={styles.button} textStyle={styles.buttonText} onPress={() => UPRKit.Session.PlayMedia()} />
        <Button title="Previous" style={styles.button} textStyle={styles.buttonText} onPress={() => UPRKit.Session.SlideDown()} />
        <Button title="Next" style={styles.button} textStyle={styles.buttonText} onPress={() => UPRKit.Session.SlideUp()} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  button: {
    alignSelf: 'stretch',
    flex: 1,
    margin: 15,
  },
  buttonText: {
    fontSize: 40
  }
});
