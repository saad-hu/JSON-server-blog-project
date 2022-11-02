let newBlogForm = document.querySelector('.newBlogForm');

async function createPost(event) {
    event.preventDefault();

    let newBlogObject = {
        title: newBlogForm.title.value,
        body: newBlogForm.body.value,
        likes: 0,
        // JSON server will automatically add an id that is not already taken, to the post
    }

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        // we cant send data as an object, we have to convert the obejct in a JSON string first
        body: JSON.stringify(newBlogObject),
        // we have to add headers and content type to specify that we are sending JSON
        headers: { 'Content-Type': 'application/json' }
    });

    // after submitting and POSTing the form data, user is redirected to the home(index.html) page where all updated blogs can be seen 
    window.location.replace('./index.html');
}

newBlogForm.addEventListener('submit', createPost);