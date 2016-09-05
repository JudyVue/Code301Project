'use strict';

(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('#home').show();
    $('#about').hide();
    console.log('getting to single-page nav app');
  };

  module.homeController = homeController;
})(window);
