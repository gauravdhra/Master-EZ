import axios from 'axios';

import ENV from '../env';
import store from '../store';
import { log, warn, trace } from './logger';
import { detectIE, getAccessToken } from '../shared/utility';

export const getApiEndpoint = url => ENV.api.base_url + url;

export const getHeaders = (method, onlyAuth = false) => {
    let headers = {
        // TODO: Turn this into service, inject token provider into it (no singletons)
        [ENV.api.auth_header]: getAccessToken(store.getState()) || undefined
    };
    if (onlyAuth) {
        return headers;
    }
    if (method === 'post' || method === 'put') {
        headers['Content-Type'] = 'application/json';
    }

    // Deal with IE aggressive caching
    // http://stackoverflow.com/questions/2848945/prevent-ie-caching
    if (detectIE() && method === 'get') {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        headers['Pragma'] = 'no-cache';
        headers['Expires'] = '0';
    }
    return headers;
};

export const request = opts => {
    if (!opts.url) {
        throw new Error('url is required');
    }

    opts.baseURL = ENV.api.base_url;
    if (opts.isAuth) {
        opts.baseURL = ENV.api.auth_url;
    }
    opts.method = opts.method || 'get';

    // opts.headers = getHeaders(opts.method);

    const logMethod = ENV.api.trace ? trace : log;
    logMethod(
        'api',
        `${opts.method.toUpperCase()} ${opts.url} ${
            opts.params ? JSON.stringify(opts.params) : ''
        } ==>`,
        opts.data
    );

    return axios(opts)
        .then(res => {
            logMethod(
                'api',
                `${opts.method.toUpperCase()} ${opts.url} <==`,
                res
            );
            return res.data;
        })
        .catch(res => {
            let err = null;
            let response = res.response;
            if (response && response.data && response.data.error) {
                err = response.data.error;
            } else if (response) {
                err = new Error(response.statusText);
                err.status = response.status;
            } else {
                err = new Error(res.message || 'HTTP Error');
                err.status = 0;
            }

            warn('api', `${opts.method.toUpperCase()} ${opts.url}`, err, res);
            err._logged = true;

            throw err;
        });
};

export const get = (url, params) => request({ url, params });

// export const post = (url, params, data, isAuth = false) =>
//     request({ method: 'post', url, params, data, isAuth });

export const post = (url, params) =>
    request({ method: 'post', url, params });

export const put = (url, params, data) =>
    request({ method: 'put', url, params, data });

export const del = (url, params, data) =>
    request({ method: 'delete', url, params, data });

export const head = (url, params) => request({ method: 'head', url, params });
