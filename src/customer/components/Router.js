import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';
import Settings from 'customer/components/Settings';
import DrawerIcon from 'components/DrawerIcon';
import CreateOrder from "customer/orders/CreateOrder";
import BidsListScene from "customer/bids/BidsListScene";
import BidsDetailScene from "customer/bids/BidsDetailScene";
import colors from 'assets/theme/colors';
import BackButton from "../../components/BackButton";

const navStyle = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
  },
};

const AuthStack = createStackNavigator(
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
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
    // initialRouteName:'RegisterScreen'
  },
);


const HomeStack = createStackNavigator({
    Home: {
      screen: Home,

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
  },
  {
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      ...navStyle,
    }),
    // initialRouteName:'Cart'
  },
);

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
  },
});

const DrawerRoutes = {
  HomeStack: {screen: HomeStack},
  SettingsStack: {screen: SettingsStack},
  AuthStack: {screen: AuthStack},
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
