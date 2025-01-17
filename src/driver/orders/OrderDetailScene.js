/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'driver/selectors/orders';
import {ScrollView, Text, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import PropTypes from 'prop-types';
import OrderTotal from 'customer/orders/components/OrderTotal';
import CustomerInfo from 'driver/components/CustomerInfo';
import SectionHeading from 'company/components/SectionHeading';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import Button from 'components/Button';
import MapButtons from 'driver/orders/components/MapButtons';
import BackgroundGeolocation from 'react-native-background-geolocation';
import GEOLOCATION_CONFIG from 'utils/background-geolocation';
import {API_URL, NETWORK_PROTOCOL} from 'utils/env';
import {SELECTORS as AUTH_SELECTORS} from "guest/common/selectors";

class OrderDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  static defaultProps = {
    order: {},
  };

  componentDidMount() {
    let {order,profile} = this.props;
    let {job} = order;

    this.props.dispatch(
      DRIVER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );

    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('http', this.onHttp);

    // BackgroundGeolocation.configure(
    //   {
    //     ...GEOLOCATION_CONFIG,
    //     url: `http://${API_URL}/jobs/${job.id}/update/location`,
    //   },
    //   state => {
    //     return {
    //       enabled: this.props.order.trackeable,
    //     };
    //   },
    // );

    BackgroundGeolocation.ready(
      {
        ...GEOLOCATION_CONFIG,
        reset: true,
        locationAuthorizationRequest: 'Always',
        url: `${NETWORK_PROTOCOL}${API_URL}/jobs/${job.id}/update/location`,
        params: {
          driver_id: profile.id,
        },
      },

      state => {
        if (!state.enabled && order.trackeable) {
          BackgroundGeolocation.start();
        }

        return {
          enabled: job.status === 'driving',
        };
      },
    );

  }

  onLocation = location => {
    console.log('location', location);
  };

  onHttp = response => {
    console.log('[event] http: ', response);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.order && nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  uploadImages = () => {
    this.props.navigation.navigate('PhotosUpload', {
      orderID: this.props.order.id,
      jobID: this.props.order.job.id,
    });
  };

  startDriving = () => {
    let {job} = this.props.order;
    BackgroundGeolocation.start();
    BackgroundGeolocation.getCurrentPosition().then(location => {
      let {latitude, longitude} = location.coords;
      this.props.dispatch(
        DRIVER_ACTIONS.startDriving(job.id, {
          latitude: latitude,
          longitude: longitude,
        }),
      );
    });
  };

  stopDriving = () => {
    let {job} = this.props.order;
    BackgroundGeolocation.stop();
    BackgroundGeolocation.getCurrentPosition().then(location => {
      let {latitude, longitude} = location.coords;
      this.props.dispatch(DRIVER_ACTIONS.stopDriving(job.id, {
          latitude: latitude,
          longitude: longitude,
        })
      );
    });
  };

  startWorking = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.startWorking(job.id));
  };

  stopWorking = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.stopWorking(job.id));
  };

  render() {
    let {order,profile} = this.props;
    let {address, job} = order;
    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentContainerStyle={{paddingBottom: 50}}>
        {order.packages && (
          <View>
            <OrderBasicInfo item={order} />
            <OrderItems order={order} />
            <OrderTotal total={order.total} />
            {order.user && (
              <View>
                <SectionHeading title={I18n.t('customer_info')} />
                <CustomerInfo user={order.user} />
              </View>
            )}

            <Divider style={{marginBottom: 10}} />

            <SectionHeading title={I18n.t('address')} />
            {job && (
              <View>
                <MapButtons
                  address={address}
                  startDriving={this.startDriving}
                  stopDriving={this.stopDriving}
                  startWorking={this.startWorking}
                  stopWorking={this.stopWorking}
                  jobStatus={job.status}
                />
                <Divider style={{marginBottom: 10}} />

                {order.trackeable && (
                  <Button
                    raised
                    onPress={this.uploadImages}
                    title={I18n.t('upload_images')}
                  />
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
      orders: ORDER_SELECTORS.getUpcomingOrders(state),
      profile: AUTH_SELECTORS.getAuthUserProfile(state),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(OrderDetailScene);
