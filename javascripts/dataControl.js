define(["jquery", "q", "firebase"],
  function($, q, firebase) {

  var firebaseRef = new firebase("https://movie-viewe.firebaseio.com/");
  // consolidating modules to prevent from going back and forth between files so much

return {
// SEARCHING MOVIE //omdb search functionality
  omdbSearch: function(userInput) {
    var deferred = q.defer();
    //declare var for userInput
    var userInput = $("#navSearchforMovies").val();
    //split and join userInput to inject into url in a format readable for api
    userInput = userInput.split(" ").join("+");
    $.ajax({ url : "http://www.omdbapi.com/?s=" + userInput + "&y=&plot=short&r=json" })
    .done(function(movieMatches){
      var searchResultsArray = movieMatches.Search;
      console.log("searchResultsArray", searchResultsArray);
      var mappedSearchResultsArray = searchResultsArray.map(function(currentValue) {
        if(currentValue.Poster === "N/A") {
          currentValue.Poster = "../images/defaultPoster.jpg";
        } else {
          currentValue.Poster = "http://img.omdbapi.com/?i=" + currentValue.imdbID + "&apikey=8513e0a1";
        }
        currentValue.active = true;
        return currentValue;
      });

     
        deferred.resolve(mappedSearchResultsArray);
    })
    .fail(function(){
      console.log("OMDb search failure");
    });
      return deferred.promise;
 },

    OMDbIDSearch: function(imdbID) {
      var deferred = q.defer();
      $.ajax("http://www.omdbapi.com/?i=" + imdbID + "&r=json")
      .done(function(exactMatch) {
        deferred.resolve(exactMatch);
      })
      .fail(function() {
        console.log("OMDb exact match failed");
      });
      return deferred.promise;
    },




  //search user library WIP
  // myLib : function(){
  //   var searchInput = $("#user_input").val();
  // },


  //     //add movie to specific users library
  // addMovie : function(imdbID) {
  //   //declare var for userInput
  //   var deferred = q.defer();
  //   //ajax call using promises
  //   $.ajax({ url : "http://www.omdbapi.com/?i=" + imdbID + "&y=&plot=short&r=json" }).done(function(myMovie){
  //       console.log("myMovie", myMovie);
  //        //return movie object Search key value
  //        deferred.resolve(myMovie);
  //     })
  //     .fail(function(xhr, status, error){
  //       deferred.reject(error);
  //     });
  //       return deferred.promise;
  //     },

// ====ADD MOVIE -----------

    addMovie: function(movieObject) {
      var newMovie;
      if (movieObject.Poster == "N/A") {
        newMovie = {
          Title: movieObject.Title,
          Year: movieObject.Year,
          Actors: movieObject.Actors.replace(/(, )/g, "|").split('|'),
          Watched: false,
          Poster: "../images/defaultPoster.jpg",
          rating: 0,
          imdbID: movieObject.imdbID,
          savedToFirebase: true,
          active: true
        };
      } else {
        newMovie = {
          Title: movieObject.Title,
          Year: movieObject.Year,
          Actors: movieObject.Actors.replace(/(, )/g, "|").split('|'),
          Watched: false,
          Poster: "http://img.omdbapi.com/?i=" + movieObject.imdbID + "&apikey=8513e0a1",
          rating: 0,
          imdbID: movieObject.imdbID,
          savedToFirebase: true,
          active: true
        };
      }
      firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(movieObject.imdbID).set(newMovie);
      },


// ======Get users movies =================

      getMovies : function(){
        var deferred = q.defer();
        $.ajax({
          url:"https://movie-viewe.firebaseio.com/movie.json"
        }).done(function(firebaseData){
          console.log("firebase data : ", firebaseData);
          deferred.resolve(firebaseData);
        })
        .fail(function(xhr, status, error){
          deferred.reject(error);
        });
        return deferred.promise;
      },

// MARKING WATCHED/NOT WATCHED

      markWatched: function(imdbID, thisButton) {
      $(thisButton).attr("watched", true);
      firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(imdbID).update({watched: true});
      $(thisButton).removeClass("btn-default");
      $(thisButton).addClass("btn-success");
      $(thisButton).text("Watched");
    },
      markUnwatched: function(imdbID, thisButton) {
      $(thisButton).attr("watched", false);
      firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(imdbID).update({watched: false});
      $(thisButton).removeClass("btn-success");
      $(thisButton).addClass("btn-default");
      $(thisButton).text("Not Watched");
    },

// FILTERS=================

     setFilterWatched: function(allMovies) {
        var filteredWatchedMovies = allMovies.filter(function(movie){
        console.log(movie.watched);
        if ( movie.watched == true) {
          return movie;
        // console.log("success of filter");
        }
      });
      console.log("filteredWatchedMovies", filteredWatchedMovies);
      return filteredWatchedMovies;
    },

    setFilterNotWatched:  function(allMovies) {
      var filteredNotWatchedMovies = allMovies.filter(function(movie){
        console.log(movie.notWatched);
        if ( movie.watched == false ) {
          return movie;
        }
      });
      console.log("filteredNotWatchedMovies", filteredNotWatchedMovies);
      return filteredNotWatchedMovies;
    },



  };

});
 
