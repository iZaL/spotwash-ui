import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Settings from 'customer/components/Settings';
import CreateOrder from 'customer/orders/CreateOrder';
import DrawerIcon from 'components/DrawerIcon';
import BackButton from 'components/BackButton';
import BidsListScene from 'customer/bids/BidsListScene';
import BidsDetailScene from 'customer/bids/BidsDetailScene';

const AuthStack = StackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    RegisterScreen: {
      screen: Register,
    },
    ForgotScreen: {
      screen: Forgot,
    },
  },
  {
    headerMode: 'none',
  },
);

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
  CreateOrder: {screen: CreateOrder},
  BidsList: {screen: BidsListScene},
  BidsDetail: {screen: BidsDetailScene},
  Login: {
    screen: AuthStack,
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackButton onPress={() => navigation.goBack(null)} />,
    }),
  },
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
});

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  SettingsStack: {screen: SettingsStack},
};

export const Router = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
