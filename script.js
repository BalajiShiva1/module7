document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    
    taskList.addEventListener('click', (event) => {
        if (event.target && event.target.matches('li.task')) {
            event.target.classList.toggle('selected');
        }
    });

    document.getElementById('cookieForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('/set-cookies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: name,
                email: email
            })
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    });

    // Creating a JSON object representing a collection of movie data
    const movieData = {
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        year: 1994,
        genre: 'Drama',
        actors: ['Tim Robbins', 'Morgan Freeman']
    };

    // Using JSON.stringify to convert the JSON object to a string
    const movieDataString = JSON.stringify(movieData);
    console.log('Movie Data String:', movieDataString);

    // Using JSON.parse to convert the string back to a JSON object
    const parsedMovieData = JSON.parse(movieDataString);
    console.log('Parsed Movie Data:', parsedMovieData);
});
