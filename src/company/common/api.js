import {request} from 'utils/network';

function fetchUpcomingOrders(params = {}) {
  const path = `company/orders/upcoming`;
  return request({path, requiresAuthentication: true, params});
}

function fetchPastOrders(params = {}) {
  const path = `company/orders/past`;
  return request({path, requiresAuthentication: true, params});
}

function fetchWorkingOrders(params = {}) {
  const path = `company/orders/working`;
  return request({path, requiresAuthentication: true, params});
}

function fetchDrivers() {
  const path = `company/drivers`;
  return request({path, requiresAuthentication: true});
}

function fetchDriver(id) {
  const path = `company/drivers/${id}/details`;
  return request({path, requiresAuthentication: true});
}

function fetchOrderDetails(id) {
  const path = `company/orders/${id}/details`;
  return request({path, requiresAuthentication: true});
}

function fetchTimings() {
  const path = `company/timings`;
  return request({path});
}

function fetchPackages() {
  const path = `company/packages`;
  return request({path});
}

function fetchPendingBids() {
  const path = `company/bids/pending`;
  return request({path});
}

function fetchConfirmedBids() {
  const path = `company/bids/confirmed`;
  return request({path});
}

function assignDriver(id, params) {
  const path = `company/orders/${id}/drivers/assign`;
  let requestParams = {
    path,
    method: 'POST',
    params,
  };
  return request(requestParams);
}

function saveDriverAttributes(params) {
  const path = `company/drivers/update`;
  let requestParams = {
    path,
    method: 'POST',
    params,
  };
  return request(requestParams);
}

function makeBid(params) {
  const path = `company/orders/${params.body.order_id}/bids`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

export const API = {
  fetchUpcomingOrders,
  fetchWorkingOrders,
  fetchPastOrders,
  fetchOrderDetails,
  fetchTimings,
  fetchPackages,
  fetchDrivers,
  fetchDriver,
  assignDriver,
  saveDriverAttributes,
  fetchPendingBids,
  fetchConfirmedBids,
  makeBid,
};
