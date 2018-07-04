/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView, Text, View,Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS, ACTIONS as CART_ACTIONS} from 'customer/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {SELECTORS} from 'customer/selectors/orders';
import CategoriesList from 'customer/orders/components/CategoriesList';
import I18n from 'utils/locale';
import NavButton from 'components/NavButton';
import colors from 'assets/theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from 'components/Button';
import Modal from 'react-native-modal';
import CategoriesChildrenList from "./components/CategoriesChildrenList";
import Divider from "components/Divider";
import SectionTitle from "components/SectionTitle";
import DatePicker from 'customer/cart/components/DatePicker';
import TimePicker from 'customer/cart/components/TimePicker';
import AddressesList from 'customer/cart/components/AddressesList';
import {SELECTORS as USER_SELECTORS} from "guest/common/selectors";
import {SELECTORS as ORDER_SELECTORS} from "customer/selectors/orders";
import CreateAddress from 'customer/cart/components/CreateAddress';
import AddressTypeSelectionModal from 'customer/cart/components/AddressTypeSelectionModal';
import BackgroundGeolocation from 'react-native-background-geolocation';
import CreateAddressFields from 'customer/cart/components/CreateAddressFields';
import OrderSuccess from 'customer/cart/components/OrderSuccess';
import ConfirmedButton from "components/ConfirmedButton";
import moment from 'moment';

class CreateOrder extends PureComponent {
  state = {
    dates: [],
    showCartSuccessModal: false,
    showFreewashModal: false,
    addressCreateModalVisible: false,
    addressCreateFieldsModalVisible: false,
    showCheckoutConfirmDialog: false,
    timePickerModalVisible: false,
    performingCheckout: false,
    addressTypeSelectionModalVisible: false,
    addressType: 'current_location',
    address: {
      latitude: 29.3759,
      longitude: 47.9774,
    },
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <View>
          <Text
            style={{
              position: 'absolute',
              left: 8,
              top: 3,
              fontWeight: '700',
              color: colors.maroon,
              fontSize: 15,
            }}>
            {navigation.state.params && navigation.state.params.cartItemsCount}
          </Text>
          <NavButton
            icon={
              <MaterialCommunityIcons
                name="cart-outline"
                size={30}
                color={colors.white}
              />
            }
            onPress={() =>
              navigation.state.params &&
              navigation.state.params.handleRightButtonPress()
            }
          />
        </View>
      ),
    };
  };

  componentDidMount() {
    this.props.actions.fetchCategories();
    this.props.navigation.setParams({
      handleRightButtonPress: this.loadCartScene,
    });
    this.setCartItemsCount();

    const dates = [];
    for (let i = 0; i < 30; i++) {
      dates.push(moment().add(i, 'days'));
    }
    this.setState({
      dates: dates,
    });
    this.props.actions.fetchCartItems();
    this.props.actions.fetchAddresses();
    this.fetchTimings();

    this.props.actions.setCartItem('isFreeWash', false);
  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  componentDidUpdate() {
    const {categories} = this.props;
    if (categories.length) {
      if (!this.props.cart.activeCategoryID) {
        this.props.actions.setCartItem('activeCategoryID', categories[0].id);
      }
    }
  }

  setCartItemsCount = () => {
    return this.props.navigation.setParams({
      cartItemsCount: Object.keys(this.props.cart.items).length || 0,
    });
  };

  onCategoriesListItemPress = (item: object) => {
    if (this.props.cart.activeCategoryID !== item.id) {
      this.props.actions.setCartItems({
        activeCategoryID: item.id,
        activePackageIDs: undefined,
      });
    }
  };

  onPackagesListItemPress = (item: object, packages: Array) => {
    console.log('item',item);
    let activePackages = this.props.cart.activePackageIDs;
    let filteredPackages = activePackages && activePackages.filter(
      id => packages.indexOf(id) === -1,
    ) || [];
    let newPackages = filteredPackages.concat(item.id);

    this.props.actions.setCartItems({
      'activePackageIDs' : newPackages
    });
  };

  onRequestSendPress = () => {
    const {
      activeCategoryID,
      activePackageIDs,
      selectedDate,
      selectedAddressID,
      selectedTimeID,
      total,
    } = this.props.cart;

    const item = {
      category: activeCategoryID,
      packages: activePackageIDs,
      total: total,
    };

    // this.props.actions.setCartItems({
    //   activeCategoryID: undefined,
    //   activePackageIDs: [],
    //   selectedDate:moment(),
    //   selectedAddressID:null,
    //   selectedTimeID:moment(),
    // });

    // return new Promise((resolve, reject) => {
    this.props.actions.addToCart(item);

    this.performCheckout();

    // dispatch order success
    this.setState(
      {
        showCartSuccessModal: true,
      },
      () => this.setCartItemsCount(),
    );
  };

  checkout = () => {
    this.showCheckoutConfirmDialog();
  };

  showCheckoutConfirmDialog = () => {
    this.setState({
      showCheckoutConfirmDialog: true,
    });
  };

  hideCheckoutConfirmDialog = () => {
    this.setState({
      showCheckoutConfirmDialog: false,
    });
  };

  showAddressTypeSelectionModal = () => {
    let {isAuthenticated} = this.props;

    if (!isAuthenticated) {
      return this.redirectToLogin();
    }

    this.setState({
      addressTypeSelectionModalVisible: true,
    });
  };

  hideAddressTypeSelectionModal = () => {
    this.setState({
      addressTypeSelectionModalVisible: false,
    });
  };

  onDatePickerItemPress = date => {
    this.props.actions.setCartItems({
      selectedDate: date,
      selectedTimeID: null,
    });
    this.fetchTimings(date);
  };

  onTimeChange = time => {
    this.props.actions.setCartItem('selectedTimeID', time.id);
  };

  onAddressesListItemPress = (item: object) => {
    this.props.actions.setCartItem('selectedAddressID', item.id);
  };

  hideSuccessModal = () => {
    this.setState({
      showOrderSuccessModal: false,
    });
  };

  saveAddress = address => {
    return new Promise((resolve, reject) => {
      this.props.actions.saveAddress({address, resolve, reject});
    })
      .then(address => {
        console.log('address', address);

        this.setState(
          {
            address: {
              ...address,
            },
          },
          () => {
            console.log('showCreateAddress');
            this.showAddressCreateFieldsModal();
          },
        );
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  updateAddress = address => {
    return new Promise((resolve, reject) => {
      this.props.actions.updateAddress({address, resolve, reject});
    })
      .then(address => {
        console.log('address', address);

        this.setState(
          {
            address: {
              ...address,
            },
          },
          () => {
            this.hideAddressCreateFieldsModal();
          },
        );

        this.hideAddressCreateModal();
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  onSuccessButtonPress = () => {
    this.hideSuccessModal();
    this.fetchTimings();
    this.props.actions.flushCart();
    this.props.actions.fetchWorkingOrders({
      force: true,
    });
    this.props.navigation.popToTop();
    this.props.navigation.navigate('OrderDetail',{
      orderID:this.state.orderID
    });
    this.props.actions.setCartItem('isFreeWash', false);
  };

  fetchTimings = (date = null) => {
    let {isFreeWash} = this.props.cart;
    this.props.actions.fetchTimings({
      date: date ? date : this.props.cart.selectedDate,
      items: this.props.cart.items,
      free_wash: isFreeWash,
    });
  };

  showAddressCreateFieldsModal = () => {
    this.setState({
      addressCreateFieldsModalVisible: true,
    });
  };

  hideAddressCreateFieldsModal = () => {
    this.setState({
      addressCreateFieldsModalVisible: false,
    });
  };

  showAddressCreateModal = () => {
    this.setState({
      addressCreateModalVisible: true,
    });
  };

  hideAddressCreateModal = () => {
    this.setState({
      addressCreateModalVisible: false,
    });
  };

  redirectToLogin = () => {
    return Alert.alert(`${I18n.t('login_required')}`, '', [
      {text: I18n.t('cancel')},
      {
        text: I18n.t('login'),
        onPress: () =>
          this.props.navigation.navigate('Login', {
            redirectRoute: 'Cart',
          }),
      },
    ]);
  };

  performCheckout = () => {
    const {user, isAuthenticated, cart} = this.props;
    const {paymentMode} = this.state;

    const {
      activePackageIDs,
      selectedDate,
      selectedAddressID,
      selectedTimeID,
      total,
    } = cart;
    if (!isAuthenticated) {
      this.hideCheckoutConfirmDialog();
      return this.redirectToLogin();
    } else {
      const item = {
        user_id: user.id,
        address_id: selectedAddressID,
        total: total,
        time_id: selectedTimeID,
        date: selectedDate,
        payment_mode: paymentMode,
        package_ids:activePackageIDs
      };

      return new Promise((resolve, reject) => {
        this.props.actions.checkout({item, resolve, reject});
      })
        .then(order => {
          console.log('order',order);
          if (order.status == 'success') {
            this.setState({
              showOrderSuccessModal: true,
              showCheckoutConfirmDialog: false,
              orderID:order.id
            });
          } else if (order.status == 'checkout') {
            this.setState({
              showPaymentModal: true,
              showCheckoutConfirmDialog: false,
            });
          }
        })
        .catch(e => {
          this.hideCheckoutConfirmDialog();
        });
    }
  };

  onAddressTypeSelection = (type: string) => {
    this.setState({
      addressType: type,
    });

    this.hideAddressTypeSelectionModal();

    if (type === 'current_location') {
      BackgroundGeolocation.getCurrentPosition(
        location => {
          let {latitude, longitude} = location.coords;
          this.setState(
            {
              address: {
                latitude: latitude,
                longitude: longitude,
              },
            },
            () => {},
          );
        },
        error => {
          console.log('error');
        },
        {
          persist: true,
          samples: 1,
          maximumAge: 5000,
        },
      );
      this.saveAddress(this.state.address);
    } else {
      this.showAddressCreateModal();
    }
  };

  render() {

    let {
      cart,
      cartItems,
      user,
      cartTotal,
      checkout,
      timings,
      isFetchingTimings,
      categories,
    } = this.props;

    let {activeCategoryID,activePackageIDs,selectedDate, selectedAddressID, selectedTimeID, isFreeWash} = cart;

    const {showCartSuccessModal, showFreewashModal} = this.state;

    let {
      dates,
      showPaymentModal,
      showOrderSuccessModal,
      addressCreateModalVisible,
      addressCreateFieldsModalVisible,
      paymentMode,
      showCheckoutConfirmDialog,
      addressTypeSelectionModalVisible,
      address,
    } = this.state;

    // let activeCategory = activeCategoryID
    //   ? categories.find(item => item.id === activeCategoryID)
    //   : categories.length
    //     ? categories[0]
    //     : {
    //         id: undefined,
    //         packages: [],
    //       };

    return (
      <ScrollView
        style={{flex: 1,backgroundColor:'white'}}
        keyboardShouldPersistTaps={'always'}
        contentInset={{bottom: 50}}>

        <SectionTitle title={I18n.t('select_car_size')} style={{paddingHorizontal:10}}/>

        <CategoriesList
          items={categories}
          onItemPress={this.onCategoriesListItemPress}
          activeItemID={activeCategoryID}
        />

        <Divider/>

        {activeCategoryID && (
          <CategoriesChildrenList
            items={
              (categories.find(
                category => category.id === activeCategoryID,
                ) &&
                categories.find(category => category.id === activeCategoryID)
                  .children) ||
              []
            }
            onItemPress={this.onPackagesListItemPress}
            activePackageIDs={activePackageIDs}
          />
        )}

        {/*<SectionTitle*/}
          {/*title={I18n.t('date')}*/}
          {/*style={{padding: 10, marginTop: 10}}*/}
        {/*/>*/}

        {/*<DatePicker*/}
          {/*items={dates || []}*/}
          {/*onItemPress={this.onDatePickerItemPress}*/}
          {/*activeItem={selectedDate}*/}
        {/*/>*/}

        {/*<SectionTitle*/}
          {/*title={I18n.t('time')}*/}
          {/*style={{padding: 10, marginTop: 10}}*/}
        {/*/>*/}

        {/*<TimePicker*/}
          {/*items={timings || []}*/}
          {/*onItemPress={this.onTimeChange}*/}
          {/*activeItemID={selectedTimeID}*/}
          {/*isFetching={isFetchingTimings}*/}
        {/*/>*/}

        <Divider
          style={{
            flex: 1,
            marginTop: 20,
            padding: 10,
            backgroundColor: colors.lightGrey,
          }}
        />

        <SectionTitle
          title={I18n.t('address')}
          style={{padding: 10}}
        />

        <AddressesList
          items={user ? (user.addresses ? user.addresses : []) : []}
          onItemPress={this.onAddressesListItemPress}
          activeItemID={selectedAddressID || null}
        />

        <Divider />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Button
            onPress={this.showAddressTypeSelectionModal}
            color={colors.primary}
            icon={'add'}
            title={I18n.t('add_address')}
          />
        </View>

        <Divider
          style={{flex: 1, padding: 10, backgroundColor: colors.lightGrey}}
        />

        <ConfirmedButton
          onPress={this.onRequestSendPress}
          disabled={!activePackageIDs || !activePackageIDs.length}
          raised
          dark
          style={{
            backgroundColor: colors.primary,
          }}
          title={I18n.t('send_request')}
        />

        {/*<Dialog*/}
        {/*title={I18n.t('success')}*/}
        {/*description={*/}
        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*<IconFactory*/}
        {/*type="MaterialIcons"*/}
        {/*name="check"*/}
        {/*color={colors.primary}*/}
        {/*/>*/}
        {/*<Text style={{paddingHorizontal: 10}}>*/}
        {/*{I18n.t('cart_item_added')}*/}
        {/*</Text>*/}
        {/*</View>*/}
        {/*}*/}
        {/*leftPress={this.onAddNewItemPress}*/}
        {/*rightPress={this.onCheckoutPress}*/}
        {/*visible={showCartSuccessModal}*/}
        {/*rightText={I18n.t('checkout').toUpperCase()}*/}
        {/*leftText={I18n.t('add_item').toUpperCase()}*/}
        {/*rightButtonStyle={{*/}
        {/*primary: true,*/}
        {/*}}*/}
        {/*/>*/}

        <AddressTypeSelectionModal
          visible={addressTypeSelectionModalVisible}
          close={this.hideAddressTypeSelectionModal}
          onPress={this.onAddressTypeSelection}
        />

        <Modal
          animationType="slide"
          isVisible={addressCreateModalVisible}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}
          presentationStyle="fullScreen"
          transparent={false}
          useNativeDriver={true}>
          <CreateAddress
            onCancel={this.hideAddressCreateModal}
            onSave={this.saveAddress}
            address={address}
          />
        </Modal>

        <Modal
          animationType="slide"
          isVisible={addressCreateFieldsModalVisible}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}
          presentationStyle="fullScreen"
          transparent={false}
          useNativeDriver={true}>
          <CreateAddressFields
            onCancel={this.hideAddressCreateFieldsModal}
            onSave={this.updateAddress}
            address={{...address}}
          />
        </Modal>

        <Modal
          isVisible={showOrderSuccessModal}
          animationType="slide"
          backdropOpacity={0.8}
          transparent={true}
          backdropColor="rgba(0,0,0,0.5)"
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}>
          <OrderSuccess
            onPress={this.onSuccessButtonPress}
            visible={showOrderSuccessModal}
            onHide={this.hideSuccessModal}
            cart={cart}
            total={cartTotal}
          />
        </Modal>

      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {...ACTIONS, ...CART_ACTIONS, ...APP_ACTIONS},
      dispatch,
    ),
  };
}

function mapStateToProps(state) {
  return {
    categories: SELECTORS.getParentCategories(state),
    cart: SELECTORS.getCart(state),
    user: USER_SELECTORS.getAuthUser(state),
    cartItems: SELECTORS.getCartItems(state) || [],
    cartTotal: SELECTORS.getCartTotal(state),
    timings: ORDER_SELECTORS.getTimings(state) || [],
    isFetchingTimings: state.customer.timings.isFetching,
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
    checkout: state.customer.checkout,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);