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
    View
} from 'react-native';
import Video from './src/Video';
import App from './src/App';
import A from './src/A';
import Lite from './src/Lite';
import Mp4view from './src/Mp4view';
import Video1 from './src/Video1';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class VideoApp extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: '主页', component: A}}//Main//Login
                configureScene={() => {
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>;
                }}
            />
        );
    }
}

const styles = StyleSheet.create({});

AppRegistry.registerComponent('VideoApp', () => VideoApp);
