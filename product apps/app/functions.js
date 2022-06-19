
/**
 * Alert function 
 */
 const setAlert = ( msg , type = 'danger') =>  {
    return `<p class="alert alert-${type} d-flex justify-content-between">${ msg } <button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}

/**
 * Check value is Number or not 
 */
const numberCheck = (num) => {
    let pattern = /^[0-9]{1}$/;
    return pattern.test(num);

}


/**
 * Check value is Number or not 
 */
 const emailCheck = (email) => {
    let pattern = /^[a-z0-9_\.]{1,}@[a-z0-9]{2,}\.[a-z]{2,5}$/;
    return pattern.test(email);

} 


/**
 * Check value is Number or not 
 */
 const cellCheck = (cell) => {
    let pattern = /^(01|8801|\+8801)[0-9]{9}$/;
    return pattern.test(cell);

}

/**
 * get all LS data 
 * @param {*} key 
 */
const readLSData  = (key) => {

    if( localStorage.getItem(key) ){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }

}


/**
 * Set value LS
 */
const createLSData = (key, value) => {

    // init val 
    let data = [];

    // check key exists or not 
    if( localStorage.getItem(key) ){
        data = JSON.parse(localStorage.getItem(key));
    }
    // now push data to LS 
    data.push(value);
    // set data 
    localStorage.setItem(key, JSON.stringify(data));
    

}

/**
 * Update our LS Data
 */
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array))
}


