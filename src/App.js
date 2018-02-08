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
import Video from './Video';
import Video1 from './Video1';
const {width, height} = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastClickTime:null,
            url: "http://v.youku.com/v_show/id_XMTM4MTI0NjkwNA==.html",
        };
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
        let now = new Date().getTime();
        if (now - this.state.lastClickTime < 2500) {
            //2.5秒内点击后退键两次推出应用程序
            return false;//控制权交给原生
        }
        this.setState({
            lastClickTime:now,
        });
        ToastAndroid.show("再按一次退出！",ToastAndroid.SHORT);
        return true;
    };

    render() {
        return (
            <View style={styles.co}>
                <View style={styles.vo}>
                    <TextInput
                        onChangeText={(text)=>{
                            this.setState({
                                url:text,
                            })
                        }}
                        //maxLength={11}
                        underlineColorAndroid="transparent"
                        //keyboardType="numeric"
                        placeholder="请输入播放地址"
                        placeholderTextColor="#6e6e6e"
                        style={styles.in}
                    />
                </View>
                <TouchableOpacity
                    onPress={()=>{this.go()}}
                    style={styles.bo}
                >
                    <Text style={styles.te}>解 码</Text>
                </TouchableOpacity>
            </View>
        );
    }

    go(){
        if(this.state.url){
            const {navigator} = this.props;
            navigator.push({
                name: 'vip',
                component: Video,
                params: {
                    url:this.state.url,
                }
            })
        }else{
            Alert.alert(null,"地址不能为空",
                [
                    {text: 'OK', onPress: () => console.log('Ask me later pressed')},
                ]
            )
        }
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
    bo:{
        width:100,
        height:50,
        backgroundColor:"#3ea0eb",
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
    },
    te:{
        fontSize:22,
    },
    in:{
        width:300,
        height:50,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#4e4e4e",
        textAlign:"center",
        marginBottom:10,
        //alignItems:"center",
    },
});

AppRegistry.registerComponent('VideoApp', () => VideoApp);
