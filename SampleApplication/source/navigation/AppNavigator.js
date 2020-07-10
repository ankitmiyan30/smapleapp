import React, { Component } from 'react';
import { Image} from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Helper from '../helper/Helper';
import DashBoardScreen from '../screens/DashBoardScreen';
import ImageDetailsviewScreen from '../screens/ImageDetailsviewScreen'

const MainStack = createStackNavigator({
  DashBoardScreen: {
    screen: DashBoardScreen,
    navigationOptions: {
      headerTitle: 'DASHBOARD',
      headerBackTitle: null,
      headerTitleStyle: { fontWeight: 'bold' },
      headerTintColor: Helper.COLOR.HEADERTINTCOLOR,
      headerStyle: {
        backgroundColor: Helper.COLOR.TITLEBARBACKGROUND,
      },
      headerTitleStyle: {
        color: Helper.COLOR.HEADERTINTCOLOR,
        textAlign: 'center'
      },
    },
  },
  ImageDetailsviewScreen: {
    screen: ImageDetailsviewScreen,
    navigationOptions: {
      headerTitle: 'Download',
      headerBackTitle: null,
      headerTitleStyle: { fontWeight: 'bold' },
      headerTintColor: Helper.COLOR.HEADERTINTCOLOR,
      headerStyle: {
        backgroundColor: Helper.COLOR.TITLEBARBACKGROUND,
      },
      headerTitleStyle: {
        color: Helper.COLOR.HEADERTINTCOLOR,
        
      },
    },
  },
}, {
  initialRouteName: 'DashBoardScreen'
})

const SwitchNavigator = createSwitchNavigator(
  {
    MainStack: MainStack,
  },
  {
    initialRouteName: 'MainStack'
  }
)
const App = createAppContainer(SwitchNavigator);

export default App;
