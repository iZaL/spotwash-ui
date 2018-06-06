import React, {Component} from 'react';
import {
  AppState, Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Dimensions
} from 'react-native';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import StandingOrdersList from 'customer/components/StandingOrdersList';
import colors from 'assets/theme/colors';
import HomeActionButtons from "./components/HomeActionButtons";
import images from 'assets/theme/images';
import Divider from "../components/Divider";

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
    this.props.navigation.navigate('CreateOrder');
  };

  onProtectionPress = () => {};

  onItemTrackPress = (item: Object) => {
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
        refreshing={false}
        >

        <HomeActionButtons
          onCreateOrderPress={this.onCreateOrderPress}
          onFindNearByCompaniesPress={this.onFindNearByCompaniesPress}
        />

        <Divider/>

        <StandingOrdersList
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
