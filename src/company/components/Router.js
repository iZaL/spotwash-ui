import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'company/components/Drawer';
import Home from 'company/Home';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';
import OrderDetailScene from "company/orders/OrderDetailScene";

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
  OrderDetailScene: {screen: OrderDetailScene},
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
