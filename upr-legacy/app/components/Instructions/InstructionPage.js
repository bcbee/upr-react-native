import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Button from '../General/Button';
import ImagePanel from './ImagePanel';

export default class InstructionPage extends React.Component {
  static propTypes = {
    image: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
    navigation: PropTypes.any.isRequired
  };

  onNextPress = () => {
    const { next, navigation } = this.props;
    if (next !== '') {
      navigation.navigate(next);
    } else {
      navigation.goBack('LoginPage');
    }
  };

  getTitle = () => {
    const { next } = this.props;
    return next !== '' ? "Next" : "Close"
  };

  render() {
    const { image, text, next, navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#330033" />
        <ImagePanel image={image} />
        <ScrollView style={styles.textScrollContainer}>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
        <Button
          title={this.getTitle()}
          style={styles.button}
          onPress={this.onNextPress}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textScrollContainer: {
    flex: 1,
    padding: 15
  },
  text: {
    color: 'black',
    fontFamily: 'SugarcubesRegular',
    fontSize: 17,
  },
  button: {
    margin: 15,
    width: 280,
    height: 50,
    marginBottom: 25
  }
});
