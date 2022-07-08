
/**
 * Alert function 
 */
 const setAlert = ( msg , type = 'danger') =>  {
    return `<p class="alert alert-${type} d-flex justify-content-between">${ msg } <button data-bs-dismiss="alert" class="btn-close"></button></p>`;
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


