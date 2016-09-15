import React, {Component} from 'react';

import {
  View, Text, WebView
} from 'react-native';

import {
  Icon, IconToggle
} from 'react-native-material-design';

import AppStore from '../stores/AppStore';

const redirect_uri = 'https://login.live.com/oauth20_desktop.srf';
const url = 'https://login.live.com/oauth20_authorize.srf';
const access_url = 'https://login.live.com/oauth20_token.srf';
const client_id = 'c65cc1c3-1f3f-4cec-b4e8-8f0afa505a5a';
const scope = 'office.onenote_update_by_app%20wl.signin%20wl.offline_access';
const secret = '2Tkm83pXTTTHx4oMuUzCQC7';

let authorizationCode = null;

export default class Accounts extends Component {

  _getLiveLoginUri () {
    return `https://login.live.com/oauth20_authorize.srf?client_id=${client_id}&scope=${scope}&response_type=code&redirect_uri=${redirect_uri}`
  }

  _onNavStateChange (navState) {
    if (!navState) {
      return;
    }

    var url = navState['url'];
    if (!url) {
      return;
    }

    console.log('auth url', url);

    if (url.indexOf(`${redirect_uri}?code`) !== -1 && authorizationCode === null) {
      authorizationCode = url.split('code=')[1];
      console.log('auth code', authorizationCode);
      var derp = encodeURIComponent('https://login.live.com/oauth20_desktop.srf');
      var poo = `client_id=${client_id}&client_secret=${secret}&redirect_uri=${derp}&grant_type=authorization_code&code=${authorizationCode}`;
      var tokenUrl = 'https://login.live.com/oauth20_token.srf';
      /*var headers = {
       'Content-Type': 'application/x-www-form-urlencoded'
       };*/
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      //var body = `client_id=${client_id}&client_secret=${secret}&redirect_uri=https://login.live.com/oauth20_desktop.srf&grant_type=authorization_code&code=${authorizationCode}`;

      var body = {
        client_id: client_id,
        redirect_uri: redirect_uri,
        client_secret: secret,
        code: authorizationCode,
        grant_type: 'authorization_code'
      };
      var json = JSON.stringify(body);

      var opt = {
        method: 'POST',
        headers: headers,
        body: poo
      };

      fetch(tokenUrl, opt)
        .then((response) => {
          if (response.ok) {
            console.log('ok response', response)
          } else {
            console.log('not ok response', response)
            console.log('json\'d', response.json());
          }
        })
        .then((err) => {
          console.log('fetching', err);
        })
        .then((err) => {
          console.log('fetching', err);
        })
    }

  }

  /*
   if (url.indexOf(`${redirect_uri}?code`) !== -1 && authorizationCode === null) {
   // have an authorization code
   authorizationCode = url.split('code=')[1];
   //this._setAccessToken(authorizationCode);
   var headers = {
   'Accept': 'application/json',
   'Content-Type': 'application/x-www-form-urlencoded'
   };
   var re = 'https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf';
   var body = {
   client_id: client_id,
   redirect_uri: re,
   client_secret: secret,
   code: authorizationCode,
   grant_type: 'authorization_code'
   };
   var formData = new FormData();
   for (var b in body) {
   formData.append(b, body[b]);
   }
   console.log('1)formData', formData);

   var tester = `https://login.live.com/oauth20_token.srf?client_id=${client_id}&client_secret=${secret}&redirect_uri=https://login.live.com/oauth20_desktop.srf&grant_type=authorization_code&code=${authorizationCode}`;

   //var shit = `client_id=${client_id}&redirect_uri=${re}&client_secret=${secret}&code=${authorizationCode}&grant_type=authorization_code`;
   var options = {
   method: 'POST',
   };

   fetch(tester, options)
   .then((response) => {
   if (response && response.ok) {
   console.log(response)
   return response.json();
   } else {
   console.log('error with response', response);
   }
   })
   .catch((error) => {
   console.log('error caught fetching', error);
   })
   }
   */

  _setAccessToken (authCode) {
    var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    var body = {
      client_id: client_id,
      redirect_uri: redirect_uri,
      client_secret: secret,
      code: authCode,
      grant_type: 'authorization_code'
    };
    var json = JSON.stringify(body);
    var method = 'POST';
    var options = {
      method: method,
      headers: headers,
      body: json
    };

    fetch(url, options)
      .then((response) => {
        if (response && response.ok) {
          return response.json();
        } else {
          console.log('error with response', response);
        }
      })
      .then((json) => {
        this._setToken(json);
      })
      .catch((error) => {
        console.log('error caught fetching', error);
      })
  }

  _setToken (response) {
    console.log(response);
  }

  render () {
    var uri = this._getLiveLoginUri();
    return (
      <WebView source={{uri: uri}}
               ref={component => this._webView = component}
               onNavigationStateChange={this._onNavStateChange}
               scalesPageToFit={true}
               startInLoadingState={true}
               style={{flex: 1}}/>
    );
  }
}

const styles = {
  addressBar: {
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 14
  }
};