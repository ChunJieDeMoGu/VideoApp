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
    ScrollView,
    Alert,
    ProgressViewIOS,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
const {width, height} = Dimensions.get('window');

export default class Video1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            num:0,

            atValue:0,
            seek:0,
            curr:0,
            play:0,

            initial:"11111",//判断横竖屏幕
        };
        this.loadStart=this.loadStart.bind(this);
        this.setDuration=this.setDuration.bind(this);
        this.setTime=this.setTime.bind(this);
        this.onEnd=this.onEnd.bind(this);
        this.videoError=this.videoError.bind(this);
    }


    componentWillMount() {
        // 判断横竖屏幕
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            //do stuff
        } else {
            //do other stuff
        }

        this.setState({
            initial:initial,
        })

        // 只允许竖屏
        //Orientation.lockToPortrait();
        //只允许横屏
        //Orientation.lockToLandscape();
    }

    getProgress() {
        let progress = this.state.progress;
        let curr = this.state.curr;
        let play = this.state.play;
        return curr/play;
    }

    render() {
        let url=this.props.url?this.props.url:{uri: ""};
        return (
            <View style={[styles.container,this.props.style]}>
                <View style={[styles.astyle,this.props.style]}>
                    <Video source={url} // 视频的URL地址，或者本地地址，都可以.
                           rate={1.0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                           volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                           muted={false}                // true代表静音，默认为false.
                           paused={false}               // true代表暂停，默认为false
                           resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain,cover
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
                <View style={styles.opview}>
                    <View style={styles.sdop}>
                        <ProgressViewIOS
                            style={styles.progressView}
                            progressViewStyle="bar"//bar//default
                            progressTintColor="#fff"
                            trackTintColor="#4e4e4e"
                            progress={this.getProgress()}
                        />
                        <View>

                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this._onPressButton.bind(this)}
                >
                    <Text style={{color:"#fff"}}>切屏</Text>
                </TouchableOpacity>
                <Text style={{color:"#fff"}}>{this.state.initial}</Text>

            </View>
        );
    }

    _onPressButton(){
        if (this.state.initial === 'PORTRAIT') {
            //Orientation.lockToLandscape();
            //Orientation.lockToLandscapeLeft();
            Orientation.lockToLandscapeRight();
            this.setState({
                initial:"LANDSCAPE",
            })
        } else {
            Orientation.lockToPortrait();
            this.setState({
                initial:"PORTRAIT",
            })
        }
    }

    videogetInitial(){
        // 判断横竖屏幕
        var initial = Orientation.getInitialOrientation();
        this.setState({
            initial:initial,
        })
    }

    loadStart(){

    }

    setDuration(){

    }

    setTime(num){
        this.setState({
            num:JSON.stringify(num),
            atValue:num.atValue,
            seek:num.seekableDuration,
            curr:num.currentTime,
            play:num.playableDuration,
        })
    }

    onEnd(){
        //alert("1111");
    }

    videoError(err){
        //alert(JSON.stringify(err.error));
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#000",
    },
    astyle:{
        flex:1,
        width:width,
        height:(9/16)*width,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    opview:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    progressView:{
        position: 'absolute',
        left: 0,
        right: 0,
    },
    sdop:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 50,
    },
});
