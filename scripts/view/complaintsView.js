'use strict';

(function(module){

  var complaintsView = {};

  complaintsView.autoCompleteName = function() {
    $('#business_name').autocomplete({
      source: Complaint.selectUniqueInColumn('business')
    });
  };

  complaintsView.autoCompleteCategory = function() {
    $('#category_name').autocomplete({
      source: Complaint.selectUniqueInColumn('businesscategory')
    });
  };

  complaintsView.getQuery = function(){
    $('#business_name')
    //eventhandeler for search form. calls methods based on query and renders results.
  }

  complaintsView.render = function(){
    complaintsView.autoCompleteName();
    complaintsView.autoCompleteCategory();
  };



  Complaint.updateData(complaintsView.render);

  module.complaintsView = complaintsView;
})(window);
