define(["jquery","lodash"], function($, _) {
  var uid;
  return {
    load: function(uid) {
      $.ajax("https://movie-viewe.firebaseio.com/users/" + uid + "/.json").done(function(users) {
      	console.log("user JSON", users);
      });
    },
    //set uid in authenticate.js
    setUid : function(passMe){
      uid = passMe;
    },
    //get uid for future use
    getUid : function(){
      return uid;
    }
  };
});