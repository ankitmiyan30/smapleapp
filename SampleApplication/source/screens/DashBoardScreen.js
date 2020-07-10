
import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight, ImageBackground } from 'react-native'
import PropTypes from 'prop-types';
const { Background_Image1 } = IMAGES;
import IMAGES from '../helper/images';
import Helper from '../helper/Helper';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image'
class DashBoardScreen extends Component {

  //Cunstructors
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      randomUserData: [],
      loadingExtraData: false,
      page: 0
    };
  }

  componentDidMount() {
    this.loadImageData();
  }

  loadPaginationData = () => {
    this.setState({
      page: this.state.page + 1
    }, () => this.loadImageData())
  }

  loadImageData = () => {
    let url = `https://picsum.photos/v2/list?page=${this.state.page}&limit=10`
    fetch(url).
      then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          randomUserData: this.state.page === 1 ? responseJson : [...this.state.randomUserData, ...responseJson]
        })
      }).catch(error => {
        console.log('Errot Fetching Image List ' + error)
      })
  }

  // UI Render function
  render() {
    // All stylesheet constants declared
    const {
      container,
      itemContainer,
      itemCardView,
      itemImage,
      autherNameView,
      autherNameText,

    } = styles;

    return (
      <ImageBackground source={Background_Image1} style={container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.isLoading}
          //Text with the Spinner 
          textContent={'Please wait...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
          size={'large'}
          color='#084968'
        />

        <FlatList
          data={this.state.randomUserData}
          renderItem={({ item }) =>
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('ImageDetailsviewScreen', {
                  imageUrl: item.download_url,
                })
              }
              underlayColor="rgba(255,255,255,0.3)"
            >
              <View style={itemContainer}>
                <View style={itemCardView}>
                  {/* <Image
                    style={itemImage}
                    source={{ uri: item.download_url }}
                  /> */}
                  <FastImage
                    style={itemImage}
                    source={{
                      uri: item.download_url,
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  >
                  </FastImage>
                </View>
                <View style={autherNameView}>
                  <Text style={autherNameText}>{item.author}</Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={({ id }, index) => id}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadPaginationData}
        />
      </ImageBackground>
    );
  }
}
export default DashBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    borderRadius: 4,
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'gray',
    shadowOpacity: 1.0,
    marginLeft: Helper.MARGIN.HEADERTITLELEFTMARGIN,
    marginRight: Helper.MARGIN.HEADERTITLERIGHTMARGIN,
    marginTop: 12,
    marginBottom: 8,
  },
  itemCardView: {
    height: 90,
    width: 120,
    marginLeft: Helper.MARGIN.HEADERTITLELEFTMARGIN,
    borderColor: Helper.COLOR.TEXTCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: "100%",
    height: "80%",
    resizeMode: 'stretch',
  },
  autherNameView: {
    height: '60%',
    flexGrow: 1,
    justifyContent: 'center',
    paddingLeft: 8,
    width: '60%'
  },
  autherNameText: {
    color: Helper.COLOR.TEXTCOLOR,
    marginLeft: 4,
    marginRight: 4,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    flexWrap: 'wrap',
    lineHeight: 18,
    textAlign: 'left'
  },
  spinnerTextStyle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'normal'
  }
});