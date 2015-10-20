define(["hbs",
        "hbs!../templates/movieHB"],
function(Handlebars, movieTemplate) {
  var templates = {};
  templates.movie = movieTemplate;
  return templates;

});
