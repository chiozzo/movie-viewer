define(["jquery", "firebase", "getUsers"],
	function($, firebase, getUsers) {
return {
	logInUser: function(firebaseRef) {
		firebaseRef.authWithPassword({
      'email': $("#inputEmail").val(),
      'password': $("#inputPassword").val()
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else{
        console.log("Authenticated successfully with payload:", authData);
        getUsers.load();
        $("#inputEmail").val('');
        $("#inputPassword").val('');
      }
	});
	}
};
});