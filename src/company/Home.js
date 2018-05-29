import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
// import {ACTIONS} from 'company/orders/common/actions';
import {ACTIONS as ORDER_ACTIONS} from 'company/actions/orders';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import OrdersList from 'company/orders/components/OrdersList';
import SceneHeading from "components/SceneHeading";
import {SELECTORS as USER_SELECTORS} from "guest/common/selectors";

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchStandingOrders());
  }

  // makeBid = (item: Object, price: string = '100') => {
  //   this.props.dispatch(
  //     ORDER_ACTIONS.makeBid({order_id: item.id, price: price}),
  //   );
  // };

  onOrdersListItemPress = (item:object) => {
    this.props.navigation.navigate('OrderDetailScene',{
      order:item
    });
  };

  loadStandingOrdersScene = () => {
    console.log('load all orders');
  };

  render() {
    const {orders,company} = this.props;

    return (
      <View style={{flex: 1}}>

        <SceneHeading onPress={this.loadStandingOrdersScene}/>

        <OrdersList
          items={orders}
          onItemPress={this.onOrdersListItemPress}
          activeItemID={0}
        />

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: ORDER_SELECTORS.getOrders(state),
  };
}

export default connect(mapStateToProps)(Home);
