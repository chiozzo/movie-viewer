requirejs.config({
  baseUrl: "./javascripts",
  paths:{
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase" : "../lib/bower_components/firebase/firebase",
    "lodash" : "../lib/bower_components/lodash/lodash.min",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "noUiSlider": "../lib/noUiSlider.8.0.2/nouislider.min",
    "q" : "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"],
    "material": ["bootstrap"],
    "noUiSlider": ["jquery"],
    "firebase" : {exports: "Firebase"
    }
  }
});

require(["jquery", "search", "q", "lodash", "bootstrap", "material",  "hbs!../templates/movie"], function($, search, q, _, bootstrap, movieHB) {

//Initialize material design for project

  $.material.init();


//this toggles the modal window to 'shown' and 'hidden' when the user clicks on the element with the id of 'login'
  $('#login').on('click', function () {
    console.log("click");
    $('#myModal').modal('toggle');
  });

//this code will be used to grab the user input for the search bar.  The variable will then be injected/ concatenated into the ajax request url.
  $('#send').click(function(movie){
    search.result()
      .then(function(movieData){
        console.log("movieData", movieData);
        //turn promise data into an array to use with handlebars
        $("#listBox").append(movieHB({movieItem: movieData}));
        // $("#listBox").append("Test");
        console.log("dom Write");





// requirejs(
//   ["jquery", "hbs", "bootstrap", "get-books", "xhr1", "q", "filter"],
//   function($, Handlebars, bootstrap, books, x1, q, filter) {
//     var allBooks;
//     books.loadBooks();
//     .then(function(books){
//       books = Object.keys( books ).map(key => books[ key ]);
//       allBooks = books;
//       return x1.bookType();
//     })
//     .then(function(types) {
//       types = Object.keys( types ).map(key => types[ key ]);
//       var bookArray = allBooks.map(book => {
//       book.type = _.find(types, { id:book.booktype }).label;
//       return book;
//       });
//       require(['hbs!../templates/genres'], function(genreTpl) {
//         $("#bookList").prepend(genreTpl({types: types}));
//       });
//       require(['hbs!../templates/books'], function(bookTpl) {
//       $("#bookList").html(bookTpl({books:bookArray}));
//         $(document).on('change', "#genres", function(){
//           filter.byGenre();
//        });







        //this will save the movie object to our firebase account
        // $.ajax({
        //   url: "https://movie-viewer.firebaseio.com/movie.json",
        //   method: "POST",
        //   data: JSON.stringify(movie)
        //   }).done(function(movie) {
        //     console.log("Your new movie is ", movie);
        //   });

      //   movies = Object.keys( movies ).map(key => movies[ key ]);
      //   console.log("this should be an array", movies);

      //   var movies = movies.map(movie => {
      //     movie.title = _.find(title, {id:movie.title}).label;
      //   return movie;
      //   })
      // require(['hbs!../templates/movie'], function(movie) {
      //   $("#movie").html(movie({title : title}));
      // });

    });
  });
});
