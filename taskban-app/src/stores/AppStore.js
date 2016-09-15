import { AsyncStorage } from 'react-native';
import SplashScreen from '@remobile/react-native-splashscreen';
import alt from '../alt';
import AppActions from '../actions/AppActions';
import StatusBarAndroid from 'react-native-android-statusbar';
import { COLOR } from 'react-native-material-design';

const THEME = '@Storage:theme';

class AppStore {

    constructor() {
        this._loadTheme();

        this.bindListeners({
            handleUpdateTheme: AppActions.UPDATE_THEME
        });
    }

    _loadTheme = () => {
        AsyncStorage.getItem(THEME).then((value) => {
            this.theme = value || 'paperTeal';
            //AppActions.updateTheme(this.theme);
            this._updateStatusBar(value);
            if (SplashScreen){
                SplashScreen.hide();
            }
        });
    };

    _updateStatusBar(theme){
        if (StatusBarAndroid){
            StatusBarAndroid.setHexColor(COLOR[`${theme}700`].color);
        }
    }

    handleUpdateTheme(name) {
        this._updateStatusBar(name);
        this.theme = name;
        AsyncStorage.setItem(THEME, name);
    }

}

export default alt.createStore(AppStore, 'AppStore');