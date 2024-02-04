import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import InstructionPage from './InstructionPage';
import Button from '../General/Button';
import InstructionImage from './Instruction-3.png';

export default class Instruction1 extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Instructions',
      headerLeft: (
        <Button
          onPress={() => navigation.goBack()}
          icon="chevron-left"
          isHeaderBack={true}
        />
      )
    }
  };

  render() {
    return (
      <InstructionPage 
      text="Once the remote has successfully connected, open your presentation. You should now be able to control it using your iPhone, iPad, iPod Touch or Apple Watch. If you have any issues connecting or presenting, do not hesitate to contact our support team at support@dbztech.com."
      image={InstructionImage}
      next=""
      navigation={this.props.navigation}
      />
    );
  }
}
