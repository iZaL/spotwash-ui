/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/actions/orders';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import BidsDetail from "customer/bids/components/BidsDetail";
import {ScrollView} from "react-native";
import I18n from 'utils/locale';
import Button from 'components/Button';

class BidsDetailScene extends PureComponent {

  componentDidMount() {
    let params = {
      order_id: this.props.navigation.state.params.orderID,
    };
    this.props.dispatch(ORDER_ACTIONS.fetchBids(params));
  }

  onBidConfirmPress = () => {
    let params = {
      order_id: this.props.bid.order.id,
      bid_id: this.props.bid.id,
      company_id: this.props.bid.company.id,
    };
    this.props.dispatch(ORDER_ACTIONS.confirmBid(params));
  };

  render() {
    let {bid} = this.props;
    let {order} = bid;
    let buttonComponent;

    if (!order.confirmed) {
      buttonComponent = <Button title={I18n.t('accept_bid')} onPress={this.onBidConfirmPress} style={{marginVertical: 40}}/>;
    } else {
      buttonComponent = <Button title={I18n.t('bid_closed')} onPress={this.makeBid} style={{marginVertical: 40}}  disabled={true}/>
    }

    return (
      <ScrollView style={{flex: 1}}>
        <BidsDetail bid={bid} />
        {buttonComponent}
      </ScrollView>

    );
  }
}

const makeMapStateToProps = () => {
  const getBidsByID = ORDER_SELECTORS.getBidsByID();
  const mapStateToProps = (state, props) => {
    return {
      bid: getBidsByID(state, {
        orderID:props.navigation.state.params.orderID,
        bidID:props.navigation.state.params.bidID,
      }),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(BidsDetailScene);
