import uuid from 'uuid';

export const ACTION_TYPES = {
  CART_ADD_ITEM: '@customer/cart/CART_ADD_ITEM',
  CART_REMOVE_ITEM: '@customer/cart/CART_REMOVE_ITEM',
  CART_FETCH_ITEMS_REQUEST: '@customer/cart/CART_FETCH_ITEMS_REQUEST',
  CART_FETCH_ITEMS_SUCCESS: '@customer/cart/CART_FETCH_ITEMS_SUCCESS',
  CART_FETCH_ITEMS_FAILURE: '@customer/cart/CART_FETCH_ITEMS_FAILURE',
  CART_SET_ITEM: '@customer/cart/CART_SET_ITEM',
};

function fetchCartItems() {
  return {
    type: ACTION_TYPES.CART_FETCH_ITEMS_REQUEST,
  };
}

function addToCart(item: object) {
  return {
    type: ACTION_TYPES.CART_ADD_ITEM,
    id: uuid(),
    item,
  };
}

function removeFromCart(item: string) {
  return {
    type: ACTION_TYPES.CART_REMOVE_ITEM,
    item,
  };
}

function setCartItem(key, value) {
  return {
    type: ACTION_TYPES.CART_SET_ITEM,
    key,
    value,
  };
}

export const ACTIONS = {
  addToCart,
  removeFromCart,
  fetchCartItems,
  setCartItem,
};
