import ENV from '../env';

function write(method, messages) {
    console[method].apply(console, messages); // eslint-disable-line no-console
}

function logUsingMethod(method, context, ...args) {
    if (!ENV.log.enabled || !context) {
        return;
    }

    let allowed = ENV.log.contexts && ENV.log.contexts[context];
    if (allowed === false) {
        return;
    } else if (allowed === true) {
        context = `[${context.toUpperCase()}]`;
    } else {
        context = `[MISC]`;
    }

    write(method, [context, ...args]);
}

export const trace = logUsingMethod.bind(null, 'trace');
export const log = logUsingMethod.bind(null, 'log');
export const warn = logUsingMethod.bind(null, 'warn');
export const error = logUsingMethod.bind(null, 'error');

export default {
    log,
    warn,
    error
};
