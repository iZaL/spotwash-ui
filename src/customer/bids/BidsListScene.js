/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import BidsList from 'customer/bids/components/BidsList';
import Card from 'components/Card';
import I18n from 'utils/locale';
import Dialog from 'components/Dialog';

class BidsListScene extends PureComponent {
  componentDidMount() {
    this.props.dispatch(
      ORDER_ACTIONS.fetchBids({
        order_id: this.props.navigation.getParam('orderID', 7),
      }),
    );
  }

  state = {
    bidClosedDialogVisible: false,
  };

  onBidListItemPress = (bid: object) => {
    this.props.navigation.navigate('BidsDetail', {
      orderID: this.props.order.id,
      bidID: bid.id,
    });

    // if(!this.props.order.bid_open) {
    //   this.setState({
    //     bidClosedDialogVisible:true
    //   });
    // }
  };

  render() {
    let {order} = this.props;
    let {bidClosedDialogVisible} = this.state;
    return (
      <View style={{flex: 1}}>
        {order && order.bids && order.bids.length ? (
          <BidsList items={order.bids} onItemPress={this.onBidListItemPress} />
        ) : (
          <Card content={I18n.t('waiting_for_bids')} />
        )}

        <Dialog
          title={I18n.t('bidding_closed')}
          rightPress={() => this.setState({bidClosedDialogVisible: false})}
          rightText={I18n.t('ok')}
          visible={bidClosedDialogVisible}
        />
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.getParam('orderID', 7)),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(BidsListScene);
