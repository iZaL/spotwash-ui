import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Map from 'customer/Map';
import Settings from 'guest/Settings';
import CreateOrder from 'customer/orders/CreateOrder';
import DrawerIcon from 'components/DrawerIcon';
import BackButton from 'components/BackButton';
import OrderDetailScene from 'customer/orders/OrderDetailScene';
import TrackOrderScene from 'customer/orders/TrackOrderScene';
import Cart from 'customer/cart/Cart';
import TrackDetailScene from 'customer/orders/TrackDetailScene';
import PastOrdersScene from 'customer/orders/PastOrdersScene';
import UpcomingOrdersScene from 'customer/orders/UpcomingOrdersScene';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import LanguageSelect from 'app/LanguageSelect';
import BidsListScene from 'customer/bids/BidsListScene';
import BidsDetailScene from 'customer/bids/BidsDetailScene';
import TrackScene from 'customer/orders/TrackScene';
import Payment from 'customer/cart/Payment';

const getDrawerIcon = navigation => {
  return {
    headerLeft: <DrawerIcon onPress={() => navigation.toggleDrawer()} />,
  };
};

const cardStyle = {
  backgroundColor: '#f5f5f5',
};

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

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: TrackScene,
      navigationOptions: ({navigation}) => ({
        // title: I18n.t('customer_home'),
        ...getDrawerIcon(navigation),
      }),
    },
    CreateOrder: {
      screen: CreateOrder,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('create_order'),
      }),
    },
    OrderDetail: {screen: OrderDetailScene},
    BidsList: {
      screen: BidsListScene,
      navigationOptions: ({navigation}) => ({
        headerTitle: I18n.t('bids'),
      }),
    },
    BidsDetail: {screen: BidsDetailScene},
    TrackOrder: {
      screen: TrackOrderScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('track_order'),
      }),
    },
    Track: {
      screen: TrackScene,
    },
    Cart: {
      screen: Cart,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('cart'),
      }),
    },
    Login: {
      screen: AuthStack,
      navigationOptions: ({navigation}) => ({
        headerLeft: <BackButton onPress={() => navigation.goBack(null)} />,
      }),
    },
    TrackDetail: {
      screen: TrackDetailScene,
    },
    PastOrders: {screen: PastOrdersScene},
    UpcomingOrders: {screen: UpcomingOrdersScene},
    Map: {
      screen: Map,
    },
    LanguageSelect: {
      screen: LanguageSelect,
    },
    Payment: {
      screen: Payment,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      ...navStyle,
    }),
    cardStyle: {
      ...cardStyle,
    },
    // initialRouteName:'BidsList'
    // initialRouteName:'Track'
  },
);

const PastOrdersStack = createStackNavigator(
  {
    PastOrders: {
      screen: PastOrdersScene,
      navigationOptions: ({navigation}) => {
        return {
          ...getDrawerIcon(navigation),
          title: I18n.t('past_orders'),
        };
      },
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);

const UpcomingOrdersStack = createStackNavigator(
  {
    UpcomingOrders: {
      screen: UpcomingOrdersScene,
      navigationOptions: ({navigation}) => {
        return {
          ...getDrawerIcon(navigation),
          title: I18n.t('upcoming_orders'),
        };
      },
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
      }),
    },
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);

const DrawerRoutes = {
  HomeStack: {screen: HomeStack},
  SettingsStack: {screen: SettingsStack},
  PastOrdersStack: {screen: PastOrdersStack},
  UpcomingOrdersStack: {screen: UpcomingOrdersStack},
  // AuthStack:{
  //   screen:AuthStack
  // }
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
