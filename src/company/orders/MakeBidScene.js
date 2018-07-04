/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as COMPANY_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {Linking, ScrollView, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {Title} from 'react-native-paper';
import colors from 'assets/theme/colors';
import Modal from 'components/Modal';
import ListModal from '../../components/ListModal';
import FormTextInput from '../../components/FormTextInput';
import FormLabel from '../../components/FormLabel';
import Divider from '../../components/Divider';
import Listing from '../../components/Listing';

class MakeBidScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  state = {
    amount: null,
    packageSelectionModalVisible: true,
    packages: {
      // [packageID] : {
      //   id:1,
      //   amount:1
      // }
    },
    activePackageID: null,
    serviceIDs: [],
  };

  componentDidMount() {
    this.props.dispatch(
      COMPANY_ACTIONS.fetchOrderDetails(
        this.props.navigation.getParam('orderID', 1),
      ),
    );
    this.props.dispatch(COMPANY_ACTIONS.fetchPackages());
    this.props.dispatch(COMPANY_ACTIONS.fetchDrivers());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order && nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onPackageListItemPress = item => {
    this.setState({
      activePackageID: item.id,
    });
  };

  onPackageListModalClose = () => {
    this.setState({
      packageSelectionModalVisible: false,
      activePackageID: null,
      amount: null,
    });
  };

  onPackageListModalSave = () => {
    this.setState({
      packages: {
        ...this.state.packages,
        [this.state.activePackageID]: {
          id: this.state.activePackageID,
          price: this.state.amount,
        },
      },
      packageSelectionModalVisible: false,
      activePackageID: null,
      amount: null,
    });
  };

  render() {
    let {order, packages} = this.props;

    console.log('order', order);
    console.log('packages', packages);

    if (!order) {
      return null;
    }

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        <OrderItems order={order} />

        <View style={{padding: 10}}>
          <Title>{I18n.t('bid')}</Title>

          <View
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
            }}>

            <Listing
              items={Object.keys(this.state.packages)
                .map(packageID => this.state.packages[packageID])
                .map(packageModel => {
                  return {
                    ...packages.find(model => model.id === packageModel.id),
                    price: packageModel.price,
                  };
                })}
              title={item => `${item.name} - ${item.price} KD`}
              onItemPress={() => {}}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Button
              primary
              raised
              onPress={() =>
                this.setState({packageSelectionModalVisible: true})
              }
              color={colors.primary}
              icon={'add'}
              title={I18n.t('package_add')}
            />

            <ListModal
              onCancel={this.onPackageListModalClose}
              onSave={this.onPackageListModalSave}
              visible={this.state.packageSelectionModalVisible}
              items={packages}
              onItemPress={this.onPackageListItemPress}
              activeIDs={
                this.state.activePackageID ? [this.state.activePackageID] : []
              }
              onSwipe={() => {}}
              header={I18n.t('package_select')}
              title={item => `${item.name} - ${item.price} KD`}
              buttonDisabled={
                !this.state.amount || !this.state.activePackageID
              }>
              <Divider />

              <View style={{padding: 5}}>
                <Title>{I18n.t('amount')}</Title>
                <FormTextInput
                  field="amount"
                  onValueChange={this.onFieldChange}
                  label={I18n.t('amount')}
                />
              </View>
            </ListModal>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      drivers: DRIVER_SELECTORS.getDrivers(state),
      packages: ORDER_SELECTORS.getPackages(state),
      order: getOrderByID(state, props.navigation.getParam('orderID', 1)),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(MakeBidScene);
