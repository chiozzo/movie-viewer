// define(function(require) {
//   var $ = require("jquery");
//   var q = require("q");

//   return {
//     getMovies : function(){
//       var deferred = q.defer();
//           $.ajax({
//           url:"https://movie-viewe.firebaseio.com/movie.json"
//           }).done(function(firebaseData){
//             console.log("firebase data : ", firebaseData);
//             deferred.resolve(firebaseData);
//            })
//           .fail(function(xhr, status, error){
//             deferred.reject(error);
//           });
//           return deferred.promise;
//       }
//     };
// });