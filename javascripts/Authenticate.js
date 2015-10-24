define(["jquery", "firebase", "getUsers", "movieTemplates"],
	function($, firebase, getUsers, templates) {

    var firebaseRef = new firebase("https://movie-viewe.firebaseio.com");

    return {
      //this logs user into firebase based on email and password
    	logInUser: function(email, password) {
    		firebaseRef.authWithPassword({
          email: $("#inputEmail").val(),
          password: $("#inputPassword").val()
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else{
            console.log("login successful");

    // =========above is working

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
        })
      },


    // ==================below registers user

        getRegister: function(){
          var newUserEmail = $('#inputEmail').val();
          firebaseRef.createUser({
            email    : newUserEmail,
            password : $('#inputPassword').val()
            }, function(error, userData) {
                if (error) {
                  console.log("Error creating user:", error);
                  } else {
                    var newUser ={
                      userEmail: newUserEmail
                    };
                    firebaseRef.child('users').child(userData.uid).set(newUser);
                    $('#loginMessage').text(newUserEmail + " is now registered. Please login.");
                  }
                })
              }
        }


  });
 

