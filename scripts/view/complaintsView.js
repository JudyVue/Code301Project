'use strict';

(function(module){

  var complaintsView = {};

  complaintsView.renderWithHandlebars = function(templateid, data) {
    var template = Handlebars.compile($(templateid).text());
    return template(data);
  };


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
    console.log('setting up search form');
    $('#search-form').on('submit', function(event){
      event.preventDefault();
      console.log('form summitted, ', $('#business_name').val());
      if($('#business_name').val()){
        var query = $('#business_name').val();
        // var returnedResults = searchByName(query);
        var returnedResults = Complaint.allComplaints;
        var viewObject = {
          total_results: returnedResults.length,
          total_complaints: 888,//Complaint.sumOfComplaints(returnedResults),
          open_claims: '100%'//Complaint.openClaims(returnedResults),
        };
        $('#results-by-Name').append(complaintsView.renderWithHandlebars('#renderWithHandlebars', viewObject));
      }
    });
    //eventhandeler for search form. calls methods based on query and renders results.
  };


  complaintsView.renderIndexPage = function(){
    complaintsView.autoCompleteName();
    complaintsView.autoCompleteCategory();
    complaintsView.getQuery();

  };
  Complaint.updateData(complaintsView.renderIndexPage);

  module.complaintsView = complaintsView;
})(window);
