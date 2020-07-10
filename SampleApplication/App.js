import React from 'react';
import {StyleSheet} from 'react-native';
import MainNavigator from './source/navigation/AppNavigator'
import SplashScreen from './source/screens/SplashScreen'
console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { 
          resolve(
            this.setState({
              isLoading: false
            })
          ) 
        },
        1000
      )
    );
  }

  async componentDidMount() {
    this.performTimeConsumingTask();
  }
  

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <MainNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});