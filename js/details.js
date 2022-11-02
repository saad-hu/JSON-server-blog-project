console.log(window.location.href); // "http://127.0.0.1:5500/details.html?id=1"
console.log(window.location.search); // "?id=1"

// The URLSearchParams interface defines utility methods to work with the query string of a URL.
// URLSearchParams.get(): Returns the first value associated with the given search parameter.
let id = new URLSearchParams(window.location.search).get('id');
// now, 'id' variable stores the value of the key 'id', in the query string of the current page's URL

let detailsContainer = document.querySelector('.details');
let deletePostBtn = document.querySelector('.deletePostBtn');

async function renderDetails() {
    uri = `http://localhost:3000/posts/${id}`;

    let response = await fetch(uri);
    let post = await response.json();

    let template = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    `;

    detailsContainer.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', renderDetails);

//adding an event listener to the delete button. An async function runs when, it is clicked which sends a DELETE request to JSON server 
deletePostBtn.addEventListener('click', async (e) => {
    fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
    })

    window.location.replace('./index.html')
})