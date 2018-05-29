import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {Router as AdminRouter} from 'admin/components/Router';
import {Router as DriverRouter} from 'driver/components/Router';
import {Router as CompanyRouter} from 'company/components/Router';
import {Router as CustomerRouter} from 'customer/components/Router';
import {Router as GuestRouter} from 'guest/components/Router';
import NavigatorService from 'components/NavigatorService';

export default class Navigator extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isAuthenticated !== nextProps.isAuthenticated ||
      this.props.userType !== nextProps.userType
    );
    // return false;
  }

  resolveScreenForUser = userType => {
    switch (userType) {
      case 'driver':
        return 'Driver';
      case 'admin':
        return 'Admin';
      case 'company':
        return 'Company';
      default:
        return 'Customer';
    }
  };

  render() {
    let {isAuthenticated, userType, logout} = this.props;

    const screen = this.resolveScreenForUser(userType);
    const AppNavigator = StackNavigator(
      {
        Guest: {screen: GuestRouter},
        Admin: {screen: AdminRouter},
        Driver: {screen: DriverRouter},
        Company: {screen: CompanyRouter},
        Customer: {screen: CustomerRouter},
      },
      {
        headerMode: 'none',
        initialRouteName: isAuthenticated ? screen : 'Customer',
      },
    );

    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{isAuthenticated, logout}}
      />
    );
  }
}
