const imgUrl = "https://image.tmdb.org/t/p/w500";

// const url = "https://api.themoviedb.org/3/movie/550?api_key=d6b6f86ab5418f649dd15e50de7feef7";
// console.log(url);

const apiKey = "d6b6f86ab5418f649dd15e50de7feef7";



function popular() {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => {
        var movies = response.data.results;
        console.log(movies);
        // movies.map(movie => {
        //     console.log(movie.id);
        // })
        getData(movies);
    })
    .catch(err => {
        console.log(err);
    });
}

function upcoming() {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => {
        var upcoming = response.data.results;
        console.log(upcoming);
        getData(upcoming);
    })
    .catch(e => {
        console.log(e);
    })
}
//get language options

const selectLang = document.getElementById('lang');
function show(){
    var showChange = selectLang.options[selectLang.selectedIndex].value;
    console.log(showChange);
    return fetchByLanguage(showChange);
}
selectLang.onchange = show;
// show();



function fetchByLanguage(language) {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&with_original_language=${language}`)
    .then(response => {
        var lang = response.data.results;
        getData(lang);
    })
    .catch(e => {
        console.log(e);
    })
}


function getData(movie) {
    var output = "";
    movie.forEach(function (elem) {
      output += 
      `<div class='block'>
        <div class='text'>
            <h3>${elem.original_title}</h3>
            <p>Released: ${elem.release_date}</p>  
        </div>
        <div class='movieDetail'>
        <img src=${imgUrl + elem.poster_path}>
        </div>
        <div class='rating'>
        <p>Like Views</p>
        </div>
      </div>`
    });
    document.querySelector(".grid").innerHTML = output;
  }

window.onload = () => {
    popular()
}