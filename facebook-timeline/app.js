// get elements 
const post_form = document.getElementById('post_add_form');
const msg = document.querySelector('.msg');
const all_posts = document.querySelector('.all-posts');




// get all posts 
const getAllPosts = () => {

    let posts = readLSData('fb_post');
    let list = '';
    posts.reverse().map( data => {
        list += `

        <div class="post-timeine-area my-4">
        <div class="card shadow-sm">
            <div class="card-body">
                <div class="post-auth-area">
                    <div class="user-info">
                        <img src="${ data.aphoto }" alt="">
                        <div class="details">
                            <span>${ data.aname }</span>
                            <span>2 h . <i class="fas fa-globe-asia"></i></span>
                        </div>
                    </div>
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-h"></i>
                        </a>
                      
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li><a class="dropdown-item" href="#">Edit</a></li>
                          <li><a class="dropdown-item" href="#">Delete</a></li>                                      
                        </ul>
                      </div>
                </div>
                <div class="post-content-area my-3">
                    <p>${ data.pcontent }</p>
                    
                </div>
            </div>
            <img src="${ data.pphoto }" alt="">
        </div>
     </div>

        `;

    });

    all_posts.innerHTML = list;

}

getAllPosts();


// post form submit 
post_form.onsubmit =  (e) => {
    e.preventDefault();

    // form data get 
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const { aname, aphoto, pcontent, pphoto } = Object.fromEntries(form_data.entries());

    // validation 
    if( !aname || !aphoto || !pcontent ){ 
        msg.innerHTML = setAlert('All fields are required');
    } else {
        createLSData('fb_post', data);
        e.target.reset();
        getAllPosts();
    }


}