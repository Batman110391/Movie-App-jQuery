let Ytube = "";

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('movie_id');

    if(id) openMovie(id);
});

function openMovie(id){
    getMovieDetails(id, "/credits");
    getMovieDetails(id, "/videos");
    getMovieDetails(id, "");
}

function getMovieDetails(id, parameter){

    let urlApiMovie = "https://api.themoviedb.org/3/movie/"+id+parameter+"?api_key="+KEY+"&language=en-US";

    $.ajax({
        type: "GET",
        url: urlApiMovie,
        data: "data",
        dataType: "json",
        success: function (response) {
            if(parameter == "/credits")
            appendCast(response)
        else if(parameter == "/videos")
            appendFrame(response)
        else
            appendOverview(response)
        },
        error: function (err) { 
            console.error(err);
         }
    });
}

function appendFrame (frame){

    console.log(frame);

    if(frame.results.length === 0) {
        $('#frame-movie').attr('src', "");
    }else{
        var key_code = frame.results[0].key;
        $('#frame-movie').attr('src', VIDEOPATH+key_code+"?rel=0");
        Ytube = video_movie.src;
    }
}

function appendOverview (overview){

    console.log(overview);
    $('#img-movie').attr('src', IMGPATH+overview.poster_path);
    $('#vote-movie').text(overview.vote_average);
    $('#see-popular-movie').text(overview.popularity);
    $('#title-movie-now').text(overview.original_title);
    $('#duration-movie').text(overview.runtime + " min");
    $('#overview-movie').text(overview.overview);
}

function appendCast (cast){

    console.log(cast);
    $('.cast-movie').empty();
    for (let i = 0; i<cast.cast.length; i++){
        let actor = cast.cast[i];
        if(actor.profile_path != undefined)
        $('.cast-movie').append("<div class='person'><a href='/actor_page.html?id_person="+actor.id+"'><img src='"+IMGPATH+actor.profile_path+"' alt=''><p>"+actor.name+"</p></a></div>");
        
        if (i > 20) break;
    }
    appendCrew(cast.crew);
}


function appendCrew(director){
    console.log(director);
    for (let i = 0; i<director.length; i++){
        if (director[i].job == "Director"){
            $('#director-movie').text("Directed By <strong>"+director[i].name+"</strong>");
            break;
        }
    }
}

function zoomFrame(){

    $(".container-overview").addClass("reduce");
    $("#frame-movie").addClass("zoom");

    $("#play-video").css({"z-index": "0"});
    $("#stop-video").css({"z-index": "9"});

    $('#frame-movie').attr('src', Ytube+"&autoplay=1&mute=1&enablejsapi=1");
}

function reduceFrame(){

    $(".container-overview").removeClass("reduce");
    $("#frame-movie").removeClass("zoom");

    $("#play-video").css({"z-index": "1000"});
    $("#stop-video").css({"z-index": "-1"});

    $('#frame-movie').attr('src', Ytube);
}