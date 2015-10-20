define(function(require) {
  var $ = require("jquery");
  var q = require("q");

  return {
    addMovie : function() {
      //declare var for userInput
      var imdbID;
      var deferred = q.defer();
      //ajax call using promises
      $.ajax({ url : "http://www.omdbapi.com/?i=" + userInput + "&y=&plot=short&r=json" }).done(function(myMovie){
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