/**
 * 公益组织
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    StatusBar,
    Dimensions,
    BackHandler,
    WebView,
    ToastAndroid,
    TextInput,
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titles:"",
            canGoBack:false,
            canGoForward:false,
            url: "",
            loading: false,
            event:"",

            weburl:"",
        };
        this.webview=null;
        this.onMessage=null;
    }

    componentDidMount(){
        this.setState({
            weburl:this.props.url,
        })
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.props;
        if (this.state.canGoBack&&navigator) {
            this.refs._webView.goBack();//返回上一个页面
            return true;//true 系统不再处理 false交给系统处理
        }else if(navigator){
            navigator.pop();
            return true;
        }
        return false;
    };

    render() {//<Text>{this.state.event}</Text>
        let url1="http://www.82190555.com/video.php?url="+this.state.weburl;
        let url2="http://lykezhan.com/vip/";
        let url3="http://jx.2012net.com/index.php?url="+this.state.weburl;
        let url4="http://api.haitian.tv/vip/11.php?url="+this.state.weburl;
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
            <View style={styles.container}>
                <View style={styles.webstyle}>
                    <WebView
                        ref="_webView"
                        injectedJavaScript={patchPostMessageJsCode}
                        onMessage={this._onMessage.bind(this)}
                        styles={{flex:1}}
                        source={{uri: url4}}
                        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                        onError = {this._onError.bind(this)}
                        startInLoadingState={true}
                        //domStorageEnabled={true}
                        javaScriptEnabled={true}
                        mediaPlaybackRequiresUserAction={false}
                        scrollEnabled={false}
                        //scalesPageToFit={true}
                        //saveFormDataDisabled={true}
                        automaticallyAdjustContentInsets={true}
                        //contentInset={{top:-140,left:0,bottom:0,right:0}}
                    />
                </View>
            </View>
        );
    }

    /*
    <StatusBar
                    animated
                    hidden
                />
    <StatusBar
                    backgroundColor={"#000"}
                    barStyle="light-content"
                />
    */

    /*====与webview交互====*/
    _onMessage(event){
        //let Json = JSON.parse(event.nativeEvent.data);
        alert(event.nativeEvent.data);
    }

    /*====webview加载失败====*/
    _onError(){

    }

    /*===webview跳转页面信息===*/
    _onNavigationStateChange(event){
        this.setState({
            titles: event.title,                //WebView跳转地址title
            canGoBack: event.canGoBack,         //WebView能否返回
            url: event.url,                     //WebView跳转地址url
            loading: event.loading,             //WebView加载中
            canGoForward: event.canGoForward,   //WebView能否前进
            event:JSON.stringify(event),        //WebView event
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        //alignItems:"center",
    },
    webstyle:{
        flex:1,
        //width:width,
        //height:height,
    },
});
