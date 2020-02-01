import * as http from './http';

// Staff

/**
 * Get the list of staff
 */
export const getStaff = () => {
    return http.get('/api/Staff',{searchParamsJson: {active:true}});
};

/**
 * Get details of single staff member
 * @param {string} id - Id of staff member to get details
 */
export const getStaffMember = id => {
    return http.get('/api/Staff',{StaffID:id});
};

/**
 * Adds staff member to the database
 * @param {Object} payload - New staff member
 * @param {string} payload.name - Staff name
 * @param {number} payload.salary - Staff salary
 * @param {Object} payload.address - Staff address
 * @param {string} payload.address.city - Staff city
 * @param {string} payload.address.country - Staff country
 */
export const addStaff = payload => {
    const data = {staffDatajson: payload};
    return http.post('/api/Staff', data, {});
};

/**
 * Update staff member in the database
 * @param {string} id - Id of staff member.
 * @param {Object} payload - Staff's data.
 * @param {string} payload.name - Staff name
 * @param {number} payload.salary - Staff salary
 * @param {Object} payload.address - Staff address
 * @param {string} payload.address.city - Staff city
 * @param {string} payload.address.country - Staff country
 */
export const updateStaff = (id, payload) => {
    return http.put('/members/' + id + '.json', null, payload);
};
