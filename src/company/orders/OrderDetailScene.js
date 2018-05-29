/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/actions/orders';
import {ACTIONS as DRIVER_ACTIONS} from 'company/actions/drivers';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ScrollView, Text} from "react-native";
import OrderItems from "company/orders/components/OrderItems";
import OrderBasicInfo from "company/orders/components/OrderBasicInfo";
import Button from "components/Button";
import I18n from 'utils/locale';
import FormTextInput from "components/FormTextInput";
import DriverAssign from "company/orders/components/DriverAssign";

class OrderDetailScene extends Component {

  state = {
    amount: 0
  };

  componentDidMount() {
    //
    let {order} = this.props.navigation.state.params;

    let params = {
      order_id: order.id,
    };

    this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
    // this.props.dispatch(ORDER_ACTIONS.fetchBidForOrder(params));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.order.total) {
      this.setState({
        amount:nextProps.order.amount
      });
    }
  }

  makeBid = () => {
    this.props.dispatch(
      ORDER_ACTIONS.makeBid({order_id: this.props.order.id, amount: this.state.amount}),
    );
  };

  cancelBid = () => {
    this.props.dispatch(
      ORDER_ACTIONS.cancelBid({order_id: this.props.order.id}),
    );
  };

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value
    })
  };

  selectDriver = (driver:objct) => {
    this.props.dispatch(
      DRIVER_ACTIONS.assignToOrder({
        order_id: this.props.order.id,
        driver_id:driver.id
      }),
    );
  };

  render() {
    let {order,company} = this.props;

    console.log('order',order);

    let {amount} = this.state;

    let buttonComponent;
    let showTextInput = false;

    console.log('orderconfirmed',order.confirmed);

    if (order.confirmed) {

      console.log('asdasdasd',order.confirmed);

      buttonComponent = <Button title={I18n.t('cannot_bid')} onPress={() => {
      }} style={{marginVertical: 40}} disabled={true}/>;
    } else {
      if (order.has_bidded) {
        buttonComponent = <Button title={I18n.t('cancel_bid')} onPress={this.cancelBid} style={{marginVertical: 40}}
                                  background={'warning'}/>
      } else {
        showTextInput = true;
        buttonComponent = <Button title={I18n.t('make_bid')} onPress={this.makeBid} style={{marginVertical: 40}}/>
      }
    }

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap='always'>

        <OrderBasicInfo item={order}/>

        <OrderItems order={order}/>

        {
          showTextInput &&

          <FormTextInput
            onChangeText={value => this.onFieldChange('amount', value)}
            value={`${amount}`}
            maxLength={40}
            placeholder={I18n.t('bid_price')}
            keyboardType="numeric"
            style={{backgroundColor: 'white', marginHorizontal: 5, padding: 10, textAlign: 'right'}}
          />

        }

        {
          order.confirmed && order.is_owner &&
            <DriverAssign order={order} drivers={company && company.drivers && company.drivers.filter(driver => driver.available) || []} onDriversListItemPress={this.selectDriver}  />
        }

        {buttonComponent}

      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      company:USER_SELECTORS.getUserCompany(state),
      order: getOrderByID(state, props.navigation.state.params.order.id),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(OrderDetailScene);
