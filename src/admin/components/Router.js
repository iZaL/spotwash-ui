import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'admin/components/Drawer';
import Home from 'admin/Home';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
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
  Login: {
    screen: Login,
  },
};

export const Router = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
