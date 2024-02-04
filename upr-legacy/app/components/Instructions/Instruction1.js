import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import InstructionPage from './InstructionPage';
import Button from '../General/Button';
import InstructionImage from './Instruction-1.png';

export default class Instruction1 extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Instructions',
      headerLeft: (
        <Button
          onPress={() => navigation.goBack(null)}
          icon="x"
          isHeader={true}
        />
      )
    }
  };

  render() {
    return (
      <InstructionPage 
      text="Download the UPR Controller App on the presenting computer. This can be found at universalpresenterremote.com. Once installed, open the application and verify that your computer is connected to the internet."
      image={InstructionImage}
      next="Instruction2"
      navigation={this.props.navigation}
      />
    );
  }
}
