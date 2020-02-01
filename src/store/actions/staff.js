import * as actionTypes from './actionTypes';
import * as api from '../../lib/api';
import { withType, createNotification } from '../../shared/utility';


// STAFF common Actions.

export const staffOpStart = () => {
    return withType(actionTypes.STAFF_OP_START);
};

export const staffOpEnd = () => {
    return withType(actionTypes.STAFF_OP_END);
};

// Get all Staff.

export const fetchStaffSuccess = staffData => {
    return withType(actionTypes.FETCH_STAFF_SUCCESS, {
        data: staffData
    });
};

export const fetchStaffFail = error => {
    return withType(actionTypes.FETCH_STAFF_FAIL, {
        error: error
    });
};

export const fetchStaff = () => {
    return dispatch => {
        dispatch(staffOpStart());
        api.getStaff()
            .then(response => {
                // const updatedResponse = Object.keys(response).map(igKey => {
                //     return {
                //         id: igKey,
                //         address: response[igKey].address,
                //         name: response[igKey].name,
                //         salary: response[igKey].salary
                //     };
                // });
                dispatch(fetchStaffSuccess(response));
                dispatch(staffOpEnd());
            })
            .catch(error => {
                createNotification('error', error.message);
                dispatch(staffOpEnd());
                dispatch(fetchStaffFail());
            });
    };
};

// Add new staff.

export const addStaffSuccess = staff => {
    return withType(actionTypes.ADD_STAFF_SUCCESS, { staffDetails: staff });
};

export const addStaffFail = error => {
    return withType(actionTypes.ADD_STAFF_FAIL, { error: error });
};

export const addStaff = payload => {
    return dispatch => {
        dispatch(staffOpStart());
        api.addStaff(payload)
            .then(response => {
                if (response === 'saved') {
                    createNotification('success', payload.staffID > 0 ? 'Staff updated successfully!' : 'Staff added successfully!');
                } else {
                    createNotification('error', 'Response from API: ' + response);
                }
                if (Number(payload.staffID) > 0) {
                    dispatch(updateStaffSuccess({ ...payload, staffID: Number(payload.staffID) }));
                }
                dispatch(staffOpEnd());
            })
            .catch(error => {
                // createNotification('error', error.message);
                dispatch(staffOpEnd());
                dispatch(addStaffFail(error));
            });
    };
};

// Get Staff
export const getStaffSuccess = staffDetails => {
    return withType(actionTypes.GET_STAFF_SUCCESS, {
        staffDetails: staffDetails
    });
};

export const getStaffFail = error => {
    return withType(actionTypes.GET_STAFF_FAIL, { error: error });
};

export const getStaff = id => {
    return dispatch => {
        dispatch(staffOpStart());
        api.getStaffMember(id)
            .then(response => {
                dispatch(getStaffSuccess({ ...response[0] }));
                dispatch(staffOpEnd());
            })
            .catch(error => {
                createNotification('error', error.message);
                dispatch(staffOpEnd());
                dispatch(getStaffFail(error));
            });
    };
};

// Update staff.

export const updateStaffSuccess = staff => {
    return withType(actionTypes.UPDATE_STAFF_SUCCESS, {
        staffDetails: staff
    });
};

export const updateStaffFail = error => {
    return withType(actionTypes.UPDATE_STAFF_FAIL, { error: error });
};

export const updateStaff = (id, payload) => {
    return dispatch => {
        dispatch(staffOpStart());
        api.updateStaff(id, payload)
            .then(response => {
                // createNotification('success', 'Staff updated successfully!');
                dispatch(updateStaffSuccess({ id: id, ...response }));
                dispatch(staffOpEnd());
            })
            .catch(error => {
                // createNotification('error', error.message);
                dispatch(staffOpEnd());
                dispatch(addStaffFail(error));
            });
    };
};
