import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS} from 'customer/common/actions';
import MapView from 'react-native-maps';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import images from 'assets/theme/images';
import {SELECTORS} from 'customer/selectors/orders';
import IconFactory from 'components/IconFactory';
import {TouchableRipple} from 'react-native-paper';
import HomeActionButtons from 'customer/components/HomeActionButtons';
import OrderList from 'customer/components/OrderList';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_PADDING = {top: 100, right: 100, bottom: 100, left: 100};

class TrackScene extends PureComponent {
  static propTypes = {
    drivers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    drivers: [],
  };

  state = {
    pauseTrackingUpdate: false,
  };

  componentDidMount() {
    this.props.dispatch(ACTIONS.fetchDrivers());
    this.props.dispatch(ACTIONS.subscribeToDriverTrackings());
    this.fetchWorkingOrders();
  }

  onDriversListItemPress = (driver: object) => {
    this.props.navigation.navigate('DriverDetail', {
      driverID: driver.id,
    });
  };

  onMapLayout = () => {
    // this.map.fitToElements(true);
    // let drivers = [
    //   {
    //     driver_id: 1,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 29.33285,
    //     longitude: 48.05415,
    //   },
    //   {
    //     driver_id: 2,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 29.3195616,
    //     longitude: 47.991724
    //   },
    // ];
    //
    this.map.fitToCoordinates(this.props.drivers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  componentDidUpdate(nextProps) {
    if (this.props.drivers !== nextProps.drivers) {
      if (!this.state.pauseTrackingUpdate) {
        this.onMapLayout();
      }
    }
  }

  resumeTrackingUpdate = () => {
    this.onMapLayout();

    this.setState({
      pauseTrackingUpdate: false,
    });
  };

  pauseTrackingUpdate = () => {
    this.setState({
      pauseTrackingUpdate: true,
    });
  };

  onCreateOrderPress = () => {
    this.props.navigation.navigate('CreateOrder');
  };

  onRefresh = () => {
    this.fetchWorkingOrders();
  };

  fetchWorkingOrders = () => {
    this.props.dispatch(
      ACTIONS.fetchWorkingOrders({
        force: true,
      }),
    );
  };

  onOrderListItemPress = (item: Object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  onItemTrackPress = (item: Object) => {
    this.props.navigation.navigate('BidsList', {
      order: item,
      orderID: item.id,
    });

    // this.props.navigation.navigate('TrackOrder', {
    //   orderID: item.id,
    //   order: item,
    // });
  };

  render() {
    let {orders} = this.props;

    // let origin = {
    //   // latitude: 37.48522,
    //   // longitude: -122.23635,
    //   latitude: 29.3772392006689,
    //   longitude: 47.98511826155676,
    //   heading: 0,
    //   latitudeDelta: LATITUDE_DELTA,
    //   longitudeDelta: LONGITUDE_DELTA,
    // };
    //
    let origin = {
      latitude: 29.378586,
      longitude: 47.990341,
      latitudeDelta: 1,
      longitudeDelta: 1,
    };

    let drivers = [
      {
        driver_id: 1,
        heading: 305.16,
        job_id: '1',
        latitude: 29.33285,
        longitude: 48.05415,
      },
      {
        driver_id: 2,
        heading: 305.16,
        job_id: '1',
        latitude: 29.3195616,
        longitude: 47.991724,
      },
    ];

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
        }
        refreshing={false}>
        {this.state.pauseTrackingUpdate && (
          <TouchableRipple
            onPress={this.resumeTrackingUpdate}
            style={{position: 'absolute', top: 10, right: 10, zIndex: 500}}>
            <IconFactory
              name="arrow-left"
              type="MaterialCommunityIcons"
              color="black"
              size={40}
            />
          </TouchableRipple>
        )}

        <View style={{height: 350}}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            ref={ref => {
              this.map = ref;
            }}
            style={{flex: 1}}
            region={origin}
            onMapReady={this.onMapLayout}
            maxZoomLevel={12}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onLongPress={this.pauseTrackingUpdate}
            onPress={this.pauseTrackingUpdate}>
            {drivers.map((driver, index) => {
              const {heading} = driver;
              const rotate =
                typeof heading === 'number' && heading >= 0
                  ? `${heading}deg`
                  : undefined;

              return (
                <MapView.Marker
                  key={`${index}`}
                  anchor={{x: 0.5, y: 0.5, position: 'relative'}}
                  coordinate={{...driver}}
                  identifier="MarkerOrigin"
                  mapPadding={5}>
                  <Image
                    source={images.car}
                    style={[
                      {
                        width: 20,
                        height: 40,
                      },
                      rotate && {transform: [{rotate}]},
                    ]}
                  />
                </MapView.Marker>
              );
            })}
          </MapView>
        </View>

        <HomeActionButtons onCreateOrderPress={this.onCreateOrderPress} />

        <OrderList
          items={orders}
          onItemPress={this.onOrderListItemPress}
          onItemTrackPress={this.onItemTrackPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    drivers: SELECTORS.getDriverTrackings(state),
    orders: SELECTORS.getWorkingOrder(state),
  };
}

export default connect(mapStateToProps)(TrackScene);
