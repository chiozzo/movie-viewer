// define(["jquery",
// 				"hbs",
//         "hbs!../templates/movie"],

// function($,hbs, movieTemplate) {
//   var templates = {};
//   templates.movie = movieTemplate;
//   return templates;

// });
// ========================what they had^ =======
define(["jquery", "hbs", "bootstrap", "hbs!../templates/movie"], function($, hbs, bootstrap, movieHBS) {
	// var templates = {};
 //  templates.movie = movieTemplate;

	return {
		loadProfileHbs: function(allMoviesArray) {
			require(['hbs!../templates/movie'], function(mainTpl) {
				$("#myMovies").html(mainTpl({movies: allMoviesArray}));
			});	
		}
	}
});

