import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Header from './Header';
import Controls from './Controls';
import Button from '../General/Button';
import UPRKit from '../../libraries/UPRKit';

export default class LoginPage extends React.Component {
  static propTypes = {
    Session: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'UPR: Remote',
      headerRight: (
        <Button
          onPress={() =>
            navigation.navigate({
              routeName: 'InstructionStack',
              key: 'LoginPage'
            })
          }
          isHeader={true}
          icon="info"
        />
      ),
      headerLeft: (
        <Button
          onPress={() => UPRKit.Session.RequestToken()}
          isHeader={true}
          icon="refresh-cw"
        />
      )
    };
  };

  componentWillMount() {
    UPRKit.Session.SubscribeToSessionChanges();
    UPRKit.Session.RequestToken();
  }

  componentWillUnmount() {
    UPRKit.Session.UnsubscribeFromSessionChanges();
  }

  render() {
    const { Session, navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#330033" />
        <Header />
        <Controls Session={Session} navigation={navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
