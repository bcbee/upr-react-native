import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginPage from './LoginPage';
import Instruction1 from '../components/Instructions/Instruction1';
import Instruction2 from '../components/Instructions/Instruction2';
import Instruction3 from '../components/Instructions/Instruction3';
import ControlPage from '../components/Control/ControlPage';

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginPage
    },
    Control: {
      screen: ControlPage
    }
  },
  {
    initialRouteName: 'Login',
    
    defaultNavigationOptions: {
      headerTitleStyle: {
        marginHorizontal: 0
      },
      headerStyle: {
        backgroundColor: '#4b2c4f'
      },
      headerTintColor: '#fff'
    }
  }
);

const InstructionNavigator = createStackNavigator(
  {
    Instruction1: {
      screen: Instruction1
    },
    Instruction2: {
      screen: Instruction2
    },
    Instruction3: {
      screen: Instruction3
    }
  },
  {
    initialRouteName: 'Instruction1',
    //headerMode: 'none'
    defaultNavigationOptions: {
      headerTitleStyle: {
        marginHorizontal: 0
      },
      headerStyle: {
        backgroundColor: '#4b2c4f'
      },
      headerTintColor: '#fff'
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    LoginStack: {
      screen: LoginNavigator
    },
    InstructionStack: {
      screen: InstructionNavigator
    }
  },
  {
    initialRouteName: 'LoginStack',
    mode: 'modal',
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
