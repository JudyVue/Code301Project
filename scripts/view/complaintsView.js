'use strict';

(function(module){

  var complaintsView = {};

  complaintsView.populateAutoComplete = function() {
    // $('input').autocomplete({
    //   source: Complaint.allBusinessNames()
    // });
    // // console.log('autocomplete is working');
  };


  Complaint.updateData(complaintsView.populateAutoComplete);

  module.complaintsView = complaintsView;
})(window);
