define(["jquery", "firebase", "getUsers", "movieTemplates", "dataControl"],
	function($, firebase, getUsers, templates, dataControl) {

    var firebaseRef = new firebase("https://movie-viewe.firebaseio.com");

    return {
      //this logs user into firebase based on email and password
    	logInUser: function(email, password) {
    		firebaseRef.authWithPassword({
          email: $("#loginEmailInput").val(),
          password: $("#loginPasswordInput").val()

          // 'email': "mncross@gmail.com",
          // 'password': "abc"

        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else{
            // console.log("login successful");
            $("#loginRegister").remove();
            $("#myNav").show();
            dataControl.getMovies()
              .then(function(originalMoviesArray) {
                // console.log("originalMoviesArray", originalMoviesArray);
             templates.loadProfileHbs(originalMoviesArray);
            });

          }
        });

      },



    // ==================below registers user

        getRegister: function(){
          console.log($('#registerEmailInput').val());
          console.log($('#registerPasswordInput').val());
          var newUserEmail = $('#registerEmailInput').val();
          firebaseRef.createUser({
            email    : newUserEmail,
            password : $('#registerPasswordInput').val()
            }, function(error, userData) {
                if (error) {
                  console.log("Error creating user:", error);
                  } else {
                    var newUser ={
                      userEmail: newUserEmail
                    };
                    firebaseRef.child('users').child(userData.uid).set(newUser);
                  }
                });
              }
        };


  });


