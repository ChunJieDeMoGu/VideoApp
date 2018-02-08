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
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');

export default class Video1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weburl:"",
        };
        this.loadStart=this.loadStart.bind(this);
        this.setDuration=this.setDuration.bind(this);
        this.setTime=this.setTime.bind(this);
        this.onEnd=this.onEnd.bind(this);
        this.videoError=this.videoError.bind(this);
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
        if(navigator){
            navigator.pop();
            return true;
        }
        return false;
    };

    render() {//<Text>{this.state.event}</Text>
        let url1="http://www.82190555.com/video.php?url="+this.props.url;
        let url2="http://lykezhan.com/vip/";
        let url3="http://27.148.163.76/v.cctv.com/flash/mp4video6/TMS/2011/01/05/cf752b1c12ce452b3040cab2f90bc265_h264818000nero_aac32-1.mp4?wsrid_tag=5a542c4a_qzhdx81_5524-58583&wsiphost=local";
        let url4="http://api.haitian.tv/vip/11.php?url="+this.props.url;
        return (
            <View style={styles.container}>
                <View style={styles.webstyle}>
                    <Video source={{uri: url3}} // 视频的URL地址，或者本地地址，都可以.
                           rate={1.0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                           volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                           muted={false}                // true代表静音，默认为false.
                           paused={false}               // true代表暂停，默认为false
                           resizeMode="cover"           // 视频的自适应伸缩铺放行为，
                           repeat={true}                // 是否重复播放
                           playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
                           playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                           onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
                           onLoad={this.setDuration}    // 当视频加载完毕时的回调函数
                           onProgress={this.setTime}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                           onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
                           onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                           style={styles.backgroundVideo} />
                </View>
            </View>
        );
    }

    loadStart(){

    }

    setDuration(){

    }

    setTime(){

    }

    onEnd(){
        alert("1111");
    }

    videoError(err){
        alert(JSON.stringify(err.error));
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
