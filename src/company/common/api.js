import {request} from 'utils/network';

function fetchStandingOrders(params = '') {
  const url = `company/orders${params}`;
  return request({url, requiresAuthentication: true});
}

function fetchDrivers() {
  const url = `company/drivers`;
  return request({url, requiresAuthentication: true});
}

function fetchBidForOrder(params = '') {
  const url = `company/orders/${params.order_id}/bid`;
  return request({url, requiresAuthentication: true});
}

function makeBid(params) {
  const url = `company/orders/${params.order_id}/bids`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
  };
  return request(requestParams);
}

function cancelBid(params) {
  const url = `company/orders/${params.order_id}/bids/cancel`;
  let requestParams = {
    url,
    method: 'POST',
  };
  return request(requestParams);
}

function assignDriver(params) {
  const url = `company/orders/${params.order_id}/drivers/assign`;
  let requestParams = {
    url,
    method: 'POST',
    body:params
  };
  return request(requestParams);
}


export const API = {
  fetchStandingOrders,
  makeBid,
  cancelBid,
  fetchBidForOrder,
  fetchDrivers,
  assignDriver
};
