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
    // const api = "https://imdb-api.com/en/API/InTheaters/k_24yojk07"
    fetch(api).then(function(resp) {
        return resp.json();
    }).then(function(data) {
        console.log(data);
        const movies = data.items

        let eachMovie = "";
        movies.forEach(
            ({
                title,
                releaseState,
                plot,
                genres,
                stars,
                image,
                id,
            }) => {
            return (
                eachMovie += ` 
                            <div class = "movie-item">
                            <div class="img-area">
                                <img src="${image}" alt="" class="img-link" id="${id}">
                            </div>
                            <div class= "container">
                            <p class = "first-para">${title}</p>                       
                            <p class = "second-para">${releaseState}</p>                            
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
