import {request} from 'utils/network';

function fetchCategories(params = '') {
  const url = `categories${params}`;
  return request({url});
}

function fetchTimings(params = '') {
  const url = `timings${params}`;
  return request({url});
}

function fetchAddresses(params = '') {
  const url = `customer/addresses${params}`;
  return request({url});
}

function saveAddress(params) {
  const url = `customer/addresses`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
    requiresAuthentication: true,
    forceAuthentication: true,
  };
  return request(requestParams);
}

function fetchStandingOrders(params = '') {
  const url = `customer/orders${params}`;
  return request({url, requiresAuthentication: true});
}

function fetchBids(orderID) {
  const url = `customer/orders/${orderID}/bids`;
  return request({url, requiresAuthentication: true});
}

function saveOrder(params) {
  const url = `customer/orders`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
    requiresAuthentication: true,
    forceAuthentication: true,
  };
  return request(requestParams);
}

function confirmBid(bidID, params) {
  const url = `customer/orders/bids/${bidID}/confirm`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
    requiresAuthentication: true,
  };
  return request(requestParams);
}

export const API = {
  fetchCategories,
  fetchTimings,
  fetchAddresses,
  saveAddress,
  saveOrder,
  fetchStandingOrders,
  fetchBids,
  confirmBid,
};
