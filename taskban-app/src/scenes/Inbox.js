import React, {Component, PropTypes} from 'react';
import {View, Text, Image, IntentAndroid, ScrollView, StyleSheet} from 'react-native';
import { Card, Button, TYPO, PRIMARY_COLORS, COLOR } from 'react-native-material-design';
import AppStore from '../stores/AppStore';
import TabBar from './../components/TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Inbox extends Component {

    static contextTypes = {
        navigator: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            theme: ''
        };
    }

    componentDidMount(){
        AppStore.listen(this._changeTheme);

        this._changeTheme(AppStore.getState().theme);
    }

    componentWillUnmount(){
        AppStore.unlisten(this._changeTheme);
    }

    _changeTheme(theme){
        if (theme){
            this.setState({theme: COLOR[`${theme}700`].color})
        }
    }

    render() {
        const { navigator } = this.context;
        return (
            <ScrollableTabView style={{marginTop: 10}}
                               renderTabBar={() => <TabBar />}>
                <ScrollView tabLabel="schedule" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Backlog</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="list" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>In Progress</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="done" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Done</Text>
                    </View>
                </ScrollView>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});
