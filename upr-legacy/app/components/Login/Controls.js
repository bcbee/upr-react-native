import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View } from 'react-native';
//import firebase from 'react-native-firebase';
import Button from '../General/Button';
import { SessionStates } from '../../actions/SessionActions';

export default class LoginPage extends React.Component {
  static propTypes = {
    Session: PropTypes.object.isRequired
  };

  GetToken = () => {
    const { Session } = this.props;
    if (Session.token) return Session.token;
    return '...';
  };

  GetButtonTitle = () => {
    const { Session } = this.props;

    switch (Session.state) {
      case SessionStates.DISCONNECTED:
        return 'Connecting...';
        break;
      case SessionStates.WAITING:
        return 'Waiting...';
        break;
      case SessionStates.READY:
        return 'Tap to start!';
        break;
    }
    return 'Waiting...';
  };

  GetButtonDisabled = () => {
    const { Session } = this.props;
    return Session.state !== SessionStates.READY;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.token}>{this.GetToken()}</Text>
        <Text style={styles.prompt}>Enter token on presenting device</Text>
        <Button
          title={this.GetButtonTitle()}
          onPress={() => {
            //firebase.analytics().logEvent('start_presentation', {});
            this.props.navigation.navigate('Control');
          }}
          style={styles.button}
          disabled={this.GetButtonDisabled()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25
  },
  prompt: {
    fontSize: 18,
    height: 30,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'SugarcubesRegular'
  },
  token: {
    fontSize: 38,
    height: 50,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'BatmanForeverAlternate'
  },
  button: {
    margin: 15,
    width: 280,
    height: 50
  }
});
