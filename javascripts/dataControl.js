define(["jquery", "q", "firebase"],
	function($, q, firebase) {

	var firebaseRef = new firebase("https://movie-viewe.firebaseio.com/");

return {
	// consolidating modules to prevent from going back and forth between files so much

// SEARCHING MOVIE
      //omdb search functionality
  omdbSearch: function(userInput) {
    var deferred = q.defer();
    //declare var for userInput
    // var userInput = $("#user_input").val();
    
    //split and join userInput to inject into url in a format readable for api
    userInput = userInput.split(" ").join("+");
    $.ajax({ url : "http://www.omdbapi.com/?s=" + userInput + "&y=&plot=short&r=json" }).done(function(movie){
    		console.log("userInput", userInput);
      	console.log("movie", movie);
      	//return movie object Search key value
      	deferred.resolve(movie.Search);
    })
  	.fail(function(){
    	console.log("OMDb search failure");
  		return deferred.promise;
  	});
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
          savedToFirebase: true
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
          savedToFirebase: true
        };
      }
      firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(movieObject.imdbID).set(newMovie);
    	},

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
  		}



	};

});
 

