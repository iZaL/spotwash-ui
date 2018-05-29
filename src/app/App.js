import PropTypes from 'prop-types';
import React, {Component} from 'react';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';
import CodePush from 'react-native-code-push';
import PushNotificationManager from 'app/components/PushNotificationManager';
import Notification from 'app/components/Notification';
import Navigator from 'components/Navigator';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS} from 'app/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {CODE_PUSH_ENABLED} from 'utils/env';

class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (CODE_PUSH_ENABLED) {
      CodePush.sync();
    }
    this.props.dispatch(ACTIONS.boot());
  }

  onLanguageSelect = name => {
    this.props.dispatch(ACTIONS.setLanguage(name));
    this.props.dispatch(ACTIONS.setInstalled());
  };

  setPushToken = token => {
    this.props.dispatch(ACTIONS.setPushToken(token));
  };

  dismissNotification = () => {
    this.props.dispatch(ACTIONS.dismissNotification());
  };

  logout = () => {
    this.props.dispatch(USER_ACTIONS.logout());
  };

  render() {
    const {app, isAuthenticated, userType} = this.props;

    if (!app.booted) return null;

    if (!app.installed) {
      return <LanguageSelectScene onItemPress={this.onLanguageSelect} />;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        {app.notifications.message && (
          <Notification
            message={app.notifications.message}
            messageType={app.notifications.messageType}
            dismissNotification={this.dismissNotification}
          />
        )}

        <PushNotificationManager setPushToken={this.setPushToken} />

        <Navigator
          isAuthenticated={isAuthenticated}
          userType={userType}
          logout={this.logout}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    isAuthenticated: state.user.isAuthenticated,
    userType: state.user.type,
  };
}

export default connect(mapStateToProps)(App);
