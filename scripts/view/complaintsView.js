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

  complaintsView.getQuery = function(callback){
    $('#search-form').on('submit', function(event){
      event.preventDefault();
      // page('/result'); //sets url to results

      //if they've entered both
      if($('#business_name').val() && $('#category_name').val()){
        alert('You can only search either by business name or by category');
      }
      //search by name
      else if($('#business_name').val()){
        var query = $('#business_name').val();
        page('/result/' + $('#business_name').val().replace(/\W+/g, '+'));
        // Complaint.searchByName(query, callback);
      }
      //search by category
      else if ($('#category_name').val()) {
        var query = $('#category_name').val();
        page('/category/' + $('#category_name').val().replace(/\W+/g, '+'));
        // Complaint.searchByCategory(query, callback);
      }
      else{
        alert('Why are you trying to search nothing?');
      }
    });
  };

  complaintsView.returnSearch = function(complaints){
    console.log('Retrieved this array based on query ' +
    complaints);
    $('#business_name').val('');
    console.log(typeof(complaints[0].businessstreetline1));
    var viewObject = {
      business: complaints[0].business,
      totalResults: complaints.length,
      street: complaints[0].businessstreetline1 !== 'undefined' ? complaints[0].businessstreetline1 : '',
      city: complaints[0].businesscity !== 'undefined' ? complaints[0].businesscity : '',
      state: complaints[0].businessstate !== 'undefined' ? complaints[0].businessstate : '',
      zip: complaints[0].businesszip !== 'undefined' ? complaints[0].businesszip : '',
      openClaims: (
        Complaint.openClaims(complaints) / complaints.length) * 100,
    };
    var renderedResult = complaintsView.renderWithHandlebars(
      '#company-name-template', viewObject);
    $('#results-by-Name').append(renderedResult);
  };


  complaintsView.index = function(callback){
    $('#about').hide();
    $('#results').children().children().remove();
    $('#home').show();
    complaintsView.autoCompleteName();
    complaintsView.autoCompleteCategory();
    complaintsView.getQuery();
    // callback;

  };
  // Complaint.updateData(complaintsView.renderIndexPage);

  module.complaintsView = complaintsView;
})(window);
