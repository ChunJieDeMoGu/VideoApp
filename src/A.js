/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    ToastAndroid,
    BackHandler,
    Platform,
    Dimensions,
} from 'react-native';
import Video from './lfhvideo/Video';
const {width, height} = Dimensions.get('window');

export default class A extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.co}>
                <Video
                    url={require('./mp4/background.mp4')}
                    style={styles.ss}
                    //width={width}
                    //height={height/2}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    co:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    vo:{
        //width:width,
        alignItems:"center",
        justifyContent:"center",
        //borderWidth:1,
    },
    ss:{
        width:width,
        height:height/2,
        //backgroundColor:"#4e4e4e",
    },
});
