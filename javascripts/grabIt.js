define(["lodash"], function(_){
  return {
    findImdbID : function(movie){
    var foundImdbID = _.chain(movie.Search)
                      .uniq(foundImdbID, "imdbID")
                      .pluck(foundImdbID, "imdbID")
                      .value();
    return {
      foundImdbID : foundImdbID
      };
    }
  };
});
