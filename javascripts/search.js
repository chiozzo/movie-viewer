define(function(require) {
  var $ = require("jquery");
  var q = require("q");

  return {
    result : function() {
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
    }
  };
});

