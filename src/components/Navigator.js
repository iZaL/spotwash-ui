import React, {Component} from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {Router as AdminRouter} from 'admin/components/Router';
import {Router as DriverRouter} from 'driver/components/Router';
import {Router as CompanyRouter} from 'company/components/Router';
import {Router as CustomerRouter} from 'customer/components/Router';
import {Router as GuestRouter} from 'guest/components/Router';
import NavigatorService from 'components/NavigatorService';

export default class Navigator extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.user.id !== nextProps.user.id;
  }

  static defaultProps = {
    user: {},
  };

  resolveScreenForUser = userType => {
    switch (userType) {
      case 10:
        return 'Driver';
      case 20:
        return 'Company';
      case 100:
        return 'Admin';
      default:
        return 'Customer';
    }
  };

  render() {
    let {user, logout} = this.props;

    const AppNavigator = createSwitchNavigator(
      {
        Guest: {screen: GuestRouter},
        Admin: {screen: AdminRouter},
        Driver: {screen: DriverRouter},
        Company: {screen: CompanyRouter},
        Customer: {screen: CustomerRouter},
      },
      {
        headerMode: 'none',
        initialRouteName: user.id
          ? this.resolveScreenForUser(user.type)
          : 'Customer',
      },
    );

    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{user, logout}}
      />
    );
  }
}
