import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
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
import colors from "assets/theme/colors";

const getDrawerIcon = navigation => {
  return {
    headerLeft: (
      <DrawerIcon onPress={() => navigation.openDrawer()} />
    ),
  };
};


const navStyle = {
  headerTintColor: colors.primary,
  headerStyle: {
    // borderBottomWidth: 0,
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
  },
);

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      ...getDrawerIcon(navigation),
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
},{
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false,
    ...navStyle,
  }),
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      ...getDrawerIcon(navigation),
    }),
  },
});

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  SettingsStack: {screen: SettingsStack},
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
