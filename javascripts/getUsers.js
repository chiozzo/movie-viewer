define(["jquery","lodash"], function($, _) {
  var uid;
  return {
    load: function(uid) {
      $.ajax("https://movie-viewer.firebaseio.com/users/" + uid + "/.json").done(function(users) {
      	console.log("user JSON", users);
      });
    },
    setUid : function(passMe){
      uid = passMe;
    },
    getUid : function(){
      return uid;
    }
  };
});