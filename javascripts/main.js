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

//Hide search and submit inputs until user is logged in
  $("#user_input").hide();
  $("#send").hide();

//Declare variable for firebase reference
  var firebaseRef = new Firebase("https://movie-viewe.firebaseio.com/");

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

//functionality for search feature
  $('#send').click(function(){
    search.omdb()
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

//add movie to firebase database
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
        var uid = getUsers.getUid();
        $.ajax({
          url: "https://movie-viewer.firebaseio.com/users/" + uid + "/movies.json",
          method: "POST",
          data: JSON.stringify(myNewMovie)
          }).done(function(addedMovie) {
            console.log("Your new song is ", addedMovie);
          });
      });
  });

//Functionality for delete button
 $(document).on("click", "span[id^='delete#']", function() {
      var uniqueIdentifier = this.id.split("#")[1];
      console.log("unique identifier", uniqueIdentifier);
      var uid = getUsers.getUid();
      $.ajax({
        url: "https:movie-viewer.firebaseio.com/users/" + uid + "/movies/" + uniqueIdentifier + ".json",
        method: "DELETE",
        contentType: "application/json"
      }).done(function(){
        console.log("Successfully deleted movie");
      });

  });
});