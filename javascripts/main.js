requirejs.config({
  baseUrl: "./javascripts",
  paths:{
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase" : "../lib/bower_components/firebase/firebase",
    "lodash" : "../lib/bower_components/lodash/lodash.min",
    "noUiSlider": "../lib/noUiSlider.8.0.2/nouislider.min",
    "q" : "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"],
    "noUiSlider": ["jquery"],
    "firebase" : {exports: "Firebase"}
    }
  });

requirejs(
  ["jquery", "q", "dataControl", "getUsers", "lodash", "bootstrap", "firebase", "hbs", "Authenticate", "movieTemplates", "hbs!../templates/movie"],
  function($, q, dataControl, getUsers, _, bootstrap, firebase, handlebars, authenticate, templates, movieHBS) {

    var firebaseRef = new Firebase("https://movie-viewe.firebaseio.com/");

    //Hide search and submit inputs until user is logged in
    $("#user_input").hide();
    $("#send").hide();

    //Declare variable for firebase reference
    authenticate.logInUser(firebaseRef);

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


    // adding click event to register
    $('#register').click(function(){
      authenticate.getRegister();
    });

  // var allMoviesArray = [];
  // var allMoviesObject = {};
  // var originalMoviesArray = [];
  // var movieObject;

//functionality for search feature
  $(document).on('click', '#send', function() {
    dataControl.omdbSearch($("#user_input").val())
    .then(function(movieSearchResults) {
      console.log("movieSearchResults", movieSearchResults);
      dataControl.getMovies()
      .then(function(movieData){
        console.log("movieData", movieData);
        // $('#movie').append(movieHBS({movie: movieData}));
      });
    });
  });


  // var movieData = movie.map(function(value, i, array){
  //   return {
  //     Title : array[i].Title,
  //     Year : array[i].Year,
  //     Poster : "http://img.omdbapi.com/?i=" + array[i].imdbID + "&apikey=8513e0a1",
  //     imdbID : array[i].imdbID
  //   };
  // });

  

//add movie to firebase database

  $(document).on('click', '#addRemoveMovieButton', function() {
    var thisImdbID = $(this).attr("imdbid");
    if ($(this).attr("savedToFirebase") == "true") {
      dataControl.deleteUsersMovies(thisImdbID);
      $(this).parents(".panel").hide('slow', function() {
        $(this).remove();
      });
    } else {
      dataControl.OMDbIDSearch(thisImdbID)
      .then(function(OMDbExactMatch) {
        var currentUser = firebaseRef.getAuth().uid;
        dataControl.addUserMovie(OMDbExactMatch);
      });
      $(this).attr("savedToFirebase", true);
      $(this).removeClass("btn-default");
      $(this).addClass("btn-danger");
      $(this).text("Remove Movie");
    }
  });



  // $(document).on("click", "button[id^='imdbID#']", function() {
  //     var thisImdbID = this.id.split("#")[1];
  //     console.log("thisImdbID", thisImdbID);
  //     search.addMovie(thisImdbID)
  //     .then(function(myMovie){
  //       console.log("myMovie", myMovie);
  //      var myNewMovie = myMovie;
  //       myNewMovie.Poster = "http://img.omdbapi.com/?i=" + thisImdbID + "&apikey=8513e0a1";
  //       myNewMovie.UserRating = 0;
  //       myNewMovie.Watched = false;
  //       console.log("myNewMovie", myNewMovie);
  //       var uid = getUsers.getUid();
  //       $.ajax({
  //         url: "https://movie-viewe.firebaseio.com/users/" + uid + "/movies.json",
  //         method: "POST",
  //         data: JSON.stringify(myNewMovie)
  //         }).done(function(addedMovie) {
  //           console.log("Your new song is ", addedMovie);
  //         });
  //     });
  // });




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