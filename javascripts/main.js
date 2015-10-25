requirejs.config({
  baseUrl: "./javascripts",
  paths:{
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase" : "../lib/bower_components/firebase/firebase",
    "lodash" : "../lib/bower_components/lodash/lodash.min",
    "nouislider": "../lib/bower_components/nouislider/distribute/nouislider",
    "q" : "../lib/bower_components/q/q",
    "bootstrap-star-rating": "../lib/bower_components/bootstrap-star-rating/js/star-rating",
    "scotch-panels": "../lib/bower_components/scotch-panels/dist/scotchPanels.min"
  },
  shim: {
    "bootstrap": ["jquery"],
    "scotch-panels": ["jquery"],
    "bootstrap-star-rating": ["bootstrap"],
    "nouislider": ["jquery"],
    "firebase": {exports: "Firebase"}
  }
});

require(
  ["jquery", "q", "lodash","bootstrap", "scotch-panels", "bootstrap-star-rating", "nouislider","dataControl", "authenticate", "movieTemplates","hbs!../templates/movie" ],
  function($, q, _, bootstrap, scotchPanels, bootstrapStarRating, noUiSlider, dataControl, authenticate, templates, movieHBS) {

    var firebaseRef = new Firebase("https://movie-viewe.firebaseio.com/");

    //Hide search and submit inputs until user is logged in
    $("#user_input").hide();
    $("#send").hide();

    //Declare variable for firebase reference
    // authenticate.logInUser(firebaseRef);

    //this toggles the modal window to 'shown' and 'hidden' when the user clicks on the element with the id of 'login'
    $('#login').on('click', function () {
      console.log("click");
      authenticate.logInUser()
      // $('#myModal').modal('toggle');
    });

    //click event to login user
    $(document).on('click', "#login", function() {
      authenticate.logInUser()

      // .then(function(movies) {
      //   dataControl.getMovies(movies)
        // .then(function(movieData) {
        // $('#myMovies').append('toggle');
        $("#loginRegister").toggle();
        console.log("geeeezzzz");

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
  $(document).on('click', '#submitForSearch', function() {
    // alert("Your submit button is working");
    dataControl.omdbSearch($("#navSearchforMovies").val())
    .then(function(movieSearchResults) {
      // console.log("movieSearchResults", movieSearchResults);
      dataControl.getMovies(movieSearchResults)

    });

  });


    // dataControl.omdbSearch($("#user_input").val())
    // .then(function(movieSearchResults) {
      // console.log("movieSearchResults", movieSearchResults);
      // dataControl.getMovies()
      // .then(function(movieData){
      //   console.log("movieData", movieData);
        // $('#myMovies').append("movieHBS"({movie: allMoviesArray}));
        // console.log("movieHBS", movieHBS);
    // });
  // });
  // });


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




  $(".starRating").rating({
    min:0,
    max:10,
    step:1,
    size:'xs',
    showClear:true,
    starCaptions: {
      1: 'One Star',
      2: 'Two Stars',
      3: 'Three Stars',
      4: 'Four Stars',
      5: 'Five Stars',
    },
    starCaptionClasses: function(val) {
      if (val === 0) {
        return 'label label-default';
      } else if (val < 2) {
        return 'label label-danger';
      } else if (val < 3) {
        return 'label label-warning';
      } else if (val < 4) {
        return 'label label-info';
      } else if (val < 5) {
        return 'label label-primary';
      } else {
        return 'label label-success';
      }
    }
    // {
    //  1: 'label label-danger',
    //  2: 'label label-danger',
    //  3: 'label label-warning',
    //  4: 'label label-warning',
    //  5: 'label label-info',
    //  6: 'label label-info',
    //  7: 'label label-primary',
    //  8: 'label label-primary',
    //  9: 'label label-success',
    //  10: 'label label-success'
    // }
  });

  var panelExample = $('#registerForm').scotchPanel({
      containerSelector: '#panelContainer', // Make this appear on the entire screen
      direction: 'left', // Make it toggle in from the left
      duration: 300, // Speed in ms how fast you want it to be
      transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
      distanceX: '100%', // Size of the toggle
      enableEscapeKey: true // Clicking Esc will close the panel
  });

  $(document).on('click', '#registerFormButton', function() {
    panelExample.open();
  });

  $(document).on('click', '#registerUserButton', function() {
    panelExample.close();
  });

  // commenting out while i am working 
  // noUiSlider.create(document.getElementById('sliderInput'), {
  //   start: 0,
  //   connect: 'lower',
  //   step: 1,
  //   range: {
  //     'min': 0,
  //     'max': 10
  //   }
  // });
  
});