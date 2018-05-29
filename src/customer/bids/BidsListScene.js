/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/actions/orders';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import BidsList from 'customer/bids/components/BidsList';
import Card from "components/Card";
import I18n from 'utils/locale';

class BidsListScene extends PureComponent {
  componentDidMount() {
    let {order} = this.props.navigation.state.params;

    let params = {
      order_id: order.id,
    };

    this.props.dispatch(ORDER_ACTIONS.fetchBids(params));
  }

  onBidListItemPress = (item: object) => {
    this.props.navigation.navigate('BidsDetail', {
      orderID:this.props.order.id,
      bidID: item.id
    });
  };

  render() {
    let {order} = this.props;

    return (
      order && order.bids && order.bids.length ?
        <BidsList
          items={order.bids}
          onItemPress={this.onBidListItemPress}
        />
        :
        <Card content={I18n.t('waiting_for_bids')}/>

    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.order.id),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(BidsListScene);
