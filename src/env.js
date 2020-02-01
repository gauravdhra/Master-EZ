import { merge } from 'lodash';
const DEV = process.env.NODE_ENV === 'development';

const ENV = {
    dev: DEV,
    NODE_ENV: process.env.NODE_ENV,
    api: {
        base_url: 'http://fresno-api.ezsoftco.com',
        auth_header: 'x-auth-token',
        session_cookie: 'session',
        auth_url: 'https://googleapis.com/identitytoolkit/v3/relyingparty'
    },
    log: {
        enabled: DEV,
        contexts: {
            action: DEV && true,
            reducer: DEV && true,
            api: DEV && true,
            store: DEV && true
        }
    },
}

try {
    const localEnv = require('./env.local.js').default;
    merge(ENV, localEnv);
} catch (err) {
    if (ENV.assert_local_settings) {
        throw err;
    }
    window.console && console.log('WARNING: "env.local.js" not found.'); // eslint-disable-line no-console
}

export default ENV;