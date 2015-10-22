define(function(require) {
  var $ = require("jquery");
  var q = require("q");
  return {
    //this will save the movie object to our firebase account
    saveMovie : function() {
      $.ajax({
      url: "https://movie-viewe.firebaseio.com/movie.json",
      method: "POST",
      data: JSON.stringify(movie)
      }).done(function(movie) {
        console.log("Your new movie is ", movie);
      });
    }
  };

});