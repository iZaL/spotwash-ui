import PropTypes from 'prop-types';
import React, {Component} from 'react';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';
import CodePush from 'react-native-code-push';
import PushNotificationManager from 'app/components/PushNotificationManager';
import Notification from 'app/components/Notification';
import Navigator from 'components/Navigator';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS} from 'app/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {CODE_PUSH_ENABLED} from 'utils/env';
import {SELECTORS as USER_SELECTOR} from 'guest/common/selectors';
import NavigatorService from 'components/NavigatorService';
import SplashScreen from "./SplashScreen";

class App extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    if (CODE_PUSH_ENABLED) {
      CodePush.sync();
    }
  }

  componentDidMount() {
    this.props.dispatch(ACTIONS.boot());
  }

  onLanguageSelect = name => {
    this.props.dispatch(ACTIONS.setLanguage(name));
  };

  dismissNotification = () => {
    this.props.dispatch(ACTIONS.dismissNotification());
  };

  logout = () => {
    this.props.dispatch(USER_ACTIONS.logout());
  };

  setPushToken = token => {
    this.props.dispatch(ACTIONS.setPushToken(token));
  };

  loadApp = () => {
    this.props.dispatch(ACTIONS.setInstalled(true));
  };


  onReceivePushNotifications = (notification: object) => {
    let {foreground, data} = notification;
    let navigation = NavigatorService;
    if (!foreground) {
      let {type} = data;
      switch (type) {
        case 'started.working':
        case 'stopped.working':
        case 'started.driving':
        case 'stopped.driving':
          let {order_id} = data;
          return navigation.navigate('OrderDetail', {
            orderID: order_id,
          });
          break;
      }
    }
  };


  render() {
    const {app, notifications, user} = this.props;

    if (!app.booted) return null;

    if (!app.installed) {
      if (app.has_set_language) {
        return (
          <SplashScreen
            onEndReached={this.loadApp}
            onLanguageSelect={this.onLanguageSelect}
          />
        );
      }
      return <LanguageSelectScene onItemPress={this.onLanguageSelect} />;
    }


    return (
      <View style={{flex: 1}}>

        <Notification
          {...notifications}
          dismissNotification={this.dismissNotification}
        />

        <PushNotificationManager
          setPushToken={this.setPushToken}
          onReceiveNotifications={this.onReceivePushNotifications}
        />

        <Navigator
          user={user}
          logout={this.logout}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    notifications: state.notifications,
    user: USER_SELECTOR.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(App);
