import React, {Component, PropTypes} from 'react';
import {Text, View} from 'react-native';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import AppStore from '../stores/AppStore';
import {MKTextField, MKColor} from 'react-native-material-kit';

const Textfield = MKTextField.textfield()
    .withPlaceholder('Search anything')
    .build();

export default class Toolbar extends Component {

    static contextTypes = {
        navigator: PropTypes.object
    };

    static propTypes = {
        onIconPress: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            title: AppStore.getState().routeName,
            theme: AppStore.getState().theme,
            counter: 0
        };
    }

    _moreToggle = () => {

    };

    componentDidMount = () => {
        AppStore.listen(this.handleAppStore);
    };

    componentWillUnmount() {
        AppStore.unlisten(this.handleAppStore);
    }

    handleAppStore = (store) => {
        this.setState({
            title: store.routeName,
            theme: store.theme
        });
    };

    render() {
        const { navigator } = this.context;
        const { theme } = this.state;
        const { onIconPress } = this.props;

        return (

            <MaterialToolbar
                title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Inbox'}
                primary={theme}
                icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
                onIconPress={() => navigator && navigator.isChild ? navigator.back() : onIconPress()}
                actions={[
                {
                    icon: 'search',
                    onPress: this._toggleSearch
                },
                {
                    icon: 'more-vert',
                }
                ]}
                rightIconStyle={{
                    margin: 10
                }}/>
        );
    }
}
