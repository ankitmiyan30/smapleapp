import React, { Component } from 'react'
import RNFetchBlob from "rn-fetch-blob";
import { Share, ImageBackground, ActivityIndicator, StyleSheet, Image, Alert, TouchableOpacity, View } from 'react-native';
import Images from '../helper/images';
const { Background_Image1 } = Images;
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image'
// import CameraRoll from "@react-native-community/cameraroll";
class ImageDetailsviewScreen extends React.PureComponent {


    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => {
                return (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity activeOpacity={1.7} onPress={navigation.getParam('share')}>
                            <Image
                                source={require('../assets/img/ic_share.png')}
                                style={{ marginRight: 16, paddingBottom: 8 }}
                            />
                        </TouchableOpacity >
                        <TouchableOpacity activeOpacity={1.7} onPress={navigation.getParam('download')}>
                            <Image
                                source={require('../assets/img/ic_download.png')}
                                style={{ marginRight: 16, paddingBottom: 8 }}
                            />
                        </TouchableOpacity >
                    </View>
                );
            }
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            imageUrlState: '',
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ download: this._onDownloadClick });
        this.props.navigation.setParams({ share: this.onShareClick });
        const { navigation } = this.props;
        const imgUrl = navigation.getParam('imageUrl', '0');
        this.setState({
            imageUrlState: imgUrl
        })
    }

    _onDownloadClick = () => {
        let imgUrl = this.state.imageUrlState
        let newImgUri = imgUrl.lastIndexOf('/');
        let imageName = imgUrl.substring(newImgUri)+".jpg";
        let dirs = RNFetchBlob.fs.dirs;
        let path = dirs.PictureDir + imageName;
        Toast.show('Downloading...', Toast.LONG)
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'jpeg',
            indicator: true,
            IOSBackgroundTask: true,
            path: path,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: path,
                description: 'Image'
            },
        }).fetch("GET", imgUrl).then(res => {
            Toast.show('Download Successfully', Toast.LONG)
        });
    }

    onShareClick = () => {
        const shareOptions = {
            title: 'Share Image',
            message: 'Download this image :   ' + this.state.imageUrlState,
            subject: "image/jpeg"
        };
        Share.share(shareOptions);
    }

    render() {
        return (
            <ImageBackground source={Background_Image1} style={styles.container}>
                <FastImage
                    style={styles.itemImage}
                    source={{
                        uri: this.state.imageUrlState,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                >
                </FastImage>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    itemImage: {
        width: "90%",
        height: "95%",
        resizeMode: 'stretch',
        borderRadius: 4
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
});
export default ImageDetailsviewScreen;