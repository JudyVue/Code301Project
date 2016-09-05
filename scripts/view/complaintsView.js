'use strict';

(function(module){

  var complaintsView = {};

  var testArray = ['apple', 'bobcat', 'cheetah'];

  complaintsView.autoCompleteBusinessNameSearchField = function() {
    $('input').autocomplete({
      source: testArray
    });
    console.log('working?');
  };

  complaintsView.autoCompleteBusinessNameSearchField();

  module.complaintsView = complaintsView;
})(window);
