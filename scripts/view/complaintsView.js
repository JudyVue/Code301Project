'use strict';

(function(module){

  var complaintsView = {};

  
  var render = function(article) {
    var template = Handlebars.compile($('#company-name-template').text());

    article.daysAgo =
      parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);
    article.publishStatus =
      article.publishedOn ? 'published ' +
      article.daysAgo + ' days ago' : '(draft)';
    article.body = marked(article.body);

    return template(article);
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
    $('search-form').on('submit', function(){
      if($('business_name').val()){
        var query = $('business_name').val();
        // var returnedResults = searchByName(query);
        var returnedResults = Complaint.allComplaints;
        var viewObject = {
          total_results: returnedResults.length,
          total_complaints: 888,//Complaint.sumOfComplaints(returnedResults),
          open_claims: '100%'//Complaint.openComplaintsRatio(returnedResults),
        };

      }
    });
    //eventhandeler for search form. calls methods based on query and renders results.
  };



  complaintsView.render = function(){
    complaintsView.autoCompleteName();
    complaintsView.autoCompleteCategory();
  };



  Complaint.updateData(complaintsView.render);

  module.complaintsView = complaintsView;
})(window);
