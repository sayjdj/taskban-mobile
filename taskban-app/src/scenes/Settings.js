import React, {Component, PropTypes} from 'react';
import {
  View, Text, IntentAndroid,
  InteractionManager, Alert,
  TouchableNativeFeedback, ScrollView
} from 'react-native';
import {Button, Subheader, COLOR, Divider} from 'react-native-material-design';
import Accordion from 'react-native-collapsible/Accordion';
import AppStore from '../stores/AppStore';

const SECTIONS = [
  {
    title: 'Accounts'
  },
  {
    title: 'Test'
  }
];

export default class Settings extends Component {

  static contextTypes = {
    navigator: PropTypes.object.isRequired
  };

  _renderHeader (section) {
    var theme = COLOR[`${AppStore.getState().theme}700`].color;
    return (
      <View style={{flex: 1}}>
        <Divider/>
        <View style={{backgroundColor: `${theme}`, padding: 20}}>
          <Text style={{color: 'white'}}>{section.title}</Text>
        </View>
      </View>
    )
  }

  _renderContent (section, navigator) {
    const theme = AppStore.getState().theme;
    if (section.title === 'Accounts') { // todo: temp
      return (
        <View>
          <Button text="SETUP ONENOTE"
                  value="SETUP ONENOTE"
                  primary={theme}
                  onPress={() => { navigator.forward() }}/>
        </View>
      )
    }
  }

  render () {
    const navigator = this.context;
    return (
      <ScrollView style={{flex: 1}}>
        <Accordion sections={SECTIONS}
                   renderHeader={this._renderHeader}
                   renderContent={(section, nav) => this._renderContent(section, navigator.navigator)}/>
      </ScrollView>
    );
  }

}

const styles = {
  content: {
    padding: 16
  }
};