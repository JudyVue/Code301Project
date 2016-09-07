'use strict';

(function(module) {
  var resultsController = {};

  resultsController.reveal = function() {
    $('#results').show();
    $('#home').show();
    $('#about').hide();
  };

  resultsController.loadByName = function(ctx, next) {
    var complaintsData = function() {
      ctx.complaints = Complaint.nameArray;
      console.log(Complaint.nameArray);
      next();
    };
    Complaint.searchByName(
      ctx.params.businessName.replace('+', ' '), complaintsData);
  };

  module.resultsController = resultsController;
})(window);
