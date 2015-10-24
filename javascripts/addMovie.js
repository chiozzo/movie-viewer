
// // commenting out and putting this module witin data control to make navigating between files easier

// define(["jquery", "q", "firebase"],
//   function($, q, firebase) {

// var firebaseRef = new firebase("https://movie-viewe.firebaseio.com/");


//   return {


//     addMovie: function(movieObject) {
//       var newMovie;
//       if (movieObject.Poster == "N/A") {
//         newMovie = {
//           Title: movieObject.Title,
//           Year: movieObject.Year,
//           Actors: movieObject.Actors.replace(/(, )/g, "|").split('|'),
//           watched: false,
//           Poster: "../images/defaultPoster.jpg",
//           rating: 0,
//           imdbID: movieObject.imdbID,
//           savedToFirebase: true
//         };
//       } else {
//         newMovie = {
//           Title: movieObject.Title,
//           Year: movieObject.Year,
//           Actors: movieObject.Actors.replace(/(, )/g, "|").split('|'),
//           watched: false,
//           Poster: "http://img.omdbapi.com/?i=" + movieObject.imdbID + "&apikey=8513e0a1",
//           rating: 0,
//           imdbID: movieObject.imdbID,
//           savedToFirebase: true
//         };
//       }
//       firebaseRef.child('users').child(firebaseRef.getAuth().uid).child('movies').child(movieObject.imdbID).set(newMovie);
//     }
// });

// // // commenting their code out as it doesnt add movies
// //     addMovie : function(imdbID) {
// //       //declare var for userInput
// //       var deferred = q.defer();
// //       //ajax call using promises
// //       $.ajax({ url : "http://www.omdbapi.com/?i=" + imdbID + "&y=&plot=short&r=json" }).done(function(myMovie){
// //         console.log("myMovie", myMovie);
// //         //return movie object Search key value
// //         deferred.resolve(myMovie);
// //       })
// //     .fail(function(xhr, status, error){
// //       deferred.reject(error);
// //     });
// //     return deferred.promise;
// //     }
// //   };
// // });
