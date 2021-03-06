
define(["jquery", "q", "firebase"],
  function($, q, firebase) {

  var firebaseRef = new firebase("https://movie-viewe.firebaseio.com/");
  // consolidating modules to prevent from going back and forth between files so much

return {
// SEARCHING MOVIE //omdb search functionality
  omdbSearch: function(userInput) {
    var deferred = q.defer();
    //declare var for userInput
    //split and join userInput to inject into url in a format readable for api
    userInput = userInput.split(" ").join("+");
    $.ajax({ url : "http://www.omdbapi.com/?s=" + userInput + "&type=movie&r=json" })
    .done(function(movieMatches){
      var searchResultsArray = movieMatches.Search;
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


// ====ADD MOVIE -----------

    addMovie: function(movieObject) {
      var newMovie;
      if (movieObject.Poster == "N/A") {
        newMovie = {
          Title: movieObject.Title,
          Year: movieObject.Year,
          Actors: movieObject.Actors.replace(/(, )/g, "|").split('|'),
          watched: false,
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
          watched: false,
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
          url:"https://movie-viewe.firebaseio.com/users/"+ firebaseRef.getAuth().uid +"/movies.json"
        }).done(function(firebaseData){
          var firebaseMoviesArray = _.values(firebaseData);
          deferred.resolve(firebaseMoviesArray);
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
      $(thisButton).removeClass("btn-danger");
      $(thisButton).addClass("btn-success");
      $(thisButton).text("Watched");
    },
      markUnwatched: function(imdbID, thisButton) {
      $(thisButton).attr("watched", false);
      firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(imdbID).update({watched: false});
      $(thisButton).removeClass("btn-success");
      $(thisButton).addClass("btn-danger");
      $(thisButton).text("Not Watched");
    },

// FILTERS=================
  // WATCHED
     setFilterWatched: function(allMovies) {
        var filteredWatchedMovies = allMovies.filter(function(movie){
        if ( movie.watched === true) {
          return movie;
        // console.log("success of filter");
        }
      });
      return filteredWatchedMovies;
    },


// SET FILTER NOT WATCHED
    setFilterNotWatched:  function(allMovies) {
      var filteredNotWatchedMovies = allMovies.filter(function(movie){
        if ( movie.watched === false ) {
          return movie;
        }
      });
      return filteredNotWatchedMovies;
    },
// changing rating
    changeRating: function(ImdbID, ratingValue) {
      firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(ImdbID).update({rating: ratingValue});

    },
//slideFilter based on star ratings - display all movies at rating 0

    slideFilter: function(allMovies, sliderValue) {
      var slideMovieFilter = allMovies.filter(function(eachMovie){
        if (sliderValue == 0) {

          return eachMovie;
        } else if (sliderValue == eachMovie.rating) {
          return eachMovie;
        }
      });
          return slideMovieFilter;
    },

      //DELETE REMOVE MOVIE
    deleteUsersMovies: function(movieID) {
            firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(movieID).remove(function(error) {
        if (error) {
          console.log("there was an error", error);
        }
      });

    }



  };

});






