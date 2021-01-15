$(document).ready(function () {
    generateFilms();
});

function generateFilms(){
    
    $.ajax({
        type: "GET",
        url: GENERIAPI,
        data: "data",
        dataType: "json",
        success: function (gen) {
            const genresList = gen.genres;
            appendGenre(genresList);
        },
        error: function (err){
            console.error(err);
        }
    });
}

function appendGenre(genres){

    genres.forEach(gen =>{

        let NewLine = "<div class='genres-movie'><h6 class='genre'>"+gen.name+"</h6><div onclick='seeAllMovie("+gen.id+")' class='see-all'><span>See all</span><i class='fas fa-caret-right'></i></div></div><div id='genre"+gen.id+"' class='cards-container'></div>";
        $('#box-movie').append(NewLine);

        getMovie(gen.id);
    });
}

function getMovie(id){

    let urlApiMovie = "https://api.themoviedb.org/3/discover/movie?api_key="+KEY+"&language=en-US&with_genres="+id+"&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    $.ajax({
        type: "GET",
        url: urlApiMovie,
        data: "data",
        dataType: "json",
        success: function (response) {
            appendMovies(response, id);
        },
        error: function (err) {
            console.error(err);
          }
    });
} 

function appendMovies(films, id){

    for (let i = 0; i < films.results.length; i++){
        var movie = films.results[i];
        var title = movie.original_title;
        if(title.length > 18) title = title.slice(0,18)+"...";

        let cards_movie = "<div class='card'><a href='/film_page.html?movie_id="+movie.id+"'><img src='"+IMGPATH+movie.poster_path+"' alt=''></a><div class='card-body'><p class='card-text'>"+title+"</p> <span class='vote_average'><i class='fas fa-star'></i>"+movie.vote_average+"</span><span class='complete_title'>"+movie.original_title+"</span></div></div>";

        $("#genre"+id).append(cards_movie);
    }
}

function seeAllMovie (id){

   window.location.href ="/film_page_search.html?id="+id+"&page=1";

} 
