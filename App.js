import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class App extends React.Component {

  testFunction() {
    console.log("Test")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button title="Hello" onPress={this.testFunction} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StackNavigator({
  Home: {
    screen: App,
  },
});