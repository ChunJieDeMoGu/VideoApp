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
    Linking,
    ListView,
    ActivityIndicator,
    Button,
    WebView,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const mp4 = "http://127.0.0.1:8020/%E5%88%86%E6%9C%9F%E8%BD%A6%E9%99%A9/mp4/background.mp4";
const mp41 = "http://7xvl2z.com1.z0.glb.clouddn.com/nigg2.mp4";
const WEBVIEW_REF = 'webview';

export default class Mp4view extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event:null,
        };
    }

    componentWillMount() {

    }


    render() {
        const patchPostMessageFunction = () => {
            const originalPostMessage = window.postMessage;
            const patchedPostMessage = (message, targetOrigin, transfer) => {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            window.postMessage = patchedPostMessage;
        };
        const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;
        return (
            <View style={styles.co}>
                <View style={styles.wv}>
                    <WebView
                        ref={WEBVIEW_REF}
                        injectedJavaScript={patchPostMessageJsCode}
                        automaticallyAdjustContentInsets={false}
                        style={styles.webView}
                        source={{uri: mp41}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                        startInLoadingState={true}
                        mixedContentMode="always"
                        allowsInlineMediaPlayback={true}
                    />
                </View>

                <Text></Text>
            </View>
        );
    }

    onNavigationStateChange(event) {
        this.setState({
            event:event,
        })
    }

}

const styles = StyleSheet.create({
    co:{
        flex:1,
    },
    webView:{
        flex:1,
    },
    wv:{
        width:width,
        height:300,
    }
});
