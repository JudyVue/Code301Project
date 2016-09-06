'use strict';

(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('#home').show();
    $('#about').hide();
  };

  module.homeController = homeController;
})(window);
