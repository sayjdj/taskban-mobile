import React, {Component, PropTypes} from 'react';
import {View, Text, Image} from 'react-native';

import {Avatar, Drawer, Divider, COLOR, TYPO} from 'react-native-material-design';

export default class Navigation extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      route: null
    }
  }

  changeScene = (path, name) => {
    const {drawer, navigator} = this.context;

    this.setState({
      route: path
    });
    navigator.to(path, name);
    drawer.closeDrawer();
  };

  render () {
    const {route} = this.state;

    return (
      <Drawer theme='dark'>
        <Drawer.Header image={<Image source={require('./../img/indoor_gravity.jpeg')}/>}>
          <View style={styles.header}>
            <Text style={[styles.text, {fontSize:32, fontWeight:'bold', color:'#FFFFFF'}]}>TaskBan</Text>
          </View>
        </Drawer.Header>

        <Drawer.Section
          items={[{
                        icon: 'inbox',
                        value: 'Inbox',
                        active: !route || route === 'inbox',
                        onPress: () => this.changeScene('inbox'),
                        onLongPress: () => this.changeScene('inbox')
                    }, {
                        icon: 'date-range',
                        value: 'Calendar',
                        label: '10',
                        active: route === 'calendar',
                        onPress: () => this.changeScene('calendar'),
                        onLongPress: () => this.changeScene('calendar')
                    }]}
        />

        <Divider style={{ marginTop: 8 }}/>

        <Drawer.Section
          items={[{
                        icon: 'assignment',
                        value: 'Projects',
                        label: '10',
                        active: route === 'projects',
                        onPress: () => this.changeScene('projects'),
                        onLongPress: () => this.changeScene('projects')
                    }, {
                        icon: 'label',
                        value: 'Labels',
                        label: '10',
                        active: route === 'labels',
                        onPress: () => this.changeScene('labels'),
                        onLongPress: () => this.changeScene('labels')
                    }
        ]}/>

        <Divider style={{ marginTop: 8 }}/>

        <Drawer.Section
          items={[{
                        icon: 'palette',
                        value: 'Themes',
                        label: '10',
                        active: route === 'themes',
                        onPress: () => this.changeScene('themes'),
                        onLongPress: () => this.changeScene('themes')
            }, {
                        icon: 'settings',
                        value: 'Settings',
                        label: '10',
                        active: route === 'settings',
                        onPress: () => this.changeScene('settings'),
                        onLongPress: () => this.changeScene('settings')
            }

        ]}/>


      </Drawer>
    );
  }
}

const styles = {
  header: {
    paddingTop: 16
  },
  text: {
    marginTop: 20
  }
};