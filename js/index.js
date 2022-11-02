//reference to blogs container in which we have to add all the blogs to display
let blogsContainer = document.querySelector('.blogs');
let searchForm = document.querySelector('.searchForm');

// an async function to fetch data then appending it to the DOM
async function renderPosts(searchValue) {
    // the url to the local JSON server with the posts endpoint
    // let uri = 'http://localhost:3000/posts';

    // we can also change the uri using query parameters, to send the data in some particular order.
    // the default is sorting by id in ascending order
    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';

    //if renderPosts() function is called with a search value, then we will use to q parameter to send the search term to JSON server
    if (searchValue) uri = uri + `&q=${searchValue}`;


    // fetching data. 'posts' variable contains all the posts in an array
    let response = await fetch(uri);
    let posts = await response.json();

    // an empty template in which all the posts will go
    let template = '';

    // appending each post's html to 'template' variable
    posts.forEach(post => {
        template = template + `
        <div class="post">
            <h1>${post.title}</h1>
            <p>${post.likes} likes</p>
            <p>${post.body.slice(0, 200)}</p>
            <a href="./details.html?id=${post.id}">read more...</a> ${/* in the details page, to know which post is clicked, we can add a query parameter, and a key value pair. query parameter starts with '?', and then a key value pair. */''}
        </div>
        `
    });

    // if the 'posts' array is empty, then the searchValue was not found. 
    if (posts.length === 0) template = `No results found for "${searchValue}".`

    blogsContainer.innerHTML = template;

    // more concise method to implement above template code using reduce method. 
    // blogsContainer.innerHTML = posts.reduce((template, post) => {
    //     return template + `
    //     <div class="post">
    //         <h1>${post.title}</h1>
    //         <p>${post.likes} likes</p>
    //         <p>${post.body.slice(0, 200)}</p>
    //         <a href="./details.html">read more...</a>
    //     </div>
    //     `
    // }, '')

}

// waiting fo the DOM content to load, and then firing renderPosts function
// wraping the renderPosts() function call in an anonymous function, because we do not want the event object as the first parameter, which is the default behaviour
window.addEventListener('DOMContentLoaded', () => renderPosts());

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    renderPosts(searchForm.searchTerm.value);
})