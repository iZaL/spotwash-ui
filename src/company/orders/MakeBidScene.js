/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as COMPANY_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {Linking, ScrollView, View, Alert} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {Subheading, Title} from 'react-native-paper';
import colors from 'assets/theme/colors';
import Modal from 'components/Modal';
import ListModal from '../../components/ListModal';
import FormTextInput from '../../components/FormTextInput';
import FormLabel from '../../components/FormLabel';
import Divider from '../../components/Divider';
import Listing from '../../components/Listing';
import ConfirmedButton from '../../components/ConfirmedButton';

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
    comment: null,
    packageSelectionModalVisible: false,
    packages: {},
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
      amount: item.price,
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

  removeBidItem = packageID => {
    // let deletingItem = state.products[action.params.product_id];
    // return {
    //   ...state,
    //   products: Object.keys(state.products)
    //     .filter(productID => productID != action.params.product_id)
    //     .reduce((obj, key) => {
    //       obj[key] = state.products[key];
    //       return obj;
    //     }, {}),
    //   total: state.total - deletingItem.total,
    // };

    let deletingItem = this.state.packages[packageID];

    this.setState({
      packages: Object.keys(this.state.packages)
        .filter(id => id != packageID)
        .reduce((obj, key) => {
          obj[key] = this.state.packages[key];
          return obj;
        }, {}),
    });
  };

  // editBidItem = (packageID) => {
  //   this.setState({
  //     activePackageID:packageID,
  //     amount:this.state.packages[packageID].price,
  //     packageSelectionModalVisible:true
  //   });
  // };

  onPackageBidListItemPress = item => {
    return Alert.alert(`${I18n.t('bid_edit')}`, null, [
      // {
      //   text: I18n.t('edit'),
      //   onPress: () => {
      //     this.editBidItem(item.id);
      //   },
      // },
      {
        text: I18n.t('cancel'),
      },
      {
        text: I18n.t('remove'),
        onPress: () => {
          this.removeBidItem(item.id);
        },
      },
    ]);
  };

  makeBid = () => {
    let payload = {
      order_id: this.props.order.id,
      packages: this.state.packages,
      comment: this.state.comment,
    };

    return new Promise((resolve, reject) => {
      this.props.dispatch(COMPANY_ACTIONS.makeBid({payload, resolve, reject}));
    })
      .then(bid => {
        this.setState({
          amount: null,
          comment: null,
          packageSelectionModalVisible: false,
          packages: {},
          activePackageID: null,
          serviceIDs: [],
        });
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  render() {
    let {order, packages} = this.props;

    if (!order) {
      return null;
    }

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        <OrderItems order={order} />

        <View style={{padding: 10}}>
          <Title>{I18n.t('bid_details')}</Title>

          <View
            style={{
              backgroundColor: 'white',
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
              title={item => `${item.category.parent.name}`}
              description={item =>
                `${item.category.name} - ${item.name} - ${item.price} KD`
              }
              onItemPress={this.onPackageBidListItemPress}
            />

            <Button
              raised={false}
              primary={false}
              onPress={() =>
                this.setState({packageSelectionModalVisible: true})
              }
              color={colors.primary}
              icon={'add'}
              title={I18n.t('package_add')}
            />
          </View>

          <View>
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
              title={item => `${item.category.parent.name}`}
              description={item =>
                `${item.category.name} - ${item.name} - ${item.price} KD`
              }
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
                  value={this.state.amount}
                />
              </View>
            </ListModal>
          </View>
        </View>

        <View style={{padding: 5, backgroundColor: 'white', margin: 10}}>
          <FormTextInput
            field="comment"
            onValueChange={this.onFieldChange}
            label={I18n.t('comment')}
          />
        </View>

        <ConfirmedButton
          title={I18n.t('make_bid')}
          description={I18n.t('confirm_make_bid')}
          onPress={this.makeBid}
          style={{marginHorizontal: 10}}
        />
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
