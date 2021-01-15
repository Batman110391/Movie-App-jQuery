$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const page = urlParams.get('page');
    const id = urlParams.get('id');

    if(name) {
        const urlApiMovie = "https://api.themoviedb.org/3/search/movie?api_key=024c5dee9af18585c60e92fa104e3f8c&query="+name+"&page="+page; 
        var parameter = "&name="+name;
        getAllMovie(urlApiMovie, parameter);
    }else if(id) {
        const urlApiMovie = "https://api.themoviedb.org/3/discover/movie?api_key="+KEY+"&language=en-US&with_genres="+id+"&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page;
        parameter = "&id="+id;
        getAllMovie(urlApiMovie, parameter);
    }
});

function getAllMovie(url, info){

    $.ajax({
        type: "GET",
        url: url,
        data: "data",
        dataType: "json",
        success: function (movies) {
            appendAll(movies, info)
        },
        errro: function (err) {
            console.error(err);
          }
    });
}

function appendAll(movieSearch, parameter){

    $('#box-movie').empty();

    let NewLine = "<div class='genres-movie'><h6 class='genre'>Results: </h6></div><div id='cardsearch' class='cards-container card-container-search'></div>";
    $('#box-movie').append(NewLine);

    movieSearch.results.forEach( film => {

        var title = "";
        if(film.original_title != undefined){
            title = film.original_title;
            if(title.length > 18) title = title.slice(0,18)+"...";
        }
        
        let cards_movie = "<div class='card card-search'><a href='/film_page.html?movie_id="+film.id+"'><img src='"+IMGPATH+film.poster_path+"' alt=''></a><div class='card-body'><p class='card-text'>"+title+"</p> <span class='vote_average'><i class='fas fa-star'></i>"+film.vote_average+"</span><span class='complete_title'>"+film.original_title+"</span></div></div>";

        $('#cardsearch').append(cards_movie);
    });

    if(movieSearch.page > 1)
    $(".navigationLink").append("<div class='previous'><a href='/film_page_search.html?page="+(movieSearch.page-1)+parameter+"'>PREVIOUS</a></div>");  

    if(movieSearch.page != movieSearch.total_pages)
    $(".navigationLink").append("<div class='next'><a href='/film_page_search.html?page="+(movieSearch.page+1)+parameter+"'>NEXT</a></div>");
}