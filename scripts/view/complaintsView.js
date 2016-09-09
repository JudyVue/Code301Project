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

  $('#search-domain').change(function(event) {
    $('#search_input').val('');
    var searchDomain = $('#search-domain').val();
    if (searchDomain === 'name') {
      $('#search_input').attr('placeholder', 'Search by Business Name');
      $('#search_input').autocomplete({
        source: Complaint.selectUniqueInColumn('business')
      });
    } else {
      $('#search_input').attr('placeholder', 'Search by Category');
      $('#search_input').autocomplete({
        source: Complaint.selectUniqueInColumn('businesscategory')
      });
    }
  });

  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var searchDomain = $('#search-domain').val();
    var query = $('#search_input').val();
    if (searchDomain === 'name') {
      $('#enter-name-alert').remove();
      page('/result/' + escape(query));
    } else {
      page('/category/' + escape(query));
    }
  });

  complaintsView.returnSearch = function(){
    $('#results').show();
    $('#search').removeClass('search-home');
    $('#search-button').addClass('search-results-button');
  }

  complaintsView.returnSearchName = function(complaints){
    var mostRecentDate = new Date(Complaint.getMostRecent(complaints));
    var viewObject = {
      business: complaints[0].business,
      totalResults: complaints.length,
      street: complaints[0].businessstreetline1 !== 'undefined' ? complaints[0].businessstreetline1 : '',
      city: complaints[0].businesscity !== 'undefined' ? complaints[0].businesscity : '',
      state: complaints[0].businessstate !== 'undefined' ? complaints[0].businessstate : '',
      zip: complaints[0].businesszip !== 'undefined' ? complaints[0].businesszip : '',
      openClaims: ((
        Complaint.openClaims(complaints) / complaints.length) * 100).toFixed(2),
      mostRecent: mostRecentDate.toDateString()
    };
    var renderedResult = complaintsView.renderWithHandlebars(
      '#company-name-template', viewObject);
    $('#results-by-Name').append(renderedResult);
  };

  complaintsView.returnCategorySearch = function(complaint){
    var renderedResult = complaintsView.renderWithHandlebars(
      '#category-template', complaint);
    $('#results-by-Name').append(renderedResult);
  };

  complaintsView.index = function(callback){
    $('#about').hide();
    $('#results').children().children().remove();
    $('#home').show();
    $('#search').addClass('search-home');
    $('#search-button').removeClass('search-results-button');
    $('#search-domain').trigger('change');
    complaintsView.autoCompleteName();
    complaintsView.autoCompleteCategory();
  };

  module.complaintsView = complaintsView;
})(window);
