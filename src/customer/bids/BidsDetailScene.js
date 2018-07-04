/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import BidsDetail from 'customer/bids/components/BidsDetail';
import {ScrollView} from 'react-native';
import I18n from 'utils/locale';
import Button from 'components/Button';
import ConfirmedButton from '../../components/ConfirmedButton';
import OrderBasicInfo from '../orders/components/OrderBasicInfo';
import OrderItems from '../orders/components/OrderItems';

class BidsDetailScene extends PureComponent {
  componentDidMount() {
    this.props.dispatch(
      ORDER_ACTIONS.fetchBids({
        order_id: this.props.navigation.getParam('orderID'),
      }),
    );
  }

  onBidConfirmPress = () => {
    let params = {
      order_id: this.props.order.id,
      bid_id: this.props.bid.id,
      company_id: this.props.bid.company.id,
    };
    this.props.dispatch(ORDER_ACTIONS.confirmBid(params));
  };

  render() {
    let {bid, order} = this.props;

    let buttonComponent;

    if (order && order.bid_open) {
      buttonComponent = (
        <ConfirmedButton
          raised
          primary
          title={I18n.t('accept_bid')}
          onPress={this.onBidConfirmPress}
          style={{marginVertical: 40}}
        />
      );
    } else {
      buttonComponent = (
        <Button
          raised
          primary
          title={I18n.t('bid_closed')}
          style={{marginVertical: 40}}
          disabled={true}
        />
      );
    }

    return (
      <ScrollView style={{flex: 1}}>
        {bid && <BidsDetail bid={bid} />}

        <OrderBasicInfo item={order} />
        <OrderItems order={order} />

        {buttonComponent}
      </ScrollView>
    );
    return null;
  }
}

const makeMapStateToProps = () => {
  const getBidsByID = ORDER_SELECTORS.getBidsByID();
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.getParam('orderID')),
      bid: getBidsByID(state, {
        orderID: props.navigation.getParam('orderID'),
        bidID: props.navigation.getParam('bidID'),
      }),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(BidsDetailScene);
