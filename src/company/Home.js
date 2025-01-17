import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {RefreshControl, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import DriversList from 'driver/components/DriversList';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {ACTIONS as COMPANY_ACTIONS} from 'company/common/actions';
import I18n from 'utils/locale';
import SectionHeading from 'company/components/SectionHeading';
import OrdersList from 'company/orders/components/OrdersList';

class Home extends PureComponent {
  static propTypes = {
    drivers: PropTypes.array.isRequired,
    upcoming_orders: PropTypes.array.isRequired,
    working_orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    drivers: [],
    upcoming_orders: [],
    working_orders: [],
  };

  state = {
    refreshing: false,
  };

  componentDidMount() {
    this.props.dispatch(COMPANY_ACTIONS.fetchUpcomingOrders({force: true}));
    this.props.dispatch(COMPANY_ACTIONS.fetchWorkingOrders({force: true}));
    this.props.dispatch(COMPANY_ACTIONS.fetchPendingBids());
    this.props.dispatch(COMPANY_ACTIONS.fetchConfirmedBids());
    this.props.dispatch(COMPANY_ACTIONS.fetchDrivers());
  }

  // fetchData = () => {
  //   this.props.dispatch(
  //     ORDER_ACTIONS.fetchUpcomingOrders({
  //       force: true,
  //     }),
  //   );
  // };

  _onRefresh = () => {
    // this.setState({refreshing: true});
    // this.fetchData();
    // setTimeout(() => {
    //   this.setState({refreshing: false});
    // }, 1000);
  };

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  addDriver = () => {
    this.props.navigation.navigate('DriverAdd', {
      userType: 'driver',
    });
  };

  onDriversListItemPress = (driver: object) => {
    this.props.navigation.navigate('DriverDetail', {
      driverID: driver.id,
    });
  };

  loadUpcomingOrders = () => {
    this.props.navigation.navigate('UpcomingOrders');
  };

  loadCurrentOrders = () => {
    this.props.navigation.navigate('WorkingOrders');
  };

  loadNewBids = () => {
    this.props.navigation.navigate('WorkingOrders');
  };

  loadAcceptedBids = () => {
    this.props.navigation.navigate('WorkingOrders');
  };

  render() {
    // 1- New Bids
    // 2- Accepted Bids ===> Assign Driver
    // 3- Upcoming Orders ===> After Assigning Driver, But Not Started Working
    // 4- Working Orders ====> Current Working Orders

    const {
      working_orders,
      upcoming_orders,
      drivers,
      pending_bids,
      confirmed_bids,
    } = this.props;

    return (
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <SectionHeading
          title={I18n.t('bids_new')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadNewBids}
        />
        <OrdersList
          items={pending_bids}
          onItemPress={this.onOrdersListItemPress}
        />

        <SectionHeading
          title={I18n.t('bids_accepted')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadAcceptedBids}
        />
        <OrdersList
          items={confirmed_bids}
          onItemPress={this.onOrdersListItemPress}
        />

        <SectionHeading
          title={I18n.t('working_orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadUpcomingOrders}
        />
        <OrdersList
          items={working_orders}
          onItemPress={this.onOrdersListItemPress}
        />

        <SectionHeading
          title={I18n.t('upcoming_orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadUpcomingOrders}
        />
        <OrdersList
          items={upcoming_orders}
          onItemPress={this.onOrdersListItemPress}
        />

        <SectionHeading
          title={I18n.t('list_of_drivers')}
          buttonTitle={I18n.t('driver_add')}
          onButtonPress={this.addDriver}
        />
        <DriversList
          items={drivers}
          onItemPress={this.onDriversListItemPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    upcoming_orders: ORDER_SELECTORS.getUpcomingOrders(state),
    working_orders: ORDER_SELECTORS.getWorkingOrders(state),
    drivers: DRIVER_SELECTORS.getDrivers(state),
    pending_bids: ORDER_SELECTORS.getPendingBids(state),
    confirmed_bids: ORDER_SELECTORS.getConfirmedBids(state),
  };
}

export default connect(mapStateToProps)(Home);
