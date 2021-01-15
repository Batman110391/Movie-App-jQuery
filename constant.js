const KEY = "024c5dee9af18585c60e92fa104e3f8c";
const GENERIAPI = "https://api.themoviedb.org/3/genre/movie/list?api_key="+KEY+"&language=en-US"
const IMGPATH = "http://image.tmdb.org/t/p/w500";
const VIDEOPATH = "https://www.youtube.com/embed/";

$(document).ready( () =>{
    if ($("#form")){
        $("#form").submit(function (e) { 
            e.preventDefault();
            const SearchMovie = $("#search").val();
        
            if(SearchMovie != ""){
        
                window.location.href ="/film_page_search.html?name="+SearchMovie+"&page=1";
            }
        });
    }
})


