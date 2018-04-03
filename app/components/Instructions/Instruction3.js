import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import InstructionPage from './InstructionPage';
import InfoIcon from '../Login/Info.png';

export default class Instruction1 extends React.Component {
  static navigationOptions = {
    title: 'Instructions'
  };

  render() {
    return (
      <InstructionPage 
      text="Hello World 3"
      image={InfoIcon}
      next=""
      navigation={this.props.navigation}
      />
    );
  }
}
