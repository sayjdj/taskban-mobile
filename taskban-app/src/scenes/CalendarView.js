import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Subheader, CheckboxGroup, COLOR, Card} from 'react-native-material-design';
import Calendar from 'react-native-calendar';

import AppStore from '../stores/AppStore';

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class CalendarView extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedDate: ''
    };
  }

  render () {
    const theme = AppStore.getState().theme;

    return (
      <View style={styles.container}>
        <Card style={{backgroundColor:'#f7f7f7', marginBottom: -1}}>
          <Card.Body>
            <Calendar
              ref={cal => this._calendar = cal}
              eventDates={['2016-07-03', '2016-07-05', '2016-07-28', '2016-07-30']}
              showControls
              dayHeadings={customDayHeadings}
              monthNames={customMonthNames}
              titleFormat={'MMMM YYYY'}
              prevButtonText={'Prev'}
              nextButtonText={'Next'}
              onDateSelect={(date) => this.setState({ selectedDate: date })}
              onTouchPrev={() => console.log('Back TOUCH')}     // eslint-disable-line no-console
              onTouchNext={() => console.log('Forward TOUCH')}  // eslint-disable-line no-console
              onSwipePrev={() => console.log('Back SWIPE')}     // eslint-disable-line no-console
              onSwipeNext={() => console.log('Forward SWIPE')}  // eslint-disable-line no-console
            />
            <Text>Selected Date: {this.state.selectedDate} </Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Text>LIST OF TASKS HERE!!!!</Text>
          </Card.Body>
        </Card>
      </View>
    );
  }
}
/*

 */