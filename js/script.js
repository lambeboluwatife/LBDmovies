const types = document.querySelectorAll('.types');

types.forEach(type => {
    type.addEventListener('click', () => {
        removeActiveClasses();
        type.classList.add('active');
    })
});

function removeActiveClasses() {
    types.forEach(type => {
        type.classList.remove('active');
    })
}

let pictureSize;
// const height = screen.height;
const width = screen.width;
console.log(width)

if ((width >= 0) && (width <= 1023)){
    pictureSize = "w185"
} else if (width === 1024 || width > 1024){
    pictureSize = "w500"
} 

    const api = 'https://api.themoviedb.org/3/trending/all/day?api_key=514318c6f6f673457a51ffcaf8158cf2';

    fetch(api).then(function(resp) {
        return resp.json();
    }).then(function(data) {
        console.log(data);
        const movies = data.results

        let eachMovie = "";
        movies.forEach(
            ({
                title,
                original_name,
                release_date,
                first_air_date,
                poster_path,
                id,
            }) => {
            return (
                eachMovie += ` 
                            <div class = "movie-item">
                            <img src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" class="img-link" id="${id}"> 
                            <div class= "container">
                            <p class = "first-para">${title || original_name}</p>                                
                            <p class = "second-para">${release_date || first_air_date}</p>                            
                            </div>
                            </div>`
            )
        }
        )
      let test = (document.querySelector(".movie-gallery").innerHTML = eachMovie);
        
    })
    .catch(function(error) {
        // catch any errors
        console.log(error.message);
      });
