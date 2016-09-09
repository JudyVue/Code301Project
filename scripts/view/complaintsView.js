'use strict';

(function(module){

  var complaintsView = {};

  complaintsView.renderWithHandlebars = function(templateid, data) {
    var template = Handlebars.compile($(templateid).text());
    return template(data);
  };

  complaintsView.autoCompleteName = function() {
    complaintsView.allNames = Complaint.selectUniqueInColumn('business');
    $('#search_input').autocomplete({
      source: complaintsView.allNames
    });
  };

  complaintsView.autoCompleteCategory = function() {
    complaintsView.allCategories = Complaint.selectUniqueInColumn('businesscategory');
  };

  $('#search-domain').change(function(event) {
    event.preventDefault();
    $('#search_input').val('');
    var searchDomain = $('#search-domain').val();
    if (searchDomain === 'name') {
      $('#search_input').attr('placeholder', 'Search by Business Name');
      $('#search_input').autocomplete({
        source: complaintsView.allNames
      });
    } else {
      $('#search_input').attr('placeholder', 'Search by Category');
      $('#search_input').autocomplete({
        source: complaintsView.allCategories
      });
    }
  });

  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var searchDomain = $('#search-domain').val();
    var query = $('#search_input').val();
    if (query){
      $('#enter-name-alert').remove();
      if (searchDomain === 'name') {
        page('/result/' + escape(query));
      } else {
        page('/category/' + escape(query));
      }
    } else {
      if ($('#enter-name-alert')) {
        $('#enter-name-alert').remove();
      }
      $('<h4 id="enter-name-alert">Please enter a business name</h4>').appendTo('#search-form h2');
    }
  });

  complaintsView.returnSearch = function(){
    $('#results').show();
    $('#search').removeClass('search-home');
    $('#search').addClass('search-results');
    $('#search-button').addClass('search-results-button');
  };

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
    $('#search-domain').val('category');
    $('#search-domain').change();
    var renderedResult = complaintsView.renderWithHandlebars(
      '#category-template', complaint);
    $('#results-by-Category').append(renderedResult);
  };

  complaintsView.index = function(callback){
    $('#about').hide();
    $('#results').children().children().remove();
    $('#home').show();
    $('#search-button').removeClass('search-results-button'); $('#search').removeClass('search-results');
    $('#search').addClass('search-home');
    $('#search-button').removeClass('search-results-button');
    $('#search-domain').change();
    complaintsView.autoCompleteName();
    complaintsView.autoCompleteCategory();

  };

  module.complaintsView = complaintsView;
})(window);
