// get elements 
const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const product_list = document.getElementById('product_list');




// get all products 
const getAllProducts = () => {

    // get all LS data 
    const data = readLSData('product');

    // check LSData exists  
    if( !data ){
        product_list.innerHTML = `
            <tr>
                <td colspan="7" class="text-center"> No product found </td>
            </tr>
        `;
    }


    // show all data to List 
    if( data ){

        // init val
        let list = '';

        // loop for data 
        data.map((item, index) => {
            list += `
            <tr>
                <td>${  index + 1 }</td>
                <td><img style="width: 60px; height:60px; object-fit:cover; border-radius:4px;" src="${ item.photo }" alt=""></td>
                <td>${ item.name }</td>
                <td>${ item.price }</td>
                <td>${ item.quantity }</td>
                <td>${ item.price * item.quantity } BDT</td>
                <td>
                    <a class="btn btn-info btn-sm" href=""><i class="fas fa-eye"></i></a>
                    <a class="btn btn-warning btn-sm" href=""><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm" href=""><i class="fas fa-trash"></i></a>
                </td>
            </tr>
            `;

        });
        
        product_list.innerHTML = list;

    }





}

getAllProducts();

// Submit product form 
product_form.onsubmit = (e) => {
    e.preventDefault();

    // get form data from FormData object 
    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let { name, price, photo, quantity } = Object.fromEntries(form_data.entries());



    
    // form validation 
    if( !name || !price || !photo || !quantity ) {
        msg.innerHTML = setAlert('All fields are required !'); 
    }else {

        createLSData('product', productData);

        msg.innerHTML = setAlert('Data stable !', 'success');
        e.target.reset(); 
        getAllProducts();
    }



}