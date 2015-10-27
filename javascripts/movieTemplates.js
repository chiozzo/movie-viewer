
define(["jquery", "hbs", "bootstrap"], function($, hbs, bootstrap) {

	return {
		loadProfileHbs: function(allMoviesArray) {
			require(['hbs!../templates/movie'], function(movieHBS) {
				$("#myMovies").html(movieHBS({movie: allMoviesArray}));
									$(".starRating").rating({
						min:0,
						max:10,
						step:1,
						size:'xs',
						showClear:true,
						starCaptions: {
							1: 'One Star',
							2: 'Two Stars',
							3: 'Three Stars',
							4: 'Four Stars',
							5: 'Five Stars',
							6: 'Six Star',
							7: 'Seven Stars',
							8: 'Eight Stars',
							9: 'Nine Stars',
							10: 'Ten Stars',
						},
						starCaptionClasses: function(val) {
							if (val === 0) {
								return 'label label-default';
							} else if (val < 3) {
								return 'label label-danger';
							} else if (val < 6) {
								return 'label label-warning';
							} else if (val < 8) {
								return 'label label-info';
							} else if (val < 10) {
								return 'label label-primary';
							} else {
								return 'label label-success';
							}
						}
				
					});
			});
		},

		loadSearchResults: function(returnedSearchResults) {
			require(['hbs!../templates/movie'], function(movieHBS) {
				$("#myMovies").html(returnedSearchResults);
			});
		}

	};
});

