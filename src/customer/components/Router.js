import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Settings from 'customer/components/Settings';
import DrawerIcon from 'components/DrawerIcon';

const HomeStack = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        // ...getDrawerIcon(navigation),
        headerLeft: (
          <DrawerIcon onPress={() => navigation.openDrawer()} />
        ),
      }),
    },
    // CreateOrder: {screen: CreateOrder},
    // BidsList: {screen: BidsListScene},
    // BidsDetail: {screen: BidsDetailScene},
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
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
