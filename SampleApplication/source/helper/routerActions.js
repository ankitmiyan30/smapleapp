import { NavigationActions} from 'react-navigation';
// import default from '../screens/ScanOrderScreen';
import {AsyncStorage} from 'react-native';
import React, { Component} from 'react';
import PropTypes from 'prop-types';
export const resetRouteTo = (routeName, navigation, childRouteName) => {
  const childAction = NavigationActions.navigate(
    {
      routeName: childRouteName,
    },
  );
  const route = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({
        routeName,
        action: childRouteName ? childAction : null,
      }),
    ],
  });
  navigation.dispatch(route);
};



export const navigateTo = (routeName, navigation, params = {}) => {
  // const resetAction = NavigationActions.reset({
  //   index: 0,
  //   actions: [
  //     NavigationActions.navigate({routeName:routeName,params})
      
  //   ]
  // })
  // navigation.dispatch(resetAction);
  navigation.navigate(routeName, params);
};

export const resetRouteToCamera = (routeName, navigation, params={}) => {

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName:routeName,params})

  ]
})
navigation.dispatch(resetAction);
}
