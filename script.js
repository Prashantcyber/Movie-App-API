const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch Movie details using OMDB API
const getMovieInfo = async (movie) => {
    try {
        
    
    const myAPIKey = "efe1e3a6";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

    const response =await fetch(url);

    if(!response.ok){
         throw new error("unable to fetch movie data")
    }
    const data = await response.json();
    console.log(data);
    
    showMovieData(data);
} 
catch (error) {
    showErrorMessage("No Movie Found!!!");
        
}

}    
    
    // function to show  Data on screen
   const showMovieData = (data) => {
        movieContainer.innerHTML="";
        movieContainer.classList.remove('noBackground');
        //  use Destructing Assigenment to extract properties from data object
        const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

        // console.log(data)

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-info');
        movieElement.innerHTML = `<h2>${Title}</h2>
                                  <p><strong>Rating: </strong>${imdbRating} &#11088</p>`;
        
        const movieGenreElement = document.createElement('div');
        movieGenreElement.classList.add('movie-genre');  
        
        Genre.split(",").forEach(element => {
            const p= document.createElement('p');
            p.innerHTML = element;
            movieGenreElement.appendChild(p); 
        });   
        
        movieElement.appendChild(movieGenreElement);

        movieElement.innerHTML += `
                                    <p><strong>Released Date: </strong>${Released}</p>
                                    <p><strong>Duration time: </strong>${Runtime}</p>
                                    <p><strong>Actors: </strong>${Actors}</p>
                                    <p><strong>Plot: </strong>${Plot}</p>`;
            
        // Creating Poster 
        
        const moviePosterElement =document.createElement('div');
        moviePosterElement.classList.add('movie-poster');
        moviePosterElement.innerHTML = `<img src="${Poster}" />`

        movieContainer.appendChild(moviePosterElement);
        movieContainer.appendChild(movieElement);
}
// function to Display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

// Function to handle from Submisson
const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log(inputBox.value);
    const movieName = inputBox.value.trim();
    if( movieName !== ''){
        getMovieInfo(movieName)
    }
    else{
        showErrorMessage("Enter Movies name to get movie information ")
    }
}
// Adding event Listiner to search Form
searchForm.addEventListener('submit', handleFormSubmission);
