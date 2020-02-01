import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    data: [],
    error: null,
    loading: false
};

const updatedList = (state, staffDetails) => {
    const staffList = [...state.data];
    const index = staffList.findIndex(e => e.staffID === Number(staffDetails.staffID));
    if (index === -1) {
        staffList.push(staffDetails);
    } else {
        staffList[index] = staffDetails;
    }
    return staffList;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STAFF_OP_START:
            return updateObject(state, {
                loading: state.data.length > 0 ? false : true,
                error: null
            });
        case actionTypes.STAFF_OP_END:
            return updateObject(state, { loading: false });

        case actionTypes.FETCH_STAFF_SUCCESS:
            return updateObject(state, { data: action.data });
        case actionTypes.FETCH_STAFF_FAIL:
            return updateObject(state, { error: action.error });

        case actionTypes.ADD_STAFF_SUCCESS:
            return updateObject(state, {
                data: updatedList(state, action.staffDetails)
            });
        case actionTypes.ADD_STAFF_FAIL:
            return updateObject(state, {
                error: action.error
            });

        case actionTypes.GET_STAFF_SUCCESS:
            return updateObject(state, {
                data: updatedList(state, action.staffDetails)
            });
        case actionTypes.GET_STAFF_FAIL:
            return updateObject(state, {
                error: action.error
            });

        case actionTypes.UPDATE_STAFF_SUCCESS:
            return updateObject(state, {
                data: updatedList(state, action.staffDetails)
            });
        case actionTypes.UPDATE_STAFF_FAIL:
            return updateObject(state, {
                error: action.error
            });

        default:
            return state;
    }
};

export default reducer;
