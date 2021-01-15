$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_person');
    
    if(id) {
        openActorBio(id, "");
        openActorBio(id, "/movie_credits");
    } 
});

function  openActorBio (id, parameter) {

    let urlBio = "https://api.themoviedb.org/3/person/"+id+parameter+"?api_key="+KEY;

    $.ajax({
        type: "GET",
        url: urlBio,
        data: "data",
        dataType: "json",
        success: function (actor) {
            if (parameter == "")
            appendActorBio(actor);
            else
            appendCreditsActor(actor)
        },
        errro: function (err) {
            console.error(err);
        }
    });
}

function appendActorBio(actor){

    if(actor.gender == 2) actor.gender = "Male";
    else if(actor.gender == 1) actor.gender = "Female";
    let dati = '<div class="actor-img"><img src="'+IMGPATH+actor.profile_path+'" alt=""></div><div class="bio-actor"><p>name: <strong>'+actor.name+'</strong> </p><p>place_of_birth: <strong>'+actor.place_of_birth+'</strong> </p><p>popularity: <strong>'+actor.popularity+'</strong> </p><p>birthday: <strong>'+actor.birthday+'</strong> </p><p>known_for_department: <strong>'+actor.known_for_department+'</strong> </p><p>deathday: <strong>'+actor.deathday+'</strong> </p><p>gender: <strong>'+actor.gender+'</strong> </p></div>';

    $('.info-actor').append(dati);

    $('.biography').append('<p>'+actor.biography+'</p>');

    console.log(actor);
}

function appendCreditsActor(actor){
    console.log(actor);

    actor.cast.forEach( film => {
        
        let movie = "<a href='/film_page.html?movie_id="+film.id+"'><img src='"+IMGPATH+film.poster_path+"' alt=''></a>";

        $('.credits-actor').append(movie);
    });

}