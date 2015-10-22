define(["jquery", "firebase", "getUsers", "movieTemplates"],
	function($, firebase, getUsers, templates) {
return {
  //this logs user into firebase based on email and password
	logInUser: function(firebaseRef) {
		firebaseRef.authWithPassword({
      'email': $("#inputEmail").val(),
      'password': $("#inputPassword").val()
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else{
        console.log("Authenticated successfully with payload:", authData);
        getUsers.setUid(authData.uid);
        getUsers.load(authData.uid);
        $("#inputEmail").val('');
        $("#inputPassword").val('');
        //show user input on successful load to interact with app
        $("#user_input").show();
        $("#send").show();
        //show firebase snapshot on load based on authData Uid
        firebaseRef.child("users/" + authData.uid + "/movies/").on("value", function(snapshot){
          var movies = snapshot.val();
          console.log("movies", movies);

          allMoviesArray = [];

          for (var key in movies){
            var movieWithId = movies[key];
            movieWithId.key = key;
            console.log("movieWithId", movieWithId);
            allMoviesArray[allMoviesArray.length] = movieWithId;
          }

          allMoviesObject = {movie : allMoviesArray};

          originalMoviesArray = allMoviesArray.slice();

          $("#movie").html(templates.movie(allMoviesObject));

        });
      }
	   });
	 }
  };
});