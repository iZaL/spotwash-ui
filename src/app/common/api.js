import {API_URL} from 'utils/env';
import {request} from 'utils/network';

function storePushToken(urlParams, body) {
  const url = `${API_URL}/push_token/register${urlParams}`;
  const method = 'POST';
  return request({url, method, body});
}

export const API = {
  storePushToken,
};
