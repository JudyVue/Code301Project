'use strict';

(function(module) {
  var resultsController = {};

  resultsController.reveal = function() {
    $('#results').show();
    $('#home').show();
    $('#about').hide();
    console.log('getting to single-page nav app');
  };

  module.resultsController = resultsController;
})(window);
