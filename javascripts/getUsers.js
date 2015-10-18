define(["jquery","lodash"], function($, _) {

  return {
    load: function(fn) {
      $.ajax("https://movie-viewer.firebaseio.com/users.json").done(function(users) {
      	console.log("user JSON", users);
      });
    }
  };
});