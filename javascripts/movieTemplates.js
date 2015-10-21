define(["hbs",
        "hbs!../templates/movie"],
function(Handlebars, movieTemplate) {
  var templates = {};
  templates.movie = movieTemplate;
  return templates;

});
