const DEV = process.env.NODE_ENV === 'development';

export default {
    log: {
        enabled: DEV,
        contexts: {
            action: DEV && true,
            reducer: DEV && true,
            api: DEV && true,
            store: DEV && true
        }
    },

    api: {
        base_url: 'http://fresno-api.ezsoftco.com',
        auth_url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
    },

    app_url: 'http://localhost:3000/'
};
