import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-material-design';

const TabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value,}) {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.color = this.iconColor(progress, i)
    });
  },

  iconColor(progress, i) {
   /* var color;
    if (i == 0) {
      color = {	r: 230, g: 74, b: 25}
    } else if (i == 1) {
      color = {	r: 175, g: 180, b: 43}
    } else {
      color = {	r: 56, g: 142, b: 60}
    }
    const red = color.r + (158 - color.r) * progress;
    const green = color.g + (158 - color.g) * progress;
    const blue = color.b + (158 - color.b) * progress;
    return `rgba(${red}, ${green}, ${blue}, .9)`; */
    const red = 191 + (158 - 191) * progress;
    const green = 54+ (158 - 54) * progress;
    const blue = 12 + (158 - 12) * progress;
    return `rgba(${red}, ${green}, ${blue}, .9)`;
  },

  render() {
    return <View style={[styles.tabs, this.props.style]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? 'rgb(38,50,56)' : 'rgb(158,158,158)'}
            ref={(icon) => {
              this.tabIcons[i] = icon;
            }}
          />
        </TouchableOpacity>;
      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

export default TabBar;