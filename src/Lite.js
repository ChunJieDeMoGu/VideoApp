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
} from 'react-native';
//import RefreshableListView from 'react-native-refreshable-listview';
import * as CacheManager from 'react-native-http-cache';
const {width, height} = Dimensions.get('window');

export default class Lite extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            bytes:null,
            KiB:null,
            MiB:null,
        };
    }

    componentWillMount() {
        this.getCacheSize();
    }

    getCacheSize(){
        CacheManager.getCacheSize().then(
            (data)=>{
                this.setState({
                    bytes:data,
                    KiB:data/1024,
                    MiB:(data/1024)/1024
                })
            }
        )
    }

    onButtonPress(){
        CacheManager.clearCache().then((data)=>{
            Alert.alert(null,"缓存已清空!");
            this.getCacheSize();
        })
    }

    render() {
        return (
            <View style={styles.co}>
                <Text></Text>
                <Text>{this.state.bytes} bytes</Text>
                <Text>{this.state.KiB} KiB</Text>
                <Text>{this.state.MiB} MiB</Text>
                <Button
                    onPress={()=>{this.onButtonPress()}}
                    title="This looks great!"
                    accessibilityLabel="This sounds great!"
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
