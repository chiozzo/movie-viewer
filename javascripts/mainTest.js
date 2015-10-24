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
    "q": "../lib/bower_components/q/q",
    "bootstrap-star-rating": "../lib/bower_components/bootstrap-star-rating/js/star-rating",
    "scotch-panels": "../lib/bower_components/scotch-panels/dist/scotchPanels.min"
  },
  shim: {
    "bootstrap": ["jquery"],
    "scotch-panels": ["jquery"],
    "bootstrap-star-rating": ["bootstrap"],
    "material": ["bootstrap"],
    "noUiSlider": ["jquery"],
    "firebase": {exports: "Firebase"}
  }
});

require(
  ["jquery",  "q", "search", "getUsers", "lodash", "bootstrap", "scotch-panels", "bootstrap-star-rating", "material", "firebase", "hbs", "Authenticate", "movieTemplates", "hbs!../templates/movie"],
  function($, q, search, getUsers, _, bootstrap, scotchPanels, bootstrapStarRating, material, firebase, handlebars, authenticate, templates, movieHBS) {

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
      6: 'Six Stars',
      7: 'Seven Stars',
      8: 'Eight Stars',
      9: 'Nine Stars',
      10: 'Ten Stars',
    },
    starCaptionClasses: function(val) {
      if (val === 0) {
        return 'label label-default';
      } else if (val < 2) {
        return 'label label-danger';
      } else if (val < 3) {
        return 'label label-warning';
      } else if (val < 4) {
        return 'label label-info';
      } else if (val < 5) {
        return 'label label-primary';
      } else if (val < 6){
        return 'label label-info';
      } else if (val < 7){
        return 'label label-primary';
      } else if (val < 8) {
        return 'label label-primary';
      } else if (val < 9) {
        return 'label label-success';
      } else if (val < 10) {
        return 'label label-success';
      } else {
        return 'label label-success';
      } 

    }
    // {
    //  1: 'label label-danger',
    //  2: 'label label-danger',
    //  3: 'label label-warning',
    //  4: 'label label-warning',
    //  5: 'label label-info',
    //  6: 'label label-info',
    //  7: 'label label-primary',
    //  8: 'label label-primary',
    //  9: 'label label-success',
    //  10: 'label label-success'
    // }
  });

  var panelExample = $('#registerForm').scotchPanel({
      containerSelector: '#panelContainer', // Make this appear on the entire screen
      direction: 'left', // Make it toggle in from the left
      duration: 300, // Speed in ms how fast you want it to be
      transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
      distanceX: '100%', // Size of the toggle
      enableEscapeKey: true // Clicking Esc will close the panel
  });

  $(document).on('click', '#registerFormButton', function() {
    panelExample.open();
  });

  $(document).on('click', '#registerUserButton', function() {
    panelExample.close();
  });

});