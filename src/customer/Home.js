import React, {Component} from 'react';
import {
  AppState,
  Image,
  RefreshControl,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import OrderList from 'customer/components/OrderList';
import colors from 'assets/theme/colors';
import HomeActionButtons from 'customer/components/HomeActionButtons';
import Divider from 'components/Divider';
import SectionHeading from 'company/components/SectionHeading';
import I18n from 'utils/locale';
import images from 'assets/theme/images';

class Home extends Component {
  static defaultProps = {
    upcoming_orders: [],
    working_order: {},
  };

  state = {
    appState: AppState.currentState,
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: colors.secondary,
        borderBottomWidth: 0,
      },
    };
  };

  componentDidMount() {
    this.fetchWorkingOrders();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.fetchWorkingOrders();
    }
    this.setState({appState: nextAppState});
  };

  onCreateOrderPress = () => {
    this.props.navigation.navigate('Track');
  };

  onProtectionPress = () => {};

  onItemTrackPress = (item: Object) => {
    // this.props.navigation.navigate('BidsList', {
    //   order: item,
    //   orderID: item.id,
    // });

    this.props.navigation.navigate('TrackOrder', {
      orderID: item.id,
      order: item,
    });
  };

  onStandingOrderListItemPress = (item: Object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  fetchWorkingOrders = () => {
    this.props.dispatch(
      ORDER_ACTIONS.fetchWorkingOrders({
        force: true,
      }),
    );
  };

  onRefresh = () => {
    this.fetchWorkingOrders();
  };

  render() {
    let {working_order} = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
        }
        refreshing={false}>
        <Image
          source={images.home_bg}
          style={{width: Dimensions.get('window').width, height: 250}}
          resizeMode="cover"
        />

        <HomeActionButtons onCreateOrderPress={this.onCreateOrderPress} />

        <Divider />

        <View>
          <SectionHeading
            title={I18n.t('standing_orders')}
            buttonTitle="view all"
            style={{backgroundColor: 'transparent'}}
          />
        </View>

        <OrderList
          items={working_order}
          onItemPress={this.onStandingOrderListItemPress}
          onItemTrackPress={this.onItemTrackPress}
          onCreateOrderPress={this.onCreateOrderPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    working_order: SELECTORS.getWorkingOrder(state),
  };
}

export default connect(mapStateToProps)(Home);
