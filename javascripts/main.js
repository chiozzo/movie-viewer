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

require(["jquery", "search", "q", "lodash", "bootstrap", "material",  "hbs!../templates/movie"], function($, search, q, _, bootstrap, movieHB) {

//Initialize material design for project

  $.material.init();


//this toggles the modal window to 'shown' and 'hidden' when the user clicks on the element with the id of 'login'
  $('#login').on('click', function () {
    console.log("click");
    $('#myModal').modal('toggle');
  });

//this code will be used to grab the user input for the search bar.  The variable will then be injected/ concatenated into the ajax request url.

  $('#send').click(function(){
    search.result($('#user_input').val())
      .then(function(searchResult){
        console.log("search result", searchResult);
        var newResult = searchResult.map(function(currentValue, i, array) {
          console.log("imdbID", array[i].imdbID);
          return {
            title: array[i].Title,
            year: array[i].Year,
            imdbID: array[i].imdbID,
            poster: "http://img.omdbapi.com/?i=" + array[i].imdbID + "&apikey=8513e0a1"
          };
        });
        $('#searchResultModal').modal('toggle');


        // var movie = movies.map(movie => {
        //   movie.Title = _.find(Title, {id:movie.Title}).label;
        //   console.log("doing the lodash thing", movie);
        // return movie;
        // });
      // require(['hbs!../templates/movie'], function(movie) {
      //   $("#movie").html(movie({title : title}));
      // });

    });
  });

  $('.img-wrap .close').on('click', function() {
    var id = $(this).closest('.img-wrap').find('img').data('id');
    alert('remove picture: ' + id);
});
});
