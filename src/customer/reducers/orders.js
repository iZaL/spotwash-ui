import {ACTION_TYPES} from 'customer/actions/orders';

const initialState = {
  isFetching: false,
  standingOrderIds: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SAVE_ORDER_SUCCESS:
    case ACTION_TYPES.STANDING_ORDERS_SUCCESS:
      return {
        ...state,
        standingOrderIds: action.orderIds,
      };
    default:
      return state;
  }
}
