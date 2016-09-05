'use strict';

(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('#about').show();
    $('#home').hide();
    console.log('getting to single-page nav app');
  };

  module.aboutController = aboutController;
})(window);
