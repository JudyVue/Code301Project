'use strict';

(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('#about').show();
    $('#home').hide();
  };

  module.aboutController = aboutController;
})(window);
