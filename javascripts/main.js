requirejs.config({
  baseUrl: "./javascripts",
  paths:{
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase" : "../lib/bower_components/firebase/firebase",
    "lodash" : "../lib/bower_components/lodash/lodash.min",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "noUiSlider": "../lib/noUiSlider.8.0.2/nouislider.min",
    "q" : "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"],
    "material": ["bootstrap"],
    "noUiSlider": ["jquery"],
    "firebase" : {exports: "Firebase"
    }
  }
});

require(
  ["jquery",  "q", "search", "getUsers", "lodash", "bootstrap", "material", "firebase", "hbs", "Authenticate", "movieTemplates", "hbs!../templates/movie"],
  function($, q, search, getUsers, _, bootstrap, material, firebase, handlebars, authenticate, templates, movieHBS) {

//Initialize material design for project
  $.material.init();

  var firebaseRef = new Firebase("https://movie-viewer.firebaseio.com/");

//this toggles the modal window to 'shown' and 'hidden' when the user clicks on the element with the id of 'login'
  $('#login').on('click', function () {
    console.log("click");
    $('#myModal').modal('toggle');
  });

  //click event to login user
  $(document).on('click', "#sendLogin", function() {
    authenticate.logInUser(firebaseRef);
    $('#myModal').modal('toggle');
  });

  // var allMoviesArray = [];
  // var allMoviesObject = {};
  // var originalMoviesArray = [];
  // var movieObject;

  $('#send').click(function(){
    search.result()
    .then(function(movie) {
      console.log("movie data", movie);
      var movieData = movie.map(function(value, i, array){
        return {
          Title : array[i].Title,
          Year : array[i].Year,
          Poster : "http://img.omdbapi.com/?i=" + array[i].imdbID + "&apikey=8513e0a1",
          imdbID : array[i].imdbID
        };
      });
      console.log("movieData", movieData);
      $('#movie').append(movieHBS({movie: movieData}));
    });
  });

  $(document).on("click", "button[id^='imdbID#']", function() {
      var thisImdbID = this.id.split("#")[1];
      console.log("thisImdbID", thisImdbID);
      search.addMovie(thisImdbID)
      .then(function(myMovie){
        console.log("myMovie", myMovie);
       var myNewMovie = myMovie;
        myNewMovie.Poster = "http://img.omdbapi.com/?i=" + thisImdbID + "&apikey=8513e0a1";
        myNewMovie.UserRating = 0;
        myNewMovie.Watched = false;
        console.log("myNewMovie", myNewMovie);
        $.ajax({
          url: "https://movie-viewer.firebaseio.com/movie.json",
          method: "POST",
          data: JSON.stringify(myNewMovie)
          }).done(function(addedMovie) {
            console.log("Your new song is ", addedMovie);
          });
      });
  });

  firebaseRef.child("movie").on("value", function(snapshot){
    var movies = snapshot.val();
    console.log("movies", movies);

    allMoviesArray = [];

    for (var key in movies){
      var movieWithId = movies[key];
      movieWithId.key = key;
      console.log("movieWithId", movieWithId);
      allMoviesArray[allMoviesArray.length] = movieWithId;
    }

    allMoviesObject = {movie : allMoviesArray};

    originalMoviesArray = allMoviesArray.slice();

    $("#movie").html(templates.movie(allMoviesObject));

  });

//Functionality for delete button
 $(document).on("click", "span[id^='delete#']", function() {
      var uniqueIdentifier = this.id.split("#")[1];
      console.log("unique identifier", uniqueIdentifier);
      $.ajax({
        url: "https:movie-viewer.firebaseio.com/movie/" + uniqueIdentifier + ".json",
        method: "DELETE",
        contentType: "application/json"
      }).done(function(){
        console.log("Successfully deleted movie");
      });

    });

  $('.img-wrap .close').on('click', function() {
    var id = $(this).closest('.img-wrap').find('img').data('id');
    alert('remove picture: ' + id);
  });

});