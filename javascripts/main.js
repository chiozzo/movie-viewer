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
  ["jquery",  "q", "search", "getUsers", "lodash", "bootstrap", "material", "firebase", "hbs", "Authenticate", "login"],
  function($, q, search, getUsers, _, bootstrap, material, firebase, handlebars, authenticate, login) {


  var firebaseRef = new Firebase("https://movie-viewer.firebaseio.com/");

  // login.load();


  //click event to login user
  $(document).on('click', "#sendLogin", function() {
    authenticate.logInUser(firebaseRef);
    $('#myModal').modal('toggle');
  });

//Initialize material design for project
  $.material.init();

//this toggles the modal window to 'shown' and 'hidden' when the user clicks on the element with the id of 'login'
  $('#login').on('click', function () {
    console.log("click");
    $('#myModal').modal('toggle');
  });

//this code will be used to grab the user input for the search bar.  The variable will then be injected/ concatenated into the ajax request url.
  $('#send').click(function(movie){
    search.result()
      .then(function(movie){
        console.log("movie", movie);

        //this will save the movie object to our firebase account
        // $.ajax({
        //   url: "https://movie-viewer.firebaseio.com/movie.json",
        //   method: "POST",
        //   data: JSON.stringify(movie)
        //   }).done(function(movie) {
        //     console.log("Your new movie is ", movie);
        //   });

      //   movies = Object.keys( movies ).map(key => movies[ key ]);
      //   console.log("this should be an array", movies);

      //   var movies = movies.map(movie => {
      //     movie.title = _.find(title, {id:movie.title}).label;
      //   return movie;
      //   })
      // require(['hbs!../templates/movie'], function(movie) {
      //   $("#movie").html(movie({title : title}));
      // });

    });
  });
});