
define(["jquery", "hbs", "bootstrap", "hbs!../templates/movie"], function($, hbs, bootstrap, movieHBS) {
	// var templates = {};
 //  templates.movie = movieTemplate;

	return {
		loadProfileHbs: function(allMoviesArray) {
			require(['hbs!../templates/movie'], function(mainTpl) {
				$("#myMovies").html(mainTpl({movies: allMoviesArray}));
			});	
		},

		loadSearchResults: function(returnedSearchResults) {
			require(['hbs!../templates/movie'], function(mainTpl) {
				$("#myMovies").html(returnedSearchResults);


			});
		}

	}
});

