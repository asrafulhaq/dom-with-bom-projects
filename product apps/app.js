// get elements 
const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single-product');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');




// get all products 
const getAllProducts = () => {

    // get all LS data 
    const data = readLSData('product');
    // init val
    let list = '';

    // check LSData exists  
    if( !data || data.length == 0 ){
        list = `
            <tr>
                <td colspan="7" class="text-center"> No product found </td>
            </tr>
        `;
    }


    // show all data to List 
    if( data && data.length > 0 ){


        let final_amount = 0;

        // loop for data 
        data.map((item, index) => {
            final_amount += ( item.price *  item.quantity );
            list += `
            <tr>
                <td>${  index + 1 }</td>
                <td><img style="width: 60px; height:60px; object-fit:cover; border-radius:4px;" src="${ item.photo }" alt=""></td>
                <td>${ item.name }</td>
                <td>${ item.price } BDT</td>
                <td>${ item.quantity }</td>
                <td>${ item.price * item.quantity } BDT</td>
                <td>
                    <a class="btn btn-info btn-sm product-view" data-bs-toggle="modal" product_index="${index}" href="#shop_single_modal"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-warning btn-sm product-edit" product_index="${index}" data-bs-toggle="modal" href="#shop_edit_modal"><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm product-delete" product_index="${index}" href=""><i class="fas fa-trash"></i></a>
                </td>
            </tr>
            `;

        });

        list += `<tr>
            <td colspan="6" class="text-end">Final Amount = ${final_amount} BDT</td>
            <td></td>
        </tr>`;
        
       

    }


    product_list.innerHTML = list;


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


// single product show 
product_list.onclick = (e) => {
    e.preventDefault(); 


    
    // product single view
    if( e.target.classList.contains('product-view') ){

         // get single product data ID 
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');

        // get data key 
        const { name, price, photo, quantity } = data[index];

        // send data to modal 
        single_product.innerHTML = `
            <img class="shadow" src="${ photo }" alt="">
            <h1>${ name }</h1>
            <p>Price : ${ price } BDT</p>
        `;

    }
    
    // product edit  
    if( e.target.classList.contains('product-edit') ){

    // get produt index 
    let index = e.target.getAttribute('product_index');

    // get product value 
    let data = readLSData('product');
    const { name, price, photo, quantity } = data[index];

    // set form value 

    product_update_form.innerHTML = `<div class="my-3">
        <label for="">Name</label>
        <input name="name" type="text" value="${ name }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Price</label>
            <input name="price" type="text" value="${ price }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Quantity</label>
            <input name="quantity" type="text" value="${ quantity }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Quantity</label>
            <input name="index" type="hidden" value="${ index }" class="form-control">
        </div>
        <div class="my-3">
            <img class="w-100" src="${ photo }" alt="">
        </div>
        <div class="my-3">
            <label for="">Photo</label>
            <input name="photo" type="text" value="${ photo }" class="form-control">
        </div>
        <div class="my-3">
            <input type="submit" class="btn btn-primary w-100" value="Update now">
        </div>
    `;


    }

   // product delete 
   if( e.target.classList.contains('product-delete') ){

        // get user confirmatio 
        let conf = confirm('Are you sure ? ');

        if( conf ){
            // get data index 
            let index = e.target.getAttribute('product_index');
            let data  = readLSData('product');

            // delete idnex data 
            data.splice(index, 1);

            // update latest recorde 
            updateLSData('product', data);

            //now reload data 
            getAllProducts();
        } else {
            alert('Your data safe ');
        }
        
        


   }
    


}







// product update form submit 
product_update_form.onsubmit = (e) => {
    e.preventDefault();

    // get form data 
    const form_data = new FormData(e.target);
    const { name, price, quantity, photo, index } = Object.fromEntries(form_data.entries());


    // get all data 
    let all_data = readLSData('product');
    all_data[index] = { name, price, quantity, photo };

    
    // update your data 
    updateLSData('product', all_data);

    // data reload 
    getAllProducts();
    
}

