const Users = require('../models/entities/users');

/**
 * 
 * @param {Object} new_user - Object representing new user
 *                            which is to be added
 * @returns {Promise<Object|boolean>} New user id if added successfully or false if not
 * @description Basic function for adding a new user to the DB
 * 
 */
async function add(new_user) {
    let user = new Users(new_user);
    let res = false;

    try {
        let _new = await user.save();
        console.log('Successfully saved doc: \n' + _new);
        res = _new._id;
    } catch (error) {
        console.log('In function user_services/add_user: \n' + error);
        throw error;
    }

    return res;
}


/**
 * 
 * @param {string} auth - Username of user account 
 * @returns {Promise<Object|null>} Requested user if found, null otherwise
 * @description Used to extract a user from the DB using his username
 */
async function get_by_username(auth) {
    let user = null;
    
    try {
        user = await Users
                        .findOne({ username: auth });        
    } catch (error) {
        console.log(`In user_services/get_by_username: \n${error}`);
        throw error;
    }

    return user;
}

/**
 * 
 * @param {_id} id - ID of requested user
 * @returns {Promise<Object|null>} User with requested id if found, null otherwise
 * @description Basic function for acquiring a user based on his id
 * 
 */
async function get_by_id(id) {
    let user = null;

    try {
        user = await Users
                        .findById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }

    return user;
}
/**
 * 
 * @param {_id} id - ID of the record to be updated 
 * @param {Object} params - Object containing one or more values
 *                          which are to be updated
 * @returns {Promise<Object|null>} The updated document if successful, null otherwise
 * @description Function used to update of the fields of the record
 *              with _id value of id
 */
async function update(id, params) {
    let updated = null;
    try {
        updated = await User
                        .findOneAndUpdate(
                            { _id: id },
                            params,
                            { 
                                new: true, 
                                useFindAndModify: true
                            }
                        );
    } catch (error) {
        console.log(error);
        throw error;
    }

    return updated;
}

module.exports = {
    add,
    get_by_username,
    get_by_id,
    update
};