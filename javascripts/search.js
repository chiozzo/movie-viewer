define(function(require) {
  var $ = require("jquery");
  var q = require("q");
  var firebase = require("firebase");

  return {
    //omdb search functionality
    omdb : function() {
      //declare var for userInput
      var userInput = $("#user_input").val();
      var deferred = q.defer();
      console.log("userInput", userInput);
      //split and join userInput to inject into url in a format readable for api
      userInput = userInput.split(" ").join("+");
      console.log("user input +", userInput);
      //ajax call using promises
      $.ajax({ url : "http://www.omdbapi.com/?s=" + userInput + "&y=&plot=short&r=json" }).done(function(movie){
        console.log("movie", movie);
        //return movie object Search key value
        deferred.resolve(movie.Search);
      })
    .fail(function(xhr, status, error){
      deferred.reject(error);
    });
    return deferred.promise;
    },
    //search user library WIP
    myLib : function(){
      var searchInput = $("#user_input").val();

    },
    //add movie to specific users library
    addMovie : function(imdbID) {
      //declare var for userInput
      var deferred = q.defer();
      //ajax call using promises
      $.ajax({ url : "http://www.omdbapi.com/?i=" + imdbID + "&y=&plot=short&r=json" }).done(function(myMovie){
        console.log("myMovie", myMovie);
        //return movie object Search key value
        deferred.resolve(myMovie);
      })
    .fail(function(xhr, status, error){
      deferred.reject(error);
    });
    return deferred.promise;
    }
  };
});