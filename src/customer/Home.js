import React, {Component} from 'react';
import {Dimensions, Image, ScrollView} from 'react-native';
import images from 'assets/theme/images';
import HomeActionButtons from 'customer/components/HomeActionButtons';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import StandingOrdersList from 'customer/orders/components/StandingOrdersList';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/actions/orders';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchStandingOrders());
  }

  onCreateOrderPress = () => {
    this.props.navigation.navigate('CreateOrder');
  };

  onFindNearByCompaniesPress = () => {};

  onViewAllOrdersListPress = () => {};

  onStandingOrderListItemPress = (item: Object) => {
    this.props.navigation.navigate('BidsList', {
      order: item,
    });
  };

  render() {
    let {orders} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <Image
          source={images.home_bg}
          style={{width: Dimensions.get('window').width, height: 250}}
          resizeMode="cover"
        />

        <HomeActionButtons
          onCreateOrderPress={this.onCreateOrderPress}
          onFindNearByCompaniesPress={this.onFindNearByCompaniesPress}
        />

        <Separator
          style={{backgroundColor: colors.mediumGrey, marginHorizontal: 10}}
        />

        <StandingOrdersList
          items={orders}
          onItemPress={this.onStandingOrderListItemPress}
          activeItemID={0}
          onViewAllPress={this.onViewAllOrdersListPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: ORDER_SELECTORS.getOrders(state),
  };
}

export default connect(mapStateToProps)(Home);
