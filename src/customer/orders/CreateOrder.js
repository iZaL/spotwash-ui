/**
 * @flow
 */
import React, {PureComponent} from 'react';
import moment from 'moment';
import CategoriesList from 'customer/orders/components/CategoriesList';
import Button from 'components/Button';
import I18n from 'utils/locale';
import DatePicker from 'customer/orders/components/DatePicker';
import TimePicker from 'customer/orders/components/TimePicker';
import AddressPicker from 'customer/orders/components/AddressPicker';
import Divider from 'components/Divider';
import CategoriesChildrenList from 'customer/orders/components/CategoriesChildrenList';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/actions/orders';
import {ACTIONS as CART_ACTIONS} from 'customer/actions/cart';
import {ACTIONS as ADDRESS_ACTIONS} from 'customer/actions/address';
import {SELECTORS} from 'customer/common/selectors';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

type State = {
  dates: Array,
};

class CreateOrder extends PureComponent {
  state: State = {
    dates: [],
  };

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchCategories());
    this.props.dispatch(ORDER_ACTIONS.fetchTimings());
    this.props.dispatch(ADDRESS_ACTIONS.fetchAddresses());

    const dates = [];
    for (let i = 0; i < 30; i++) {
      dates.push(moment().add(i, 'days'));
    }
    this.setState({
      dates: dates,
    });
  }

  onCategoriesListItemPress = (item: object) => {
    this.props.dispatch(
      CART_ACTIONS.setCartItem('selectedCategoryID', item.id),
    );
  };

  onPackagesListItemPress = (item: object, packages: Array) => {
    let activePackages = this.props.cart.selectedPackageIDs;
    let filteredPackages = activePackages.filter(
      id => packages.indexOf(id) === -1,
    );
    let newPackages = filteredPackages.concat(item.id);
    this.props.dispatch(
      CART_ACTIONS.setCartItem('selectedPackageIDs', newPackages),
    );
  };

  onDatePickerItemPress = (item: object) => {
    this.props.dispatch(CART_ACTIONS.setCartItem('selectedDate', item));
  };

  onTimePickerItemPress = (item: object) => {
    this.props.dispatch(CART_ACTIONS.setCartItem('selectedTimeID', item.id));
  };

  onCreateOrderPress = () => {
    const {user, isAuthenticated, cart} = this.props;
    const {
      selectedDate,
      selectedTimeID,
      selectedAddressID,
      selectedCategoryID,
      selectedPackageIDs,
    } = cart;
    // if (!isAuthenticated) {
    //   this.props.navigation.navigate('Login');
    // } else {
    const item = {
      date: selectedDate,
      address_id: selectedAddressID,
      category_id: selectedCategoryID,
      package_ids: selectedPackageIDs,
      user_id: user ? user.id : undefined,
      time_id: selectedTimeID,
    };
    this.props.dispatch(ORDER_ACTIONS.saveOrder(item));
    // }
  };

  onAddressPickerItemPress = (item: object) => {
    this.props.dispatch(CART_ACTIONS.setCartItem('selectedAddressID', item.id));
  };

  saveAddress = address => {
    this.props.dispatch(ADDRESS_ACTIONS.saveAddress(address));
  };

  onGuestFieldChange = (field, value) => {
    this.props.dispatch(CART_ACTIONS.setCartItem(field, value));
  };

  render() {
    const {categories, timings, cart, user} = this.props;
    const {dates} = this.state;
    const {
      selectedDate,
      selectedTimeID,
      selectedCategoryID,
      selectedAddressID,
      selectedPackageIDs,
    } = cart;

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'always'}>
        <CategoriesList
          items={categories}
          onItemPress={this.onCategoriesListItemPress}
          activeItemID={selectedCategoryID}
        />

        <Divider style={{marginVertical: 10}} />

        {selectedCategoryID && (
          <CategoriesChildrenList
            items={
              (categories.find(
                category => category.id === selectedCategoryID,
              ) &&
                categories.find(category => category.id === selectedCategoryID)
                  .children) ||
              []
            }
            onItemPress={this.onPackagesListItemPress}
            activePackageIds={selectedPackageIDs}
          />
        )}

        <DatePicker
          items={dates}
          onItemPress={this.onDatePickerItemPress}
          activeItem={selectedDate}
        />

        <Divider style={{marginVertical: 10}} />

        <TimePicker
          items={timings}
          onItemPress={this.onTimePickerItemPress}
          activeItemID={selectedTimeID}
        />

        <Divider style={{marginVertical: 10}} />

        <AddressPicker
          addresses={user ? (user.addresses ? user.addresses : []) : []}
          saveAddress={this.saveAddress}
          onAddressPickerItemPress={this.onAddressPickerItemPress}
          activeItemID={selectedAddressID}
        />

        <Divider style={{marginVertical: 10}} />

        <Button
          title={I18n.t('create_order')}
          onPress={this.onCreateOrderPress}
          style={{marginVertical: 20}}
          // disabled={!canCreateOrder}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: SELECTORS.getParentCategories(state),
    timings: SELECTORS.getTimings(state) || [],
    user: USER_SELECTORS.getAuthUser(state),
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
    cart: state.customer.cart,
  };
}

export default connect(mapStateToProps)(CreateOrder);
