import { NotificationManager } from 'react-notifications';
import { VALIDATION } from './consts';

/**
 * Returns token of logged in user.
 * @param {*} state
 */
export const getAccessToken = state => {
    return state.auth.token;
};

/**
 * Returns object with new properties.
 * @param {Object} oldObject - Object to update.
 * @param {Object} updatedProperties - Object with new values to add in old object.
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

/**
 * Returns true if value is valid according to rules.
 * @param {*} value - Value to check validation.
 * @param {*} rules - Rule to apply on value.
 * @param {*} valueToCompare - Password value(Pass this for Confirm Password control only)
 */
export const checkValidity = (value, rules, valueToCompare = '') => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        isValid =
            (pattern.test(value) && isValid) ||
            (value.trim() === '' && !rules.required);
    }

    if (rules.isPhone) {
        const pattern = /^\d{10}$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.compare) {
        isValid = value === valueToCompare && isValid;
    }

    return isValid;
};

/**
 * Returns validation message if value is invalid according to rules.
 * @param {*} value - Value to check validation.
 * @param {*} rules - Rule to apply on value.
 * @param {*} valueToCompare - Password value(Pass this for Confirm Password control only)
 */
export const getValidationMessage = (value, rules, valueToCompare = '') => {
    let message = '';

    if (rules.required) {
        if (value.trim() === '' && !message) {
            message = VALIDATION.REQUIRED;
        }
    }

    if (rules.minLength) {
        if (value.length < rules.minLength && !message) {
            message = `Please enter minimum ${rules.minLength} characters`;
        }
    }

    if (rules.maxLength) {
        if (value.length > rules.maxLength && !message) {
            message = `Please enter less than ${rules.maxLength} characters`;
        }
    }

    if (rules.isEmail) {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!pattern.test(value) && value.trim() !== '' && !message) {
            message = VALIDATION.EMAIL;
        }
    }

    if (rules.isPhone) {
        const pattern = /^\d{10}$/;
        if (!pattern.test(value) && !message) {
            message = VALIDATION.MOBILE;
        }
    }

    if (rules.compare) {
        if (value !== valueToCompare && !message) {
            message = VALIDATION.CONFIRM_PASSWORD;
        }
    }

    return message;
};

// https://codepen.io/gapcode/pen/vEJNZN
export const detectIE = () => {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        let rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
};

/**
 * Returns object for action creator by adding action type.
 * @param {string} type - Action type.
 * @param {Object} data - Data to pass to reducer.
 */
export const withType = (type, data = {}) => {
    data.type = type;
    return data;
};

/**
 * To show notofications.
 * @param {string} type - Notification type(info/error/warning/success).
 * @param {string} message - Warning message.
 * @param {string} title - Title of warning message(Optional).
 * @param {number} closeTime - Notification close time in ms(Optional).
 */
export const createNotification = (
    type,
    message,
    title = '',
    closeTime = 3000
) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message, title, closeTime);
            break;
        case 'success':
            NotificationManager.success(message, title, closeTime);
            break;
        case 'warning':
            NotificationManager.warning(message, title, closeTime);
            break;
        case 'error':
            NotificationManager.error(message, title, closeTime);
            break;
        default:
            NotificationManager.info(message, title, closeTime);
            break;
    }
};
