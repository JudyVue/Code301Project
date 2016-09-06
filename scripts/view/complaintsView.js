'use strict';

(function(module){

  var complaintsView = {};

  complaintsView.renderWithHandlebars = function(templateid, data) {
    var template = Handlebars.compile($(templateid).text());
    return template(data);
  };
  // var viewObject = {
  //   totalResults: 7,
  //   openClaims: '100%'//Complaint.openClaims(returnedResults),
  // };

  // var renderedResult = complaintsView.renderWithHandlebars('#company-name-template', viewObject);
  //
  // $('#results-by-Name').append(renderedResult);

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

  complaintsView.getQuery = function(callback){
    $('#search-form').on('submit', function(event){
      event.preventDefault();
      page('/results'); //sets url to results
      if($('#business_name').val() && $('#category_name').val()){ //if they've entered both
        alert('You can only search either by business name or by category');
      }
      //search by name
      else if($('#business_name').val()){
        var query = $('#business_name').val();
        Complaint.searchByName(query, callback);
      }
      //search by
      else if ($('#category_name').val()) {
        var query = $('#category_name').val();
        Complaint.searchByCategory(query, callback);
      }
      else{
        alert('Why are you trying to search nothing?');
      }
    });
  };

  complaintsView.returnSearch = function(){
    console.log('Retrieved this array based on query ' + Complaint.nameArray.length);
    var viewObject = {
      totalResults: Complaint.nameArray.length,
      openClaims: '100%'//Complaint.openClaims(returnedResults),
    };
    var renderedResult = complaintsView.renderWithHandlebars('#company-name-template', viewObject);
    $('#results-by-Name').append(renderedResult);
    var $paragraph = $('<p>').text('test text');
    $('#results-by-Name').append($paragraph);
  };



  complaintsView.index = function(){
    $('#about').hide();
    $('#results').children().children().remove();
    $('#home').show();
    complaintsView.autoCompleteName();
    complaintsView.autoCompleteCategory();
    complaintsView.getQuery(complaintsView.returnSearch);

  };
  // Complaint.updateData(complaintsView.renderIndexPage);

  module.complaintsView = complaintsView;
})(window);
