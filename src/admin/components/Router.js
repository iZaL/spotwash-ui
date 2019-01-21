import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Drawer from 'admin/components/Drawer';
import Home from 'admin/Home';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: <DrawerIcon onPress={() => navigation.toggleDrawer()} />,
    }),
  },
});

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  Login: {
    screen: Login,
  },
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
