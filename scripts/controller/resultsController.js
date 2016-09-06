'use strict';

(function(module) {
  var resultsController = {};

  resultsController.reveal = function() {
    $('#results').show();
    $('#home').show();
    $('#about').hide();
  };

  module.resultsController = resultsController;
})(window);
